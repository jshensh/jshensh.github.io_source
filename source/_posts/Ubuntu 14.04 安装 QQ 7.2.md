---
author: 403 Forbidden
comments: true
date: 2015-06-02 13:24:27+00:00
layout: post
slug: ubuntu-14-04-%e5%ae%89%e8%a3%85-qq-7-2
title: Ubuntu 14.04 安装 QQ 7.2
wordpress_id: 2226
categories:
- Linux Desktop
---
　　首先，添加 ppa，并安装 wine1.7。要是 apt-get update 的时候报错请参考前一篇文章《[Ubuntu 使用 shadowsocks 科学上网](http://futa.ooo/2218.html)》。
```shell
sudo add-apt-repository ppa:ubuntu-wine/ppa
sudo apt-get update
sudo apt-get install wine1.7
```

　　wine 1.7 安装完成后，安装一些依赖：
```shell
winetricks riched20 gdiplus msxml4 vcrun2005 msctf mfc42 fakechinese corefonts sound=alsa
```

　　之后，将 win 下字体文件夹（C:\Windows\Fonts）内的所有字体复制至 ~/.wine/drive_c/windows/Fonts。
　　打开 [http://im.qq.com](http://im.qq.com) 下载最新版 QQ，双击安装即可。
　　安装完成后，需要自行建立快捷方式：
```shell
vi ~/桌面/QQ.desktop
```

```
[Desktop Entry]
Name=腾讯QQ
Exec=wine "C:\\Program Files (x86)\\Tencent\\QQ\\bin\\QQ.exe"
Type=Application
StartupNotify=true
```

　　给快捷方式加上可执行权限：
```shell
chmod +x ~/桌面/QQ.desktop
```


　　效果如图
[![Screenshots_2015_06_02_21_09_01](/uploads/2015/06/Screenshots_2015_06_02_21_09_01-300x169.png)](/uploads/2015/06/Screenshots_2015_06_02_21_09_01.png)

　　小 bug 还是有点的，比如图中有些字依旧是方块，不过是字体问题，找到对应字体 copy 下就行。还有，切记！千！万！不！能！最！小！化！消！息！列！表！因为没有状态栏。。。要是不小心最小化或者不见了，可以用以下命令解决问题：
```shell
killall QQ.exe
wine "C:\\Program Files (x86)\\Tencent\\QQ\\bin\\QQ.exe"
```

　　你没看错。。就是重启 QQ

　　最后，提供几个比较好的补丁，希望各位喜欢：



	
  * [QQ7.3小清新补丁](http://www.laibude.com/blog/22.html)

	
  * [腾讯QQ7.x 去整体安全校验补丁v3.0](http://www.zdfans.com/589.html)

	
  * [腾讯QQ7.2 正式版SVIP超级会员补丁](http://www.zdfans.com/583.html)



　　感谢 [(╯‵□′)╯︵┻━┻](https://www.maou.me) 提供技术支持。

　　参考：



	
  * [Linux 通过 Wine 来安装最新 QQ 的方法](https://www.maou.me/20.html)

	
  * [彻底消除wine中文乱码、QQ等](http://blog.aizhet.com/Windows/12172.html)

	
  * [Ubuntu12.04+Wine1.7.12近完美使用QQ5.0](http://forum.ubuntu.org.cn/viewtopic.php?f=121&t=455783)


