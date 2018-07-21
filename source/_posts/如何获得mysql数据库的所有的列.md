---
author: 403 Forbidden
comments: true
date: 2013-07-11 04:16:50+00:00
layout: post
slug: '%e5%a6%82%e4%bd%95%e8%8e%b7%e5%be%97mysql%e6%95%b0%e6%8d%ae%e5%ba%93%e7%9a%84%e6%89%80%e6%9c%89%e7%9a%84%e5%88%97'
title: 如何获得mysql数据库的所有的列
wordpress_id: 368
categories:
- Web 开发
---
```sql
SELECT  COLUMN_NAME FROM  `information_schema`.`COLUMNS` where  `TABLE_NAME`='appStats' order by COLUMN_NAME
```


所有字段获取：
```sql
SELECT COLUMN_NAME FROM 'information_schema'.'COLUMNS' where 'TABLE_SCHEMA'='数据库名称' and 'TABLE_NAME'='你的表名' order by COLUMN_NAME;
```

或者
```sql
select * from `information_schema`.`columns` where `table_name`='表名';
```


笨方法：
单个获取
```php
$re_name_1=mysql_field_name($result,1);
$re_name_2=mysql_field_name($result,2);

```

