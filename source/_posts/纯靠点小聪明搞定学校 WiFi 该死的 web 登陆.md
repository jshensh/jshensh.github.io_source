---
author: 403 Forbidden
comments: true
date: 2014-10-31 16:38:23+00:00
layout: post
slug: '%e7%ba%af%e9%9d%a0%e7%82%b9%e5%b0%8f%e8%81%aa%e6%98%8e%e7%a0%b4%e8%a7%a3%e5%ad%a6%e6%a0%a1-wifi-%e8%af%a5%e6%ad%bb%e7%9a%84-web-%e7%99%bb%e9%99%86'
title: 纯靠点小聪明搞定学校 WiFi 该死的 web 登陆
wordpress_id: 1988
---
去年学校还是用的 WPA2 PSK 加密的说，但因为我破了密码以后好心把密码传了出去就。。。唉自作自受。。。于是，学校今年升级了设备，改用 web 验证方法验证用户:
[![Screenshot_2014-10-27-17-19-56](/uploads/2014/11/Screenshot_2014-10-27-17-19-56-576x1024.png)](/uploads/2014/11/Screenshot_2014-10-27-17-19-56.png)
真是丧心病狂。当然，学校也发现了学生使用学校网络的需求，遂给学生也提供了个 WiFi，但是！
[![Screenshot_2014-09-25-20-57-28](/uploads/2014/11/Screenshot_2014-09-25-20-57-28-1024x576.png)](/uploads/2014/11/Screenshot_2014-09-25-20-57-28.png)
[![Screenshot_2014-09-25-20-58-18](/uploads/2014/11/Screenshot_2014-09-25-20-58-18-1024x576.png)](/uploads/2014/11/Screenshot_2014-09-25-20-58-18.png)
哎呦我勒个去，然后试 ssh，无效，没招了，想用 remote rdp，尼玛也屏蔽。学校你这是作死的节奏啊。然后，从开学开始的一个月里，我试图直接获取管理权限，但是，试了各种弱口令后，无果。于是放弃获取管理权限，放低要求，只要能用就行。
既然技术不够，那看来只能走点歪门邪道试试咯。前几周，闲得无聊发现某任课老师上网本反应极慢，就向其提出重装系统的建议，老师答应了。之后我发现，老师的办公室里有有线网络，但是需要老师自己设定 IP 地址及网关等各种信息。没错，老师给我了:
[![Screenshot_2014-11-01-00-44-28](/uploads/2014/11/Screenshot_2014-11-01-00-44-28-576x1024.png)](/uploads/2014/11/Screenshot_2014-11-01-00-44-28.png)
顺手记录了 mac 地址备用。用手机连上学校 WiFi 以后，发现被 DHCP 分配的 IP 地址与办公室有线网络并不在同一网段中，顿觉希望渺茫，手动指定了 IP 地址以后，无效。也懒得改手机的 mac 地址，没继续试下去。
换个思路，向老师索取了学校 WiFi 的账号及初始密码。想着总有老师是不用学校 WiFi 的吧，随手改了账号的后三位数字一试，居然真的登上了:
[![Screenshot_2014-10-27-17-18-57](/uploads/2014/11/Screenshot_2014-10-27-17-18-57-576x1024.png)](/uploads/2014/11/Screenshot_2014-10-27-17-18-57.png)
真是机智的小淘气。

还没完，表示俺是住宿生，寝室门口有一台学校的路由器，但是，并没有开无线:
[![20141026_150554](/uploads/2014/11/20141026_150554-1024x576.jpg)](/uploads/2014/11/20141026_150554.jpg)
百度了一下，发现这种路由器需要连接 console 口来管理，但尼玛我没有设备能连接有线网络啊:
[![20141026_151359](/uploads/2014/11/20141026_151359-1024x576.jpg)](/uploads/2014/11/20141026_151359.jpg)
而且我不知道这台路由的 IP 地址，怎么办好呢。。。各位要不猜一下我干了什么![869530255AD4DE7DE8AB2F80CF218AB8A7598D8B5](/uploads/2014/11/869530255AD4DE7DE8AB2F80CF218AB8A7598D8B5.jpg)

顺便提一下，学校网速还是不错的:
[![Screenshot_2014-10-24-11-09-22](/uploads/2014/11/Screenshot_2014-10-24-11-09-22-576x1024.png)](/uploads/2014/11/Screenshot_2014-10-24-11-09-22.png)
