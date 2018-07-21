---
author: 403 Forbidden
comments: true
date: 2013-08-14 03:54:06+00:00
layout: post
slug: w3c%e5%b0%8f%e7%bb%84%e5%8f%91%e5%b8%83web%e5%ad%98%e5%82%a8api%e6%8e%a8%e8%8d%90%e6%a0%87%e5%87%86
title: W3C小组发布Web存储API推荐标准
wordpress_id: 622
categories:
- Web 开发
---
日前，W3C的Web应用工作组正式发布了Web Storage的正式推荐标准。该标准为Web Client定义了一组标准的API，用来以键值对的方式访问持久数据存储中的数据。

Web存储API允许Web应用程序将数据存储在Web客户端，尽管桌面和移动浏览器支持该API已有很长一段时间，但想要达到这种状态还需要一段时间。

[![5201f4f54f06e](/uploads/201308/5201f4f54f06e.jpg)](/uploads/201308/5201f4f54f06e.jpg)

什么是Web存储API？

在用户的机器上进行本地存储的最基本的实现方法是利用Web存储API。该API使用key/value对来支持开发人员存储能够被Web应用程序访问的基本信息和变量。该功能的一个理想用例是用于存储用户已经浏览完并且离开应用程序或已经关闭Web浏览器之后需要永久保留的简单数据。例如，保存游戏状态、保存导航位置或存储你希望在整个Web应用程序中使用但你不希望使用cookie的一些特定信息（例如用户名称或姓名）。类似的API还可以用于为个体会话存储数据。这些数据将在用户浏览完离开应用程序或关闭浏览器之后自动清除。
本地存储数据和应用离线运行功能

Web存储API提供一个简单的名称值对存储API（name-value pair storage API），该API被当做一个关键API，允许Web应用离线运行功能；该特性还常被用于在Web中的本地应用及本地应用数据。尽管在浏览器支持要比这大的多，但本地存储范围限制在5MB内。

在所有的HTML5 API中，Web存储API获得广大厂商的广泛支持已有很长一段时间。浏览器支持使用API高达90%以上，包括桌面和移动浏览器。从下面的这幅图表可以看出各大主流浏览器对caniuse.com网站的支持情况。

[![5201f4b67cd58](/uploads/201308/5201f4b67cd58.png)](/uploads/201308/5201f4b67cd58.png)

英文出自：[Programmableweb](http://blog.programmableweb.com/2013/08/06/w3c-web-storage-api-now-in-recommendation-status/)
