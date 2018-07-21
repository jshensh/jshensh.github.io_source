---
author: 403 Forbidden
comments: true
date: 2013-12-30 07:14:08+00:00
layout: post
slug: '%e5%a6%82%e4%bd%95%e8%a7%a3%e5%86%b3%e5%ae%89%e8%a3%85%e4%ba%86%e5%a4%9a%e7%89%88%e6%9c%acoffice%e5%90%af%e5%8a%a8%e6%97%b6%e9%9c%80%e8%a6%81%e9%87%8d%e6%96%b0%e9%85%8d%e7%bd%ae%e7%9a%84%e9%97%ae'
title: 如何解决安装了多版本office启动时需要重新配置的问题
wordpress_id: 1055
categories:
- 计算机技术
---
Microsoft Office软件有2003、2007、2010和最新的2013四个常用版本。很多人的电脑安装的不止一个版本，有的是为了尝鲜，有的是为了演示教程方便截图，目的我们在此不做讨论。在安装多个版本之后，每次启动，都会要求你重新配置，这样一等就是半天，很是麻烦。

①在开始菜单--所有程序--Microsoft Office文件夹里面可以看到小编的本本安装了三个版本，是为了截图方便各个版本的使用者。

[![3_130508155924_1](/uploads/2013/12/3_130508155924_1-237x300.jpg)](/uploads/2013/12/3_130508155924_1.jpg)

②我启动Word2010，就会出现重新配置的界面，很耽误时间，而且每次都这样，要知道小编的时间可是十分宝贵的。

[![3_130508155924_2](/uploads/2013/12/3_130508155924_2-300x243.jpg)](/uploads/2013/12/3_130508155924_2.jpg)

③下面教大家一个十分简单的解决办法，按下Win+R打开运行对话框，输入下面的指定。

命令1（用于Office 2003）：

reg add HKCU\Software\Microsoft\Office\11.0\Word\Options /v NoReReg /t REG_DWORD /d 1

命令2（用于Office 2007）：

reg add HKCU\Software\Microsoft\Office\12.0\Word\Options /v NoReReg /t REG_DWORD /d 1

命令3（用于Office 2010）：

reg add HKCU\Software\Microsoft\Office\14.0\Word\Options /v NoReReg /t REG_DWORD /d 1

[![3_130508155924_3](/uploads/2013/12/3_130508155924_3-300x169.jpg)](/uploads/2013/12/3_130508155924_3.jpg)

④输入完毕，按下确定键，重新打开Word2010，没有出现配置界面了，而是直接启动。这样就很好的解决了这个常见的问题。

[![3_130508155924_4](/uploads/2013/12/3_130508155924_4-300x200.jpg)](/uploads/2013/12/3_130508155924_4.jpg)

转载自：[http://www.wordlm.com/Office/JiChu/2993.html](http://www.wordlm.com/Office/JiChu/2993.html)
