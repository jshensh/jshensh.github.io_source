---
author: 403 Forbidden
comments: true
date: 2013-07-22 04:15:00+00:00
layout: post
slug: java-7%e7%88%86%e6%9c%80%e6%96%b0%e6%bc%8f%e6%b4%9e%ef%bc%8c10%e5%b9%b4%e5%89%8d%e7%9a%84%e6%94%bb%e5%87%bb%e6%89%8b%e6%b3%95%e4%bb%8d%e6%9c%89%e6%95%88
title: Java 7爆最新漏洞，10年前的攻击手法仍有效
wordpress_id: 471
categories:
- 杂七杂八
---
据[SECLISTS透露](http://seclists.org/fulldisclosure/2013/Jul/172)，他们发现新的Reflection API在引进Java SE 7时并未经过非常安全的复查，并且存在着一个非常大的漏洞。
该漏洞可以允许黑客利用10年前便广为人知的手法来攻击Java虚拟机。Java SE 7中的Reflection API并未采取应有的保护机制来防堵该攻击。
SECLISTS公司关于该漏洞的概念验证代码在Java SE 7 Update 25 (1.7.0_25-b16) 版本下成功利用了该漏洞。该代码可以侵入JVM安全方面的特性：类型系统安全性。这样，一个完整的、可依赖的Java安全沙盒分支便可以获得Java SE软件的一个漏洞实例。
Oracle公司在2013年5月曾发表博文称，要优先维护Java的安全性。而如今，Java频频爆出漏洞，这似乎也说明Oracle安全策略的制定和实施还不健全、不完善。
关于该漏洞的更多详情，[前往官网](http://seclists.org/fulldisclosure/2013/Jul/172)查看。
