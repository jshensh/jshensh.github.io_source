---
author: 403 Forbidden
comments: true
date: 2015-10-12 14:55:40+00:00
layout: post
slug: openwrt%e5%ae%89%e8%a3%85phpmysqllighttpd%e5%bb%ba%e7%ab%99
title: openwrt安装php,mysql,Lighttpd建站
wordpress_id: 2346
categories:
- openwrt
---
**一、安装**
1、输入如下命令更新软件列表：
```shell
opkg update
```


2、输入如下命令安装php,mysql,Lighttpd及其组件：
```shell
opkg install php5 php5-mod-gd php5-mod-session php5-mod-pdo php5-mod-pdo-mysql php5-mod-mysql php5-mod-mcrypt php5-mod-mbstring php5-fastcgi php5-cgi php5-mod-xml php5-mod-ctype php5-mod-curl php5-mod-exif php5-mod-ftp php5-mod-iconv php5-mod-json php5-mod-sockets php5-mod-sqlite3 php5-mod-tokenizer php5-mod-zip php5-mod-mysqli zoneinfo-core zoneinfo-asia
opkg install mysql-server libncursesw libncurses libreadline terminfo uclibcxx zlib libmysqlclient libmcrypt libltdl libmcrypt
opkg install lighttpd lighttpd-mod-fastcgi lighttpd-mod-access lighttpd-mod-alias lighttpd-mod-rewrite lighttpd-mod-redirect libncurses
```


**二、配置Lighttpd：**
编辑/etc/lighttpd/lighttpd.conf文件
1. 找到【server.document-root ="/www"】将【/www】改为你自己网站存放的路径（比如我的是/web）
2. 在 static-file.exclude-extensions = ( ".php", ".pl", ".fcgi" ) 下插入
```
fastcgi.server = (
        ".php" => (
                "localhost" => (
                        "socket" => "/tmp/php-fastcgi.socket",
                        "bin-path" => "/usr/bin/php-fcgi"
                )
        )
)
```

3. 找到【#server.port = 81】去掉#，将81更改为你想要的端口号

**三、配置php**
打开/etc/php.ini
1. 查找;short_open_tag = off改为short_open_tag = on
2. 查找doc_root = "/www"改为doc_root = "/web"（改为你自己网站存放的路径和Lighttpd的保持一样）
3. 分别找到以下内容:
```
extension=ctype.so
extension=curl.so
extension=gd.so
extension=iconv.so
extension=json.so
extension=mbstring.so
extension=mcrypt.so
extension=mysql.so
extension=pdo.so
extension=pdo-mysql.so
extension=session.so
extension=sockets.so
extension=tokenizer.so
extension=xml.so
```

分别将前面的“;”去掉
4. 找到date.timezone =在后面加上 prc也就是date.timezone = prc
5. 查找mysql.default_socket =改为mysql.default_socket = /var/run/mysqld.sock

**四、配置mysql**
1. 输入如下命令创建数据库文件夹：
```shell
mkdir /mnt/data /mnt/data/mysql /mnt/data/tmp
```

2. 输入如下命令创建默认的数据库：
```shell
/usr/bin/mysql_install_db --force
```

3. 输入如下命令启动mysql：
```shell
/etc/init.d/mysqld start
```

4. 输入如下命令创建mysql的密码
```shell
/usr/bin/mysqladmin -u root password 123456
```


ok到此配置完毕

5. 输入如下命令启动Lighttpd：
```shell
/etc/init.d/lighttpd start
```


转载自 [http://www.right.com.cn/forum/thread-121342-1-1.html](http://www.right.com.cn/forum/thread-121342-1-1.html)，有删改
