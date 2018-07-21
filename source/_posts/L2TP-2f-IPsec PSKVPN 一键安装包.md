---
author: 403 Forbidden
comments: true
date: 2013-04-24 01:27:51+00:00
layout: post
slug: l2tpipsec-pskvpn-%e4%b8%80%e9%94%ae%e5%ae%89%e8%a3%85%e5%8c%85
title: L2TP/IPsec PSKVPN 一键安装包
wordpress_id: 7
categories:
- VPS 技术
---
仅作为个人/企业
的组网/技术测试用，使用者请自觉遵守国家法律法规。
当前版本：1.2

配置步骤：

CentOS / Fedora:

```shell
wget http://mirror.zeddicus.com/auto-l2tp/1.2/centos/l2tp.sh
sh l2tp.sh
```


 
Ubuntu / Debian:

```shell
wget http://mirror.zeddicus.com/auto-l2tp/1.2/ubuntu/l2tp.sh
sh l2tp.sh
```


 
备注：安装按提示操作，相关截图及细节请移驾至：[http://www.vpsyou.com/l2tp-vpn](http://www.vpsyou.com/l2tp-vpn) 。

情况说明：

XP 用户：请确保“控制面板->管理工具->服务”中的 IPSEC 服务被启动
