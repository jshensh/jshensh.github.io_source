---
author: 403 Forbidden
comments: true
date: 2013-08-21 03:49:31+00:00
layout: post
slug: mysql%e6%8b%b7%e8%b4%9d%e8%a1%a8%e7%9a%84%e5%87%a0%e7%a7%8d%e6%96%b9%e5%bc%8f
title: mysql拷贝表的几种方式
wordpress_id: 603
categories:
- Web 开发
---
mysql拷贝表操作我们会常常用到，下面就为您详细介绍几种mysql拷贝表的方式，希望对您学习mysql拷贝表方面能够有所帮助。

假如我们有以下这样一个表：

```
id      username    password 
----------------------------------- 
1       admin       ************* 
2       sameer      ************* 
3       stewart     *************
```

```sql
CREATE TABLE IF NOT EXISTS `admin` (   
`id` int(6) unsigned NOT NULL auto_increment,   
`username` varchar(50) NOT NULL default '',   
`password` varchar(100) default NULL,   
PRIMARY KEY (`id`)   
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

```


1. 下面这个语句会拷贝表结构到新表newadmin中。 （不会拷贝表中的数据）
```sql
CREATE TABLE newadmin LIKE admin  

```


2. 下面这个语句会拷贝数据到新表中。 注意：这个语句其实只是把select语句的结果建一个表。所以newadmin这个表不会有主键，索引。
```sql
CREATE TABLE newadmin AS   
(   
SELECT *   
FROM admin   
)  

```


3. 如果你要真正的复制一个表。可以用下面的语句。
```sql
CREATE TABLE newadmin LIKE admin;   
INSERT INTO newadmin SELECT * FROM admin;  

```


4. 我们可以操作不同的数据库。
```sql
CREATE TABLE newadmin LIKE shop.admin;   
CREATE TABLE newshop.newadmin LIKE shop.admin;  

```


5. 我们也可以拷贝一个表中其中的一些字段。
```sql
CREATE TABLE newadmin AS   
(   
SELECT username, password FROM admin   
)  

```


6. 我们也可以讲新建的表的字段改名。
```sql
CREATE TABLE newadmin AS   
(   
SELECT id, username AS uname, password AS pass FROM admin   
)  

```


7. 我们也可以拷贝一部分数据。
```sql
CREATE TABLE newadmin AS   
(   
SELECT * FROM admin WHERE LEFT(username,1) = 's'   
)  

```


8. 我们也可以在创建表的同时定义表中的字段信息。
```sql
CREATE TABLE newadmin   
(   
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY   
)   
AS   
(   
SELECT * FROM admin   
)

```

