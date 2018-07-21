---
author: 403 Forbidden
comments: true
date: 2015-01-03 17:04:05+00:00
layout: post
slug: '%e8%ae%b0%e4%b8%80%e4%b8%8b-openwrt-%e5%8f%af%e8%83%bd%e5%bf%98%e8%ae%b0%e7%9a%84%e5%b8%b8%e7%94%a8%e5%91%bd%e4%bb%a4'
title: 记一下 openwrt 可能忘记的常用命令
wordpress_id: 2076
categories:
- openwrt
---
将 /dev/sda1 分区挂载为 swap 交换区：
```shell
mkswap /dev/sda1
swapon /dev/sda1
```


挂载 vfat：
```shell
opkg install kmod-fs-vfat // fat，fat32
opkg install kmod-nls-utf8 kmod-nls-cp437 kmod-nls-iso8859-1 // 文件系统的语言支持
mkdir sda1
mount -t vfat /dev/sda1 sda1
```


挂载 ntfs：
```shell
opkg install kmod-fuse ntfs-3g
mkdir sda1
ntfs-3g /dev/sda1 sda1
```


格式化分区：
```shell
opkg install e2fsprogs
mkfs.ext4 /dev/sda1
```


支持 extroot：
```shell
opkg install block-mount
reboot
```


复制flash根分区文件到外部存储
```shell
mkdir /mnt/sda1
mount /dev/sda1 /mnt/sda1
mkdir -p /tmp/cproot
mount --bind / /tmp/cproot/
tar -C /tmp/cproot/ -cvf - . | tar -C /mnt/sda1 -xf -
umount /dev/sda1
```

