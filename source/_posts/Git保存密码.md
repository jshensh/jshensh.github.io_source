---
author: 403 Forbidden
comments: true
date: 2016-05-02 14:12:15+00:00
layout: post
slug: git%e4%bf%9d%e5%ad%98%e5%af%86%e7%a0%81
title: Git保存密码
wordpress_id: 2557
categories:
- Web 开发
---
https方式每次都要输入密码，按照如下设置即可输入一次就不用再手输入密码的困扰而且又享受https带来的极速

设置记住密码（默认15分钟）：
```shell
git config --global credential.helper cache
```


如果想自己设置时间，可以这样做：
```shell
git config credential.helper 'cache --timeout=3600'
```


这样就设置一个小时之后失效



* * *



长期存储密码：
```shell
git config --global credential.helper store
```


转载自 [http://www.cnblogs.com/shi5588/p/4618221.html](http://www.cnblogs.com/shi5588/p/4618221.html)
