---
author: 403 Forbidden
comments: true
date: 2016-03-04 16:44:10+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8%e5%9b%bd%e5%86%85%e9%95%9c%e5%83%8f%e6%ba%90%e6%9d%a5%e5%8a%a0%e9%80%9fpython-pypi%e5%8c%85%e7%9a%84%e5%ae%89%e8%a3%85'
title: 使用国内镜像源来加速python pypi包的安装
wordpress_id: 2490
categories:
- VPS 技术
---
pipy国内镜像目前有：
 
http://pypi.douban.com/  豆瓣
http://pypi.hustunique.com/  华中理工大学
http://pypi.sdutlinux.org/  山东理工大学
http://pypi.mirrors.ustc.edu.cn/  中国科学技术大学
 
对于pip这种在线安装的方式来说，很方便，但网络不稳定的话很要命。使用国内镜像相对好一些，
 
如果想手动指定源，可以在pip后面跟-i 来指定源，比如用豆瓣的源来安装web.py框架：
```shell
pip install web.py -i http://pypi.douban.com/simple
```

 
注意后面要有/simple目录！！！
 
要配制成默认的话，需要创建或修改配置文件（linux的文件在~/.pip/pip.conf，windows在%HOMEPATH%\pip\pip.ini），修改内容为：
```
[global]
index-url = http://pypi.douban.com/simple
```

 
这样在使用pip来安装时，会默认调用该镜像。
更多配置参数见：[http://www.pip-installer.org/en/latest/configuration.html](http://www.pip-installer.org/en/latest/configuration.html)

转载自 [http://topmanopensource.iteye.com/blog/2004853](http://topmanopensource.iteye.com/blog/2004853)
