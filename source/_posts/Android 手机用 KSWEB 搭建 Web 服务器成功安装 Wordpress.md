---
author: 403 Forbidden
comments: true
date: 2013-07-04 11:40:43+00:00
layout: post
slug: android-%e6%89%8b%e6%9c%ba%e7%94%a8-ksweb-%e6%90%ad%e5%bb%ba-web-%e6%9c%8d%e5%8a%a1%e5%99%a8%e6%88%90%e5%8a%9f%e5%ae%89%e8%a3%85-wordpress
title: Android 手机用 KSWEB 搭建 Web 服务器成功安装 Wordpress
wordpress_id: 338
categories:
- 建站相关
---
一、Android 手机安装 KSWEB 软件搭建 Web 环境
　　1、很多人不相信我可以把安卓变为 VPS，现在我就来详细评测安装过程和实用性，没有安卓的机油自动飘过吧。


[![image](http://bcs.duapp.com/sxbdotpw/1372936287203.png)](http://bcs.duapp.com/sxbdotpw/1372936287203.png)



　　2、运行 KSWEB，第一次运行可能打开时间会久一点，打开之后点击 options，勾选“Enable root functions”启动root模式，然后“Port”中设定端口为80


[![image](http://bcs.duapp.com/sxbdotpw/1372936393353.png)](http://bcs.duapp.com/sxbdotpw/1372936393353.png)



[![image](http://bcs.duapp.com/sxbdotpw/1372936531487.png)](http://bcs.duapp.com/sxbdotpw/1372936531487.png)



[![image](http://bcs.duapp.com/sxbdotpw/1372936552310.png)](http://bcs.duapp.com/sxbdotpw/1372936552310.png)



　　3、接着回到主页面，点击“phpmyadmin”下载5MB左右的文件，以便可以使用 phpmyadmin。至于 MYSQL 数据库的密码，在设置中可以自由设定，如图:


[![image](http://bcs.duapp.com/sxbdotpw/1372936615060.png)](http://bcs.duapp.com/sxbdotpw/1372936615060.png)



　　4、回到主页，点击“GO TO”，或者直接打开浏览器，输入 127.0.0.1，如果出现以下画面，这证明你已经成功了一大半。


[![image](http://bcs.duapp.com/sxbdotpw/andriod-vps_04.gif)](http://bcs.duapp.com/sxbdotpw/andriod-vps_04.gif)



二、Android 手机创建 MysqL 数据库安装 Wordpress
　　1、前往 [http://cn.wordpress.org](http://cn.wordpress.org) 下载最新版的 WordPress，解压，将 wordpress 目录内的所有文件剪切至手机的 /mnt/sdcard/htdocs ，然后我们只要访问http://127.0.0.1/phpmyadmin创建数据库便可以安装 WordPress 了。


[![image](http://bcs.duapp.com/sxbdotpw/andriod-vps_10.gif)](http://bcs.duapp.com/sxbdotpw/andriod-vps_10.gif)



　　2、现在我们的安卓服务器已经 OK 了，我们用电脑或者安卓自带的浏览器打开设置的 IP 看看，是不是一个完美的 Wordpress 安装页面出现了呢？


[![image](http://bcs.duapp.com/sxbdotpw/1372937591980.png)](http://bcs.duapp.com/sxbdotpw/1372937591980.png)



　　3、以下是探针信息，我们可以看出，探针已经把安卓系统的信息识别出来，并且服务器软件为 lighttpd/1.4.31，PHP版本为 5.4.11，MYSQL 版本为 5.1.62。


[![image](http://bcs.duapp.com/sxbdotpw/andriod-vps_12.gif)](http://bcs.duapp.com/sxbdotpw/andriod-vps_12.gif)



　　4、接下来，我们只要做好路由器端口映射便可以绑定域名让其它人访问了。

三、Android 变身网站服务器实用性探讨
　　1、大家知道，我们平常所用的安卓系统也是基于 linux 核心，所以部署个服务器环境并没有多大的问题，平常我们在手机上、平板上测试源码、插件完全没有问题。
　　2、如果手机流量能撑得住的话，甚至可以直接把手机当作自己的博客服务器，并且是独立 IP，不知道度娘会不会喜欢呢？
　　3、不过还有一个问题，就是安卓设配的 CPU 一般不会很厉害，跟英特尔的 XEON 服务器专用 CPU 没法比，所以安卓的服务器性能方面比不上真正的服务器。
　　4、但对于我们个人来说一天几百 IP 上千 PV 已经毫无压力了。 对于安卓机子的配置来说，一般的 256MB 内存、650 主频左右的机子便可以使用了。
　　5、如果你的内存上了 512MB、主频超过 1GHZ，那么使用会相对比较流畅，如果你的手机为双核、四核，那么真的堪比中小型 VPS 主机了。

原文转自：[http://www.freehao123.com/android-web/](http://www.freehao123.com/android-web/)，有删改，图片部分为本人手机截图
