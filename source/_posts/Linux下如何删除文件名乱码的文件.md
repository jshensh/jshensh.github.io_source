---
author: 403 Forbidden
comments: true
date: 2014-01-02 15:17:21+00:00
layout: post
slug: linux%e4%b8%8b%e5%a6%82%e4%bd%95%e5%88%a0%e9%99%a4%e6%96%87%e4%bb%b6%e5%90%8d%e4%b9%b1%e7%a0%81%e7%9a%84%e6%96%87%e4%bb%b6
title: Linux下如何删除文件名乱码的文件
wordpress_id: 1067
categories:
- VPS 技术
---
刚刚在自己的VPS上下载个带有中文命名的压缩包，然后安装时就碰到这个问题。。。
死活就是删不掉。。。rm -rf 没用，rm -rf * 没用，rm -rf *.*没用。。。
只好用节点号删除了

首先在文件路径下 ls -i
列出的文件夹和文件名左侧会有一串数字，这就是节点号

删除文件
find -inum [节点号] -exec rm {} \;
例如 find -inum 1393332 -exec rm {} \;
执行后不会有返回结果，但是通过ls可以看到文件已经被删除了

转载自：[http://www.shenqhy.com/linux-how-to-delete-the-file-name-garbled-file.html](http://www.shenqhy.com/linux-how-to-delete-the-file-name-garbled-file.html)
