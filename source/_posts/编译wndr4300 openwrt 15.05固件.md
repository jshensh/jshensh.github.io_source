---
author: 403 Forbidden
comments: true
date: 2016-09-10 14:59:05+00:00
layout: post
slug: '%e7%bc%96%e8%af%91wndr4300-openwrt-15-05%e5%9b%ba%e4%bb%b6'
title: 编译wndr4300 openwrt 15.05固件
wordpress_id: 2624
categories:
- openwrt
---
为wndr4300编译openwrt 15.05系统，内容如下:

操作环境 ubuntu 14.04 64位





  1. 安装依赖包
```shell
sudo apt-get install subversion build-essential libncurses5-dev zlib1g-dev gawk git ccache gettext libssl-dev xsltproc
```




  2. 下载源码
```shell
cd /home
git clone git://git.openwrt.org/15.05/openwrt.git
cd openwrt
git checkout 15.05
./scripts/feeds update -a
./scripts/feeds install luci
```




  3. 编译 获取官方配置
```shell
wget https://downloads.openwrt.org/chaos_calmer/15.05/ar71xx/nand/config.diff
```

将 config.diffg 文件
```
CONFIG_TARGET_ar71xx_nand_R6100=y
```

修改为
```
CONFIG_TARGET_ar71xx_nand_WNDR4300=y
```

生成配置
```shell
cat config.diff >> .config
make defconfig
```

修改 /root 为128MB
修改 target/linux/ar71xx/image/Makefile 文件, 修改 wndr4300_mtdlayout 中 23552k(ubi) 为 120832k(ubi)， 25600k@0x6c0000(firmware) 为 122880k@0x6c0000(firmware)






也可以使用配置向导
```shell
make menuconfig
```


运行编译
```shell
make V=99
```






  4. 生成文件位置
最后文件生成在 bin 目录下： openwrt/bin/ar71xx/openwrt-15.05-ar71xx-nand-wndr4300-squashfs-sysupgrade.tar openwrt/bin/ar71xx/openwrt-15.05-ar71xx-nand-wndr4300-ubi-factory.img



转载自 [http://www.jayclub.net/make-wndr4300-openwrt-15-05.html](http://www.jayclub.net/make-wndr4300-openwrt-15-05.html)
