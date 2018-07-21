---
author: 403 Forbidden
comments: true
date: 2015-02-22 04:55:55+00:00
layout: post
slug: linux%e4%b8%8b%e7%94%a8fdisk%e5%92%8cresize2fs%e5%8a%a8%e6%80%81%e4%bf%ae%e6%94%b9%e5%88%86%e5%8c%ba%e5%a4%a7%e5%b0%8f
title: Linux下用fdisk和resize2fs动态修改分区大小
wordpress_id: 2182
categories:
- 杂七杂八
---
我的Archlinux发现root(/)分区不够用了，于是想把/home分区的空间腾出一些来，
原理：用resize2fs调整/home文件系统的大小，用fdisk调整分区的大小。
试验结果：由于开始不小心把/home(/dev/sda4)分区删掉了，所以没试验成功，于是用以下步骤扩大了root分区：
1. fdisk把root（/dev/sda3）分区删除，注意删除前记录开始柱面号，具体命令：
fdisk /dev/sda ，p命令显示的Start列）
2. 用同样的开始柱面号，建立（fdisk /），命令 n
3. 再使用resize2fs重新修改分区的大小，命令：resize2fs /dev/sda3。
4. 重启系统，出现挂载/home分区失败，按照提示：mount -o remount,rw /，同时删除/etc/fstab下的含有/home那一行。
5. 再重启系统。
成功了！(以后可以试一下用lvm动态调整分区)

转载自 [http://blog.chinaunix.net/uid-8747186-id-3189880.html](http://blog.chinaunix.net/uid-8747186-id-3189880.html)
