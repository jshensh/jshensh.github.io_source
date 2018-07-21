---
author: 403 Forbidden
comments: true
date: 2014-01-12 15:17:32+00:00
layout: post
slug: '%e6%b1%82%e6%95%99%e5%90%84%e4%bd%8d%e5%a4%a7%e7%a5%9e%e3%80%82%e3%80%82%e5%85%b3%e4%ba%8e-linux'
title: 求教各位大神。。关于 Linux
wordpress_id: 1146
categories:
- 杂七杂八
---
最近不知道为什么，vps 对外发的数据包相当多，装了 iftop，查看到我的 vps 在向多个服务器的 smtp 端口发送数据，想问各位大神一个问题，什么原因会导致这样，还有如何解决这个问题？系统 centos 6.5，最近装了个 mutt 用来发邮件，别的异常没有。
附 iftop 截图
[![20140112231419](/uploads/2014/01/20140112231419.jpg)](/uploads/2014/01/20140112231419.jpg)
[![20140112233751](/uploads/2014/01/20140112233751.jpg)](/uploads/2014/01/20140112233751.jpg)

附 lsof 截图
[![20140112234354](/uploads/2014/01/20140112234354.jpg)](/uploads/2014/01/20140112234354.jpg)
