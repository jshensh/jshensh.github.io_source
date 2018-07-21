---
author: 403 Forbidden
comments: true
date: 2016-07-25 03:08:02+00:00
layout: post
slug: iptables%e9%98%b2%e7%81%ab%e5%a2%99%e8%a7%84%e5%88%99%e7%9a%84%e6%b7%bb%e5%8a%a0%e3%80%81%e5%88%a0%e9%99%a4%e3%80%81%e4%bf%ae%e6%94%b9%e3%80%81%e4%bf%9d%e5%ad%98
title: iptables防火墙规则的添加、删除、修改、保存
wordpress_id: 2612
categories:
- VPS 技术
---
本文介绍iptables这个Linux下最强大的防火墙工具，包括配置iptables三个链条的默认规则、添加iptables规则、修改规则、删除规则等。

**一、查看规则集**
```shell
    iptables --list -n // 加一个-n以数字形式显示IP和端口，看起来更舒服
```


**二、配置默认规则**
```shell
    iptables -P INPUT DROP  // 不允许进
    iptables -P FORWARD DROP  // 不允许转发
    iptables -P OUTPUT ACCEPT  // 允许出
```


**三、增加规则**
```shell
    iptables -A INPUT -s 192.168.0.0/24 -j ACCEPT
    //允许源IP地址为192.168.0.0/24网段的包流进（包括所有的协议，这里也可以指定单个IP）
    iptables -A INPUT -d 192.168.0.22 -j ACCEPT
    //允许所有的IP到192.168.0.22的访问
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT 
    //开放本机80端口
    iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
```

    //开放本机的ICMP协议

**四、删除规则**
```shell
    iptables -D INPUT -s 192.168.0.21 -j ACCEPT
    //删除刚才建立的第一条规则
```


**五、规则的保存**
```shell
    iptables -F
    //清空规则缓冲区（这个操作会将上面的增加操作全部清空，若须保留建议先执行一下句：保存）
    service iptables save
    //将规则保存在/etc/sysconfig/iptables文件里
    service iptables restart
    //重启Iptables服务
```


最后说明一下，iptables防火墙的配置文件存放于：/etc/sysconfig/iptables

转载自 [http://www.splaybow.com/post/iptables-rule-add-delete-modify-save.html](http://www.splaybow.com/post/iptables-rule-add-delete-modify-save.html)
