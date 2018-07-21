---
author: 403 Forbidden
comments: true
date: 2014-12-16 13:57:14+00:00
layout: post
slug: php-%e5%bf%ab%e9%80%9f%e8%af%bb%e5%8f%96%e5%a4%a7%e6%96%87%e4%bb%b6
title: PHP 快速读取大文件
wordpress_id: 2042
categories:
- Web 开发
---
最近想分析一下iis的日志，由于日志文件800M等大文件，所以怎样使用PHP快速读取成了问题！首先排除了file，因为加载太慢,内存溢出！
后来考虑用指针fgets，但是读取还是有点慢，如果只读取1000条以内的数据还是可以接受的
最后试用了PHP的stream_get_line函数 ，读取快速，读取50万条数据大文件，大概需要20秒左右的时间！例子代码如下

```php
$fp = fopen('./iis.log', 'r'); //文件
while (!feof($fp)) {
	//for($j=1;$j<=1000;$j++) {		 //读取下面的1000行并存储到数组中
	 $logarray[] = stream_get_line($fp, 65535, "\n");
		// break;
	 // }
 
 }
```


转载自 [http://www.wenlingnet.com/index.php/172/](http://www.wenlingnet.com/index.php/172/)

P.S. 说实话这个是挺快的，就是没法指定起始位置
[![QQ图片20141216215656](/uploads/2014/12/QQ图片20141216215656-1024x551.png)](/uploads/2014/12/QQ图片20141216215656.png)
