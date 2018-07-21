---
author: 403 Forbidden
comments: true
date: 2013-07-10 10:20:47+00:00
layout: post
slug: jelastic%e5%85%8d%e8%b4%b9paas%e4%ba%91%e7%a9%ba%e9%97%b4%e6%94%af%e6%8c%81javaphp%e5%8f%af%e7%bb%91%e5%9f%9f%e5%90%8dmysql%e6%95%b0%e6%8d%ae%e5%ba%93
title: Jelastic免费PaaS云空间支持Java,PHP可绑域名MysqL数据库
wordpress_id: 348
categories:
- 免费空间
---
[![jelastic_00](/uploads/201307/jelastic_00.gif)](/uploads/201307/jelastic_00.gif)
Jelastic是一家老外的PaaS云空间，支持Java和PHP，注册空间时会赠送一个二级域名，也可以绑定自己的域名，服务器可以选择Apache、Nginx，数据库可以选择MySql、NoSql、PostgreSQL、MongoDB等。
Jelastic空间虽说是一个PaaS平台，但是新手上手难度非常小，MysqL数据库有PhpMyAdmin在线管理，文件支持在线上传，域名可以直接在控制面板中绑定，可直接安装和运行WordPress、Joomla、Drupal等程序。

一、Jelastic免费云空间申请使用
　　1、Jelastic官网：[http://jelastic.com/](http://jelastic.com/)
　　2、进入网站后，输入自己的邮箱，点击“Try It Free”。
　　[![jelastic_01](/uploads/201307/jelastic_01.gif)](/uploads/201307/jelastic_01.gif)
　　3、接着用邮箱收到的邮件中的密码登录Jelastic空间控制平台。
　　[![jelastic_02](/uploads/201307/jelastic_02.gif)](/uploads/201307/jelastic_02.gif)
　　4、点击左上角的“Create Environment”开始创建应用，可选PHP或者Java。
　　[![jelastic_03](/uploads/201307/jelastic_03.gif)](/uploads/201307/jelastic_03.gif)
　　5、现在就可以选择自己的应用配置了，如Apache、PHP版本、SSL、SQL和二级域名等，如下图：（点击放大）
　　[![jelastic_04](/uploads/201307/jelastic_04.gif)](/uploads/201307/jelastic_04.gif)
　　6、完成了虚拟主机的配置后，稍等一会儿一个PHP或者JAVA空间就这样创建完成了。
　　[![jelastic_05](/uploads/201307/jelastic_05.gif)](/uploads/201307/jelastic_05.gif)

二、Jelastic云PaaS平台上传管理文件
　　1、Jelastic云PaaS平台提供了在线上传文件压缩包的功能。
　　[![jelastic_06](/uploads/201307/jelastic_06.gif)](/uploads/201307/jelastic_06.gif)
　　2、从本地选择一个压缩包（不要用RAR格式的），就可以上传了。
　　[![jelastic_07](/uploads/201307/jelastic_07.gif)](/uploads/201307/jelastic_07.gif)
　　3、文件上传完成后，点击文件后面的小按钮，选择发布文件到应用上。
　　[![jelastic_08](/uploads/201307/jelastic_08.gif)](/uploads/201307/jelastic_08.gif)
　　4、接着选择是将代码部署到根目录还是二级目录，如果想要根目录直接留空即可。
　　[![jelastic_09](/uploads/201307/jelastic_09.gif)](/uploads/201307/jelastic_09.gif)

三、Jelastic免费云空间绑定域名和DNS解析
　　1、在应用后面点击“设置”。
　　[![jelastic_10](/uploads/201307/jelastic_10.gif)](/uploads/201307/jelastic_10.gif)
　　2、然后在下方就可以填入自己想要绑定的域名了。
　　[![jelastic_11](/uploads/201307/jelastic_11.gif)](/uploads/201307/jelastic_11.gif)
　　3、绑定域名后还需要到域名DNS管理处做DNS解析，即添加CNAME记录，记录值是Jelastic赠送的二级域名。
　　[![jelastic_12](/uploads/201307/jelastic_12.gif)](/uploads/201307/jelastic_12.gif)

四、Jelastic免费空间创建MysqL和管理MysqL数据库
　　1、要想使用MysqL，需要在创建Jelastic空间时添加MysqL服务，之前没有添加的也可以重新编辑Jelastic应用添加MysqL服务。
　　[![jelastic_13](/uploads/201307/jelastic_13.gif)](/uploads/201307/jelastic_13.gif)
　　2、创建完成后就会收到Jelastic发来的关于MysqL登录地址、账号和密码等详细信息。
　　[![jelastic_14](/uploads/201307/jelastic_14.gif)](/uploads/201307/jelastic_14.gif)
　　3、登录PhpMyAdmin就可以添加新的数据库了。
　　[![jelastic_15](/uploads/201307/jelastic_15.gif)](/uploads/201307/jelastic_15.gif)
　　4、同时也可以添加新的数据库用户名和密码。
　　[![jelastic_16](/uploads/201307/jelastic_16.gif)](/uploads/201307/jelastic_16.gif)

五、Jelastic空间安装Wordpress博客
　　1、按照上面的方法将Wordpress压缩包上传到Jelastic空间，创建MysqL数据库，然后打开网址进入Wordpress安装页面。
　　2、数据库的用户名写root，数据库主要是URL地址，在Jelastic空间中可以找到，如下图：
　　[![jelastic_19](/uploads/201307/jelastic_19.gif)](/uploads/201307/jelastic_19.gif)
　　3、这是我在Jelastic空间演示：
　　　　1、主页：[http://freehao123.jelastic.dogado.eu/](http://freehao123.jelastic.dogado.eu/)
　　　　2、探针：[http://freehao123.jelastic.dogado.eu/tz.php](http://freehao123.jelastic.dogado.eu/tz.php)
　　　　3、绑域名：[http://jel.freehao123.info/](http://jel.freehao123.info/)
　　　　4、WP：[http://freehao123.jelastic.dogado.eu/wp/](http://freehao123.jelastic.dogado.eu/wp/)

六、Jelastic空间申请使用小结
　　1、用过了Jelastic免费空间后总体感觉不错，虽然是云空间但是和一般的虚拟主机差不多，容易上手，而该空间在国内访问速度都挺不错的。
　　2、在Jelastic空间上安装Wordpress时可以先修改配置文件再打包上传，如果你在安装时出现数据库连接错误请检查一下用户名和数据库主机地址。

转载自：[http://www.freehao123.com/jelastic-paas/](http://www.freehao123.com/jelastic-paas/)
