---
author: 403 Forbidden
comments: true
date: 2015-01-17 04:14:47+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8raspberry-pi%e4%bd%9c%e4%b8%ba%e6%97%a0%e7%ba%bf%e8%b7%af%e7%94%b1%e5%99%a8'
title: 使用Raspberry Pi作为无线路由器
wordpress_id: 2098
categories:
- 树莓派
---
鉴于之前的教程过于麻烦。。自己也从头试了一下，发现有点问题，于是本人决定全部推倒重写一遍（注：本文采用的无线网卡为 TP-LINK WN823N，RTL8192CU 芯片）

另外，文章中用了 vi 编辑器，树莓派自带 vim-tiny，有点反人类，apt-get install vim 解决问题

参考了以下两篇文章（如果只按照其中的一篇来都不会成功，所以整理了一下）：



	
  * [http://wangye.org/blog/archives/845/](http://wangye.org/blog/archives/845/)

	
  * [http://shumeipai.nxez.com/2014/04/01/raspberry-pi-wireless-router.html](http://shumeipai.nxez.com/2014/04/01/raspberry-pi-wireless-router.html)



**一、安装dhcp服务和ap热点服务**
```shell
apt-get install isc-dhcp-server hostapd
```


**二、配置无线网络**
**本文搭建的无线网络使用了 192.168.51 网段，如有需要，请自行修改，后文同**
```shell
vi /etc/network/interfaces
```

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.51.1
    netmask 255.255.255.0

iface default inet dhcp
```


**三、修改 DHCP Server 设置**
```shell
vi /etc/dhcp/dhcpd.conf
```

在最后添加，注意是在最后：
```
subnet 192.168.51.0 netmask 255.255.255.0 {
    range 192.168.51.100 192.168.51.254;
    option subnet-mask 255.255.255.0;
    option broadcast-address 192.168.51.255;
    option routers 192.168.51.1;
}
```


**四、打开内核的网卡转发能力**
```shell
vi /etc/sysctl.conf
```

将 net.ipv4.ip_forward=1 的注释去掉

**五、重新编译 hostapd 使其支持 RTL8192CU 芯片的无线网卡**
```shell
wget http://futa.ooo/uploads/2015/01/RTL8188-hostapd-master.zip
unzip RTL8188-hostapd-master.zip
cd RTL8188-hostapd-master/hostapd
make;make install
```


**六、修改 iptables 的 nat 规则并保存**
```shell
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT
iptables-save > /etc/iptables.ipv4.nat
```

开机自动加载 iptables 规则：
```shell
vi /etc/rc.local
```

在 exit 0; 前面添加 
```
iptables-restore</etc/iptables.ipv4.nat
```


**七、修改无线网络的设置**
```shell
vi /etc/hostapd/hostapd.conf
```

只需要改两行：
```
# Basic configuration

interface=wlan0
ssid=sxbxjhwm_raspberry # SSID，修改
channel=1
#bridge=br0

# WPA and WPA2 configuration

macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=3
wpa_passphrase=87654321 # 密码，修改
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP

# Hardware configuration

driver=rtl871xdrv
ieee80211n=1
hw_mode=g
device_name=RTL8192CU
manufacturer=Realtek
```


**P.S. 如果 DHCP 获取不到 IP，需要添加自启动：**
```shell
vi /etc/rc.local
```

在 exit 0 之前添加以下代码：
```
ifdown wlan0
ifup wlan0
ifconfig wlan0 192.168.51.1 netmask 255.255.255.0
service isc-dhcp-server restart
service hostapd restart
```




* * *



实验成功，效果图：
[![QQ截图20150116205540](/uploads/2015/01/QQ截图20150116205540-300x154.jpg)](/uploads/2015/01/QQ截图20150116205540.jpg)
[![QQ图片20150116205445](/uploads/2015/01/QQ图片20150116205445-e1421413729569-169x300.jpg)](/uploads/2015/01/QQ图片20150116205445-e1421413729569.jpg)
[![QQ图片20150116205452](/uploads/2015/01/QQ图片20150116205452-169x300.png)](/uploads/2015/01/QQ图片20150116205452.png)
[![QQ图片20150116205458](/uploads/2015/01/QQ图片20150116205458-169x300.png)](/uploads/2015/01/QQ图片20150116205458.png)
