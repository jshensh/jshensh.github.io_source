---
author: 403 Forbidden
comments: true
date: 2014-08-28 16:55:07+00:00
layout: post
slug: '%e7%90%86%e8%a7%a3linux%e7%b3%bb%e7%bb%9f%e4%b8%ad%e7%9a%84load-average%ef%bc%88%e5%9b%be%e6%96%87%e7%89%88%ef%bc%89'
title: 理解Linux系统中的load average（图文版）
wordpress_id: 1841
categories:
- VPS 技术
---
**一、什么是load average？**
linux系统中的Load对当前CPU工作量的度量 (WikiPedia: the system load is a measure of the amount of work that a computer system is doing)。也有简单的说是进程队列的长度。
Load Average 就是一段时间 (1 分钟、5分钟、15分钟) 内平均 Load 。
我们可以通过系统命令"w"查看当前load average情况
```
[root@CNC-BJ-5-3N1 ~]# w
20:01:55 up 76 days, 8:20, 6 users, load average: 1.30, 1.48, 1.69
```

上面内容显示系统负载为“1.30, 1.48, 1.69”，这3个值是什么意思呢？



	
  * 第一位1.30：表示最近1分钟平均负载

	
  * 第二位1.48：表示最近5分钟平均负载

	
  * 第三位1.69：表示最近15分钟平均负载


PS. linux系统是5秒钟进行一次Load采样

**二、load average值的含义**
**2.1 单核处理器**
假设我们的系统是单CPU单内核的，把它比喻成是一条单向马路，把CPU任务比作汽车。当车不多的时候，load <1；当车占满整个马路的时候 load=1；当马路都站满了，而且马路外还堆满了汽车的时候，load>1
[![2173a04d-e43f-35bb-8933-22727960d54f](/uploads/2014/08/2173a04d-e43f-35bb-8933-22727960d54f.png)](/uploads/2014/08/2173a04d-e43f-35bb-8933-22727960d54f.png)


Load < 1


[![10ab4026-b112-39df-8ad1-21b5b5b5de1a](/uploads/2014/08/10ab4026-b112-39df-8ad1-21b5b5b5de1a.png)](/uploads/2014/08/10ab4026-b112-39df-8ad1-21b5b5b5de1a.png)


Load = 1


[![59162f56-18e2-33d3-80bc-b8ec7045b30d](/uploads/2014/08/59162f56-18e2-33d3-80bc-b8ec7045b30d.png)](/uploads/2014/08/59162f56-18e2-33d3-80bc-b8ec7045b30d.png)


Load >1



**2.2 多核处理器**
我们经常会发现服务器Load > 1但是运行仍然不错，那是因为服务器是多核处理器（Multi-core）。
假设我们服务器CPU是2核，那么将意味我们拥有2条马路，我们的Load = 2时，所有马路都跑满车辆。
[![2da046b5-0f2a-3519-b41f-f61fe56ee443](/uploads/2014/08/2da046b5-0f2a-3519-b41f-f61fe56ee443.png)](/uploads/2014/08/2da046b5-0f2a-3519-b41f-f61fe56ee443.png)


Load = 2时马路都跑满了


```shell
#查看CPU core 
grep 'model name' /proc/cpuinfo | wc -l
```


**3. 什么样的Load average值要提高警惕**
0.7 < load < 1: 此时是不错的状态，如果进来更多的汽车，你的马路仍然可以应付。 load = 1: 你的马路即将拥堵，而且没有更多的资源额外的任务，赶紧看看发生了什么吧。 load > 5: 非常严重拥堵，我们的马路非常繁忙，每辆车都无法很快的运行

**4. 三种Load值，应该看哪个？**
通常我们先看15分钟load，如果load很高，再看1分钟和5分钟负载，查看是否有下降趋势。
1分钟负载值 > 1，那么我们不用担心，但是如果15分钟负载都超过1，我们要赶紧看看发生了什么事情。所以我们要根据实际情况查看这三个值。

**5. 通过Nagios配置Load监控告警**
见文：[http://heipark.iteye.com/blog/1340190](http://heipark.iteye.com/blog/1340190)

参考：
Understanding Linux CPU Load - when should you be worried?
[http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages](http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages)

Unix/Linux 的 Load 初级解释
[http://www.dbanotes.net/arch/unix_linux_load.html](http://www.dbanotes.net/arch/unix_linux_load.html)

-- heipark

转载自 [http://heipark.iteye.com/blog/1340384](http://heipark.iteye.com/blog/1340384)
