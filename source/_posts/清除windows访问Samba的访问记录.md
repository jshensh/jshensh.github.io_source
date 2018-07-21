---
author: 403 Forbidden
comments: true
date: 2017-11-19 08:45:01+00:00
layout: post
slug: '%e6%b8%85%e9%99%a4windows%e8%ae%bf%e9%97%aesamba%e7%9a%84%e8%ae%bf%e9%97%ae%e8%ae%b0%e5%bd%95'
title: 清除windows访问Samba的访问记录
wordpress_id: 2791
categories:
- openwrt
---
在 windows 中访问 Samba 服务器后，windows 会存储访问记录，比如密码。当我们想清除密码，重新输入时，步骤如下：
**1. 获取访问记录**
```
#在windows的命令行(cmd)中运行net use，可见访问Samba服务器的记录：
C:\Users\User>net use
会记录新的网络连接。 
状态       本地        远程                      网络

-------------------------------------------------------------------------------
OK                     \\192.168.2.1\IPC$         Microsoft Windows Network
命令成功完成。
```


**2. 删除访问记录**
```
C:\Users\User>net use \\192.168.2.1\IPC$ /del /y
 \\192.168.2.1\IPC$ 已经删除。
```


**3. 尝试重新登陆Samba**
