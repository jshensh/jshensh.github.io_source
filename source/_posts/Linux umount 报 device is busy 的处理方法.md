---
author: 403 Forbidden
comments: true
date: 2015-01-16 11:07:40+00:00
layout: post
slug: linux-umount-%e6%8a%a5-device-is-busy-%e7%9a%84%e5%a4%84%e7%90%86%e6%96%b9%e6%b3%95
title: Linux umount 报 device is busy 的处理方法
wordpress_id: 2096
categories:
- VPS 技术
---
今天在IDC 辐射了半天，又弄了套DG。 在Linux 挂盘这块也小学了两招。

**一. umout 移动硬盘**
开始用sftp 将安装文件copy到服务器的时候，速度太慢了，500k/s。几个G的东西，copy 这些就要半个多小时，扛不住，拿移动硬盘来copy了。 结果移动硬盘的格式不对。 是NTFS 格式，Linux 识别不了。 只能格式化成FAT32的。 而GG 的win7 系统又不具备格式化成FAT32的功能。 有点小变态。让同事在XP 下帮我格式化了。

安装文件copy到服务器后，同事直接将移动硬盘从服务器上拔下来了。 导致的结果是，用df 命令查看，挂载的移动硬盘还存在。

```
[root@qs-wg-db1 ~]# df -lh
Filesystem Size Used Avail Use% Mounted on
/dev/sdb3 125G 3.3G 115G 3% /
/dev/sdb1 99M 12M 82M 13% /boot
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda1 275G 72G 189G 28% /u01
/dev/sdc1 10G 2.0G 8.1G 20% /datatmp
```

就是这个/dev/sdc1。

这时使用umount 命令，会提示设备忙，无法挂载。

处理方法：
```
[root@qs-wg-db1 ~]# fuser -km /datatmp
[root@qs-wg-db1 ~]# df -lh
Filesystem Size Used Avail Use% Mounted on
/dev/sdb3 125G 3.3G 115G 3% /
/dev/sdb1 99M 12M 82M 13% /boot
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda1 275G 72G 189G 28% /u01
/dev/sdc1 10G 2.0G 8.1G 20% /datatmp
[root@qs-wg-db1 ~]# umount /datatmp
[root@qs-wg-db1 ~]# df -lh
Filesystem Size Used Avail Use% Mounted on
/dev/sdb3 125G 3.3G 115G 3% /
/dev/sdb1 99M 12M 82M 13% /boot
tmpfs 3.9G 0 3.9G 0% /dev/shm
/dev/sda1 275G 72G 189G 28% /u01
```

成功umount了。

**二. umount 光驱**
安装DB 之前，检查了一下相关包，少了3个。 从系统安装盘上找了包，安装了一下。 当时是直接将/dev/cdrom mount 到了/mnt目录。 也是图个方便。 结果收工时去拿盘，光驱弹不出来。 同事让我把cdrom umout掉。 同样的提示，设备忙。

处理方法：
```
[root@qs-wg-db1 ~]#fuser –km /dev/cdrom
[root@qs-wg-db1 ~]#eject -- 弹出光驱
```

在网上搜了一下，正确挂载CD-ROM的方法应该如下：

```
# mkdir cdrom
# mount /dev/cdrom /mnt/cdrom
或者
# mount /dev/cdrom /media/cdrom
```

直接挂载在/mnt,/media等系统目录下，在umount时会出现出错信息“umount: /mnt/cdrom: device is busy”的情况。

如果一个文件系统处于“busy”状态的时候，不能卸载该文件系统。如下情况将导致文件系统处于“busy”状态：
1) 文件系统上面有打开的文件
2) 某个进程的工作目录在此文件系统上
3) 文件系统上面的缓存文件正在被使用

**三. fuser 命令**
前面2个umout 都使用了这个fuser 命令。 man了一下这个命令。 内容如下：

```
[root@qs-wg-db1 ~]# man fuser
FUSER(1) User Commands FUSER(1)

NAME
fuser - identify processes using files or sockets

SYNOPSIS
fuser [-a|-s|-c] [-4|-6] [-n space ] [-k [-i] [-signal ] ] [-muvf] name
fuser -l
fuser -V

DESCRIPTION
fuser displays the PIDs of processes using the specified files or file systems. In the default display mode, each file name is followed by a letter denoting the type
of access:
c current directory.
e executable being run.
f open file. f is omitted in default display mode.
F open file for writing. F is omitted in default display mode.
r root directory.
m mmap'ed file or shared library.

fuser returns a non-zero return code if none of the specified files is accessed or in case of a fatal error. If at least one access has been found, fuser returns zero.
In order to look up processes using TCP and UDP sockets, the corresponding name space has to be selected with the -n option. By default fuser will look in both IPv6 and IPv4 sockets. To change the default, behavior, use the -4 and -6 options. The socket(s) can be specified by the local and remote port, and the remote address. All fields are optional, but commas in front of missing fields must be present:
[lcl_port][,[rmt_host][,[rmt_port]]]
Either symbolic or numeric values can be used for IP addresses and port numbers.

fuser outputs only the PIDs to stdout, everything else is sent to stderr.

OPTIONS
-a Show all files specified on the command line. By default, only files that are accessed by at least one process are shown.
-c Same as -m option, used for POSIX compatibility.
-f Silently ignored, used for POSIX compatibility.
-k Kill processes accessing the file. Unless changed with -signal, SIGKILL is sent. An fuser process never kills itself, but may kill other fuser processes. The effective user ID of the process executing fuser is set to its real user ID before attempting to kill.
-i Ask the user for confirmation before killing a process. This option is silently ignored if -k is not present too.
-l List all known signal names.
-m name specifies a file on a mounted file system or a block device that is mounted. All processes accessing files on that file system are listed. If adirectory file is specified, it is automatically changed to name/. to use any file system that might be mounted on that directory.

-n space Select a different name space. The name spaces file (file names, the default), udp (local UDP ports), and tcp (local TCP ports) are supported. For ports, either the port number or the symbolic name can be specified. If there is no ambiguity, the shortcut notation name/Ispace (e.g. 80/tcp ) can be used.
-s Silent operation. -u and -v are ignored in this mode. -a must not be used with -s.
-signal Use the specified signal instead of SIGKILL when killing processes. Signals can be specified either by name (e.g. -HUP) or by number (e.g. -1). This option is silently ignored if the -k option is not used.
-u Append the user name of the process owner to each PID.
-v Verbose mode. Processes are shown in a ps-like style. The fields PID, USER and COMMAND are similar to ps. ACCESS shows how the process accesses the file. If the access is by the kernel (e.g. in the case of a mount point, awap file, etc.), kernel is shown instead of the PID.
-V Display version information.
-4 Search only for IPv4 sockets. This option must not be used with the -6 option and only has an effect with the tcp and udp namespaces.
-6 Search only for IPv6 sockets. This option must not be used with the -4 option and only has an effect with the tcp and udp namespaces.
- Reset all options and set the signal back to SIGKILL.
FILES
/proc location of the proc file system
```

fuser 命令显示访问某个文件的进程的PID. 其中-k 和 -m 参数上面红色部分有说明。-k 是kill 访问这个文件的进程。 没有进程访问，就可以成功umount了.

转载自 [http://blog.csdn.net/tianlesoftware/article/details/6194295](http://blog.csdn.net/tianlesoftware/article/details/6194295)
