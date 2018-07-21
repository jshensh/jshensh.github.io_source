---
author: 403 Forbidden
comments: true
date: 2014-08-15 07:15:09+00:00
layout: post
slug: '%e5%85%8d%e8%b4%b9%e8%b6%85%e5%a4%a7%e9%87%8f%e9%82%ae%e4%bb%b6%e5%8f%91%e9%80%81%e6%9c%8d%e5%8a%a1mailgun%e6%8f%90%e4%be%9bsmtp%e5%92%8capi%e6%94%af%e6%8c%81'
title: 免费超大量邮件发送服务Mailgun提供SMTP和API支持
wordpress_id: 1787
categories:
- 建站相关
---
**一、Mailgun申请与使用方法 **

1、Mailgun官方网站：[http://www.mailgun.com](http://www.mailgun.com)

2、进入Mailgun，注册一个账号。
[![Mailgun注册账号](http://img.freehao123.com/uploads/2014/06/mailgun_01.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_01.gif)

3、然后Mailgun会告诉可以使用PHP、JAVA、Curl、Ruby、Python、C#等语言来调用Mailgun的API发送邮件，想要发送大量的邮件使用API开发是必不可少的。
[![Mailgun开发代码](http://img.freehao123.com/uploads/2014/06/mailgun_02.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_02.gif)

4、一般地我们使用Mailgun的SMTP就可以了。Mailgun注册后会自动为我们生成一个超长的二级域名作为发件人，但是我们可以自己添加域名，这样还可以获得更多的免费发送邮件配额。
[![Mailgun添加自己的域名](http://img.freehao123.com/uploads/2014/06/mailgun_03.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_03.gif)

5、添加域名时一般使用自己的二级域名。
[![Mailgun使用自己的二级域名](http://img.freehao123.com/uploads/2014/06/mailgun_04.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_04.gif)

6、然后Mailgun会生成域名的TXT记录。
[![Mailgun生成域名解析记录](http://img.freehao123.com/uploads/2014/06/mailgun_05.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_05.gif)

7、根据页面的提示，到域名的DNS管理处修改。
[![Mailgun修改域名DNS解析](http://img.freehao123.com/uploads/2014/06/mailgun_06.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_06.gif)

8、然后回到Mailgun点击验证域名，一般只有DNS全部生效后，Mailgun才会显示域名验证成功。

9、Mailgun的域名验证成功后，就可以开始使用这个域名来发送邮件了，SMTP服务器地址、账号、密码、端口等都可以看到。
[![Mailgun验证域名成功](http://img.freehao123.com/uploads/2014/06/Discourse_11.gif)](http://img.freehao123.com/uploads/2014/06/Discourse_11.gif)

10、Mailgun还有简单的域名反垃圾服务。
[![Mailgun反垃圾](http://img.freehao123.com/uploads/2014/06/mailgun_09.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_09.gif)

11、如果没有用自己的域名，可以使用Mailgun默认生成的域名发送邮件。
[![Mailgun使用默认域名发送邮件](http://img.freehao123.com/uploads/2014/06/mailgun_11.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_11.gif)

**二、Mailgun邮件跟踪、发送日志和取消订阅实用功能**

1、Mailgun提供了强大的邮件跟踪统计功能。
[![Mailgun邮件跟踪统计](http://img.freehao123.com/uploads/2014/06/mailgun_12.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_12.gif)

2、在这里可以看到自己用Mailgun发出去的邮件的送达、阅读、点击等情况。
[![Mailgun查看邮件发送情况](http://img.freehao123.com/uploads/2014/06/mailgun_13.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_13.gif)

3、Mailgun提供的日志中，可以用来查看Mailgun操作记录和一些错误信息。
[![Mailgun发送邮件日志](http://img.freehao123.com/uploads/2014/06/mailgun_14.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_14.gif)

4、Mailgun还提供一个贴心的“Unsubscribes”功能，即取消订阅功能。
[![Mailgun取消订阅](http://img.freehao123.com/uploads/2014/06/mailgun_15.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_15.gif)

5、这个功能主要是为了提高用户体验，比如有些人可能对不断收到信息推送服务的邮件很反感，在邮件最下方加一个“取消订阅”的功能，用户只要一点击以后就不会收到类似的邮件了。而我们也可以在Mailgun中看到取消订阅的情况统计。
[![Mailgun统计取消订阅情况](http://img.freehao123.com/uploads/2014/06/mailgun_16.gif)](http://img.freehao123.com/uploads/2014/06/mailgun_16.gif)

6、这是我用Mailgun测试发送的邮件。
[![Mailgun测试邮件](http://img.freehao123.com/uploads/2014/06/Discourse_12.gif)](http://img.freehao123.com/uploads/2014/06/Discourse_12.gif)

转载自 [http://www.freehao123.com/amazon-ses-mailgun/](http://www.freehao123.com/amazon-ses-mailgun/) 有删减

P.S. 自带的 php sdk 不怎么会用。。。于是根据 curl 版写了个，附源码
```php
    function mailgun_poster($api,$domain,$from,$to,$subject,$message,$type="html") {
        $post_fields=array('from'=>$from,'to'=>$to,'subject'=>$subject,$type=>$message);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.mailgun.net/v2/".$domain."/messages");
        curl_setopt($ch, CURLOPT_USERPWD, $api);
        curl_setopt($ch, CURLOPT_HTTPGET, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$post_fields);
        $result=curl_exec($ch);
        curl_close($ch);
        $result=json_decode($result,1);
        return $result["message"]=="Queued. Thank you.";
    }
```

