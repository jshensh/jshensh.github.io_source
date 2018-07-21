---
author: 403 Forbidden
comments: true
date: 2013-07-30 03:48:53+00:00
layout: post
slug: debian-6%e7%94%a8qemu%e5%ae%89%e8%a3%85windows-xp%e3%80%8198%e5%92%8cwine%e8%bf%90%e8%a1%8cwindows%e8%bd%af%e4%bb%b6
title: Debian 6用Qemu安装Windows XP、98和Wine运行Windows软件
wordpress_id: 542
categories:
- VPS 技术
---
[![Debian 6用Qemu安装Windows XP、98和Wine运行Windows软件](/uploads/201307/debian-xp_00.jpg)](/uploads/201307/debian-xp_00.jpg)
一些低内存的VPS无法顺畅去运行Windows系统，因为相对于Linux操作系统来说，Windows系统不仅占用资源大，而且还不适合运行PHP程序。

不过，貌似有不少的朋友对在VPS上使用Windows系统非常地感兴趣，即使OVH的VPS只有Linux，也有朋友留言想让我测试一下网上“流传”的在Debian 6安装和运行Windows XP的方法，光听这个名字就应该会觉得很好玩。

所以这次的VPS教程就来和大家分享一下如何在Debian 6的Linux VPS主机上安装运行Windows XP、Windows 98操作系统，同时，介绍一个Wine模拟器软件，它的强大之处是将Windows系统下的软件在Linux系统下稳定运行。

例如你可以在Linux VPS主机上，直接安装QQ.exe等这种只能在Windows主机使用的软件，上次有朋友说想在VPS上主机上挂QQ，用Wine不仅可以挂QQ，还可以挂旺旺、迅雷、安装浏览器等，总之，如果你的VPS内存足够，你可以把它当成Windows来“使唤”。

