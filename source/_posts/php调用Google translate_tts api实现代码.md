---
author: 403 Forbidden
comments: true
date: 2013-08-17 04:04:47+00:00
layout: post
slug: php%e8%b0%83%e7%94%a8google-translate_tts-api%e5%ae%9e%e7%8e%b0%e4%bb%a3%e7%a0%81
title: php调用Google translate_tts api实现代码
wordpress_id: 630
categories:
- Web 开发
---
以下是对php调用Google translate_tts api的实现代码进行了分析介绍，需要的朋友可以过来参考下
今天用google翻译时，发现个好东西：Google translate_tts，调用这个api就可以听到英文发音，
省掉了自己上传音频文件的麻烦。
我用php写了个调用的方法，可以把音频文件保存在本地。
如下：
```php
$newfname = '1.wmv';
$reqBaseURL = 'http://translate.google.com/translate_tts?tl=en&q=how%20do%20you%20do';
$remote_file = fopen($reqBaseURL, "rb");
if ($remote_file){
 $newf = fopen($newfname, "wb");
 if ($newf){
  while(!feof($remote_file)){
   fwrite($newf, fread($remote_file, 1024 * 8),1024 * 8);
  }
 }
}
if ($remote_file) {
 fclose($remote_file);
}
if ($newf) {
 fclose($newf);
}

```


转载自：[http://www.jb51.net/article/40369.htm](http://www.jb51.net/article/40369.htm)
