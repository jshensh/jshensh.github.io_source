---
author: 403 Forbidden
comments: true
date: 2013-07-24 04:07:19+00:00
layout: post
slug: vps%e4%b8%bb%e6%9c%ba%e5%bf%ab%e9%80%9f%e6%90%ac%e5%ae%b6%e6%96%b9%e6%b3%95%e8%be%b9%e6%89%93%e5%8c%85%e8%be%b9%e4%bc%a0%e8%be%93%e8%be%b9%e8%a7%a3%e5%8e%8b%e9%80%82%e5%90%88%e5%a4%a7%e4%b8%ad
title: VPS主机快速搬家方法:边打包边传输边解压,适合大中型论坛网站
wordpress_id: 477
categories:
- VPS 技术
---
[![VPS主机快速搬家方法:边打包边传输边解压,适合大中型论坛网站](/uploads/201307/vps-banjia_00.gif)](/uploads/201307/vps-banjia_00.gif) 
博客网站搬家总体做法就是将原空间上的程序代码和图片附件等所有文件移动到新的主机空间上，MysqL数据库文件也要搬家到新的空间上的数据库中，最后调整一下数据库配置文件和域名的DNS解析，等DNS生效后就算是完成网站搬家了。
但是在实际操作的过程中，遇到的最大的困难应该是文件打包下载和上传解压，对于一些大中型论坛或者网站，数据文件可能高达GB以上，MysqL数据库也可能非常大，用FTP来下载和上传文件和用PhpMyAdmin导入MysqL不仅浪费时间，还会经常崩溃失败。
本篇文章将为大家分享如何在VPS主机之间快速搬家，一边打包压缩原主机上的文件，一边传输文件数据到新的主机上，一边在新的VPS主机上解压文件，因为所有的操作都是在VPS主机上之间进行，传输速度可以达到几MB/s以上，特别适合一些大中型的论坛和网站搬家。

**一、VPS主机快速搬家前准备工作 **
1、为了保证网站能够在新旧两个VPS主机上平稳过渡，我将新的VPS搭建成与原VPS一样的环境，例如都采用WDCP、创建同账号和密码的数据库名称和数据库密码。
2、如果你用的是虚拟主机提供的SSH，需要先找到你想要搬家的网站根目录，这是我旧的VPS主机上的网站根目录。
[![VPS搬家原来的目录](/uploads/201307/vps-banjia_01.gif)](/uploads/201307/vps-banjia_01.gif) 
3、我要将旧VPS上的根目录搬家到新的VPS的根目录中。
[![VPS搬家新的目录中](/uploads/201307/vps-banjia_02.gif)](/uploads/201307/vps-banjia_02.gif) 
4、论坛原来是放在Linode VPS上的，是之前在 Linode 买的一个日本机房。
5、但是 Linode VPS每月20美元的费用实在是觉得贵了，恰好 VPS.NET 香港日本VPS主机$10/月，这个价格放个论坛还是可以的。
6、本篇文章就是讲述的将论坛从Linode VPS主机上搬家到VPS.NET VPS主机上，因为论坛数据不是很大，大概十几分钟就完成论坛VPS主机搬家工作了。

**二、快速将原VPS上的数据文件搬家到新的VPS上 **
1、这里我要将原VPS上的/www/web/freehao123_info下的public_html目录搬家到新的VPS上，先进入freehao123_info目录中。
```shell
cd /www/web/freehao123_info

```

[![VPS搬家进入文件夹](/uploads/201307/vps-banjia_03.gif)](/uploads/201307/vps-banjia_03.gif) 
2、然后再执行以下命令：
```shell
tar czf - public_html | ssh root@50.31.252.181 tar xzf - -C /www/web/freehao123_info/public_html

```

3、public_html是要移动的目录，50.31.252.181这是新的VPS主机，/www/web/freehao123_info/public_html这是将文件存放在新的VPS上路径。
[![VPS搬家执行命令](/uploads/201307/vps-banjia_04.gif)](/uploads/201307/vps-banjia_04.gif) 
4、然后因为要连接到新的VPS上，会提示是否继续连接，最后是输入新的VPS主机的密码。
[![VPS搬家是否继续连接](/uploads/201307/vps-banjia_05.gif)](/uploads/201307/vps-banjia_05.gif) 
5、输入了密码后回车，这时候新旧VPS主机之间就已经开始在不停地传输数据了，根据你的VPS主机上传下载速度不同和数据文件大小不同，等待的时间不一样。
6、文件搬家完成了，就可以到新的VPS主机上看到已经移动过来的数据了。
[![VPS搬家转移了数据](/uploads/201307/vps-banjia_06.gif)](/uploads/201307/vps-banjia_06.gif) 
7、如果文件保存的路径不一致，还可以移动、复制、删除等。
[![VPS搬家复制文件](/uploads/201307/vps-banjia_07.gif)](/uploads/201307/vps-banjia_07.gif) 