PS：VPS主机是Ubuntu系统的朋友可以采用[lanyus.com](http://www.lanyus.com/)博主的安装方法：
```shell
apt-get update
sudo apt-get install kvm qemu -y
mkdir kvm
cd kvm
wget http://184.82.64.121/winxp.img
cd ../
apt-get install vnc4server -y
vncserver
vncserver -kill :1
chmod +x ~/.vnc/xstartup
echo ‘kvm -hda kvm/winxp.img -m 128M -net nic,model=virtio -net user -redir tcp:3389::3389′>>/root/.vnc/xstartup
wget http://www.zhujis.com/myvps/vncserver
cp vncserver /etc/init.d/
chmod +x /etc/init.d/vncserver
update-rc.d vncserver defaults
reboot

```

**一、Linux主机安装Windows XP、98和运行Windows软件**

1、Linux系统与Windows系统应该是“水火不容”的，Linux开源免费，Windows独立收费，两个生来就已经注定了要走向相反的路线，没有商量的余地。
2、不过我们却可以利用Qemu这一套由Fabrice Bellard所编写的模拟处理器的软件，将Windows XP和Windows 98强行安装在Linux VPS上。
3、而如果想要在Linux主机上运行Windows软件，则需要利用Windows模拟器Wine，Wine的作用就是让在Linux上安装Windows系统软件。
4、Wine虽然是为Linux定制，但也支持FreeBSD、Mac OS X（Intel版）与Solaris-x86。一些发行版安装WINE时会自动关联EXE程序，这样直接双击可以运行。

**二、在Debian 6用Qemu安装Windows XP**
1、本次测试的平台是：OVH的VPS，操作系统是Debian 6.x 32位。
2、执行下列代码，依次完成安装的是：vnc4server、vncserver、qemu、创立镜像、设置开机启动。
```shell
apt-get update
apt-get install vnc4server qemu -y
vncserver
chmod +x ~/.vnc/xstartup
echo 'qemu  -hda winxp.img -m 128M -net nic,model=virtio -net user -redir tcp:3389::3389'>>/root/.vnc/xstartup
wget http://www.zhujis.com/myvps/vncserver
cp vncserver /etc/init.d/
chmod +x /etc/init.d/vncserver
update-rc.d vncserver defaults

```

3、在执行vncserver时会要求输入两次密码。
[![Debian 6要求输入密码](/uploads/201307/debian-xp_01.gif)](/uploads/201307/debian-xp_01.gif)
4、接下来就是下载一个Windows XP的.img磁盘镜像文件，让你的VPS开机利用Qemu加载Windows XP的 .img，从而达到模拟Windows XP系统。
5、执行以下代码，就可以将Windows XP的.img磁盘镜像下载到你的VPS主机上了，然后重启VPS。
```shell
wget http://184.82.64.121/winxp.img
reboot

```

6、注意上述Windows XP的.img磁盘镜像文件来自[abfan.com](http://www.hiblog.info/index.php/archives/20/)站长，我已经将该镜像放在我的BurstNET VPS主机上了。
7、当然如果你自己手中有好的Windows XP的.img磁盘镜像，也可以直接上传或者下载到你的VPS主机中。

**三、Linux主机运行Windows XP效果测试**
1、首先要使用你的Windows系统的“远程桌面连接”工具，连接到VPS主机上。貌似有些盗版的Windows可能找不到远程桌面连接工具。
[![Debian 6远程连接](/uploads/201307/debian-xp_02.gif)](/uploads/201307/debian-xp_02.gif)
2、输入你的VPS的IP地址，连接上了VPS，网络速度慢的话可能要等一会儿。
[![Debian 6网络速度慢](/uploads/201307/debian-xp_03.gif)](/uploads/201307/debian-xp_03.gif)
3、然后用账号administrator和密码abfan.com登陆VPS的Windows XP。 （点击放大）
[![Debian 6登录XP系统](/uploads/201307/debian-xp_04.gif)](/uploads/201307/debian-xp_04.gif)
4、第一次进入VPS需要加载Windows XP设置。
[![Debian 6加载个人设置](/uploads/201307/debian-xp_05.gif)](/uploads/201307/debian-xp_05.gif)
5、最后在Linux VPS中看到了Windows XP画面就是这样。（点击放大）
[![Debian 6运行Windows XP效果](/uploads/201307/debian-xp_06.gif)](/uploads/201307/debian-xp_06.gif)
6、Windows的开始菜单、程序运行等这些都已经具备并可以正常使用。
[![Debian 6开始菜单运行](/uploads/201307/debian-xp_07.gif)](/uploads/201307/debian-xp_07.gif)
7、用“古老”的IE6打开网页，基本上没有问题。（点击放大）
[![Debian 6用IE浏览器网页](/uploads/201307/debian-xp_08.gif)](/uploads/201307/debian-xp_08.gif)
8、再看一下VPS主机的内存和资源使用情况，OVH的128主机的内存已经去掉了一半，CPU还算可以。（点击放大）
[![Debian 6查看主机资源](/uploads/201307/debian-xp_09.gif)](/uploads/201307/debian-xp_09.gif)

**四、在Debian 6用Qemu安装Windows 98**
1、Windows XP在OVH的128内存的主机上运行还是比较卡的，所以再来试试Windows 98。
2、假设你已经按照上面的步骤在Linux主机上搭建起了Windows XP系统，你只需要执行这一代码。
```shell
vim /root/.vnc/xstartup

```

3、将原来的winxp.img那一行代码删除，替换成下面的代码即可。
```shell
qemu  -hda W98.img -m 128M -net nic,model=virtio -net user -redir tcp:3389::3389

```

[![Debian 6安装Windows 98](/uploads/201307/debian-xp_10.gif)](/uploads/201307/debian-xp_10.gif)
或者直接执行下列代码，效果和上面是一样的：
```shell
echo 'qemu  -hda W98.img -m 128M -net nic,model=virtio -net user -redir tcp:3389::3389'>>/root/.vnc/xstartup

```

4、然后还是下载Windows 98的.img磁盘镜像文件和重启VPS，执行下列代码。
```shell
wget http://www.zhujis.com/myvps/W98.img

```

5、Windows 98的.img磁盘镜像是放在我的Godaddy主机上，如果不能下载，请反馈给我。

**五、Linux主机运行Windows 98效果测试**
1、因为Windows 98无法使用Windows XP系统那样的远程桌面连接，所以你还需要使用VNC来远程连接你的VPS。
2、这是OVH的128内存VPS上跑Windows 98的开机画面，和今天的Windows 8相比，是不是觉得当年很流行的W98很丑陋？（点击放大）
[![Debian 6开机画面](/uploads/201307/debian-xp_11.gif)](/uploads/201307/debian-xp_11.gif)
3、这是Windows 98的桌面，很简洁，当然开机速度也很快，只有短短几秒钟就可以进入系统了。
[![Debian 6快速进入桌面](/uploads/201307/debian-xp_12.gif)](/uploads/201307/debian-xp_12.gif)
4、这是Linux主机运行Windows 98的“我的电脑”，控制面板、打印机、系统硬盘、移动Disk就可以操作。
[![Debian 6选择Windows 98效果](/uploads/201307/debian-xp_13.gif)](/uploads/201307/debian-xp_13.gif)

**六、Linux主机利用Wine运行Windows软件**
1、本次测试环境：OVH的VPS平台，操作系统是Debian 6.x 32位，已经安装桌面Xfce和VNC。
2、执行下列代码安装wine。
```shell
apt-get install wine

```

[![Wine安装完成](/uploads/201307/megayoutubeviews_09.gif)](/uploads/201307/megayoutubeviews_09.gif)
3、安装wine完成后，点击菜单中的 Wine configuration。
[![Wine软件配置](/uploads/201307/megayoutubeviews_10.gif)](/uploads/201307/megayoutubeviews_10.gif)
4、进入后，程序弹出警告对话框：点击 okay 按钮，稍候片刻，会出现设置窗口，这就是运行Windows软件的界面。（点击放大）
[![Wine运行Windows软件](/uploads/201307/megayoutubeviews_11.gif)](/uploads/201307/megayoutubeviews_11.gif)
5、有了Wine后，现在你可以在Linux上“肆无忌惮”地去下载和安装Windows软件：QQ.exe、Xunlei.exe、Chrome.exe……
6、下载了Windows软件后，只要选择用Wine 打开，就可以像在Windows系统上安装软件一样执行下一步的安装与操作了。 （点击放大）
[![Wine启动软件](/uploads/201307/megayoutubeviews_19.gif)](/uploads/201307/megayoutubeviews_19.gif)
7、国人最喜欢用Wine的地方应该是在Linux主机上做gomez peer挂机网赚，因为Gomez Peer的挂机软件只有Windows版本的。
[![用Wine来做挂机网赚](/uploads/201307/megayoutubeviews_20.gif)](/uploads/201307/megayoutubeviews_20.gif)

**七、Linux安装Windows系统软件小结**
1、Windows XP的.img磁盘镜像有800多MB，VPS的下载速度如果不是几MB/s的话，你要等的时间可能要长一些。
2、用了Wine后你安装Firefox，然后挂上Vagex就成了很容易的事情了，而像Gomez Peer这样的Windows专版也不在话下。

转载自：[http://www.freehao123.com/debian-6-qemu/](http://www.freehao123.com/debian-6-qemu/)
