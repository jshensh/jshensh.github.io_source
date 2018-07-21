---
author: 403 Forbidden
comments: true
date: 2015-12-15 16:00:29+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8npm%e5%ae%89%e8%a3%85%e4%b8%80%e4%ba%9b%e5%8c%85%e5%a4%b1%e8%b4%a5%e4%ba%86%e7%9a%84%e7%9c%8b%e8%bf%87%e6%9d%a5%ef%bc%88npm%e5%9b%bd%e5%86%85%e9%95%9c%e5%83%8f%e4%bb%8b%e7%bb%8d'
title: 使用npm安装一些包失败了的看过来（npm国内镜像介绍）
wordpress_id: 2418
categories:
- Web 开发
---
这个也是网上搜的，亲自试过，非常好用！
镜像使用方法（三种办法任意一种都能解决问题，建议使用第三种，将配置写死，下次用的时候配置还在）:

1.通过config命令
```shell
npm config set registry https://registry.npm.taobao.org 
npm info underscore #如果上面配置正确这个命令会有字符串response
```


2.命令行指定
```shell
npm --registry https://registry.npm.taobao.org info underscore
```


3.编辑 ~/.npmrc 加入下面内容
```
registry = https://registry.npm.taobao.org
```


搜索镜像: [https://npm.taobao.org](https://npm.taobao.org)
建立或使用镜像,参考: [https://github.com/cnpm/cnpmjs.org](https://github.com/cnpm/cnpmjs.org)

转载自 [https://cnodejs.org/topic/4f9904f9407edba21468f31e](https://cnodejs.org/topic/4f9904f9407edba21468f31e)
