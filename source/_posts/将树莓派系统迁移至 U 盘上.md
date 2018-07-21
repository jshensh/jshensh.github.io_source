---
author: 403 Forbidden
comments: true
date: 2015-09-24 12:32:16+00:00
layout: post
slug: '%e5%b0%86%e6%a0%91%e8%8e%93%e6%b4%be%e7%b3%bb%e7%bb%9f%e7%a7%bb%e5%8a%a8%e8%87%b3-u-%e7%9b%98%e4%b8%8a'
title: 将树莓派系统迁移至 U 盘上
wordpress_id: 2295
categories:
- Linux Desktop
- 树莓派
---
　　新入手了个 pi 2B，先上张全家福（好吧图有点大）
[![20150924_195814](/uploads/2015/09/20150924_195814-300x169.jpg)](/uploads/2015/09/20150924_195814.jpg)
　　那啥，把系统移动到 u 盘里的好处应该不用我说了吧，相信各位也应该百度过了。但是！百度下来的各种教程却是各种麻烦，有用 U-Boot 的，有用 BerryBoot 的，反正就是各种奇奇葩葩的第三方。其实，事情并没有那么复杂：

为确保不会发生错误，本文所有语句均在 root 用户下执行**

**第一步：给 U 盘分区**
　　因为 U 盘比较大，所以不想全部用在树莓派上，当然各位要是土豪可以跳过这一步。
　　在这里需要注意的是，常用文件分区（FAT32/NTFS/exFAT）一定要分在第一个区，树莓派的 ext3 要分在第二个区，不然傻乎乎的 Windows 会不认识。如图：
[![QQ图片20150924201713](/uploads/2015/09/QQ图片20150924201713.png)](/uploads/2015/09/QQ图片20150924201713.png)
　　分区时可以不用管树莓派分区的文件系统，因为后续操作会覆盖掉。

**第二步：将 sd 卡中的系统迁移至 U 盘**
　　很简单，用 dd 就行了。在这里我的 U 盘是 sda，第二个分区：
```shell
dd if=/dev/mmcblk0p2 of=/dev/sda2 bs=4M
```

　　写完以后，修复 U 盘分区：
```shell
e2fsck -f /dev/sda2
resize2fs /dev/sda2
```

[![QQ截图20150924202346](/uploads/2015/09/QQ截图20150924202346.png)](/uploads/2015/09/QQ截图20150924202346.png)

**第三步：重新配置启动设备   重要！！！**
　　挂载刚刚写完的分区上系统：
```shell
mkdir sda2
mount /dev/sda2 sda2
```

　　修改以下两个文件，内容如图：



	
  * /boot/cmdline.txt

	
  * ./sda2/etc/fstab


[![2015-09-24-120659_480x320_scrot](/uploads/2015/09/2015-09-24-120659_480x320_scrot.png)](/uploads/2015/09/2015-09-24-120659_480x320_scrot.png)
　　注意因为这是迁移完截的图，所以 fstab 的路径有点区别。

　　然后 reboot 一下就大功告成啦。
