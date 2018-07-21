---
author: 403 Forbidden
comments: true
date: 2016-02-13 15:49:45+00:00
layout: post
slug: curl%e4%b8%8d%e4%bd%bf%e7%94%a8%e6%96%87%e4%bb%b6%e5%ad%98%e5%8f%96cookie-php%e4%bd%bf%e7%94%a8curl%e8%8e%b7%e5%8f%96cookie%e7%a4%ba%e4%be%8b
title: curl不使用文件存取cookie php使用curl获取cookie示例
wordpress_id: 2468
categories:
- Web 开发
---
```php
<?php
/*-----保存COOKIE-----*/
$url = 'www.xxx.com'; //url地址
$post = "id=user&pwd=123456"; //POST数据
$ch = curl_init($url); //初始化
curl_setopt($ch,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流
curl_setopt($ch,CURLOPT_POSTFIELDS,$post); //发送POST数据
$content = curl_exec($ch); //执行curl并赋值给$content
preg_match('/Set-Cookie:(.*);/iU',$content,$str); //正则匹配
$cookie = $str[1]; //获得COOKIE（SESSIONID）
curl_close($ch); //关闭curl
/*-----使用COOKIE-----*/
curl_setopt($ch,CURLOPT_COOKIE,$cookie);
```


转载自 [http://www.jb51.net/article/46222.htm](http://www.jb51.net/article/46222.htm)
