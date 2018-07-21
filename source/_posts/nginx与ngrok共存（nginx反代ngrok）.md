---
author: 403 Forbidden
comments: true
date: 2016-04-02 07:19:24+00:00
layout: post
slug: nginx%e4%b8%8engrok%e5%85%b1%e5%ad%98%ef%bc%88nginx%e5%8f%8d%e4%bb%a3ngrok%ef%bc%89
title: nginx与ngrok共存（nginx反代ngrok）
wordpress_id: 2506
categories:
- VPS 技术
---
记得之前刚搭建起来ngrok时当时很兴奋觉得很舒服，但是很快产生了一个问题，ngrok占用80和443的话，那nginx该怎么办呢，虽然想过ngrok监听别的端口，但是一些程序却必须使用80和443，然后当时就想到了反代，但是泛域名反代而且端口不同，如何正确处理主机头成了问题，反代一个域名可以将主机头写成固定的，但是泛域名则是不确定主机头的，网上查了许久资料均未找到答案，后来不报希望的试了下，竟然成功了，今日想起来这件事情，便写博文记录下来。
下，竟然成功了，今日想起来这件事情，便写博文记录下来。

**涉及到的配置文件
nginx的nginx.conf**
```
user nginx;
#上面用户可根据情况换成root（不推荐）
worker_processes 1;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;
events {
worker_connections 1024;
}
http {
include /etc/nginx/mime.types;
default_type application/octet-stream;
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
access_log /var/log/nginx/access.log main;
sendfile on;
keepalive_timeout 65;
include /etc/nginx/conf.d/*.conf;
}
```


**ngrok反向代理文件（主要！）**
```
server {
    listen 80;
    server_name *.0n0.win;
    root html;
    index index.html index.htm index.php;
    location / {
        proxy_pass http://127.0.0.1:81;
        proxy_redirect off;
        proxy_set_header Host $host:81;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }
}
server {
    listen 443;
    server_name *.0n0.win;
    ssl on;
    ssl_certificate /root/ngrok/rootCA.pem;
    ssl_certificate_key /root/ngrok/rootCA.key;
    root html;
    index index.html index.htm index.php;
    location / {
        proxy_pass https://127.0.0.1:444;
        proxy_redirect off;
        proxy_set_header Host $host:444;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout 90;
        proxy_send_timeout 90;
        proxy_read_timeout 90;
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 64k;
    }
}
```


**我的nginx包含的模块**
那两个模块可根据自己需要自行删除或添加
```shell
./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_random_index_module --with-http_secure_link_module --with-http_stub_status_module --with-http_auth_request_module --with-mail --with-mail_ssl_module --with-ipv6 --with-http_spdy_module --add-module=/root/mk/ngx_http_substitutions_filter_module --add-module=/root/mk/headers-more-nginx-module
```


**两个模块的git**
两个都是反代时替换内容用到的
```shell
mkdir /root/mk &&cd /root/mk
git clone https://github.com/openresty/headers-more-nginx-module.git
git clone https://github.com/yaoweibin/ngx_http_substitutions_filter_module.git
```


转载自 [https://blog.ni-co.moe/p/345.html](https://blog.ni-co.moe/p/345.html)
