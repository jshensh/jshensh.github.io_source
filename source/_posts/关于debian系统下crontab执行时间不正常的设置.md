---
author: 403 Forbidden
comments: true
date: 2014-08-17 19:17:22+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8edebian%e7%b3%bb%e7%bb%9f%e4%b8%8bcrontab%e6%89%a7%e8%a1%8c%e6%97%b6%e9%97%b4%e4%b8%8d%e6%ad%a3%e5%b8%b8%e7%9a%84%e8%ae%be%e7%bd%ae'
title: 关于debian系统下crontab执行时间不正常的设置
wordpress_id: 1795
categories:
- VPS 技术
---
前两天用用crontab指定了几个脚本,有一个是要凌晨一点钟执行的,今天看了下,发现执行时间比我设置的要晚了8小时,到早上9点。于是马上看了下系统时间
```
# date
Mon Jun 25 14:34:18 CST 2012
# date -u
Mon Jun 25 06:34:29 UTC 2012
```

显示的本地时间和UTC的时间都是正常的，但是显示我那系统crontab执行的时间是按照UTC时间来了，于是我再次设置了下时区为国内的，记得我之前好像设置过了，不过还是尝试一下,删除原来的时区文件，又重新复制到本地
```shell
rm /etc/localtime
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

然后vi /etc/localtime 查看了下时区文件，确实是CST-8,再向crontab里添加一个测试脚本，重启cron
/etc/init.d/cron restart
发现它依然没有按照国内的时间来执行，之前也没遇到过问题，而且同样的设置，目前另外的机子上也正常执行，最后才想起我这个用的是debian系统。上网找了一圈，发现debian系统下面，仅是设置/etc/localtime是不够的，更加需要的是/etc/timezone这个文件。
找了下debian设置时区的方法，网上说用tzconfig，试了下，提示我要用dpkg-reconfigure tzdata，看来不是所有系统命令都一样的，而且我用的是精简版的系统，有些写入时间命令有些不能执行，估计也跟这个是VPS的关系吧。运行后按照提示设置完毕，重启cron试了下，依然时间不对。想着这个应该是设置/etc/localtime的时区而已。
最后用了tzselect程序来设置时区，运行tzselect命令后，按照自己要的时间选择选项，最后选1保存确认即可。再次重启cron，添加测试任务，这次终于按照本地时间运行了，如果不行就重新登录一下或者重启下。早知道debian下要这样设置，就不用搞了这么久了，继续郁闷。

转载自 [http://www.ddhow.com/blog/crontab.html](http://www.ddhow.com/blog/crontab.html)
