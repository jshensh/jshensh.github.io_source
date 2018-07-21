---
author: 403 Forbidden
comments: true
date: 2015-08-05 14:52:57+00:00
layout: post
slug: openwrt%e4%b8%8b%e5%ae%9e%e7%8e%b0portal%e8%ae%a4%e8%af%81web%e8%ae%a4%e8%af%81
title: OpenWRT下实现Portal认证(WEB认证)
wordpress_id: 2268
categories:
- openwrt
---
首先简单介绍一下什么是Portal认证，Portal认证，通常也会叫Web认证，未认证用户上网时，设备强制用户登录到特定站点，用户可以免费访问其中的服务。当用户需要使用互联网中的其它信息时，必须在门户网站进行认证，只有认证通过后才可以使用互联网资源。现金很多中国移动CMCC、中国联通、中国电信ChinaNet的WIFI都使用这种认证接入方式。
在OpenWRT上实现Portal认证，实际上早已有解决方案：
1. chillispot，但原维护作者停止更新，被chillispot.info接管继续开发；
2.coova-chilli，它是基于chillispot开发拓展的，功能最为强大；可以去官方看一下Coova-chilli；
3.wifidog
前两个由于原维护作者停止更新，笔者也没有深入研究，重点钻研了wifidog，Wifidog也是OpenWRT和DD-WRT中实现Portal比较出名的。
但是，Wifidog只是实现AP认证网关，需要配合外部的Portal服务器才能使用，Portal主要是提供认证所需的WEB页面且实现认证计费等的功能。虽然这也有很多商用解决方案，例如wiwiz、wifiap等，但是这些商业解决方案的目标都是盈利，即使可以免费使用，免费账号的功能和权限都受到了很大的限制，例如不能自定义页面，Web认证页面有广告等等。有条件的人可能打算自己搭建Portal服务器，但是看看Wifidog的官方Wiki，对搭建过程实在是难以理解。后来，笔者发现网络上还有一个authpuppy方案，官方网站 [www.authpuppy.org](http://www.authpuppy.org)，是一个已实现好的Wifidog认证服务器，里面包含各种插件供你使用，官方的安装过程也很简单，如果你懂的HTML和面向对象编程的相关知识且拥有一个服务器，可以自行修改认证页面，使用authpuppy也是一个不错的方案。
但是，即便如此，这些方案还是不够灵活，经过笔者认真钻研，查阅大量资料并经过多次抓包分析，终于理解了Wifidog的工作原理。接下来笔者将会跟你介绍如何自行编写一个轻量级的Web Portal认证服务器。当然，这需要你具有程序设计基础，HTML、CSS当然是少不得的，后端开发语言可以使用PHP或Python或Java等。
首先，需要简单介绍一下Wifidog的工作原理：
1.客户端发出初始化请求，比如访问 www.baidu.com。
2.网关的防火墙规则将这个请求重定向到本地网关的端口上。这个端口是Wifidog监听的端口。
3.Wfidog提供一个HTTP重定向回复，重定向到Web认证页面，重定向的Url的Querystring中包含了Gateway的ID，Gateway的FQDN以及其他的信息。
4.用户向认证服务器发出认证请求
http://portal_server:port/login_script?
gw_id=[GatewayID, default: “default”]
gw_address=[GatewayAddress, internal IP of router]
gw_port=[GatewayPort, port that wifidog Gateway is listening on]
url=[user requested url]；
5.网关返回一个（可以是自定义的）splash（也称作“登录”）页面。
6.用户提供他的凭据信息，比如用户名和密码。
7.成功认证的话，客户端将会被重定向到网关的自己的web页面上，并且带有一个认证凭据（一个一次性的token），内容比如：
http://GatewayIP:GatewayPort/wifidog/auth?token=[auth token]；
8.用户就是用获取到的凭据访问网关。
9.网关去认证服务器询问token的有效性。
10.认证服务器确认token的有效性。
11.网关发送重定向给客户端，以从认证服务器上获取 成功提示页面，重定向到 http://portal_server:port/portal_script 这个位置。
12.认证服务器通知客户请求成功，可以上网了。
图解:
[![1](/uploads/2015/08/1.bmp)](/uploads/2015/08/1.bmp)
然后考察一下Wifidog的配置文件/etc/wifidog.conf，关键的配置项是：
```
AuthServer {
    Hostname                  (Mandatory; Default: NONE)
    SSLAvailable              (Optional; Default: no; Possible values: yes, no)
    SSLPort                   (Optional; Default: 443)
    HTTPPort                  (Optional; Default: 80)
    Path                      (Optional; Default: /wifidog/ Note:  The path must be both prefixed and suffixed by /.  Use a single / for server root.)
    LoginScriptPathFragment   (Optional; Default: login/? Note:  This is the script the user will be sent to for login.)
    PortalScriptPathFragment  (Optional; Default: portal/? Note:  This is the script the user will be sent to after a successfull login.)
    MsgScriptPathFragment     (Optional; Default: gw_message.php? Note:  This is the script the user will be sent to upon error to read a readable message.)
    PingScriptPathFragment    (Optional; Default: ping/? Note:  This is the script the user will be sent to upon error to read a readable message.)
    AuthScriptPathFragment    (Optional; Default: auth/? Note:  This is the script the user will be sent to upon error to read a readable message.)
}
 
# Listen on this port
GatewayPort 2060
 
# Parameter: CheckInterval
# Default: 60
# Optional
#
# How many seconds should we wait between timeout checks.  This is also
# how often the gateway will ping the auth server and how often it will
# update the traffic counters on the auth server.  Setting this too low
# wastes bandwidth, setting this too high will cause the gateway to take
# a long time to switch to it's backup auth server(s).
CheckInterval 60
 
# Parameter: ClientTimeout
# Default: 5
# Optional
#
# Set this to the desired of number of CheckInterval of inactivity before a client is logged out
# The timeout will be INTERVAL * TIMEOUT
ClientTimeout 5
```

AuthServer是Portal服务器的配置项；GatewayPort是Wifidog监听的地址，默认是2060，一般保持默认即可；CheckInterval是心跳时长，单位是秒，什么是心跳呢，客户端认证成功之后，如果有网络访问动作，Wifidog getway就会每隔一段时间访问Portal服务器的一个脚本，用于认证计费，当然，如果客户使用超时或超流量，也可以通过心跳强制客户端下线。ClientTimeout是用户一次认证成功后的网络访问时长，超过这个时间需要重新认证，这个时长并非由ClientTimeout单独决定，取决于INTERVAL * TIMEOUT。详细的配置信息可以访问： [http://dev.wifidog.org/browser/trunk/wifidog/wifidog.conf](http://dev.wifidog.org/browser/trunk/wifidog/wifidog.conf)。
我们重点讨论Portal服务器的配置项，Hostname是Portal服务器的ip或者是域名，SSLAvailable和SSLPort是SSL加密配置，如果你的Portal服务器有配置HTTPS加密，则需要配置这两项；Path是指你的脚本路径(举例，http://a.com/to/，则a.com是域名，/to/是路径)，注意路径必须以“/”开头和结尾，如果是根路径，则填一个“/”即可；接下来的5个配置指明你的脚本名，这说明了我们需要写五个脚本，我会详细说明。(以下文中涉及的“第几步”均是指Wifidog认证过程的步骤)
LoginScriptPathFragment配置项配置的是登陆脚本，它通过GET方式接受传入参数gw_address、gw_port、gw_id、mac和url，gw_address是AP Getway的ip地址；gw_port是Wifidog监听的端口，即上面介绍的wifidog.conf中的GatewayPort配置；gw_id是AP Getway的id，配置文件wifidog.conf中可以配置，默认值是default，这个值的作用是当存在多个AP是，服务器或管理员可以根据不同的id确定用户的接入点；mac是客户计算机的网卡物理地址，注意不是AP网关的mac，这个mac是用来识别客户计算机的；url是客户初始访问的Url，这些Querystring都是AP Getway向客户端发出重定向请求自动生成的。这个脚本同时需要提供登陆页面，如果登陆成功，需要向客户；端返回302重定向，重定向到：http://gw_address:gw_port/wifidog/auth?token=[token]；即实现第7步，其中[token]是你自己自动生成的token字符串，随机生成一个字符串即可，但是长度最好长些，安全性更高，另外，token需要根据不同用户保存，最好保存于数据库中，之后的AP Getway询问token有效性(第9步)还需要用到。这里最好使用cookie或session，使之后的登陆成功页面可以判断用户已经成功，阻止未登录成功的人访问认证成功页面。
PortalScriptPathFragment配置项配置的是登陆成功后服务器展示的脚本(第11步)，它通过GET方式接受1个传入参数，gw_id，这个脚本比较简单，告知用户登陆成功即可，当然，最好重定向到用户之前想要方位的url，即第1步用户输入的URL。
MsgScriptPathFragment配置项配置的是错误信息展示脚本，它通过GET方式接受一个传入参数message，这个脚本也很简单，展示message的内容即可，目的是当认证过程出现错误，AP Getway会重定向到这个脚本，URL中含有错误的信息。
PingScriptPathFragment配置项配置的是心跳脚本，这个脚本它通过GET方式接受5个传入参数，gw_id，sys.uptime，sys.memfree，sys.load，wifidog.uptime，其中，sys.uptime指的是AP Getway的启动时间，sys.memfree指的是AP Getway的空闲内存，sys.load指的是AP Getway的CPU负载，wifidog.uptime指的是wifidog的启动时间，这个脚本每隔一段时间(Wifidog.conf里配置的CheckInterval)，Wifidog会自动访问，但是其目的不是用户验证，而是帮助管理员管理AP节点，了解AP节点的负载情况，适时增加节点等，Wifidog访问这个脚本时，需要这个脚本返回Pong，如果你没有统计AP节点负载数据的需求，可以丢弃这些数据，直接回应Pong，注意，这个回应只包含“Pong”字符串，无需包含其他html标签。
AuthScriptPathFragment是用户认证脚本，实现的是第10步的功能，这个脚本它通过GET方式接受7个传入参数：stage、ip、mac、token、incoming、outcoming和gw_id。其中stage的值是login，ip是客户端的ip，注意不是AP Getwap的ip；mac是客户端的网卡物理地址，token就是你在认证脚本生成并返回给客户端的；incoming和outcoming用于流量控制，默认值为0；gw_id同上。如何识别用户登录成功，通过mac和token吧，LoginScriptPathFragment登陆脚本在用户登陆成功后需要记录用户的mac和token，然后在此处验证，如果匹配，回复Auth: 1，否则，回复Auth: 0。另外，这个脚本也是心跳脚本，每隔一段时间Wifidog会自动访问，如果用户使用时间超过限制或流量超过额度，服务器可以及时回应Auth: 0结束用户的访问。另外需要注意的是，回应同样无需包含html标签，另外，在Auth后的冒号和0/1之间，有一个空格，缺少这个空格也会导致出错。
在配置Wifidog的配置文件wifidog.conf是，配置脚本的配置项都必须以“?”结尾，否则以GET方式传递的QueryString会因Url缺少问号访问错误的脚本。
看到了吧，仅仅5个简单脚本，就可以实现利用Wifidog的Portal认证，当然，这过中还可以有很多应用尚未发掘，比如流量控制、带宽控制、结合Radius服务器实现认证等，你的开发也可以更上一层楼，实现更多功能。不过笔者还有一个建议，在登录页面除了用户名和密码意外，最好加个验证码，防止不怀好意之人暴力破解。
这样，你只需要一个免费的空间，甚至是简单的百度云、新浪SAE等，就可以实现一个认证服务器；有的人可能还会问，能不能把这些脚本集成到路由器当中，我的回答是能，只要你的脚本的功能不多，问题应该不大，但是这么做的风险比较大，路由的负载比较高，导致路由的运行会很不稳定，甚至经常死机，这也是笔者亲身实践的结果，所以笔者不建议这么做。
最后啰嗦提醒的是，WiFidog是使用iptables基于三层协议工作的，所以使用Wifidog的结果是，不仅是Wifi接入需要Portal认证，有线接入同样需要认证。避免这种情况最简单的做法是设立mac白名单。可能有的人又会问，能不能做到仅是Wifi接入需要认证，有线接入的无需认证，有的人可能想更上一层楼，能不能开两个Wifi，仅其中一个Wifi需要认证，另一个Wifi和有线网络不需要Portal认证，我的回答是能，至于具体做法，以后再介绍。

转载自 [http://talk.withme.me/?p=222](http://talk.withme.me/?p=222)
