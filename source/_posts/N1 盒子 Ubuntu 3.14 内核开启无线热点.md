---
author: 403 Forbidden
comments: true
date: 2018-10-10 14:49:43+00:00
layout: post
title: N1 盒子 Ubuntu 3.14 内核开启无线热点
categories:
- 斐讯
---
1. 先开启 3.14 内核无线模块
```shell
modprobe dhd && echo dhd >> /etc/modules
```

2. 由于和后续的 dnsmasq 冲突，需要关掉系统自带的 systemd-resolved 服务
```shell
systemctl stop systemd-resolved
systemctl disable systemd-resolved
```

3. 安装要用的 dnsmasq 和 net-tools 组件
```shell
apt install dnsmasq net-tools
```

4. 下载并安装 create_ap 工具
```shell
git clone https://github.com/oblique/create_ap
cd create_ap/
make install
```

5. 将以下内容保存至 /usr/bin/startap 。注意**别忘了修改 YourSSIDHere YourPasswordHere** 两个参数。**如果有需要使用 2.4GHz 网络的，请去掉 --freq-band 5 --ieee80211ac 参数**
```
[Unit]
Description=ap
After=network.target


[Service]
Type=forking
ExecStart=/usr/bin/startap
PrivateTmp=true


[Install]
WantedBy=multi-user.target
```
并执行
```shell
chmod +x /usr/lib/systemd/system/ap.service
systemctl enable ap
systemctl start ap
```