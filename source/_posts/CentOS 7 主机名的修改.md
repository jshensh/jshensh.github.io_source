---
author: 403 Forbidden
comments: true
date: 2016-09-10 17:58:55+00:00
layout: post
slug: centos-7-%e4%b8%bb%e6%9c%ba%e5%90%8d%e7%9a%84%e4%bf%ae%e6%94%b9
title: CentOS 7 主机名的修改
wordpress_id: 2627
categories:
- VPS 技术
---
如何在CentOS 7上修改主机名

在CentOS中，有三种定义的主机名:静态的（static），瞬态的（transient），和灵活的（pretty）。“静态”主机名也称为内核主机名，是系统在启动时从/etc/hostname自动初始化的主机名。“瞬态”主机名是在系统运行时临时分配的主机名，例如，通过DHCP或mDNS服务器分配。静态主机名和瞬态主机名都遵从作为互联网域名同样的字符限制规则。而另一方面，“灵活”主机名则允许使用自由形式（包括特殊/空白字符）的主机名，以展示给终端用户（如Linuxidc）。

在CentOS 7中，有个叫hostnamectl的命令行工具，它允许你查看或修改与主机名相关的配置。

1.要查看主机名相关的设置：
```
[root@localhost ~]# hostnamectl  

  Static hostname: localhost.localdomain
        Icon name: computer
          Chassis: n/a
        Machine ID: 80a4fa4970614cf6be9597ecd6f097a9
          Boot ID: 28420e272e1847a583718262758bd0f7
    Virtualization: vmware
  Operating System: CentOS Linux 7 (Core)
      CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-123.el7.x86_64
      Architecture: x86_64

```

或

```
[root@localhost ~]# hostnamectl status
  Static hostname: localhost.localdomain
        Icon name: computer
          Chassis: n/a
        Machine ID: 80a4fa4970614cf6be9597ecd6f097a9
          Boot ID: 28420e272e1847a583718262758bd0f7
    Virtualization: vmware
  Operating System: CentOS Linux 7 (Core)
      CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-123.el7.x86_64
      Architecture: x86_64

```


2.只查看静态、瞬态或灵活主机名，分别使用“--static”，“--transient”或“--pretty”选项。
```
[root@localhost ~]# hostnamectl --static
localhost.localdomain
[root@localhost ~]# hostnamectl --transient
localhost.localdomain
[root@localhost ~]# hostnamectl --pretty

```


3.要同时修改所有三个主机名：静态、瞬态和灵活主机名：
```
[root@localhost ~]# hostnamectl set-hostname Linuxidc
[root@localhost ~]# hostnamectl --pretty
Linuxidc
[root@localhost ~]# hostnamectl --static
Linuxidc
[root@localhost ~]# hostnamectl --transient
Linuxidc

```


就像上面展示的那样，在修改静态/瞬态主机名时，任何特殊字符或空白字符会被移除，而提供的参数中的任何大写字母会自动转化为小写。一旦修改了静态主机名，/etc/hostname 将被自动更新。然而，/etc/hosts 不会更新以保存所做的修改，所以你每次在修改主机名后一定要手动更新/etc/hosts，之后再重启CentOS 7。否则系统再启动时会很慢。

4.手动更新/etc/hosts
```
vim /etc/hosts

127.0.0.1      Linuxidc  hunk_zhu
#127.0.0.1  localhost localhost.localdomain localhost4 localhost4.localdomain
::1        localhost localhost.localdomain localhost6 localhost6.localdomai

```


5.重启CentOS 7 之后（reboot -f ），
```
[root@Linuxidc ~]# hostname
Linuxidc
[root@hunk_zhu ~]# hostnamectl --transient 
Linuxidc
[root@hunk_zhu ~]# hostnamectl --static
Linuxidc
[root@hunk_zhu ~]# hostnamectl --pretty
Linuxidc

```


6.如果你只想修改特定的主机名（静态，瞬态或灵活），你可以使用“--static”，“--transient”或“--pretty”选项。
例如，要永久修改主机名，你可以修改静态主机名：
```
[root@localhost ~]# hostnamectl --static set-hostname Linuxidc
重启CentOS 7 之后（reboot -f ），
[root@Linuxidc ~]# hostnamectl --static
Linuxidc
[root@Hunk_zhu ~]# hostnamectl --transient
Linuxidc
[root@Hunk_zhu ~]# hostnamectl --pretty
Linuxidc
[root@Hunk_zhu ~]# hostname

```


其实，你不必重启机器以激活永久主机名修改。上面的命令会立即修改内核主机名。注销并重新登入后在命令行提示来观察新的静态主机名。

转载自 [http://www.linuxidc.com/Linux/2014-11/109238.htm](http://www.linuxidc.com/Linux/2014-11/109238.htm)
