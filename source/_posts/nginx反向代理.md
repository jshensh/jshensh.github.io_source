---
author: 403 Forbidden
comments: true
date: 2013-08-05 04:28:14+00:00
layout: post
slug: nginx%e5%8f%8d%e5%90%91%e4%bb%a3%e7%90%86
title: nginx反向代理
wordpress_id: 579
categories:
- VPS 技术
---
1、安装Nginx
```shell
yum -y install gcc g++ vim libncurses5-dev make libxml2-dev
yum -y install subversion
yum -y install libpcre3 libpcre3-dev libcurl4-openssl-dev
yum -y install pcre* zlib* openssl*
wget -c  http://nginx.org/download/nginx-1.0.5.tar.gz
tar -zxf nginx-1.0.5.tar.gz
wget -c http://wiki.nginx.org/images/5/51/Nginx-accesskey-2.0.3.tar.gz
tar -zxf Nginx-accesskey-2.0.3.tar.gz
svn checkout http://substitutions4nginx.googlecode.com/svn/trunk/ substitutions4nginx-read-only
curdir=$(pwd)
cd nginx-1.0.5
./configure --user=nobody --group=nobody  --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --pid-path=/var/run/nginx.pid  --conf-path=/etc/nginx/nginx.conf   --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-ipv6 --with-pcre --with-http_sub_module --add-module=$curdir/substitutions4nginx-read-only --add-module=$curdir/nginx-accesskey-2.0.3
make
make install

```


2、配置nginx.conf
编辑/etc/nginx/nginx.conf
```shell
server {
    listen 80;
    server_name t.playvps.com;  #绑定的域名
    access_log off;	 #off 关闭日志
    location / {
        subs_filter 'www.baidu.com' 't.playvps.com' gi;  #substitutions4nginx替换 (使用方法参照官方)
        proxy_set_header   X-Real-IP  $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   Referer http://www.baidu.com;	#强制定义Referer，程序验证判断会用到
        proxy_set_header   Host www.baidu.com;  #定义主机头，如果目标站点绑定的域名个server_name项的吻合则使用$host
        proxy_pass http://www.baidu.com;	 #指定目标，建议使用IP或者nginx自定义池
        proxy_set_header Accept-Encoding "";	 #清除编码
    }
}

```


3，重启Nginx
```shell
pkill nginx #关闭进程
nginx #启动Nginx

```


转载自：[http://www.ovzxen.com/post-22.html](http://www.ovzxen.com/post-22.html)
