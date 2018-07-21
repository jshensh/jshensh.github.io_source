---
author: 403 Forbidden
comments: true
date: 2013-05-27 02:28:58+00:00
layout: post
slug: '%e7%94%a8-php-curl-%e6%a8%a1%e6%8b%9f-post-%e6%8f%90%e4%ba%a4'
title: 用 php curl 模拟 post 提交
wordpress_id: 213
categories:
- Web 开发
---
```php
<?php
    $post_data = array(
                'cclist=5AAAA',
                'date=0',
                'irname=',
                'fullpath=',
            );
    $post_data = implode('&',$post_data);
    $url='http://localhost/test.php';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $result=curl_exec($ch);
    echo $result;
?>
```

