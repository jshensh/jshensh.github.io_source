---
author: 403 Forbidden
comments: true
date: 2015-01-28 06:24:07+00:00
layout: post
slug: mysql%e4%b8%adyou-cant-specify-target-table-for-update-in-from-clause%e9%94%99%e8%af%af
title: mysql中You can't specify target table for update in FROM clause错误
wordpress_id: 2113
categories:
- Web 开发
---
mysql中You can't specify target table  for update in FROM clause错误的意思是说，不能先select出同一表中的某些值，再update这个表(在同一语句中)。 例如下面这个sql：
```sql
delete from tbl where id in 
(
        select max(id) from tbl a where EXISTS
        (
            select 1 from tbl b where a.tac=b.tac group by tac HAVING count(1)>1
        )
        group by tac
)
```


改写成下面就行了：
```sql
delete from tbl where id in 
(
    select a.id from 
    (
        select max(id) id from tbl a where EXISTS
        (
            select 1 from tbl b where a.tac=b.tac group by tac HAVING count(1)>1
        )
        group by tac
    ) a
)
```


也就是说将select出的结果再通过中间表select一遍，这样就规避了错误。注意，这个问题只出现于mysql，mssql和oracle不会出现此问题。

转载自：[http://blog.csdn.net/priestmoon/article/details/8016121](http://blog.csdn.net/priestmoon/article/details/8016121)
