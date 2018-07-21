---
author: 403 Forbidden
comments: true
date: 2014-10-05 13:29:42+00:00
layout: post
slug: mysql%e4%ba%8b%e4%bb%b6%e8%b0%83%e5%ba%a6%e5%99%a8%e8%af%a6%e8%a7%a3
title: MySQL事件调度器详解
wordpress_id: 1952
categories:
- Web 开发
---
自MySQL5.1.6起，增加了一个非常有特色的功能–事件调度器(Event Scheduler)，可以用做定时执行某些特定任务（例如：删除记录、对数据进行汇总等等），来取代原先只能由操作系统的计划任务来执行的工作。更值得一提的是MYSQL的事件调度器可以精确到每秒钟执行一个任务，而操作系统的计划任务（如：Linux下的CRON或Windows下的任务计划）只能精确到每分钟执行一次。对于一些对数据实时性要求比较高的应用（例如：股票、赔率、比分等）就非常适合。
事件调度器有时也可称为临时触发器(temporal triggers)，因为事件调度器是基于特定时间周期触发来执行某些任务，而触发器(Triggers)是基于某个表所产生的事件触发的，区别也就在这里。
在使用这个功能之前必须确保event_scheduler已开启，可执行
```sql
SET GLOBAL event_scheduler = 1;
```

或我们可以在配置my.ini文件 中加上event_scheduler = 1或
```sql
SET GLOBAL event_scheduler = ON;
```

来开启，也可以直接在启动命令加上“–event_scheduler=1”，例如：
mysqld ... --event_scheduler=1
要查看当前是否已开启事件调度器，可执行如下SQL：
```sql
SHOW VARIABLES LIKE 'event_scheduler';
```

或
```sql
SELECT @@event_scheduler;
```

或
拥有SUPER 权限的账户执行SHOW PROCESSLIST 就可以看到这个线程了

**定时服务配置**
先来看一下它的语法：
```sql
CREATE EVENT [IF NOT EXISTS] event_name
    ON SCHEDULE schedule
    [ON COMPLETION [NOT] PRESERVE]
    [ENABLE | DISABLE]
    [COMMENT 'comment']
    DO sql_statement;
schedule:
    AT TIMESTAMP [+ INTERVAL INTERVAL]
| EVERY INTERVAL [STARTS TIMESTAMP] [ENDS TIMESTAMP]
```

INTERVAL:
    quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}

**1. 每秒插入一条记录到数据表**
```sql
USE test;
CREATE TABLE aaa (timeline TIMESTAMP);
CREATE EVENT e_test_insert
ON SCHEDULE EVERY 1 SECOND
DO INSERT INTO test.aaa VALUES (CURRENT_TIMESTAMP);
```

等待3秒钟后，再执行查询看看：
mysql> SELECT * FROM aaa;
+---------------------+
| timeline            |
+---------------------+
| 2007-07-18 20:44:26 |
| 2007-07-18 20:44:27 |
| 2007-07-18 20:44:28 |
+---------------------+

**2. 5秒(天)后清空test表**
```sql
CREATE EVENT e_test
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 5 SECOND
DO TRUNCATE TABLE test.aaa;
CREATE EVENT e_test
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 5 DAY
DO TRUNCATE TABLE test.aaa;
```


**3. 2008年5月23日9点39分20秒整清空test表**
```sql
CREATE EVENT e_test
ON SCHEDULE AT TIMESTAMP '2008-05-23 9:39:20'
DO TRUNCATE TABLE test.aaa;
```

这个测试有问题。还不太明白原因。

**4. 每天定时清空test表**
```sql
CREATE EVENT e_test
ON SCHEDULE EVERY 1 DAY
DO TRUNCATE TABLE test.aaa;
```


**5. 5天后开启每天定时清空test表**
```sql
CREATE EVENT e_test
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP + INTERVAL 5 DAY
DO TRUNCATE TABLE test.aaa;
```

这里5天也可以为0天，当时就开启清空表

**6. 每天定时清空test表，5天后停止执行**
```sql
CREATE EVENT e_test
ON SCHEDULE EVERY 1 DAY
ENDS CURRENT_TIMESTAMP + INTERVAL 5 DAY
DO TRUNCATE TABLE test.aaa;
```

该设置要求天数大于1，否则报错。而且创建不成功

**7. 5天后开启每天定时清空test表，一个月后停止执行**
```sql
CREATE EVENT e_test
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP + INTERVAL 5 DAY
ENDS CURRENT_TIMESTAMP + INTERVAL 1 MONTH
DO TRUNCATE TABLE test.aaa;[ON COMPLETION [NOT] PRESERVE]
```