**三、快速将原VPS上的MysqL数据库搬家到新的VPS上 **
1、WDCP默认mysql数据库文件及日志目录是放在/www/wdlinux/mysql/var，freehao123_dz是我创建的数据库，这是要移动的。
[![VPS搬家移动数据库](/uploads/201307/vps-banjia_08.gif)](/uploads/201307/vps-banjia_08.gif) 
2、这是我要将旧VPS的MysqL数据库搬家到新的VPS上存放的路径，还是放在freehao123_dz中。
[![VPS搬家新的数据库文件](/uploads/201307/vps-banjia_09.gif)](/uploads/201307/vps-banjia_09.gif) 
3、操作方法和上面移动数据文件是一样的，先是进入文件目录，然后执行移动命令。
```shell
cd /www/wdlinux/mysql-5.1.63/var
tar czf - freehao123_dz | ssh root@50.31.252.181 tar xzf - -C /www/wdlinux/mysql-5.1.63/var/freehao123_dz

```

4、最后输入密码，完成MysqL数据库迁移到新的VPS主机上。
[![VPS搬家完成数据库迁移](/uploads/201307/vps-banjia_11.gif)](/uploads/201307/vps-banjia_11.gif) 
5、到新的VPS主机上就可以看到MysqL数据库整个文件夹都搬家过来了。
[![VPS搬家转移了文件](/uploads/201307/vps-banjia_12.gif)](/uploads/201307/vps-banjia_12.gif) 
6、在PhpMyAdmin也能立即查看到刚刚转移过来的MysqL数据库了，还免去了PhpMyAdmin导入之苦。
[![VPS搬家在线管理数据库](/uploads/201307/vps-banjia_13.gif)](/uploads/201307/vps-banjia_13.gif) 

**四、VPS主机快速搬家后的一些后续工作**
1、首先是去修改数据库配置文件，部落因为已经提前在新的VPS主机上创建一样的数据库名称、数据库用户名和密码，所以程序直接就能连接上MysqL使用了。
2、Discuz!论坛的数据库配置文件在config目录下，找到config.global.php 和config.ucenter.php 两个文件。在data目录下，找到config.inc.php文件。共三个。
[![VPS搬家修改配置文件](/uploads/201307/vps-banjia_20.gif)](/uploads/201307/vps-banjia_20.gif) 
3、由于换了新的空间，Discuz!论坛可能会出现应用通信失败的情况。
[![VPS搬家通信失败](/uploads/201307/vps-banjia_16.gif)](/uploads/201307/vps-banjia_16.gif) 
4、点击编辑该应用，在应用IP一栏中填写新的IP即可。
[![VPS搬家填入新的IP](/uploads/201307/vps-banjia_17.gif)](/uploads/201307/vps-banjia_17.gif) 
5、最后是更新域名的DNS解析记录了，将域名添加到新的A记录或者CNAME记录即可。
[![VPS搬家更新域名解析记录](/uploads/201307/vps-banjia_14.gif)](/uploads/201307/vps-banjia_14.gif) 
6、完成后，就可以正常访问网站了。
[![VPS搬家正常访问网站](/uploads/201307/vps-banjia_19.gif)](/uploads/201307/vps-banjia_19.gif) 

**五、VPS主机快速搬家小结 **
1、你可以用本文的方法转移整个mysql目录,也可以转移mysql目录下某个数据库,一样的操作，但是为了保证MysqL能否在新旧主机兼容，最好两方版本相同。
2、SSH是加密传输的，不会发生数据包劫持，因此上传文件时你可以安心做其它的事情等待它自动转移完成吧，几个GB的文件也就是几分钟之内搬家完成。

转载自：[http://www.freehao123.com/vps-banjia/](http://www.freehao123.com/vps-banjia/) 有删改
