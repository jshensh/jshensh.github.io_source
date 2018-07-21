---
author: 403 Forbidden
comments: true
date: 2013-07-31 04:01:08+00:00
layout: post
slug: linux%e7%b3%bb%e7%bb%9f%e5%a6%82%e4%bd%95%e4%b8%8b%e8%bd%bd%e7%99%be%e5%ba%a6%e7%bd%91%e7%9b%98%e7%9a%84%e9%99%84%e4%bb%b6
title: linux系统如何下载百度网盘的附件
wordpress_id: 563
categories:
- VPS 技术
---
在vps上经常下载东西，常用的命令就是wget命令，大家经常会用百度网盘来存放程序和软件，国外比较有名的是Dropbox。
但是在美国的vps上直接下百度网盘的东西是没办法直接下载的，经过网上查询到一个很简单快速的方法。
首先打开要下载的百度网盘的地址：
如图
[![a0171365385747](/uploads/201307/a0171365385747.jpg)](/uploads/201307/a0171365385747.jpg)
用谷浏览器打开直接复制连接地址
[![e09b1365385747](/uploads/201307/e09b1365385747.jpg)](/uploads/201307/e09b1365385747.jpg)
然后在ssh下输入以下命令 wget -O '文件名' "链接地址"
如:```
wget -O 'a.zip' "http://www.baidupcs.com/file/f1f1a9a4419a14b844ca977e130734b5?fid=1476933591-250528-1865097549&time=1365385609&sign=FDTA-DCb740ccc5511e5e8fedcff06b081203-lS%2FR48D9royZ3X3IzW9tN8b3m68%3D&expires=8h&sh=1&response-cache-control=private"
```

然后就可以解压缩使用了。

转载自：[http://www.ovzxen.com/post-44.html](http://www.ovzxen.com/post-44.html) ，有删改
