---
author: 403 Forbidden
comments: true
date: 2015-02-19 05:46:45+00:00
layout: post
slug: wordpress-%e6%89%b9%e9%87%8f%e5%85%b3%e9%97%ad%e8%af%84%e8%ae%ba
title: Wordpress 批量关闭评论
wordpress_id: 2173
categories:
- 建站相关
---
wordpress 并没有自带批量关闭所有文章评论的功能，这需要通过修改数据库来实现：

关闭所有文章的评论功能：
```sql
UPDATE `wp_posts` SET`comment_status`='close'
```


反之：
```sql
UPDATE `wp_posts` SET`comment_status`='open'
```


P.S. 过年了，也没啥文章好写了。。就把最近用到的东西拿出来记下，不过这博客不是本来就应该派这用处的么
