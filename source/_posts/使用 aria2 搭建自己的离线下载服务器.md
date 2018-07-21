---
author: 403 Forbidden
comments: true
date: 2016-03-03 14:09:08+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8-aria2-%e6%90%ad%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84%e7%a6%bb%e7%ba%bf%e4%b8%8b%e8%bd%bd%e6%9c%8d%e5%8a%a1%e5%99%a8'
title: 使用 aria2 搭建自己的离线下载服务器
wordpress_id: 2484
categories:
- VPS 技术
---
先上两个项目的最新版下载地址：




    
  * [http://binux.github.io/yaaw/](http://binux.github.io/yaaw/)

    
  * [https://github.com/aria2/aria2/releases/latest](https://github.com/aria2/aria2/releases/latest)



完整操作：
```shell
wget "https://github.com/aria2/aria2/releases/download/release-1.31.0/aria2-1.31.0.tar.gz" -O aria2-1.31.0.tar.gz
tar zxvf aria2-1.31.0.tar.gz
cd aria2-1.31.0
./configure
make && make install
vi /root/aria2.conf
```


/root/aria2.conf 内容（更多配置项见 [aria2配置示例](http://futa.ooo/2726.html)）：
```
#设置下载目录
dir=/home/wwwroot/***/downloads 
disable-ipv6=true
enable-rpc=true
rpc-allow-origin-all=true
rpc-listen-all=true
#设置下载端口
rpc-listen-port=2333
#设置密码
rpc-secret=qwertyuiop1
continue=true
input-file=/root/aria2.session
save-session=/root/aria2.session
save-session-interval=60
max-concurrent-downloads=3
```


添加自启动：
```shell
echo '/usr/local/bin/aria2c --conf-path=/root/aria2.conf' >> /etc/init.d/rc.local
```


然后布置 web 端（基于 lnmp 1.2）：
```
lnmp vhost add
cd /home/wwwroot/***  #设置下载目录
wget https://github.com/binux/yaaw/zipball/master
unzip master
mv binux-yaaw-8c8d226/* .
rm -rf binux-yaaw-8c8d226/ master
mkdir downloads
chown -R www .
chmod -R 755 .
chmod -R 777 downloads
reboot
```


之后打开你配置的域名，设置 JSON-RPC Path 为 ``http://token:你的密码@域名:端口/jsonrpc`` 即可