可以设置这个事件是执行一次还是持久执行，默认为NOT PRESERVE。
该事件会停止每隔一秒插入数据的事件，感觉这点上mysql做的还是有问题。

**8. 每天定时清空test表(只执行一次，任务完成后就终止该事件)**
```sql
CREATE EVENT e_test
ON SCHEDULE EVERY 1 DAY
ON COMPLETION NOT PRESERVE
DO TRUNCATE TABLE test.aaa;
```

[ENABLE | DISABLE]可是设置该事件创建后状态是否开启或关闭，默认为ENABLE。
[COMMENT ‘comment’]可以给该事件加上注释。

**定时服务日常维护测试**
**修改事件(ALTER EVENT)**
```sql
ALTER EVENT event_name
    [ON SCHEDULE schedule]
    [RENAME TO new_event_name]
    [ON COMPLETION [NOT] PRESERVE]
    [COMMENT 'comment']
    [ENABLE | DISABLE]
    [DO sql_statement]
```

a、临时关闭事件
```sql
ALTER EVENT e_test DISABLE;
```

b、开启事件
```sql
ALTER EVENT e_test ENABLE;
```

c、将每天清空test表改为5天清空一次：
```sql
ALTER EVENT e_test
ON SCHEDULE EVERY 5 DAY;
```

d、重命名事件并加上注释
```sql
alter event test.new_e_test rename to e_test comment 'e_test_cm';
```


**删除事件(DROP EVENT)**
语法很简单，如下所示：
```sql
DROP EVENT [IF EXISTS] event_name
```

例如删除前面创建的e_test事件
```sql
DROP EVENT e_test;
```

当然前提是这个事件存在，否则会产生ERROR 1513 (HY000): Unknown event错误，因此最好加上IF EXISTS
```sql
DROP EVENT IF EXISTS e_test;
```


**查看事件**
a、查看一个event的详细信息可以用下面的视图：
```sql
SELECT * FROM INFORMATION_SCHEMA.EVENTS WHERE EVENT_NAME = 'test_insert'   AND EVENT_SCHEMA = 'test'\G;
```

b、简要列出所有的event：show events
语法：
```sql
SHOW EVENTS [FROM schema_name]
    [LIKE 'pattern' | WHERE expr]
```

格式化显示所有event
```sql
SHOW EVENTS\G
```

格式化显示test用户的event
```sql
show events FROM test;
```

c、查看event的创建信息
```sql
SHOW CREATE EVENT event_name
show create event test.e_test\G
```


**结论**
该特性确实非常有用，可作为定时清空数据表、监控主从服务器、汇总数据到另一张表等等，并且可以精确到每秒，实时性也可以得到保障。
不过如果当两个事件的针对相同的对象的时候，会出现冲突，这种情况还不明确是我理解的问题还是确实是这样，比如每秒插入和定时删除就会冲突。除了调度SQL语句之外，MYSQL的调度器也可以调度存储过程。

**缺点**
```sql
SELECT * FROM INFORMATION_SCHEMA.EVENTS WHERE EVENT_NAME = 'test_insert'  AND EVENT_SCHEMA = 'troaudit_db'\G;
```

```
*************************** 1. row ***************************
       EVENT_CATALOG: NULL
        EVENT_SCHEMA: troaudit_db
          EVENT_NAME: event_session_table
             DEFINER: egilance@%
           TIME_ZONE: SYSTEM
          EVENT_BODY: SQL
    EVENT_DEFINITION: BEGIN
        CALL create_table_process;
    END
          EVENT_TYPE: RECURRING
          EXECUTE_AT: NULL
      INTERVAL_VALUE: 1800
      INTERVAL_FIELD: SECOND
            SQL_MODE:
              STARTS: 2011-08-23 10:51:28
                ENDS: NULL
              STATUS: ENABLED
       ON_COMPLETION: PRESERVE
             CREATED: 2011-08-23 10:51:28
        LAST_ALTERED: 2011-08-23 10:51:28
       LAST_EXECUTED: 2011-08-23 17:55:51
       EVENT_COMMENT:
          ORIGINATOR: 0
CHARACTER_SET_CLIENT: utf8
COLLATION_CONNECTION: utf8_general_ci
  DATABASE_COLLATION: utf8_unicode_ci
1 row in set (0.00 sec)
```
 
MySQL只会记录最后一次调度的时间，如果时间往前调整，小于最近执行的时间，则不会执行事件调度。

转载自 [http://www.2cto.com/database/201111/109752.html](http://www.2cto.com/database/201111/109752.html)
