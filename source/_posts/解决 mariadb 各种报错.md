---
author: 403 Forbidden
comments: true
date: 2016-03-19 16:06:07+00:00
layout: post
slug: '%e8%a7%a3%e5%86%b3-mariadb-%e5%90%84%e7%a7%8d%e6%8a%a5%e9%94%99'
title: 解决 mariadb 各种报错
wordpress_id: 2498
categories:
- VPS 技术
---
系统 Ubuntu 14.04.4 LTS x64，阿里云

说来也是一个很诡异的案例，使用 lnmp 1.2（[http://lnmp.org](http://lnmp.org)）搭建的环境，安装过程中就一直出错，好不容易编译上去了，却死活无法启动，当然最终还是解决了，写篇文章供日后参考。

**1. 编译过程报错 Inconsistency detected by ld.so**
原文：
```
Inconsistency detected by ld.so: dl-version.c: 224: _dl_check_map_versions: Assertion `needed != ((void *)0)' failed!
make: *** No targets specified and no makefile found.  Stop.
```

百度半天无果，[必应](http://cn.bing.com/search?q=site%3abbs.vpser.net+dl-version.c&qs=HS&pq=site%3a&sc=8-5&sp=1&cvid=6520C5D8251A4A16B0C7A08B7863DCFC&FORM=QBLH)了下找到答案：[http://bbs.vpser.net/viewthread.php?action=printable&tid;=12636](http://bbs.vpser.net/viewthread.php?action=printable&tid=12636)
```shell
mv /usr/bin/cmake /usr/bin/cmake.backup
wget http://www.cmake.org/files/v3.0/cmake-3.0.2.tar.gz
tar zxf cmake-3.0.2.tar.gz
cd cmake-3.0.2
./configure
make && make install
ln -sf /usr/local/bin/cmake /usr/bin/cmake
```


**2. 编译过程再报错 cc: internal compiler error: Killed**
```
cc: internal compiler error: Killed (program cc1)
Please submit a full bug report,
with preprocessed source if appropriate.
See <http://bugzilla.redhat.com/bugzilla> for instructions.
```

参考 [http://bbs.vpser.net/viewthread.php?tid=11757](http://bbs.vpser.net/viewthread.php?tid=11757)，内存不足，添加 swap 解决问题

**3. 启动报错 Can't read from messagefile '/usr/share/mysql/errmsg.sys'**
导致这个问题产生的原因挺多的。。搜到几个挺有用的结果，但尼玛不是我的问题。
从这里找到的灵感：[http://bugs.mysql.com/bug.php?id=69677](http://bugs.mysql.com/bug.php?id=69677)
默认配置文件路径 /etc/mysql/my.cnf
lnmp 的在 /etc/my.cnf
不知道为什么 mysql_install_db 没有把默认配置文件的路径正常初始化，导致加载错文件，最终只能覆盖默认路径下的配置文件解决问题。
