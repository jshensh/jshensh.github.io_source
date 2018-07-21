---
author: 403 Forbidden
comments: true
date: 2013-07-29 03:57:56+00:00
layout: post
slug: debian%e4%b8%8b%e5%ae%89%e8%a3%85gnome%e6%a1%8c%e9%9d%a2%e5%92%8c%e7%94%a8vnc%e8%bf%9c%e7%a8%8b%e8%ae%bf%e9%97%ae
title: debian下安装gnome桌面和用vnc远程访问
wordpress_id: 534
categories:
- VPS 技术
---
debian系统下的命令操作大家都很熟悉了，最近用到桌面管理，就安装了下gnome的桌面。
当让linux下还有很多桌面，如kde、lxde等等。
今天主要是介绍下在debian系统下安装gnome桌面和安装tightvnc进行远程连接操作。

一、登陆ssh后：
输入以下命令
```shell
apt-get update&apt-get upgrade
```


二、安装gnome：
我只安装了精简的内核文件，因为vps上的内存资源是有限的
```shell
apt-get install x-window-system-core
apt-get install gnome-desktop-environment

```

安装后需要安装下字体文件：
```shell
apt-get install xfonts-100dpi
apt-get install xfonts-100dpi-transcoded
apt-get install xfonts-75dpi
apt-get install xfonts-75dpi-transcoded
apt-get install xfonts-base

```


三、安装编译后需要安装下vnc的服务端tightvnc：
```shell
apt-get install tightvncserver
tightvncserver :1

```

这个时候需要你设置vnc的密码 输入两遍。
```shell
tightvncserver -kill :1 
vi ~/.vnc/xstartup # 编辑vnc的启动界面

```

配置文件如下：
```
xrdb $HOME/.Xresources
xsetroot -solid grey
x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" &
#x-window-manager &
# Fix to make GNOME work
#export XKL_XMODMAP_DISABLE=1
#/etc/X11/Xsession
gnome-session &

```

配置完成后启动vnc服务 命令为：
```shell
tightvncserver -geometry 800x600 :1 #分辨率是800*600
```


四、用vncview来进行访问
我们开启了1号 默认访问端口为5901
[![03d017d11b9018aba8f80cdc35aaad9b20120723081303](/uploads/201307/03d017d11b9018aba8f80cdc35aaad9b20120723081303.png)](/uploads/201307/03d017d11b9018aba8f80cdc35aaad9b20120723081303.png)
[![b01c2ce25e34f80d499f0488d034b00b20120723081304](/uploads/201307/b01c2ce25e34f80d499f0488d034b00b20120723081304.png)](/uploads/201307/b01c2ce25e34f80d499f0488d034b00b20120723081304.png)
[![b07f55c7fd136392763729b9782f777620120723081305](/uploads/201307/b07f55c7fd136392763729b9782f777620120723081305.png)](/uploads/201307/b07f55c7fd136392763729b9782f777620120723081305.png)
[![d5aaca660e8ae9c023e3fdc116b9875720120723081302](/uploads/201307/d5aaca660e8ae9c023e3fdc116b9875720120723081302.png)](/uploads/201307/d5aaca660e8ae9c023e3fdc116b9875720120723081302.png)

转载自：[http://www.ovzxen.com/post-29.html](http://www.ovzxen.com/post-29.html)
