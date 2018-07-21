---
author: 403 Forbidden
comments: true
date: 2013-08-04 04:25:38+00:00
layout: post
slug: nginx%e8%ae%be%e7%bd%ae301%e5%9f%9f%e5%90%8d%e8%b7%b3%e8%bd%ac
title: nginx设置301域名跳转
wordpress_id: 576
categories:
- VPS 技术
---
如a.com访问后直接301定向到www.a.com
a.com后加的地址和路径都会直接定向到www.a.com后的地址和路径
如a.com/list/show.php?id=11 设置后定向到www.a.com/list/show.php?id=11
具体设置规则如下：
```shell
server
	{
		listen       80;
		server_name www.a.com a.com;
                if ($host != 'www.a.com' ) {  
                return  301 http://www.a.com$request_uri;
	}
}

```


转载自：[http://www.ovzxen.com/post-28.html](http://www.ovzxen.com/post-28.html)
