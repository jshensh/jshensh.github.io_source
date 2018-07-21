---
author: 403 Forbidden
comments: true
date: 2015-12-29 01:12:50+00:00
layout: post
slug: '2436'
title: 识别真假搜索引擎（搜索蜘蛛）方法（baidu,google,Msn,sogou,soso等)
wordpress_id: 2436
categories:
- 建站相关
---
最近工作中遇到个问题，就是有一些资源，不希望别人很派发的抓取，这样会占用我们带宽还有资源。因此，我们对页面访问做了频率限制。这样一来，又怕搜索蜘蛛给限制了。 因此，我们有个需求，就是除了常见搜索蜘蛛，其它都要做频率限制。 工作就变成了，首先我们怎么样正确表示搜索蜘蛛。

**怎么样识别搜索蜘蛛**
搜索引擎基本上由最先google,和国内的baidu统一了。刚开始比较混乱，后期有很多规则协议，可以遵循。基本上一些新兴的搜索引擎在访问站点时候，都会延用google制定的一些规则。它们一般都会有特定的user-agent，但是，如果我们只通过user-agent去识别搜索蜘蛛的话，那样第三方抓取程序，都会去伪造个user-agent。变成搜索蜘蛛的，如：Googlebot/2.1 (+[http://www.googlebot.com/bot.html) ](http://www.googlebot.com/bot.html)%C2%A0)是，google蜘蛛的值。

现在一般搜索引擎都提供一个DNS 反向IP查询功能，只需要把访问来的IP 通过反向查询域名，看是不是搜索引擎域名。这样伪造的爬虫工具，就会被很容易识别了。 具体识别真假蜘蛛只需要：_1，判断user-agent是否满足蜘蛛格式 2，然后进一步确定IP 反解析域名是否属于该搜索引擎域名._

| 搜索引擎 | user-agent(包含) | 是否PTR | 备注                                             |
| :------: | :--------------: | :-----: | ------------------------------------------------ |
| google   | Googlebot        | √       | host ip  得到域名：googlebot.com主域名           |
| baidu    | Baiduspider      | √       | host ip  得到域名：*.baidu.com 或 *.baidu.jp     |
| yahoo    | Yahoo!           | √       | host ip  得到域名：inktomisearch.com主域名       |
| Sogou    | Sogou            | ×       | *Sogou web spider/3.0(+http://www.sogou.com/docs/help/webmasters.htm#07″)<br />*Sogou Push Spider/3.0(+http://www.sogou.com/docs/help/webmasters.htm#07″) |
| 网易     | YodaoBot         | ×       | *Mozilla/5.0 (compatible; YodaoBot/1.0; http://www.yodao.com/help/webmaster/spider/”; ) |
| MSN      | MSNBot           | √       | host ip  得到域名：live.com主域名                |
| 360      | 360Spider        | ×       | Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.8.0.11)  Firefox/1.5.0.11; 360Spider |
| soso     | Sosospider       | ×       | Sosospider+(+http://help.soso.com/webspider.htm) |
| bing     | bingbot          | √       | host ip  得到域名：msn.com主域名                 |


以上是我整理一些常用搜索引擎的user-agent特征码，以及IP反向解析情况。保证准确识别搜索引擎，我们通过IP反解析是最为准确方法。好在google,baidu,bing都有做反向解析。基本上占用了80%搜索市场了。下面，我是我检测方法。

**PHP反解析IP方法**
```php
    function check_spider($ip,$ua) {
        static $spider_list=array(
            'google'=>array('Googlebot','googlebot.com'),
            'baidu'=>array('Baiduspider','.baidu.'),
            'yahoo'=>array('Yahoo!','inktomisearch.com'),
            'msn'=>array('MSNBot','live.com'),
            'bing'=>array('bingbot','msn.com')
        );
	
        if(!preg_match('/^(\d{1,3}\.){3}\d{1,3}$/',$ip)) return false;
        if(empty($ua)) return false;
 
        foreach ($spider_list as $k=>$v) {
            if(stripos($ua,$v[0])!==false) {
                $domain = gethostbyaddr($ip);

                if($domain && stripos($domain,$v[1])!==false) {
                    return $k;
                }
            }
        }
        return false;
    }
```

目前只加入几个搜索引擎检测，这些是可以做反解析查询的。不能做反解析查询的，最好做速度限制，用户会使用它们来伪造搜索引擎来抓取你的资源。欢迎大家交流，先写到这里了。

转载自 [http://blog.chacuo.net/147.html](http://blog.chacuo.net/147.html)
