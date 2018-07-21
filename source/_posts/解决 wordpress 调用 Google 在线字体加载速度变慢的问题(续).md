---
author: 403 Forbidden
comments: true
date: 2014-06-08 12:24:58+00:00
layout: post
slug: '1605'
title: 解决 wordpress 调用 Google 在线字体加载速度变慢的问题(续)
wordpress_id: 1605
categories:
- 建站相关
---
```shell
sed -i s/fonts\.googleapis\.com/fonts.useso.com/g `grep fonts\.googleapis\.com -rl ./`
```

解决问题



~~前几天码了篇文章，[解决 wordpress 调用 Google 在线字体加载速度变慢的问题](http://futa.ooo/1598.html)，发现依旧还是有点慢，正好手边有电脑，用 Google 的开发者工具看了下，坑爹啊，Google Apis 调用的 themes.googleusercontent.com 也被。。。你懂的，简直不能忍！~~
[![q_1](/uploads/2014/06/q_1-1024x551.jpg)](/uploads/2014/06/q_1.jpg)
[![q_2](/uploads/2014/06/q_2-1024x551.png)](/uploads/2014/06/q_2.png)
[![q_3](/uploads/2014/06/q_3-1024x551.png)](/uploads/2014/06/q_3.png)
于是，我就依葫芦画瓢，给 themes.googleusercontent.com 搭了个反代，不过呢，之前的 fonts.imjs.work 的规则得修改一下，因为需要对获取的 css 里面请求的 url 进行替换，先上处理 css 的 php
```php
<?php
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://fonts.googleapis.com".$_SERVER['REQUEST_URI']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HEADER, TRUE);
    curl_setopt($ch, CURLOPT_NOBODY, FALSE);
    $response = curl_exec($ch);
    if (curl_getinfo($ch, CURLINFO_HTTP_CODE) == '200') {
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header = substr($response, 0, $headerSize);
        $output_body = substr($response, $headerSize);
    }
    curl_close($ch);
    preg_match("/Content-Type:.*?\r/",$header,$tmp);
    if ($tmp[0]!=="") {
        header($tmp[0]);
    }
    echo str_replace('themes.googleusercontent.com','themes.googleusercontent.imjs.work:20808',$output_body);
    //后面的 themes.googleusercontent.imjs.work:20808 就是我自己的 vps
?>
```

原先的 fonts.imjs.work 的规则修改为
```
server
        {
                listen       80;
                server_name fonts.imjs.work;
                index index.html index.htm index.php default.html default.htm default.php;
                root  /home/wwwroot/fonts.imjs.work;

                rewrite ^ /index.php;
                location ~ .*\.(php|php5)?$
                        {
                                try_files $uri =404;
                                fastcgi_pass  unix:/tmp/php-cgi.sock;
                                fastcgi_index index.php;
                                include fcgi.conf;
                        }

                location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
                        {
                                expires      30d;
                        }

                location ~ .*\.(js|css)?$
                        {
                                expires      12h;
                        }

                access_log off;
        }

```

绑定 themes.googleusercontent.imjs.work 到vps，附规则
```
server        {
        listen          80;
        server_name     themes.googleusercontent.imjs.work;
 
        location / {
        proxy_pass          http://themes.googleusercontent.com/;
        proxy_redirect      off;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

然后。。。终于能正常使用了，附截图。。。
[![q_4](/uploads/2014/06/q_4-1024x551.png)](/uploads/2014/06/q_4.png)
[![q_5](/uploads/2014/06/q_5-1024x551.png)](/uploads/2014/06/q_5.png)</del>
