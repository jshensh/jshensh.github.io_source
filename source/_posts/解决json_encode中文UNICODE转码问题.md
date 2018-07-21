---
author: 403 Forbidden
comments: true
date: 2015-01-30 08:32:22+00:00
layout: post
slug: '%e8%a7%a3%e5%86%b3json_encode%e4%b8%ad%e6%96%87unicode%e8%bd%ac%e7%a0%81%e9%97%ae%e9%a2%98'
title: 解决json_encode中文UNICODE转码问题
wordpress_id: 2115
categories:
- Web 开发
---
前段时间做东西时用到了 json，php 自带的 json_encode 会将 unicode 字符转码，以 \uxxxx 的形式输出，这样不方便调试，并且，不方便插入数据库（mysql 会自动去掉反斜杠，变成 uxxxx）。于是在网上找到了如下两种解决方案：

1. JSON_UNESCAPED_UNICODE：
该方法只适用于 php 5.4 及以上版本，使用方法：
```php
<?php
echo json_encode("中文", JSON_UNESCAPED_UNICODE);
```


2. 自己写 function 处理：
```php
function ch_json_encode($data) {
   
   function ch_urlencode($data) {
       if (is_array($data) || is_object($data)) {
           foreach ($data as $k => $v) {
               if (is_scalar($v)) {
                   if (is_array($data)) {
                       $data[$k] = urlencode($v);
                   } else if (is_object($data)) {
                       $data->$k = urlencode($v);
                   }
               } else if (is_array($data)) {
                   $data[$k] = ch_urlencode($v); //递归调用该函数
               } else if (is_object($data)) {
                   $data->$k = ch_urlencode($v);
               }
           }
       }
       return $data;
   }
   
   $ret = ch_urlencode($data);
   $ret = json_encode($ret);
   return urldecode($ret);
}
```


个人觉得第二种方法有 bug，以前有过输出 \' 的经历。

参考 [http://blog.csdn.net/lanqiao825/article/details/26700809](http://blog.csdn.net/lanqiao825/article/details/26700809)、[http://blog.sina.com.cn/s/blog_6ad6243801016zqo.html](http://blog.sina.com.cn/s/blog_6ad6243801016zqo.html)
