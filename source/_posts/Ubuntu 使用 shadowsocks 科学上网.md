---
author: 403 Forbidden
comments: true
date: 2015-05-31 12:26:30+00:00
layout: post
slug: ubuntu-%e4%bd%bf%e7%94%a8-shadowsocks-%e7%a7%91%e5%ad%a6%e4%b8%8a%e7%bd%91
title: Ubuntu 使用 shadowsocks 科学上网
wordpress_id: 2218
categories:
- Linux Desktop
---
　　不知道为什么我的系统运行有 gui 的版本会假死。。Ubuntu 14.04：
[![2015-05-31 20:10:21屏幕截图](/uploads/2015/05/2015-05-31-201021屏幕截图-300x174.png)](/uploads/2015/05/2015-05-31-201021屏幕截图.png)
　　所以，我用了 sslocal + tsocks 实现的科学上网，chrome 需要插件 SwitchyOmega，文末提供下载链接及安装配置方法。
　　首先，安装 sslocal，``pip install shadowsocks``

　　安装完成后，新建 json 配置文件，这里位置为 /etc/shadowsocks.json，文件内容大致如下：
[![QQ截图20150531201514](/uploads/2015/05/QQ截图20150531201514-300x182.png)](/uploads/2015/05/QQ截图20150531201514.png)
　　配置完成后，运行 sslocal
```shell
sslocal -c /etc/shadowsocks.json --pid-file /var/run/shadowsocks.pid -d start
```

　　安装 tsocks 实现 socks5 转 http 代理：
```shell
apt-get install tsocks
```

 　　配置 tsocks（/etc/tsocks.conf）：
[![QQ截图20150531201836](/uploads/2015/05/QQ截图20150531201836-300x182.png)](/uploads/2015/05/QQ截图20150531201836.png)
　　使用时只需在命令前加上 tsocks 即可，比如 tsocks apt-get update

　　关于 chrome 的配置：
　　下载 [SwitchyOmega](/uploads/2015/05/SwitchyOmega.zip)，并解压。将解压出来的 SwitchyOmega.crx 拖动至 [chrome://extensions/](chrome://extensions/) 安装即可。
　　安装完成后会自动弹出配置页，如图配置即可：
[![2015-05-31 20:25:54屏幕截图](/uploads/2015/05/2015-05-31-202554屏幕截图-300x169.png)](/uploads/2015/05/2015-05-31-202554屏幕截图.png)
