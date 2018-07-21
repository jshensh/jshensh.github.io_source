---
author: 403 Forbidden
comments: true
date: 2013-07-13 03:17:23+00:00
layout: post
slug: discuz-x2-5-for-bae
title: Discuz! x2.5 for BAE
wordpress_id: 385
categories:
- 建站相关
---
安装步骤：

1、创建百度云存储Bucket，最少为30M，并修改Bucket的属性为公开读.
2、将压缩包解压，并将upload/bcs/config.php文件中BAIDU_BCS_BUCKET修改为你创建的百度云存储Bucket名。
3、将upload目录上传到百度BAE.
4、查看百度mysql的数据库名，并点击设置，将数据库默认字符集编码修改为utf8 (utf8_general_ci)。
5、启用百度cache(缓存), 最少30M. 如果之前已经启用百度cache并且安装过discuz,请停用后再次启用。
6、打开http://xxx.duapp.com/install/index.php来开始安装，过程中需要提供你创建的百度mysql数据库的名称。
7、删除install目录。
8、进入到后台管理，点击全局--〉上传设置，填写"本地附件 URL 地址"为http://bcs.duapp.com/xxx/data/attachment。xxx为你创建的bucket名称。

该版本解决问题:
1、解决云平台不能使用的问题
2、解决QQ互联不能使用的问题
3、支持BAE伪静态。

下载地址：[http://pan.baidu.com/share/link?shareid=3316500327&uk;=3725396711](http://pan.baidu.com/share/link?shareid=3316500327&uk=3725396711)

声明，这份源码不是我修改的，我只是在 upload 目录里加了一个 app.conf 以实现伪静态。但是，伪静态还是有点小 bug，各位还是就开这两个吧，见图。

[![曹杨二中附属学校 2013 届 初三(5)班 班级论坛 管理中心 - 全局 - SEO设置](/uploads/201307/曹杨二中附属学校-2013-届-初三5班-班级论坛-管理中心-全局-SEO设置.png)](/uploads/201307/曹杨二中附属学校-2013-届-初三5班-班级论坛-管理中心-全局-SEO设置.png)
