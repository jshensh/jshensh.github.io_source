---
author: 403 Forbidden
comments: true
date: 2016-03-23 15:46:05+00:00
layout: post
slug: php_pdo-%e8%b0%83%e7%94%a8mysql-%e5%b8%a6%e8%bf%94%e5%9b%9e%e5%8f%82%e6%95%b0%e7%9a%84%e5%ad%98%e5%82%a8%e8%bf%87%e7%a8%8b
title: PHP_PDO 调用mysql 带返回参数的存储过程
wordpress_id: 2501
categories:
- Web 开发
---
```sql
DROP PROCEDURE IF EXISTS pro_test;

create procedure pro_test(in val VARCHAR(50) ,out rtn int)
begin
declare err INT default 0;
-- 如果出现异常，会自动处理并rollback
declare exit handler for  sqlexception ROLLBACK ;
```

```sql
-- 启动事务
start transaction;
```

```sql
insert into test_user values(NULL,1,'啊是大三的');
-- set err = @@IDENTITY; -- =	获取上一次插入的自增ID;
set err =last_insert_id(); -- 获取上一次插入的自增ID
insert into test_user VALUES(NULL,val,err);

-- 运行没有异常，提交事务
commit;
-- 设置返回值为1
set rtn=1;
end;
```

```php
$name = '成都市';
$stmt = $db->prepare("CALL pro_test(?,@sp_result);");
$stmt->bindParam(1, $name);
$stmt->execute ();
$outputArray = $db->query("select @sp_result")->fetch(PDO::FETCH_ASSOC);
```

```php
print_r($outputArray["@sp_result"]);
```


转载自：[http://blog.csdn.net/auspi12341/article/details/17167069](http://blog.csdn.net/auspi12341/article/details/17167069)
