---
author: 403 Forbidden
comments: true
date: 2018-08-13 14:16:02+00:00
layout: post
title: 斐讯 N1 折腾记：运行 Linux 及优化
categories:
- 斐讯
---
　　咳咳咳，上篇教程教大家给斐讯 N1 降级并且刷了官改系统，可以当作一个电视盒子和下载机来使用。
　　有些小伙伴可能不想把它当作电视盒子，就想把它当作 NAS 或者是服务器，但是总不能拿 Android 玩吧，Android 也不是针对服务器设计的。
　　那么我们说过，N1 不仅能刷官改，还能运行 Linux，而且是完整的 Linux 发行版，用 Linux 当服务器、NAS、下载机，包括电视盒子，体验总是要比 Android 好的。
　　这篇教程就教大家如何在斐讯N1运行 Linux 以及后续的优化，在此之前，需要将你的 N1 降级并刷入 webpad 的官改固件，或者只刷入降级关键分区（感谢群里的小伙伴反馈）。传送门：[《斐讯N1折腾记：降级及刷入官改》](/2018/08/12/%E6%96%90%E8%AE%AF%20N1%20%E6%8A%98%E8%85%BE%E8%AE%B0%EF%BC%9A%E9%99%8D%E7%BA%A7%E5%8F%8A%E5%88%B7%E5%85%A5%E5%AE%98%E6%94%B9/)

## 制作 Linux 启动盘

　　N1 运行 Linux 的原理是通电的时候引导 U 盘里的系统
　　所以我们需要准备一个 U 盘来制作启动盘，U 盘大小推荐不低于 8G，连续读写速度推荐达到 30M/s，随机读写速度推荐达到 10M/s。最好是买个全新的，如果是旧的，提前备份好U盘内数据。
　　N1 运行的 Linux 发行版叫做 Armbian，玩过树莓派的小伙伴应该对这个系统不陌生，是适用于 ARM 架构的 Debian 和 Ubuntu。

