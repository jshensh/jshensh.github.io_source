---
author: 403 Forbidden
comments: true
date: 2015-10-08 16:03:05+00:00
layout: post
slug: linux%e4%b8%8bmysql%e7%9a%84root%e5%af%86%e7%a0%81%e5%bf%98%e8%ae%b0%e8%a7%a3%e5%86%b3%e6%96%b9%e6%b3%95
title: Linux下MySQL的root密码忘记解决方法
wordpress_id: 2341
categories:
- VPS 技术
---
验证环境：
```
[root@localhost ~]# rpm -qa | grep mysql
mysql-5.1.71-1.el6.i686
mysql-server-5.1.71-1.el6.i686
mysql-libs-5.1.71-1.el6.i686

[root@localhost ~]# lsb_release -a
LSB Version:    :core-4.0-ia32:core-4.0-noarch:graphics-4.0-ia32:graphics-4.0-noarch:printing-4.0-ia32:printing-4.0-noarch
Distributor ID: CentOS
Description:    CentOS Linux release 6.0 (Final)
Release:        6.0
Codename:      Final

[root@localhost ~]# uname -r
2.6.32-71.el6.i686
```

1．首先确认服务器出于安全的状态，也就是没有人能够任意地连接MySQL数据库。 
因为在重新设置MySQL的root密码的期间，MySQL数据库完全出于没有密码保护的状态下，其他的用户也可以任意地登录和修改MySQL的信息。可以采用将MySQL对外的端口封闭，并且停止Apache以及所有的用户进程的方法实现服务器的准安全状态。最安全的状态是到服务器的Console上面操作，并且拔掉网线。

2．修改MySQL的登录设置： 
```shell
vi /etc/my.cnf
```

在[mysqld]的段中加上一句：skip-grant-tables
例如： 
```
[mysqld] 
datadir=/var/lib/mysql 
socket=/var/lib/mysql/mysql.sock 
skip-grant-tables
```

保存并且退出vi。

3．重新启动mysqld 
```
# /etc/init.d/mysqld restart 
Stopping MySQL: [ OK ] 
Starting MySQL: [ OK ]
```


4．登录并修改MySQL的root密码
```
[root@localhost ~]# mysql
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 3
Server version: 5.1.71 Source distribution
Copyright (c) 2000, 2013, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.
mysql>UPDATE mysql.user SET Password = password ("new-password") WHERE User = 'root';
Query OK, 3 rows affected (0.00 sec)
Rows matched: 3  Changed: 3  Warnings: 0
mysql> exit
Bye
```


5．将MySQL的登录设置修改回来 
```shell
vi /etc/my.cnf
```

将刚才在[mysqld]的段中加上的skip-grant-tables删除,保存并且退出vi；

6．再次重新启动mysqld 
```
# /etc/init.d/mysqld restart 
Stopping MySQL: [ OK ] 
Starting MySQL: [ OK ]
```

7、使用新的密码登录，正常登录，搞定！

转载自 [http://www.linuxidc.com/Linux/2013-07/87069.htm](http://www.linuxidc.com/Linux/2013-07/87069.htm)
