---
author: 403 Forbidden
comments: true
date: 2013-08-03 04:21:44+00:00
layout: post
slug: '%e8%99%9a%e6%8b%9f%e4%b8%bb%e6%9c%ba%e4%b8%8asqlserver%e5%bf%ab%e9%80%9f%e5%88%a0%e9%99%a4%e8%a1%a8%e5%92%8c%e8%a7%86%e5%9b%be%e5%8f%8a%e5%ad%98%e5%82%a8%e8%bf%87%e7%a8%8b%e7%9a%84sql%e8%af%ad'
title: 虚拟主机上sqlserver快速删除表和视图及存储过程的sql语句
wordpress_id: 572
categories:
- 建站相关
---
删除表
```sql
use 数据库名称
declare @sql varchar(8000)
while (select count(*) from sysobjects where type='U')>0
begin
SELECT @sql='drop table ' + name
FROM sysobjects
WHERE (type = 'U')
ORDER BY 'drop table ' + name
exec(@sql) 
end

```


删除视图
```sql
declare   @sql   varchar(8000)
set   @sql=''
select   @sql=@sql+ ', '+name   from   sysobjects
where   type= 'V '   and   name   not   in( 'syssegments ',   'sysconstraints ')
set   @sql= 'drop   view   '+stuff(@sql,   1,   1,   ' ')
exec(@sql)

```


删除存储过程
```sql
use 数据库名称
declare @tname varchar(8000)
set @tname=''
select @tname=@tname + Name + ',' from sysobjects where xtype='P'
select @tname='drop Procedure ' + left(@tname,len(@tname)-1)
exec(@tname)

```


转载自：[http://www.ovzxen.com/post-38.html](http://www.ovzxen.com/post-38.html)
