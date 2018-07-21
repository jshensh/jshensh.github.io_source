---
author: 403 Forbidden
comments: true
date: 2013-07-25 04:47:43+00:00
layout: post
slug: '%e7%9c%8b%e5%88%b0%e4%b8%80%e4%b8%aa%e6%af%94%e8%be%83%e6%9c%89%e7%94%a8%e7%9a%84%e5%a2%9e%e5%bc%ba-curl-%e7%9a%84-function'
title: 看到一个比较有用的增强 curl 的 function
wordpress_id: 501
categories:
- Web 开发
---
在 csdn 看到的。。拿来修改了一下。。应该不需要注释了吧，不懂的话就评论吧
```php
function xcurl($url,$ref=null,$cookies=null,$post=array(),$ua="Mozilla/5.0 (X11; Linux x86_64; rv:2.2a1pre) Gecko/20110324 Firefox/4.2a1pre",$print=false) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_AUTOREFERER, true);
	if(!empty($ref)) {
		curl_setopt($ch, CURLOPT_REFERER, $ref);
	}
	if (!empty($cookies)) {
		curl_setopt($ch, CURLOPT_COOKIE,$cookies);
	}
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	if(!empty($ua)) {
		curl_setopt($ch, CURLOPT_USERAGENT, $ua);
	}
	if(count($post) > 0){
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);	
	}
	$output = curl_exec($ch);
	curl_close($ch);
	if($print) {
		print($output);
	} else {
		return $output;
	}
}

```

