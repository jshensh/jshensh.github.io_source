---
author: 403 Forbidden
comments: true
date: 2015-09-29 07:01:19+00:00
layout: post
slug: '%e5%88%9d%e8%af%86-docker-%e4%bd%bf%e7%94%a8-tenxcloud-com-%e6%90%ad%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84%e5%ba%94%e7%94%a8'
title: 初识 Docker - 使用 tenxcloud.com 搭建自己的应用
wordpress_id: 2304
categories:
- VPS 技术
---
2015-09-30 更新:
daocloud 提供的配额更慷慨，各位有兴趣的话可以走我的邀请链接: [https://account.daocloud.io/signup?invite_code=r7vcv0n2nenytal22llp](https://account.daocloud.io/signup?invite_code=r7vcv0n2nenytal22llp)，绑定微信的话送一个容器配额，一共三个。

需要搭 WordPress 的，请直接移步 [http://www.freehao123.com/tenxcloud/](http://www.freehao123.com/tenxcloud/)

不知道什么是 Docker 的，请移步 [http://baike.baidu.com/view/11854949.htm](http://baike.baidu.com/view/11854949.htm)。我认为这和以前的 PaaS 类云平台(比如 appfog)差不多，都是布置完即成型，所有修改不保存的东西。
来看看探针: [http://musics-johnshen.tenxcloud.net/](http://musics-johnshen.tenxcloud.net/) (5M 共享带宽，28 块一个月的，所以要是探针失效了别来找我，多半是我觉得不划算了)
好，接下来进入正题，如何在时速云上部署你的 PHP 应用。(其实官方有个 PHP 的 Hello world 的，但哔了狗的不能用)

首先，[下载代码包](/uploads/2015/09/Yahei.zip)并使用 git 上传到你喜欢的平台。然后打开时速云，选择构建，点击添加源代码，并登录你的 github 账号(当然你要是想只放个探针可以选快速构建，而不是添加源代码，然后在下一步中照我的填):
[![Screenshot_2015-09-29-14-31-26](/uploads/2015/09/Screenshot_2015-09-29-14-31-26.png)](/uploads/2015/09/Screenshot_2015-09-29-14-31-26.png)
选择你要构建的项目之后，你可以修改你的镜像名称，然后点击创建:
[![Screenshot_2015-09-29-14-31-52](/uploads/2015/09/Screenshot_2015-09-29-14-31-52.png)](/uploads/2015/09/Screenshot_2015-09-29-14-31-52.png)
创建完成之后:
[![Screenshot_2015-09-29-14-32-07](/uploads/2015/09/Screenshot_2015-09-29-14-32-07.png)](/uploads/2015/09/Screenshot_2015-09-29-14-32-07.png)
可点击你的项目的名称进入以下界面并快速部署你的应用:
[![Screenshot_2015-09-29-14-32-29](/uploads/2015/09/Screenshot_2015-09-29-14-32-29.png)](/uploads/2015/09/Screenshot_2015-09-29-14-32-29.png)
填上服务名称，创建即可:
[![Screenshot_2015-09-29-14-32-48](/uploads/2015/09/Screenshot_2015-09-29-14-32-48.png)](/uploads/2015/09/Screenshot_2015-09-29-14-32-48.png)
