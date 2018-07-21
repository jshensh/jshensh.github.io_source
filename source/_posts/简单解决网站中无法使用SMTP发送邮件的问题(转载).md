---
author: 403 Forbidden
comments: true
date: 2013-04-28 08:05:46+00:00
layout: post
slug: '%e7%ae%80%e5%8d%95%e8%a7%a3%e5%86%b3%e7%bd%91%e7%ab%99%e4%b8%ad%e6%97%a0%e6%b3%95%e4%bd%bf%e7%94%a8smtp%e5%8f%91%e9%80%81%e9%82%ae%e4%bb%b6%e7%9a%84%e9%97%ae%e9%a2%98%e8%bd%ac%e8%bd%bd'
title: 简单解决网站中无法使用SMTP发送邮件的问题(转载)
wordpress_id: 61
categories:
- 建站相关
---
有许多的虚拟主机都禁止了 MAIL 函数，当然、也是因为防止垃圾邮件的诞生，但是也影响了一部分客户

[![image](/uploads/2013/04/wpid-20130427131924727.jpg)](/uploads/2013/04/wpid-20130427131924727.jpg)



许多的用户就会选择使用 SMTP 来发送邮件，但是有些主机看着探针支持 SMTP 但是却无法发邮件是啥回事？今天我就来说说几种解决方式吧，如果遇见了错误但不懂如何解决的请看！（以Wordpress示范）

一、修改发信端口

这个是最低级的一个错误之一，就是端口错误。很多人喜欢乱写，但是常用的有 25、465、587 等。

如果使用常用无 SSL 发信端口没有用的话，就用 SSL 的！例如 465 这样（许多邮箱的端口不同）的端口。

二、替换发信函数

正常情况下 SMTP 都是使用 fsockopen 函数来发信的，当然、如果禁用了我们还可以用其他的！

1. 替换为 pfsockopen 函数：

在 “wp-includes” 下找到 “class-smtp.php” 并搜索 “fsockopen” 大约会得出以下结果：

[![image](/uploads/2013/04/wpid-20130427132725598.jpg)](/uploads/2013/04/wpid-20130427132725598.jpg)



在前面加一个 “p” 就可以了，最好是小写。然后保存上传，如果无误的话、你的网站已经可以发信了。

2. 使用 stream_socket_client 函数：

同样是找到 “class-smtp.php” 并搜索 “fsockopen”，替换如下代码：

```php
@fsockopen($host,
```


把上面的代码替换成：

```php
@stream_socket_client($host.":".$port,
```


如果不是很懂的话，请看图：

[![image](/uploads/2013/04/wpid-2013042713330981.jpg)](/uploads/2013/04/wpid-2013042713330981.jpg)



如果第一种方法不行，这种方法一般都是不行的了 …… 不要沮丧，有高手还自定义函数的、我就不介绍了

三、使用一些神奇的插件

这个可能性就非常的小啦，不过先前看到有一个人发布的一个插件、可以支持任意主机发信。具体的可能是本地收取了发信内容之后：传送到发信平台（私人或公有的发信服务器、类似百度 BCMS 这种），然后同意进行传送。

我没有多余的服务器，我也就不搞这些事情了。有时间的话我会去做一个 BCMS 的插件如何呢？

原文链接：[http://www.zntec.cn/archives/smtp-error.html](http://www.zntec.cn/archives/smtp-error.html)
