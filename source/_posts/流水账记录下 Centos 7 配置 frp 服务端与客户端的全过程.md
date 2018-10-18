---
author: 403 Forbidden
comments: true
date: 2018-07-12 08:51:43+00:00
layout: post
slug: '%e6%b5%81%e6%b0%b4%e8%b4%a6%e8%ae%b0%e5%bd%95%e4%b8%8b-centos-7-%e9%85%8d%e7%bd%ae-frp-%e6%9c%8d%e5%8a%a1%e7%ab%af%e4%b8%8e%e5%ae%a2%e6%88%b7%e7%ab%af%e7%9a%84%e5%85%a8%e8%bf%87%e7%a8%8b'
title: 流水账记录下 Centos 7 配置 frp 服务端与客户端的全过程
wordpress_id: 2803
categories:
- VPS 技术
---
下载 frp：[https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)，解压到 ``/usr/local/frp`` 目录下

**服务端：**
编辑四个文件：
/usr/local/frp/frps_full.ini（配置文件，视情况编辑）

/usr/lib/systemd/system/frps.service
```
[Unit]
Description=frps
After=network.target

[Service]
Type=forking
ExecStart=/etc/cron.hourly/frps
ExecReload=/usr/bin/frpsreload
ExecStop=/usr/bin/killall frps
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```


/etc/cron.hourly/frps
```shell
#!/bin/sh
echo $(date +"%Y-%m-%d %H:%M:%S") > /tmp/frpTimestamp
ps aux | grep "frps -c" | grep -v grep
if [ $? -ne 0 ];then
    nohup /usr/local/frp/frps -c /usr/local/frp/frps_full.ini >> /root/frp.log 2>&1 & echo $! > /var/run/frp-server.pid
fi;

```


/usr/bin/frpsreload
```shell
#!/bin/sh
kill -9 $(cat /var/run/frp-server.pid)
nohup /usr/local/frp/frps -c /usr/local/frp/frps_full.ini >> /root/frp.log 2>&1 & echo $! > /var/run/frp-server.pid

```


然后执行：
```shell
systemctl enable frps
systemctl start frps

```


最后是 nginx 反代设置：
/usr/local/nginx/conf/vhost/pi.imjs.0cdn.cn.conf
```
server {
    listen       80;
    server_name  pi.imjs.0cdn.cn *.pi.imjs.0cdn.cn;
 
    location / {
        proxy_pass        http://127.0.0.1:8080;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  Host $host:8080;
    }
}

```


**客户端：**
编辑四个文件：
/usr/local/frp/frpc_full.ini（配置文件，视情况编辑）

/usr/lib/systemd/system/frp.service
```
[Unit]
Description=frp
After=network.target

[Service]
Type=forking
ExecStart=/etc/cron.hourly/frp
ExecReload=/usr/bin/frpreload
ExecStop=killall frp
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```


/etc/cron.hourly/frp
```shell
#!/bin/sh
echo $(date +"%Y-%m-%d %H:%M:%S") > /tmp/frpTimestamp
ps aux | grep "frpc -c" | grep -v grep
if [ $? -ne 0 ];then
    ntpdate ntp1.aliyun.com && (nohup /usr/local/frp/frpc -c /usr/local/frp/frpc_full.ini >> /root/frp.log 2>&1 & echo $! > /var/run/frp-client.pid)
fi;

```


/usr/bin/frpreload
```shell
#!/bin/sh
kill -9 $(cat /var/run/frp-client.pid)
nohup /usr/local/frp/frpc -c /usr/local/frp/frpc_full.ini >/dev/null 2>&1 & echo $! > /var/run/frp-client.pid

```


最后执行：
```shell
systemctl enable frp
systemctl start frp
```

