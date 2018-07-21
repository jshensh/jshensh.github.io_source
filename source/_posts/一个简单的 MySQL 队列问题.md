---
author: 403 Forbidden
comments: true
date: 2016-12-27 07:47:23+00:00
layout: post
slug: '%e4%b8%80%e4%b8%aa%e7%ae%80%e5%8d%95%e7%9a%84-mysql-%e9%98%9f%e5%88%97%e9%97%ae%e9%a2%98'
title: 一个简单的 MySQL 队列问题
wordpress_id: 2649
categories:
- Web 开发
---
最近有个朋友要实现队列任务方面的工作，我们就 mysql(innodb) 的事务和锁的特性聊了一些有趣的话题。
其中，最终的解决方案来自大神 [https://github.com/fengmk2](https://github.com/fengmk2) 之前的一个队列实现。 我做了一个小改进，使得之前表级锁的表现可以恢复到行级锁水平。

任务的大致描述是这样的：
有一个表，里面存了很多的用户id，大概100w条，表的结构简化如下：
```sql
create table user_block_status {
  user_id bigint // 用户的id
  status int // 用户的状态。1 ok 2 not ok
  updated_time timestamp // 更新时间戳
}
```

这个表里面，每隔10秒就要去检查用户是否存在违规页面。如果存在的话，则需要把 status 置为 2，默认是 1。
有 100 个 worker 会并发地从表里面读取 user_id，所以我们要设计一个策略，使得这 100 个 worker 在并发时， 读到的是独立的 100 个条目。

**方案1**
一开始的方案是这样的：
```sql
// 这一句不一定会发请求，可能会优化成跟接下来的第一个 query 一起发出
sql.begin_transaction

// 第一次io发生。
// 如果一个用户在 10s 内没有被更新，那么取出来
// 这时候由于程序拿得到 user_id 的值，所以网络io是发生了的。否则拿不到 user_id 的值
outdate_time = now() - 10s
line = sql.query('select user_id where updated_time < ? order by updated_time asc limit 1', [outdate_time])

// 第二次 io 发生
// 更新这一行的 updated_time，免得被其他worker重复读取
user_id = line.user_id
sql.query('update user_block_status set updated_time=now() where user_id = ?',
  [user_id])

// 第三次 io 发生
sql.commit

// do something with user_id
```

可以看到，这个地方我们发起了 3 次 io 请求。当然，请求数不是很关键，因为请求数以及对应的时间是一个恒定量， 而随着 worker 的增加，这一块并不会带来额外的性能瓶颈。但由于我们使用了事务，所以当 worker 由 100 增加到 1000 的时候，数据库由于存在大量的事务操作，这些事务都需要掌握写锁，所以有潜在的写锁排队问题。
而且关键是，方案是不可行的，根本没有起到队列的效果。
为什么呢？我们假设网络io无限快，而数据库每条语句的执行时间是1s，那么我们这个事务的执行时间是 2s。 这时如果 3 个 worker 并发地在同一秒（00:00）执行，那么假设 worker1 读到的 user_id 是 10086， 由于读锁是共享的，worker2 和 worker3 读到的 user_id 也是 10086。这时他们三个都想要更新 10086 的值， 而 worker1 抢先加了写锁，所以 worker2 和 worker3 就需要等待 worker1 的事务执行完毕， 才能重新获得 10086 的写锁并进行写入。 所以当 worker2 执行的时候，是 00:02 的时候，当 worker3 执行的时候，是 00:04 的时刻。 而且由于他们都是在对 10086 进行更新，所以没有起到队列的效果。
这里的查询条件太特殊，导致所有并发的事务需要的都是同一条数据， 这时候 innodb 行级锁的特性也没有发挥出来。
这个方案不仅并发时的表现类似表级锁的特性，而且也没有达到队列的效果。

**方案2**
将 update 语句在先，select 语句在后。
update 语句改成
```sql
outdate_time = now() - 10s
result = sql.query('update user_block_status set updated_time=now() where updated_time < ?   order by updated_time asc limit 1',
  [outdate_time])

## each worker can get different result.user_id
```

这样在 update 的时候，3 个 worker 会排队，分别更新不同的 user_id 条目。然后返回来的 也是不同的 user_id。
可关键是，update 语句并不会将被 update 了的 id 返回给程序，所以我们后面的 select 语句拿不到对应的 user_id。 这个方案先否决。

**方案3**
方案1的基础上，在 select 语句中，手工地干扰一下，使得不同的 worker 取到不同的条目
```sql
outdate_time = now() - 10s
random_number = random_int(0, worker_count * 2)
line = sql.query('select user_id where updated_time < ?  order by updated_time asc limit 1 offset ?',
  [outdate_time, random_number])
```

这时，我们的 worker 有很大的几率可以取出不同 user_id。但这里也还有个问题就是，很可能两个 worker 的 random_number 是同一个值。那么就发生了两次重复读取，不过对于我们的业务来说，重复读取只会造成资源的浪费， 而不会带来数据一致性的问题。只要尽量减少重复读的几率，那么这个方案就是可被接受的。
其中 worker_count * 2 是拍脑袋决定的数，如果数据库中始终有大量需要处理的数据，可以加大点。

**方案4**
方案3还是挺不完美的，虽然能解决问题，但是从概念上来说，我们需要的是队列。 队列的意思就是：排队！排队！排队！
方案3只是从业务逻辑层面出发，做出了一些规避，模拟了我们需要的效果。
那么回到方案2，其实方案2是更接近队列的。因为不同的 worker 真正在等待另一个 worker 更新东西。 可方案2无奈的是，我们拿不到被更新的id。那么有没有办法拿到呢？
其实是有的，用 mysql 的 LAST_INSERT_ID() 函数。
```sql
LAST_INSERT_ID(): Value of the AUTOINCREMENT column for the last INSERT
```

关于这个函数可以看看 [https://dev.mysql.com/doc/refman/5.7/en/information-functions.html](https://dev.mysql.com/doc/refman/5.7/en/information-functions.html) 这里的详细介绍。
这个函数本来的含义是，拿到 AUTO_INCREMENT 那一列的最新值。也就是我们最新 insert 进表的那个 id。 但实际上，它也可以作为一个 sql 语句中的变量来使用，它可以被赋值，然后取出。 而且它的作用域是同一 connection 内，这样我们多个 worker 如果对 LAST_INSERT_ID 赋了不同的值， 也不会互相干扰，因为不同的 worker 使用不同的 connection。
这时，我们的查询在方案2的基础上就变成：
```sql
sql.begin_transaction

outdate_time = now() - 10s
sql.query('update user_block_status set updated_time=now()，
 id=LAST_INSERT_ID(id) where updated_time < ?  order by updated_time asc limit 1',
  [outdate_time])

line = sql.query('select user_id where id = LAST_INSERT_ID()')

## do sth with line.user_id

sql.commit
```

ok，已经能排队了，业务上已经可以满足了。
目前性能上说，网络io还是三个，而且，【行级锁】没有被利用的特定依然存在。 写锁依然要排队，为什么这么说？因为不管 worker 有多少个，当他们并发的时候，where 条件都始终把它们 指向同一行数据，所以还是要为了同一行数据排队。即使目前我们已经达成了【排队之后，互相更新不同条目】这个目的。
方案4就总的性价比来说，目前跟方案3相比，还不一定谁好谁坏。 方案4的性能在于多个worker抢一个锁，大家总是等；方案3是无脑乱取，造成资源浪费，降低worker的效率，浪费机器。
什么情况下方案3好？ 如果总是有一大堆数据没有被处理的话，那么把方案3的乱取范围开大点，就能更好避免浪费。 而当一大堆数据等待处理的时候，方案4却不停在排队，这就等于堵住了。
还有一种情况就是，方案4的写锁排队已经成为瓶颈。但其实这跟上面是一回事，当总是有一大堆 worker 来取 东西的话，说明就是有一大堆数据没有被处理。否则开那么多 worker 干嘛。
什么情况下方案4好？ 前提就是，写锁排队并不成为瓶颈。如果要处理的数据并不是那么多，那么使用方案4的话，可以降低我们需要的 worker 数量，节约机器。 而且 worker 数量评估可以更加理性。

**方案5**
那么，我们把方案3的 offset 思想加进来吧。可惜啊可惜，update 语法只支持 limit，不支持 offset。
```sql
UPDATE [LOW_PRIORITY] [IGNORE] table_reference
    SET col_name1={expr1|DEFAULT} [, col_name2={expr2|DEFAULT}] ...
    [WHERE where_condition]
    [ORDER BY ...]
    [LIMIT row_count]
```

那就绕一绕。
不用 offset，而是通过更改 outdate_time 的值，让他们获得不同的行数据。
我们的程序是要求 10s 算作过期，那么 11s、20s、30s 肯定也算过期吧。那就这样写：
```sql
// 在 10 到 30s 之间随机取值
outdate_time = now() - (random(10, 30))s
sql.query('update user_block_status set updated_time=now()，
 id=LAST_INSERT_ID(id) where updated_time < ?  order by updated_time asc  limit 1',
  [outdate_time])
where updated_time < now() - 10s 与 where updated_time < now() - 12s 与 where updated_time < now() - 15s
//（不要在 where 条件里面写计算，这只是示例） 还是有可能锁定同一条数据。但至少，这个方案既利用上了行级锁，也不会造成多个 worker 处理同一 user_id 的 资源浪费。
```


**方案6**
锁的问题差不多就这么解决了。
我们再回头看看，发现还有个 io 问题可以再弄弄。现在还是 3 个 io 嘛。
其实到了现在这步，begin_transaction 可以去掉了。因为我们只有一个涉及写锁的操作在里面，这个操作本身作为单一语句， 就已经是原子性的了。
但由于我们利用了 LAST_INSERT_ID，所以我们要保证 update 语句和它之后的 select 语句在同一个 connection 中。
很多的 mysql 库实现都是用了连接池的，所以同一段代码中的两条 sql 有可能会利用两条 connection， 导致得到我们非预期的 user_id。
但就我们的业务来说，LAST_INSERT_ID 混了其实是没关系的。每个 worker 始终还是会得到一个 unique 的 user_id。 这就够了。那么我们也不必加一些多余的逻辑，保证这两条语句取到同一个 connection。
这时，io 操作从 3，降低到了 2。
那么，有没有可能降到 1 呢。
其实也可以啊............因为基本所有 mysql 库都支持 multistatements 特性。
我们可以在一条 query 写两个语句，返回接口会是一个数组，分别表示这两个语句的值。
类似这样，sql.query('update .....; select ....;')。这是支持的。而且这么一来， 同一 connection 的问题也解决了。避免为以后留坑。
重写方案
```sql
outdate_time = now() - (random(10, 30))s
result = sql.query('update user_block_status set updated_time=now()，
 user_id=LAST_INSERT_ID(user_id) where updated_time < ?  order by updated_time asc limit 1;

 select * from user_block_status where user_id = LAST_INSERT_ID()',
  [outdate_time])

// do something with result[1].user_id
```

。。。。。。。。。。。。。
还是有坑的。。。。。。。。。。。。。。。
如果 where updated_time < ? 一条都不命中，那么会发生什么结果？
首先，update 没有改变任何行。而 LAST_INSERT_ID 还是会返回一个合理的 id，有可能是真正的 LAST_INSERT_ID， 也可能是这条 connection 中上次手工设置的。
在这里可以多说一下 LAST_INSERT_ID 的特性。默认情况下，LAST_INSERT_ID() 不带参数会返回最新插入那条的 id。 带参数的情况下 LAST_INSERT_ID(id) 本身的返回值就是参数，然后在接下来的调用中，如果不发生任何 insert，那么 值会在 connection 中一直保持。如果发生了 insert，就会被更新。
如果不处理这个 update nothing 的异常情况，当队列全部被处理完的时候， 我们的 worker 会一直工作，不会停下来。所以我们要在取 LAST_INSERT_ID 的值时， 判断一下上一条 update 语句到底有没有发生作用。
这时候我们需要用到另一个跟 LAST_INSERT_ID 一起出现在文档中的函数，
```sql
ROW_COUNT(): The number of rows updated
```

判断一下 ROW_COUNT，如果是 0 的话，就条件不符，这时候我们在程序里面拿到的值就是空。
最终方案
```sql
outdate_time = now() - (random(10, 30))s
result = sql.query('update user_block_status set updated_time=now()，
  user_id=LAST_INSERT_ID(user_id) where updated_time < ?  order by updated_time asc limit 1;

  select * from user_block_status where user_id = LAST_INSERT_ID()
    and ROW_COUNT() <> 0',
  [outdate_time])

// do something with result[1].user_id
```

当然，mysql 用来解决这种队列问题可能不是一个好的方案。队列相关的知识，我还在努力学习中。
参考资料：




    
  * http://www.cnblogs.com/zhoujinyi/p/3437475.html

    
  * https://dev.mysql.com/doc/refman/5.7/en/information-functions.html



转载自 [https://ruby-china.org/topics/27814](https://ruby-china.org/topics/27814)

附：虽然用的是 ruby 语言，但其中最关键的还是 sql 语句。最近做个基于 laravel 的应用中使用到了队列的概念，因为对并发要求不高，所以直接用了 MariaDB，记下源码留作备用：
```php
<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class server extends Controller {
    public function create(Request $request) {
        $inputFilters = [
            "gid" => ["filter" => FILTER_VALIDATE_INT, "options" => ['min_range' => 1]],
            "sid" => ["filter" => FILTER_VALIDATE_INT, "options" => ['min_range' => 1]]
        ];
        $inputData = $request->all();
        $insertData = filter_var_array($inputData, $inputFilters);
        foreach ($insertData as $value) {
            if (!$value) {
                return response()->json(["errno" => -1], 500);
            }
        }
        DB::table('srv')
            ->where([
                ['conf', '=', $insertData["gid"]],
                ['state', '=', '0'],
                ['power', '=', '0']
            ])
            ->orderBy('id', 'desc')
            ->take(1)
            ->update([
                'state' => 1,
                'power' => 1,
                'sid' => $insertData["sid"],
                'id' => DB::raw('LAST_INSERT_ID(id)')
            ]);
        $data = DB::table('srv')
                    ->where([
                        ['id', '=', DB::raw('LAST_INSERT_ID()')],
                        [DB::raw('ROW_COUNT()'), '<>', 0]
                    ])
                    ->first();
        if (!$data) {
            return response()->json(["errno" => -2], 500);
        }
        return response()->json(["errno" => 0, "data" => $data]);
    }
}
```

