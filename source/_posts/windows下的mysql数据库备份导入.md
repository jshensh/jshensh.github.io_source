---
author: 403 Forbidden
comments: true
date: 2013-08-02 04:19:15+00:00
layout: post
slug: windows%e4%b8%8b%e7%9a%84mysql%e6%95%b0%e6%8d%ae%e5%ba%93%e5%a4%87%e4%bb%bd%e5%af%bc%e5%85%a5
title: windows下的mysql数据库备份导入
wordpress_id: 570
categories:
- 建站相关
---
在本地测试一个程序源码的时候，数据备份是130多兆，phpmyadmin最大支持上传备份30多兆，于是在windows下的mysql用命令直接导入，但是与linux系统下的mysql导入命令不同，
linux下的命令是mysqldump -u root -p database < beifen.sql 。
win下的备份命令是这样的
进入win下的mysql
mysql的安装目录下的bin目录
``mysql -u root -p``
然后输入密码
进入后 选择你要导入的数据库
``use test ‘test为数据名``
然后执行 ``mysql  source d:\beifen.sql``
最后等一会就导入完成了。

转载自：[http://www.ovzxen.com/post-43.html](http://www.ovzxen.com/post-43.html)
