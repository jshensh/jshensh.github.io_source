---
author: 403 Forbidden
comments: true
date: 2016-10-23 15:36:42+00:00
layout: post
slug: centos-7-grub-linux-%e4%bf%ae%e6%94%b9%e9%bb%98%e8%ae%a4%e7%9a%84%e5%90%af%e5%8a%a8%e6%93%8d%e4%bd%9c%e7%b3%bb%e7%bb%9f
title: CentOS 7 grub Linux 修改默认的启动操作系统
wordpress_id: 2636
categories:
- VPS 技术
---
可以用下面的方法修改grub默认的启动OS。

**查看当前的启动内核**
```
[root@localhost ~]# grub2-editenvlist
saved_entry=CentOS Linux(3.10.0-123.20.1.el7.x86_64) 7 (Core)
```

**查找要默认启动的操作系统名字**
```
[root@localhost ~]# cat /etc/grub2.cfg | grep 3.4.44
menuentry 'CentOS Linux (3.4.44) 7(Core)' --class centos --class gnu-linux --class gnu --class os--unrestricted $menuentry_id_option'gnulinux-3.10.0-123.el7.x86_64-advanced-e3146a2a-a237-4081-ba08-dbf258de434a'{
        linux16 /vmlinuz-3.4.44 root=/dev/mapper/centos-rootro rd.lvm.lv=centos/swap vconsole.font=latarcyrheb-sun16 rd.lvm.lv=centos/rootcrashkernel=auto  vconsole.keymap=us rhgbquiet LANG=en_US.UTF-8
        initrd16 /initramfs-3.4.44.img
```

**设置新的默认启动操作系统选项**
```
[root@localhost ~]# grub2-set-default  "CentOSLinux (3.4.44) 7 (Core)"
```

**查看是否生效**
```
[root@localhost ~]# grub2-editenv list
saved_entry=CentOS Linux (3.4.44) 7 (Core)
```

转载自 [http://blog.csdn.net/wjw7869/article/details/47302107](http://blog.csdn.net/wjw7869/article/details/47302107)
