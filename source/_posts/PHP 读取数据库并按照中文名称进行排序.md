---
author: 403 Forbidden
comments: true
date: 2013-06-18 13:54:01+00:00
layout: post
slug: php-%e8%af%bb%e5%8f%96%e6%95%b0%e6%8d%ae%e5%ba%93%e5%b9%b6%e6%8c%89%e7%85%a7%e4%b8%ad%e6%96%87%e5%90%8d%e7%a7%b0%e8%bf%9b%e8%a1%8c%e6%8e%92%e5%ba%8f
title: PHP 读取数据库并按照中文名称进行排序
wordpress_id: 281
categories:
- Web 开发
---
有时候我们读取数据库输出的时候可能会需要按照中文用户名的方式进行排序，传统的 MySQL 查询：
```php
$sql="SELECT * FROM `users`";//传统查询方式 

```

按照中文用户名进行排序的 MySQL 查询：
```php
$sql="SELECT * FROM `users` ORDER BY CONVERT(`name` USING gbk)";//按照中文用 

```

