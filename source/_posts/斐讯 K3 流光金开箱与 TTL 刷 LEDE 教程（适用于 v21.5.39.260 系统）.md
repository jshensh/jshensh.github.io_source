---
author: 403 Forbidden
comments: true
date: 2017-11-04 18:40:13+00:00
layout: post
slug: '%e6%96%90%e8%ae%af-k3-%e6%b5%81%e5%85%89%e9%87%91%e5%bc%80%e7%ae%b1%e4%b8%8e-ttl-%e5%88%b7-lede-%e6%95%99%e7%a8%8b%ef%bc%88%e9%80%82%e7%94%a8%e4%ba%8e-v21-5-39-260-%e7%b3%bb%e7%bb%9f%ef%bc%89'
title: 斐讯 K3 流光金开箱与 TTL 刷 LEDE 教程（适用于 v21.5.39.260 系统）
wordpress_id: 2742
categories:
- openwrt
- 斐讯
---
**注意：V21.5.39.260 集成的 CFE 编译日期为 8月2日，斐讯封堵了 CFE 网页执行命令，而且固件采用公私钥验证，除了 TTL 手动执行命令基本无法刷入其他固件（[斐讯K3 官方固件root版本 安装插件 entware ](http://www.right.com.cn/forum/thread-212725-1-1.html)）**

**本文分四段：开箱，拆机加 TTL，CFE 刷官改固件，网页刷 LEDE 固件**

**在刷入 LEDE 固件之前，不要给 k3 连网！避免自动升级！  
在刷入 LEDE 固件之前，不要给 k3 连网！避免自动升级！  
在刷入 LEDE 固件之前，不要给 k3 连网！避免自动升级！**

11 月 1 号 K3 流光金首发送贼快的闪迪 U 盘，趁活动入了两台：
[![](/uploads/2017/11/QQ截图20171105012114.png)](/uploads/2017/11/QQ截图20171105012114.png)

先上购买链接：




    
  * 斐讯K3流光金 AC3150：[https://item.jd.com/5428209.html](http://t.cn/RWIdtzy)

    
  * 斐讯K3星空银 AC3150：[https://item.jd.com/3959251.html](http://t.cn/RO955lB)



到手开箱全家福：
[![](/uploads/2017/11/20171102_120516-1024x768.jpg)](/uploads/2017/11/20171102_120516.jpg)

四网口 + USB 3.0：
[![](/uploads/2017/11/20171102_120552-768x1024.jpg)](/uploads/2017/11/20171102_120552.jpg)

整机照：
[![](/uploads/2017/11/20171102_121232-768x1024.jpg)](/uploads/2017/11/20171102_121232.jpg)

mmp 的系统版本 v21.5.39.260：
[![](/uploads/2017/11/QQ截图20171102121540.png)](/uploads/2017/11/QQ截图20171102121540.png)

嗯废话说完，先给各位拆个机

第一步先扯下底部脚垫，卸下四个螺丝。注意这里有保修易碎贴，如果还要保修的话，拿电吹风吹下挑开：
[![](/uploads/2017/11/20171104_154507-768x1024.jpg)](/uploads/2017/11/20171104_154507.jpg)

第二步从如图位置插入塑料卡片撬开两侧侧面面板。最好不要用美工刀、钢尺等锐利的物品操作，会留下撬痕：
[![](/uploads/2017/11/20171104_155201-768x1024.jpg)](/uploads/2017/11/20171104_155201.jpg)

第三步拆开侧面面板，轻轻取下上方天线（注意侧面有卡扣，把塑料外壳往外掰一下就可以取出来了），取下后搁在上面就行，目的是为了卸螺丝。
[![](/uploads/2017/11/20171104_155356-1024x768.jpg)](/uploads/2017/11/20171104_155356.jpg)

第四步卸下固定两块主板用的八颗螺丝（在螺丝边上上胶的家伙我谢谢你全家）：

[![](/uploads/2017/11/20171104_160635-1024x768.jpg)](/uploads/2017/11/20171104_160635.jpg)

[![](/uploads/2017/11/20171104_164950-768x1024.jpg)](/uploads/2017/11/20171104_164950.jpg)

第五步在下方主板的右侧 TX RX GND 塞 TTL 线并固定（如果要保修的话，不要固定，我是为了方便以后刷机）我用的热熔胶，如果希望牢固一点的话可以用焊锡。线可以从边上散热孔引出：
[![](/uploads/2017/11/20171104_165104-768x1024.jpg)](/uploads/2017/11/20171104_165104.jpg)

[![](/uploads/2017/11/20171104_185431-768x1024.jpg)](/uploads/2017/11/20171104_185431.jpg)

第六步接 TTL 小板调试（TX 接 RXD，RX 接 TXD，GND 接 GND），115200，如果有输出，就是正常的：
[![](/uploads/2017/11/20171104_171541-768x1024.jpg)](/uploads/2017/11/20171104_171541.jpg)

最后合上侧面面板：
[![](/uploads/2017/11/20171104_191757-1024x768.jpg)](/uploads/2017/11/20171104_191757.jpg)

PS 最后找公司的硬件工程师帮忙把引出的线改成了座儿，用热熔胶固定在了散热口：
[![](/uploads/2017/11/20171105_222222-768x1024.jpg)](/uploads/2017/11/20171105_222222.jpg)

[![](/uploads/2017/11/20171105_231846-768x1024.jpg)](/uploads/2017/11/20171105_231846.jpg)

有了 TTL，我们需要先刷入破解了 root 的官改固件并降级，为刷入 LEDE 固件做准备：

以下是需要的软件：




    
  * Tftpd：[http://tftpd32.jounin.net/](http://tftpd32.jounin.net/)

    
  * 官改固件下载：[k3_root](/uploads/2017/11/k3_root.zip)

    
  * 低版本 mtd6 镜像下载：[K3-linux-partition-mtd6](/uploads/2017/11/K3-linux-partition-mtd6.zip)



第一步下载固件，安装运行 Tftpd 工具。使用网线连接至 k3 上，设置静态 IP 192.168.2.100，网关 192.168.2.1，将 Tftpd 中的目录切换到你存放解压出来的固件目录，并切换网卡（应该是 192.168.2.100，我因为刷机后截的图地址不一样）：
[![](/uploads/2017/11/QQ图片20171105020419.png)](/uploads/2017/11/QQ图片20171105020419.png)

第二步给路由器断电，连接 TTL，捅 Reset 通电开机，如果成功进入 CFE 会出现下一步图中以 CFE> 开头的界面

第三步输入命令，CFE 会拉取你本机上的固件：
```shell
flash -noheader 192.168.2.100:/k3_root.bin nflash0.trx
```

[![](/uploads/2017/11/QQ图片20171105020442.jpg)](/uploads/2017/11/QQ图片20171105020442.jpg)

第四步等写入完成后输入 reboot 重启

第五步在 TTL 输入以下命令，将 mtd6 镜像拉至路由器上并写入（**镜像大小 44M，刷写时间比较长，大约需要 20 ~ 30 分钟（尽量多等一段时间），刷写过程中不要断开路由器的电源或拔网线，以免变砖！！！**）：
```shell
cd /tmp
tftp -g -l K3-linux-partition-mtd6.img -r K3-linux-partition-mtd6.img 192.168.2.100
cat /tmp/K3-linux-partition-mtd6.img > /dev/mtd6
reboot
```


最后进入功能设置 --> 手动升级看到如图系统版本就说明成功了
[![](/uploads/2017/11/QQ图片20171105021238.png)](/uploads/2017/11/QQ图片20171105021238.png)

随后开始刷 LEDE

固件下载：




    
  * 基础包（无密码）：[lede-bcm53xx-phicomm-k3-squashfs-factory](/uploads/2017/11/lede-bcm53xx-phicomm-k3-squashfs-factory.zip)

    
  * 升级包（默认登录密码是 password）：[LEDE-17.01.2-R7.3.2-bcm53xx-phicomm-k3-squashfs](/uploads/2017/11/LEDE-17.01.2-R7.3.2-bcm53xx-phicomm-k3-squashfs.rar)



第一步刷入基础包，进入功能设置 --> 手动升级，上传：
[![](/uploads/2017/11/QQ图片20171105021247.png)](/uploads/2017/11/QQ图片20171105021247.png)

[![](/uploads/2017/11/QQ图片20171105022757.png)](/uploads/2017/11/QQ图片20171105022757.png)

第二步打开 192.168.1.1，进入 System --> Backup / Flash Firmware，上传升级包固件
[![](/uploads/2017/11/QQ图片20171105023217.png)](/uploads/2017/11/QQ图片20171105023217.png)

最后重启完成，重新打开 192.168.1.1，使用 root / password 登录即可：
[![](/uploads/2017/11/QQ截图20171105022906.png)](/uploads/2017/11/QQ截图20171105022906.png)

该固件带屏幕驱动，感谢 Lean 大的无私奉献！
[![](/uploads/2017/11/20171105_011645-711x1024.jpg)](/uploads/2017/11/20171105_011645.jpg)

参考以下文章：




    
  1. 拆机部分：[斐讯路由器怎么样？斐讯K3拆机图解](http://www.xinxunwei.com/wxjs/qtcjjc/2017/0327/7300.html)

    
  2. 官改固件：[斐讯K3 官方固件root版本 安装插件 entware](http://www.right.com.cn/forum/thread-212725-1-1.html)

    
  3. 固件降级：[K3原厂固件从217版降级212版方法](http://koolshare.cn/thread-95398-1-2.html)

    
  4. Lean 大 LEDE：[斐讯 K3 OPENWRT LEDE R7.3  固件，Adbyby Plus，潘多拉多拨，S...](http://www.right.com.cn/forum/thread-214087-1-1.html)


