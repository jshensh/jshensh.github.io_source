---
author: 403 Forbidden
comments: true
date: 2013-08-07 03:57:06+00:00
layout: post
slug: '%e5%ae%8c%e7%be%8e%e9%80%82%e7%94%a8%e4%ba%8elnmpamh%e5%b9%b3%e6%bb%91%e5%8d%87%e7%ba%a7tengine%e6%9c%80%e6%96%b0%e7%89%88%e7%9a%84%e6%96%b9%e6%b3%95'
title: 完美适用于LNMP/AMH平滑升级Tengine最新版的方法
wordpress_id: 595
categories:
- VPS 技术
---
相信现在用 VPS 的个人真的不少，对于许多人来说 LNMP 和 AMH 算是最好不过的环境了
[![20130728180444699](/uploads/201307/20130728180444699.png)](/uploads/201307/20130728180444699.png)
关于 Tengine 的话介绍就不必多说，这个是阿里（某宝）的一项开源 Web 服务器项目。针对大访问量的网站和性能都有比较好的优化，当然、这是基于 Nginx 的！

一、安装/编译，这个方法适合军哥的 LNMP 和 AMH，不多说、给你一坨代码执行即可：
```shell
wget -c http://tengine.taobao.org/download/tengine-1.4.6.tar.gz && tar zxvf tengine-1.4.6.tar.gz && cd tengine-1.4.6/ && ./configure && make && mv /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.old && cp -r objs/nginx /usr/local/nginx/sbin/nginx && vi /usr/local/nginx/conf/nginx.conf

```


二、删除配置，上面后面会有专门讲解，你在这段代码过后就会进入编辑器、输入“ i ”，找出如下：
```
location /status {
	stub_status on;
	access_log   off;
}

```


三、查看状态，找到上面代码之后果断删除，找不到就看看 Nginx 是否正常：
```shell
/usr/local/nginx/sbin/nginx -t

```

如果有“ Successful ”结尾那就是没问题，最后收尾就好了！

收尾工作：停止 Nginx 并重启然后查看目前版本：
```shell
kill -USR2 `cat /usr/local/nginx/logs/nginx.pid` && kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin` && /etc/init.d/nginx restart && /usr/local/nginx/sbin/nginx -v

```

如果你看到了 Tengine/1.4.6 的话那就是成功升级了！
[![20130728180559502](/uploads/201307/20130728180559502.jpg)](/uploads/201307/20130728180559502.jpg)
如果没问题、就可以开始正常使用了！

上面的代码详细讲解：
```shell
wget -c http://tengine.taobao.org/download/tengine-1.4.6.tar.gz #获取压缩包
tar zxvf tengine-1.4.6.tar.gz                                   #解压
cd tengine-1.4.6/                                               #进入目录
./configure                                                     #执行安装脚本
make                                                            #编译
mv /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.old  #备份配置
cp -r objs/nginx /usr/local/nginx/sbin/nginx                    #复制配置粘贴
vi /usr/local/nginx/conf/nginx.conf                             #配置 Nginx
/usr/local/nginx/sbin/nginx -t                                  #查看状态
kill -USR2 `cat /usr/local/nginx/logs/nginx.pid`                #杀进程
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`         #杀进程
/etc/init.d/nginx restart                                       #重启Nginx
/usr/local/nginx/sbin/nginx -v                                  #查看Nginx版本

```


我就不上那么多图了，看起来命令很多、事实上一下就执行完了！

转载自：[http://www.zntec.cn/archives/nginx-change-tengine.html](http://www.zntec.cn/archives/nginx-change-tengine.html)
