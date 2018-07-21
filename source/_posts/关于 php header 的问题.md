---
author: 403 Forbidden
comments: true
date: 2013-06-11 14:48:11+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-php-header-%e7%9a%84%e9%97%ae%e9%a2%98'
title: 关于 php header 的问题
wordpress_id: 262
categories:
- 建站相关
---
博主最近有个站域名快要过期了，但又没钱续费，只能用下 BAE 提供的免费域名。学过 seo 的童鞋都应该知道，换域名得做域名跳转，同时发出 301 状态码通知搜索引擎你的网站更换域名了。因为是 WordPress，所以加跳转代码很简单，直接在 /index.php 第一个 ``<?php`` 后面加上
```php
if ($_SERVER['HTTP_HOST']!=='bwlzyzdsb.duapp.com') { //bwlzyzdsb.duapp.com 是博主网站域名，实际应用时请修改为自己的域名
header('Location: http://bwlzyzdsb.duapp.com/',true,301); //同上
exit();
}
```

可当时偏偏就忘记加上 ``exit();`` 了，用站长工具查看状态码一直是 HTTP/1.1 302 Found ，无奈换了个方法，先 header 301 状态码，再 header Location，问题依旧。检查了下代码，加上 ``exit();`` 问题解决。
