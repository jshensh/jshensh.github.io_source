---
author: 403 Forbidden
comments: true
date: 2013-07-28 04:01:00+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8-iptables-%e9%98%b2%e7%81%ab%e5%a2%99%e9%98%bb%e6%ad%a2-phpddos-%e5%af%b9%e5%a4%96%e5%8f%91%e5%8c%85%e9%80%a0%e6%88%90%e6%94%bb%e5%87%bb'
title: 使用 iptables 防火墙阻止 PhpDdos 对外发包造成攻击
wordpress_id: 531
categories:
- VPS 技术
---
对于许多主机商来说，PhpDDOS 既伤主机又伤他人。所以很多主机商目前都不允许高危的 Dedecms ...

即使这个方法不是用于主机商、很多人也是有 VPS 的可以尝试用一下这个方法，至少可以从根源上处理叼 PhpDDOS 对外发包。我们进入 SSH 开始吧！

一、修改本机 DNS 以防无法联网
```shell
echo nameserver 8.8.8.8 > /etc/resolv.conf && /etc/init.d/network restart

```


二、允许需要 UDP 服务的端口
```shell
iptables -I OUTPUT -p udp --dport 53 -d 8.8.8.8 -j ACCEPT

```


三、禁止本机对外发送 UDP 包
```shell
iptables -A OUTPUT -p udp -j DROP

```


就这样就完成了，其中的 8.8.8.8 就是你 DNS 的 IP 了。如果不知道的话可以直接按照本文来或者输入如下命令查看 IP 地址：
```shell
cat /etc/resolv.conf |grep nameserver |awk 'NR==1{print $2 }'

```


转载自：[http://www.zntec.cn/archives/iptables-fuck-phpddos.html](http://www.zntec.cn/archives/iptables-fuck-phpddos.html)
