---
author: 403 Forbidden
comments: true
date: 2014-01-16 13:24:50+00:00
layout: post
slug: linux-vps%e4%b8%8a%e4%bd%bf%e7%94%a8kingate%e6%90%ad%e5%bb%basocks%e4%bb%a3%e7%90%86%e6%9c%8d%e5%8a%a1%e5%99%a8
title: Linux VPS上使用kingate搭建socks代理服务器
wordpress_id: 1182
categories:
- VPS 技术
---
kingate是一位国人开发的代理服务器，支持http,socks,ftp等多种协议。支持多线程、tcp端口映射、规则控制、时间控制、用户认证、http管理等功能。

kingate官网：[http://sourceforge.net/projects/kingate/](http://sourceforge.net/projects/kingate/)

安装所需的依赖包
Debian：
```shell
apt-get install build-essential automake make gcc g++
```

CentOS：
```shell
yum install make automake gcc gcc-c++ gcc-g77
```


安装kingate
```shell
wget http://softlayer.dl.sourceforge.net/project/kingate/kingate/2.0/kingate-2.0.tar.gz
tar xzf kingate-2.0.tar.gz
cd kingate-2.0/
./configure --prefix=/usr/local/kingate
make && make install
```


配置kingate
修改/usr/local/kingate/etc/kingate.conf 为以下内容：
```
http off
ftp off
pop3 off
smtp off
telnet off
socks on
mms off
rtsp off
manage on
max 2000
max_per_ip 0
min_free_thread 3
http_port 8082
http_accelerate off
x_forwarded_for on
http_time_out 30
ftp_port 2121
ftp_time_out 300
pop3_port 1100
pop3_time_out 300
smtp_port 2525
smtp_time_out 300
telnet_port 2323
telnet_time_out 300
socks_port 20120
socks_time_out 300
socks5_user off
mms_port 1755
mms_time_out 300
rtsp_port 5540
rtsp_time_out 300
manage_port 8822
manage_time_out 300
log_model user
log_level 0
log_rotate {0 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * * }
log_close_msg on
mem_min_cache 50m
mem_max_cache 12m
disk_min_cache 20m
disk_max_cache 30m
use_disk_cache off
refresh never
refresh_time 300
user_time_out 0
mem_cache 50m
disk_cache 100m
max_deny_per_ip 0
max_queue_thread 15
min_limit_speed_size 1m
limit_speed 20k
max_request 50
total_seconds 10
bind_addr
run_user
insert_via off
```

以上配置中，socks on 表示启用socks代理(也可以根据你自己的需求开启其他类型的代理)，socks_port 20120 表示socks代理的端口。manage on 为启用http管理，manage_port 8822 为http管理的端口。强烈建议修改端口号！

kingate启动及管理
下载启动脚本及添加权限
```shell
wget http://soft.vpser.net/proxy/kingate/kingate.init.d
mv kingate.init.d /etc/init.d/kingate
chmod +x /etc/init.d/kingate
```


kingate管理
启动kingate：
```shell
/etc/init.d/kingate start
```

关闭kingate：
```shell
/etc/init.d/kingate stop
```

重启kingate：
```shell
/etc/init.d/kingate restart
```


http管理
管理地址：http://ip:8822 ，如果修改过配置，8822端口修改为你设置的端口号，默认用户名为root，密码为kingate。

加入开机启动
Debian执行：
```shell
update-rc.d -f kingate defaults
```

CentOS执行：
```shell
chkconfig --level 345 kingate on
```


客户端设置
这里以dropbox为例：
[![dropbox-poxies](/uploads/2014/01/dropbox-poxies.jpg)](/uploads/2014/01/dropbox-poxies.jpg)

转载自：[http://www.vpser.net/build/linux-vps-use-kingate-install-proxy-server.html](http://www.vpser.net/build/linux-vps-use-kingate-install-proxy-server.html)
