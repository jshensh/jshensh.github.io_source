---
author: 403 Forbidden
comments: true
date: 2013-08-31 04:29:36+00:00
layout: post
slug: '%e8%87%aa%e5%88%b6%e5%9b%bd%e5%86%85%e5%85%8d%e8%b4%b9cdn-%e7%99%be%e5%ba%a6bae%e5%85%a8%e5%b9%b3%e5%8f%b0layer%e9%95%9c%e5%83%8fcdn%e5%8a%a0%e9%80%9f%e5%ae%89%e8%a3%85%e4%bd%bf%e7%94%a8'
title: 自制国内免费CDN-百度BAE全平台Layer镜像CDN加速安装使用
wordpress_id: 720
categories:
- 建站相关
---
[![bae-cdn_00](/uploads/201308/bae-cdn_00.gif)](/uploads/201308/bae-cdn_00.gif)
现在美国主机和VPS都差不多是白菜价格了，而国内的虚拟主机同等配置的价格基本是美国主机的几倍以上，但是就是这样的高价，还是有人愿意花钱将自己的空间放在国内，唯一的目的就是因为国内的空间对国内用户来说访问速度快。
因为各种原因而用上了美国主机的朋友，为了让自己的网站能够被访问得更快更稳定，使用CDN加速服务就是一个好办法，尤其是一些有日本、香港或者新加坡等亚太CDN服务器节点的，对加快美国主机的访问速度有很大帮助。
国内也有不少的CDN服务，部分CDN商还提供了免费CDN服务，但是前提是域名已经Bei案。这个条件实际非常矛盾，如果域名已经Bei案那肯定是首选用国内主机，用上了国内主机再用某些免费CDN，由于免费的服务限制太多，加速的效果反而会没有。
所以，求人还不求已，部落之前已经分享用新浪SAE空间搭建一个国内的免费CDN服务：[自制国内免费CDN加快网页加载速度:SaeLayerCDN](http://www.freehao123.com/cdn-saelayercdn/)，利用新浪SAE空间来给美国主机的网站加速效果是相当不错，尤其是图片加载这一块，可以大大减少网页加载时间。
本篇文章是SaeLayerCDN升级强化版本：Layer，出自[best33.com](http://best33.com/)博主之手，本来是期望博主自己写个图文教程给大家介绍一下，一直到现在看博主都没有写，部落就自己写了这篇如何用Layer在BAE空间搭建免费CDN。
Layer实际上支持的平台有：SAE（新浪）、BAE（百度）、GCS（盛大）、标准PHP（本地读写），大家如果想要将Layer应用到SAE或者自己的PHP主机上，请参考本篇文章介绍的将Layer应用在BAE空间的方法。
从部落的使用体验来看，Layer完全可以帮助打造下一个BAE或者SAE版本的“七牛”，Layer可以自动给网站博客在BAE上生成一个镜像，图片、JS、CSS等都可以实现CDN加速，支持防盗链保护，可手动URL刷新缓存，现在还支持Memcached内存缓存加速。

**一、在百度BAE空间上安装Layer免费CDN程序 **
1、Layer程序包下载：[https://github.com/oott123/Layer](https://github.com/oott123/Layer)

2、在文章开始前，你需要先熟悉BAE空间的基本操作，[百度BAE安装WordPress](http://www.freehao123.com/2013-baidu-bae/)、[BAE空间成功安装运行Discuz! X2.5](http://www.freehao123.com/bae-discuz-x2-5/)

3、先在百度BAE空间上创建一个应用。
[![百度BAE创建一个应用](/uploads/201308/bae-cdn_01.gif)](/uploads/201308/bae-cdn_01.gif)

4、然后设置好应用域名和应用名称、PHP环境等。
[![百度BAE设置好环境](/uploads/201308/bae-cdn_02.gif)](/uploads/201308/bae-cdn_02.gif)

5、最后到百度BAE中新建一个Bucket。
[![百度BAE新建一个Bucket](/uploads/201308/bae-cdn_03.gif)](/uploads/201308/bae-cdn_03.gif)

6、属性设置为公开读就可以了。
[![百度BAE属性为公开读](/uploads/201308/bae-cdn_04.gif)](/uploads/201308/bae-cdn_04.gif)

7、上传Layer程序包到BAE空间上，可以用在线上传代码包的形式，也可以用SVN、Git等方式。
[![百度BAE上传代码包](/uploads/201308/bae-cdn_05.gif)](/uploads/201308/bae-cdn_05.gif)

**二、开启Layer CDN加速的设置方法 **
1、BAE空间上可以在线编辑代码，或者你可以在本地编辑代码后再上传到BAE空间上。
[![百度BAE在线编辑代码](/uploads/201308/bae-cdn_06.gif)](/uploads/201308/bae-cdn_06.gif)

2、Layer的设置都在config.sample.inc.php文件中，打开该文件，可以看到Layer的基本设定。说明如下：
```php
/**********基本设定**********/
	define('STATIC_URL','http://www.freehao123.com/');	//源站URL
	define('DOMAIN','freecdnbae');	//使用云存储时，填写存储空间的名字；使用本地存储时，填写存储的相对路径。
	define('WELCOME_DOC',TRUE);	//空请求时是否显示欢迎界面

```


3、这里我用了我的Godaddy空间的域名来作演示，这是我修改的。
[![Layer镜像CDN基本设置](/uploads/201308/bae-cdn_07.gif)](/uploads/201308/bae-cdn_07.gif)

4、完成后，记得将你的BAE应用上线。
[![Layer镜像CDN应用上线](/uploads/201308/bae-cdn_08.gif)](/uploads/201308/bae-cdn_08.gif)

**三、Layer镜像CDN加速效果测试**
1、Layer和七牛镜像CDN有着类似的原理，图片在第一次被访问时会被自动同步到CDN服务器端，以后访问该图片时就是直接从CDN服务器中加载了。

2、测试你的Layer镜像CDN加速有没有生效，一个直接的办法就是替换掉图片的URL的域名，如果能打开，说明图片已经被Layer同步到了BAE或者SAE空间上了。
[![Layer镜像CDN测试生效](/uploads/201308/bae-cdn_09.gif)](/uploads/201308/bae-cdn_09.gif)

3、上面说了用Layer可以打造一个BAE版的“七牛”，原因是Layer可以将你的图片的路径完整地镜像出来，这一点有点像又拍云存储。
[![Layer镜像CDN路径缓存](/uploads/201308/bae-cdn_10.gif)](/uploads/201308/bae-cdn_10.gif)

4、除了图片，JS、CSS等静态文件也可以被Layer镜像。
[![Layer镜像CDN缓存CSS](/uploads/201308/bae-cdn_11.gif)](/uploads/201308/bae-cdn_11.gif)

5、被镜像的CDN路径完整被保留。
[![Layer镜像CDN完成保留](/uploads/201308/bae-cdn_12.gif)](/uploads/201308/bae-cdn_12.gif)

6、如果你用的是Wordpress，可以直接安装WP Super Cache插件，在CDN选项中开启，填写你的BAE镜像CDN域名地址即可。
[![Layer镜像CDN在Wordpress中开启](/uploads/201308/bae-cdn_13.gif)](/uploads/201308/bae-cdn_13.gif)

7、Layer镜像CDN加速效果可以看到我的Godaddy主机网站：s0su.com

**四、Layer镜像CDN加速防盗链,手动更新缓存,Memcached内存缓存**
1、同样是打开config.sample.inc.php文件，如果想要开启防盗链设置，请把“//”给删除，然后设置好你的文件外链的白名单。
[![Layer镜像CDN防盗链](/uploads/201308/bae-cdn_15.gif)](/uploads/201308/bae-cdn_15.gif)

2、define('PURGE_KEY','purge');这句是用来手动刷新缓存文件的，purge可以自己指定一个，要刷新某一个文件在服务器的缓存时，用域名URL+purge+文件路径刷新。

3、例如部落的http://freecdnbae.duapp.com/purge/uploads/2013/08/freehao123.jpg，用浏览器打开它就是刷新该图片在BAE空间上的缓存了。
[![Layer镜像CDN更新缓存](/uploads/201308/bae-cdn_16.gif)](/uploads/201308/bae-cdn_16.gif)

4、这是刷新缓存成功的提示。
[![Layer镜像CDN成功提示](/uploads/201308/bae-cdn_17.gif)](/uploads/201308/bae-cdn_17.gif)

5、Layer镜像CDN加速支持Memcached内存缓存，你只需要到BAE空间中开启Memcached内存缓存即可。
[![Layer镜像CDN开启内存缓存](/uploads/201308/bae-cdn_21.gif)](/uploads/201308/bae-cdn_21.gif)

**五、Layer镜像CDN加速设置自己的域名作CDN的域名**
1、前几天，部落分享了七牛云存储，可惜没有Bei案的网站只能使用七牛的二级域名，有朋友就因为这个不想用七牛。本次介绍的Layer镜像CDN可以完全解决此问题。

2、我们都知道BAE空间支持未Bei案的域名绑定空间，利用此特点，我们的Layer镜像CDN就可以使用自己的域名作为CDN的域名URL了，而且还照样是国内CDN，这点还强于七牛。

3、到BAE空间上添加新的域名绑定。
[![Layer镜像CDN域名绑定](/uploads/201308/bae-cdn_18.gif)](/uploads/201308/bae-cdn_18.gif)

4、域名绑定前需要先做CNAME解析到BAE给出的URL地址，等DNS解析生效后，你就可以成功在BAE空间上添加自己的域名了。
[![Layer镜像CDN完成解析](/uploads/201308/bae-cdn_19.gif)](/uploads/201308/bae-cdn_19.gif)

5、一旦域名绑定到了BAE空间上，你就可以使用马上在Layer镜像CDN中使用自己的域名了，文件加速效果如下：
[![Layer镜像CDN使用自己的域名URL](/uploads/201308/bae-cdn_20.gif)](/uploads/201308/bae-cdn_20.gif)

**六、Layer镜像CDN加速一些问题和小结**

1、经过部落测试发现，如果网页图片过多的话首次访问会比较感觉到慢，这是因为Layer需要将图片从美国主机上下载保存到百度BAE空间上，期间会消耗一定的时间。

2、Layer可以完全镜像图片、JS、CSS等文件，如果你使用了Layer出现了CSS加载不正常的情况，请直接在Wordpress的WP Super Cache插件中排除对CSS的CDN缓存。
[![Layer镜像CDN排除特定缓存](/uploads/201308/bae-cdn_14.gif)](/uploads/201308/bae-cdn_14.gif)

3、Layer镜像CDN支持自定义HTTP Host、自定义缓存后缀，极端特殊情况也能轻松使用，方便进行全站CDN。又因为Layer可直接用在PHP环境中，这意味着你可以在任意一台PHP主机上搭建一个免费CDN服务出来。

转载自 [http://www.freehao123.com/cdn-layer/](http://www.freehao123.com/cdn-layer/)
