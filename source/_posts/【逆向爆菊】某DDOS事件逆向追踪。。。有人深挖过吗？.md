---
author: 403 Forbidden
comments: true
date: 2015-09-12 13:00:54+00:00
layout: post
slug: '%e3%80%90%e9%80%86%e5%90%91%e7%88%86%e8%8f%8a%e3%80%91%e6%9f%90ddos%e4%ba%8b%e4%bb%b6%e9%80%86%e5%90%91%e8%bf%bd%e8%b8%aa%e3%80%82%e3%80%82%e3%80%82%e6%9c%89%e4%ba%ba%e6%b7%b1%e6%8c%96%e8%bf%87'
title: 【逆向爆菊】某DDOS事件逆向追踪。。。有人深挖过吗？
wordpress_id: 2281
categories:
- 杂七杂八
---
鄙人多次处理过各种被黑找幕后黑手事件。。。
如某领导早匿名邮件举报，干掉163拿到邮箱找发件人，，，某学生无聊干了当地教育局配合抓人，，，等等。。。
这还是第一次逆向DDOS事件。。。
某日一友人求助说维护的客户网站遭受SYN，毕竟政府用户有防火墙和IPS，告诉他设置防护就好了。。
第二日。。友人又来，说设置了没用。。。
给了我远程查看配置，发现某防火墙居然功能模块还有到期事件，正好所有模块到期，这防火墙就等于一台路由器了。。。
无奈只得导出日志分析IP手工添加ACL。。。

下面切入正题：
IP导出后，朋友自己加ACL，同时提到去年同一时间也有同样攻击。我怀疑攻击者目的，为什么防火墙功能模块刚到期就发起攻击？
怀着好奇心。。对导出的攻击IP进行扫描
[![-cache-4283972c60ea687cc15249676ff74e6c_1](/uploads/2015/09/cache-4283972c60ea687cc15249676ff74e6c_1-181x300.jpg)](/uploads/2015/09/cache-4283972c60ea687cc15249676ff74e6c_1.jpg)
其实如果是国内黑产，不过是1433、3389、3306等常见抓鸡。。ISP封了135 445 等端口SMB服务的利用可能性不大。
果真在记录IP中发现一台3306弱口令
[![-cache-af9551f2d9d65052ad7324c78207f2c7_2](/uploads/2015/09/cache-af9551f2d9d65052ad7324c78207f2c7_2-300x106.jpg)](/uploads/2015/09/cache-af9551f2d9d65052ad7324c78207f2c7_2.jpg)
然后大家就应该知道了。。。UDF.dll提权即可。。
由于时间已是凌晨2点，直接命令mysql连接，查了些信息
[![-cache-1161ee2a636574c820a506b4bf3e434b_3](/uploads/2015/09/cache-1161ee2a636574c820a506b4bf3e434b_3-300x290.jpg)](/uploads/2015/09/cache-1161ee2a636574c820a506b4bf3e434b_3.jpg)
[![-cache-c016d05db73a755a16f711d837c4db3d_4](/uploads/2015/09/cache-c016d05db73a755a16f711d837c4db3d_4-300x273.jpg)](/uploads/2015/09/cache-c016d05db73a755a16f711d837c4db3d_4.jpg)
可以看出一些IP。。
其中某IP
[![-cache-372565cecc1a67a9185b2a0d40fbc548_5](/uploads/2015/09/cache-372565cecc1a67a9185b2a0d40fbc548_5-300x188.jpg)](/uploads/2015/09/cache-372565cecc1a67a9185b2a0d40fbc548_5.jpg)
域名对应？？？
[![-cache-f257d616a19f1449cdae297826c9f248_6](/uploads/2015/09/cache-f257d616a19f1449cdae297826c9f248_6-252x300.jpg)](/uploads/2015/09/cache-f257d616a19f1449cdae297826c9f248_6.jpg)
邮箱对应？？？
[![-cache-5b461e8e2c2932a10a11f5e121963ea8_7](/uploads/2015/09/cache-5b461e8e2c2932a10a11f5e121963ea8_7-244x300.jpg)](/uploads/2015/09/cache-5b461e8e2c2932a10a11f5e121963ea8_7.jpg)
收款地址？？？
[![-cache-b5b3e354385559e34782748b535d98fc_8](/uploads/2015/09/cache-b5b3e354385559e34782748b535d98fc_8-300x233.jpg)](/uploads/2015/09/cache-b5b3e354385559e34782748b535d98fc_8.jpg)
淘宝走你？？？
[![-cache-3dc9cbb7c78e980ad40acaaae5d909fb_9](/uploads/2015/09/cache-3dc9cbb7c78e980ad40acaaae5d909fb_9-300x142.jpg)](/uploads/2015/09/cache-3dc9cbb7c78e980ad40acaaae5d909fb_9.jpg)
还用多少几句吗？？
蒋华同学请小心了。。。
可惜没有下载病毒样本与其他进一步证据保留。。。否则大家都懂。。。

转载自 [http://zone.wooyun.org/content/5808](http://zone.wooyun.org/content/5808)
