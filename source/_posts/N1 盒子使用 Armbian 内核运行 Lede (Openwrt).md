---
author: 403 Forbidden
comments: true
date: 2019-04-24 23:44:43+08:00
layout: post
title: N1 盒子使用 Armbian 内核运行 Lede (Openwrt)
categories:
- 斐讯
---
## 注意事项

---

1. 如果用作旁路由，则 N1 接主路由的的LAN口
2. 如果用作主路由，则 N1 接入交换机或AP模式的路由器或不插 WAN 口的路由器
3. 以上的交换机或路由器设置为 192.168.1.X，但不能为 192.168.1.1，关闭除了 N1 外所有设备的 dhcp 服务
4. 开 udp 转发，请：``opkg install iptables-mod-tproxy``

## 制作镜像

---

1. 首先创建目录 openwrt

```shell
mkdir openwrt
```

2. 下载 openwrt rootfs 并解压

```shell
wget https://downloads.openwrt.org/releases/18.06.2/targets/armvirt/64/openwrt-18.06.2-armvirt-64-default-rootfs.tar.gz
tar xvf openwrt-18.06.2-armvirt-64-default-rootfs.tar.gz -C openwrt
```


3. 挂载 armbian 镜像

```shell
losetup -P -f --show Armbian_5.60_Aml-s9xxx_Debian_stretch_default_4.18.7_20180922.img
```

会输出类似 ``/dev/loop0`` 的内容

其他任意 arm 的镜像都行，但是很多是 img 的，请自行挂载。

4. 把第二分区挂载到 media 目录

```shell
mount /dev/loop0p2 /media
```

注意，<span style="color: red;">这里的 loop0 要和上一步中的 loop0 保持一致，有可能是 loop1 等</span>

5. 删除 openwrt/lib/firmware 并将 media 里的内核模块和驱动等剪切到 openwrt 目录

```shell
rm -rf openwrt/lib/firmware
rm -rf openwrt/lib/modules

mv /media/lib/modules openwrt/lib/
mv /media/lib/firmware openwrt/lib/
mv /media/etc/modprobe.d openwrt/etc/
mv /media/etc/fstab openwrt/etc/
```

6. 切换到 openwrt/lib/modules/4.18.7-aml-s9xxx

```shell
cd openwrt/lib/modules/4.18.7-aml-s9xxx
```

7. 创建 link-ko.sh 写入以下内容

```shell
for x in `find -name *.ko`
do
    ln -s $x .
done
```

8. 给予 link-ko.sh 运行权限并运行

```shell
chmod +x link-ko.sh
./link-ko.sh
```

9. 回到 root 目录

```shell
cd
```

10. 编辑 openwrt/etc/init.d/boot，在第 38 行也就是 ``/sbin/kmodloader`` 之前，增加以下内容：

```shell
ulimit -n 51200
```

至此，openwrt 配置完毕，把它们全部剪切到 media 目录

11. 先清空 media，把 openwrt 目录下所有剪切到 media 并新建 boot 目录

```shell
rm -rf /media/*
mv openwrt/* /media/
mkdir /media/boot
```

12. 同步一下

```shell
sync
```

13. 卸载 media 和 openwrt 目录

```shell
umount /media
losetup -d /dev/loop0
```

现在 Armbian_5.60_Aml-s9xxx_Debian_stretch_default_4.18.7_20180922.img 已被修改为 openwrt 系统。

## 路由相关设置

---

### 主路由设置

1. 进入 Network --> Interfaces
2. 编辑 lan 口
3. 取消桥接的对勾，保存
4. Network --> Interfaces，新建 wan 接口
5. 接口名称填 wan，协议选 pppoe，网卡选 eth0，选好后，点 submit
6. 会自动跳转宽带帐号设置页面，填入宽带帐号密码，保存。然后就可以上网了。

### 旁路网关设置
进入 Network --> Interfaces --> lan 口，gateway 填主路由 ip，并设置 dns，就可以上网了。

转载自 [https://www.right.com.cn/forum/thread-468983-1-1.html](https://www.right.com.cn/forum/thread-468983-1-1.html)