---
author: 403 Forbidden
comments: true
date: 2015-12-16 14:36:18+00:00
layout: post
slug: mysql%e6%8c%89%e7%85%a7%e7%bd%91%e6%ae%b5%e5%88%86%e7%b1%bbip
title: mysql按照网段分类IP
wordpress_id: 2420
categories:
- Web 开发
---
数据库里面取出来是IP地址，需要用sql来给IP段地址分类
```sql
SELECT INET_NTOA(CONVERT(INET_ATON('192.168.35.11'),SIGNED)&0xFFFFFF00) AS tt
```

[![QQ图片20151216223458](/uploads/2015/12/QQ图片20151216223458.png)](/uploads/2015/12/QQ图片20151216223458.png)

命令解释:



	
  1. inet_aton(‘192.168.35.11’)这个函数是将IP地址转化为一个序列. 

	
  2. convert是将序列类型定义成整数. 

	
  3. &0xFFFFFF00的意思是与FFFFFF00这个16进制数进行与操作.这步操作相当于掩码.可以过滤网段. 

	
  4. inet_ntoa这个函数是将整理好的序列转化成IP地址的形式.



转载自 [http://blog.csdn.net/a105421548/article/details/45224843](http://blog.csdn.net/a105421548/article/details/45224843)