>　　下载地址
>
>　　Armbian：
>　　[https://yadi.sk/d/pHxaRAs-tZiei](https://yadi.sk/d/pHxaRAs-tZiei)
>　　[https://mega.nz/#F!j9QSDQSQ!6WpasOlbZYIInfw6yo4phQ](https://mega.nz/#F!j9QSDQSQ!6WpasOlbZYIInfw6yo4phQ)
>　　[https://share.weiyun.com/5eCvcvS](https://share.weiyun.com/5eCvcvS) （部分搬运）密码：mivmcn
>　　启动盘制作工具：[https://www.alexpage.de/usb-image-tool/download/](https://www.alexpage.de/usb-image-tool/download/)

　　里面有好几个版本，下载最新的 5.44 版本，然后选择 kernel_3.14，3.14 内核在 N1 上面使用最好，WiFi、蓝牙都可以正常工作，如果你不需要蓝牙和 WiFi，也可以使用 4.16 版本。

>　　IMG 文件名含义
>
>　　例如：``Armbian_5.44_S9xxx_Debian_stretch_3.14.29_server_20180601.img``
>　　Armbian：这个就不多说了
>　　5.44：Armbian 的版本号
>　　S9xxx：适用的 CPU
>　　Debian：基于 Debian 编译的，另外还有 Ubuntu。
>　　stretch：Debian 或 Ubuntu 的发行版代号，stretch 表示的是 Debian 9。
>　　3.14.29：Linux 内核版本号
>　　server：桌面环境，Server 代表的是服务器版，没桌面环境，其他的代表的是相应的桌面环境，比如：xfce、mate。
>　　20180601：编译日期

　　小白推荐使用 Ubuntu，桌面环境推荐使用 mate。我推荐使用 Debian Server，做一个真正的服务器。
　　下面我会以 Armbian_5.44_S9xxx_Debian_stretch_3.14.29_server_20180601 版为例
　　首先格式化你的U盘分区格式为 FAT32，推荐最好把U盘分区全部删除。
　　打开启动盘制作工具：左侧选择你的U盘 → 点击 [Restore] → 选择 Linux 镜像文件 → 提示框点击 [是] → 等待制作完成
　　制作完成后，会出现一个名为 BOOT 的分区，打开它。如果你把分区全部删除了，BOOT 分区默认是 FAT16 格式，Windows 是不会显示的，可以使用 Ubuntu 来访问。
　　把``dtb``文件夹里的``gxl_p230_2g.dtb``复制到 BOOT 分区的根目录并重命名为``dtb.img``。如果是 4.16 内核，dtb 文件是``meson-gxl-s905d-p230.dtb``。
　　将 N1 断电，插上 U 盘、网线，最好是插靠近 HDMI 接口那个 USB 接口，通电开机。
　　正常情况下顺利开机并进入 Linux 系统，如果没有进入 Linux 系统而是进入了 Android 系统，ADB 连接至 N1，输入``adb shell reboot update``。
　　接下来的操作我会以 SSH 远程连接为例，如果你使用 HDMI 连接显示器也可以，这种情况推荐你连接一个 USB HUB，方便连接鼠标和键盘，当然，如果你用的是 Server，那么就不需要鼠标了。
　　用户：root
　　密码：1234
　　如何获取 N1 运行 Linux 的 IP？打开 cmd，输入``nslookup amlogic``，如果``amlogic``无法解析IP，可以尝试解析``aml``。
　　首次登陆需要重置密码，先输入当前密码（1234），再输入新密码以及确认新密码。
　　设置完密码之后会让你新建一个普通用户，如果是使用 Server，直接按 Ctrl + C 跳过。如果是使用桌面版，推荐创建一个普通用户，按照提示操作即可。
　　跳过之后，再次使用 SSH 连接。
　　这时候，整个系统就可以用了，不过我们需要做一些小工作。

## 小工作

　　加载 WiFi 驱动：``modprobe dhd && echo dhd >> /etc/modules``
　　设置时区：``echo "Asia/Shanghai" > /etc/timezone && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime``
　　删除默认DNS：``rm /etc/resolvconf/resolv.conf.d/head && touch /etc/resolvconf/resolv.conf.d/head && systemctl restart network-manager.service``
　　注：在重启系统后，输入``cat /etc/resolv.conf``，查看返回结果的第一行是否为``nameserver 8.8.8.8``，如果不是，则表示删除成功，如果是，则再执行一次删除命令。
　　停止红外支持：``systemctl stop lircd.service lircd-setup.service lircd.socket lircd-uinput.service lircmd.service``
　　删除红外支持：``apt remove -y lirc && apt autoremove -y``
　　N1 没有红外，而且由于红外支持找不到红外，一直给系统日志写错误。
　　重启系统：``reboot``
　　更新软件包：``apt update && apt upgrade -y``

### 挂载外置存储设备

　　推荐把外置存储设备分区格式化为 ext4 格式，不推荐使用 NTFS 格式。
　　如果你的外置存储设备是 NTFS 格式，可以使用``mkfs.ext4``命令将你的外置存储设备格式化为 ext4 格式，格式化前提前备份数据。
　　可以用``fdisk -l``查看你的外置存储设备是那个设备，一般是``/dev/sdb``，分区是``/dev/sdb1``，如果有多个分区，依次类推。
　　输入``mkfs.ext4 /dev/sdb1``将分区格式化为 ext4，格式化完成后使用``fdisk -l``查看是否格式化成功，如果分区的 Type 属性为 Linux（如下图所示），表示分区为 ext4/3。

[![fdisk](/uploads/2018/08/fdisk.png)](/uploads/2018/08/fdisk.png)

　　格式化成功后，为了方便挂载，可以给分区设置一个卷标。
　　命令：``e2label``
　　设置卷标示例：``e2label /dev/sdb1 H1``
　　查看卷标示例：``e2label /dev/sdb1``
　　然后就可以挂载分区了
　　挂载分区示例：``echo "LABEL=H1 /mnt ext4 defaults,noatime,nodiratime 0 2" >> /etc/fstab``
　　此命令会将卷标为 H1 的分区挂载到 /mnt 目录下
　　重启系统使挂载生效

### Samba 网络共享

　　使用 Samba 将外置存储设备共享给其他设备
　　Samba 可以使用 Armbian 自带的一个可视化菜单来配置，非常方便。
　　启动 Armbian 配置菜单：``armbian-config``
　　选择 [Software] → [Softy] → 选中 (空格) [Samba] → 回车 → 输入 samba 用户名和密码 → 工作组填写 WORKGROUP → 等待安装完成
　　安装后，它会自动弹出修改配置文件的界面。

[![samba](/uploads/2018/08/samba.png)](/uploads/2018/08/samba.png)

　　将红框里的内容删除
　　将 ext 的 path 改为 /mnt，如果你的挂载路径不是 /mnt，则改为你的挂载路径。
　　按下 TAB 键 → 选择 [OK] → 保存退出
　　Samba 网络共享配置完成

## 后话

　　小山觉得，既然斐讯 N1 的定位是 NAS，那么运行 Android 系统是显然满足不了 NAS 这个属性的，只有运行稳定且高效的 Linux 才可以称为 NAS。
　　Linux 有着更多的扩展性，你可以在上面任意的折腾，比如搭建个开发环境，Web 服务器等等。
　　总而言之，几十块钱买个 N1 这样的玩具，小山觉得是非常值的。
　　还是那句话：文章有什么不懂的地方，欢迎在下方或者在QQ群告诉我。
　　以后如果我想到 N1 的更多玩法会继续分享给大家的，再次感谢所有为 N1 可玩性付出的人。
　　本篇文章参考了以下资料：

- [https://forum.armbian.com/topic/2419-armbian-for-amlogic-s905-and-s905x/](https://forum.armbian.com/topic/2419-armbian-for-amlogic-s905-and-s905x/)
- [http://www.right.com.cn/forum/thread-323198-1-1.html](http://www.right.com.cn/forum/thread-323198-1-1.html)
- [http://www.right.com.cn/forum/thread-326034-1-1.html](http://www.right.com.cn/forum/thread-326034-1-1.html)

　　转载自 [https://www.mivm.cn/phicomm-n1-linux/](https://www.mivm.cn/phicomm-n1-linux/)