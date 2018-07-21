---
author: 403 Forbidden
comments: true
date: 2014-08-16 07:11:04+00:00
layout: post
slug: amh-4-2-%e8%99%9a%e6%8b%9f%e4%b8%bb%e6%9c%ba%e9%9d%a2%e6%9d%bf-%e5%ae%89%e8%a3%85%e6%95%99%e7%a8%8b
title: AMH 4.2 虚拟主机面板 安装教程
wordpress_id: 1790
categories:
- VPS 技术
---
**一、面板介绍**
Amysql Host 面板，简称AMH，是一个基于Nginx架构的类似 虚拟主机 独立面板。这个面板安装简单，非常适合Linux新手，以及一些恐惧命令行的Linux VPS用户。
AMH的主要功能有：在线划分虚拟主机（多个网站）、FTP帐号自定义、MYSQL在线创建和管理、数据备份（支持本地和异地备份）、任务计划（crontab自动任务）、以及模块扩展，可以通过AMH官方在面板的基础功能上扩展更多的功能。面板支持在线升级，减少工作量，更傻瓜化、简单化。
Amysql Host 官方：[http://amysql.com/AMH.htm](http://amysql.com/AMH.htm) AMH
演示：[http://108.61.194.60:8888/index.php?c=index&a;=login](http://108.61.194.60:8888/index.php?c=index&a=login)
账号： amh，密码：amh_password

**二、面板模块**
AMH已全面支持运行于 Centos Ubuntu ( Ubuntu 12系列或以下) Debian
AMH含有模块 Nginx 1.4.7 MySQL 5.5.34 PHP 5.3.27 PureFTPd 1.0.36

**三、安装**
请使用纯净的系统,不要存在类似的服务,比如WDCP 或者其他编译的程序
第一步:使用root账号连接SSH
第二步:下载并运行AMH安装脚本
```shell
wget http://amysql.com/file/AMH/4.2/amh.sh; chmod 775 amh.sh; ./amh.sh 2>&1 | tee amh.log;
```

或者
```shell
wget http://api.ifdream.net/linux/amh/amh.sh; chmod 775 amh.sh; ./amh.sh 2>&1 | tee amh.log;
```

根据提示输入选择1~3选项。1为安装amh，2为卸载amh，3为退出不做操作。如下图：
[![QQ截图20140722234319](/uploads/2014/08/QQ截图20140722234319.png)](/uploads/2014/08/QQ截图20140722234319.png)
输入1回车，接着输入MySQL Root密码与AMH面板管理员密码即进入安装流程，如下图。
[![QQ截图20140722234509](/uploads/2014/08/QQ截图20140722234509.png)](/uploads/2014/08/QQ截图20140722234509.png)
安装过程大约需10~20分钟(以服务器性能为准)，最后如看到安装成功提示，说明系统已安装完成。

访问http://ip:8888 即可进入AMH web端管理，默认账号为admin。如下图
[![QQ截图20140723002730](/uploads/2014/08/QQ截图20140723002730.png)](/uploads/2014/08/QQ截图20140723002730.png)
 
**四、AMH面板 常用命令**
以下命令适合在SSH中操作。
虚拟主机 : amh host
PHP管理 : amh php
Nginx管理 : amh nginx
MySQL管理 : amh mysql
FTP管理 : amh ftp
数据备份 : amh backup
一键还原 : amh revert
参数设置 : amh SetParam
模块扩展 : amh module
任务计划 : amh crontab
在线升级 : amh upgrade
面板信息 : amh info

**五、AMH相关目录**
网站目录 : /home/wwwroot
Nginx目录 : /usr/local/nginx
PHP目录 : /usr/local/php
MySQL目录 : /usr/local/mysql
MySQL数据目录 : /usr/local/mysql/data

转载自 [http://blog.ifdream.net/linux/amh42/](http://blog.ifdream.net/linux/amh42/)
