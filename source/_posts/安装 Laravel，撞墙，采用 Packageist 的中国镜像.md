---
author: 403 Forbidden
comments: true
date: 2016-10-27 03:11:00+00:00
layout: post
slug: '%e5%ae%89%e8%a3%85-composer%ef%bc%8c%e5%88%9b%e5%bb%ba%e7%ac%ac%e4%b8%80%e4%b8%aa-laravel-%e9%a1%b9%e7%9b%ae%ef%bc%8c%e6%92%9e%e5%a2%99%ef%bc%8c%e9%87%87%e7%94%a8-packageist-%e7%9a%84%e4%b8%ad'
title: 安装 Laravel，撞墙，采用 Packageist 的中国镜像
wordpress_id: 2639
categories:
- Web 开发
---
参考：




    
  * [https://laravel.com/docs/5.2](https://laravel.com/docs/5.2) -- 英文手册

    
  * [http://laravel-china.org/docs/5.1](http://laravel-china.org/docs/5.1) -- 中文手册

    
  * [http://pkg.phpcomposer.com/](http://pkg.phpcomposer.com/) -- Packagist / Composer 中国全量镜像内（绕过垃圾的墙）



**安装 Laravel，创建 blog 项目**
安装方法有两种：




    
  1. 全局安装 Laravel Installer，然后用下面的指令创建新项目： laravel new blog

    
  2. 不安装啥，直接用 Composer 创建新项目：composer create-project --prefer-dist laravel/laravel blog



看起来第一种方案比较好，然而：
！说明！由于墙的存在，全局安装 Laravel Installer 的方案可能不会成功。

**全局安装 Laravel Installer**
```shell
composer global require "laravel/installer"
```


**执行命令**
```shell
laravel new blog
```


悲剧了，出现错误：
cURL error 7: Failed to connect to cabinet.laravel.com port 80: Timed out……
直接用 Composer 创建 Laravel 项目

参照网上的方案，先执行加速 composer 的执行（用国内的镜像，好人呐！）：
```shell
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

然后执行
```shell
composer global require "laravel/installer"
```

创建项目

转载自 [http://blog.sina.com.cn/s/blog_6262a50e0102ws9z.html](http://blog.sina.com.cn/s/blog_6262a50e0102ws9z.html)，有删改
