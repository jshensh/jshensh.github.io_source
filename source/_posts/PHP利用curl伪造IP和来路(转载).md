---
author: 403 Forbidden
comments: true
date: 2013-05-07 13:02:29+00:00
layout: post
slug: php%e5%88%a9%e7%94%a8curl%e4%bc%aa%e9%80%a0ip%e5%92%8c%e6%9d%a5%e8%b7%af%e8%bd%ac%e8%bd%bd
title: PHP利用curl伪造IP和来路(转载)
wordpress_id: 118
categories:
- Web 开发
---
[![20120101065534935](/uploads/2013/05/20120101065534935-300x93.jpg)](/uploads/2013/05/20120101065534935.jpg)
效果如图
伪造的文件：1.php
```
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://localhost/2.php");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-FORWARDED-FOR:8.8.8.8', 'CLIENT-IP:8.8.8.8'));  //构造IP
curl_setopt($ch, CURLOPT_REFERER, "http://www.xssxss.com/ ");   //构造来路
curl_setopt($ch, CURLOPT_HEADER, 1);
$out = curl_exec($ch);
curl_close($ch);
?>
```


查看效果的脚本2.php
```
<?php
function getClientIp() {
    if (!empty($_SERVER["HTTP_CLIENT_IP"]))
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    else if (!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    else if (!empty($_SERVER["REMOTE_ADDR"]))
        $ip = $_SERVER["REMOTE_ADDR"];
    else
        $ip = "err";
    return $ip;
}
echo "IP: " . getClientIp() . "";
echo "referer: " . $_SERVER["HTTP_REFERER"];
?>
```


 原文链接：[http://www.2cto.com/kf/201201/115774.html](http://www.2cto.com/kf/201201/115774.html)
