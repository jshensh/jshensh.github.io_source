---
author: 403 Forbidden
comments: true
date: 2013-05-12 07:52:13+00:00
layout: post
slug: wordpress-3-5-1-for-bae
title: WordPress 3.5.1 for BAE
wordpress_id: 156
categories:
- 程序发布
---
声明一下，这份移植版 WordPress 不是我修改的。。。我没这个本事。。。有问题别找我。。。我就更新了一个插件，加上了评论回复邮件通知功能而已。。。
<!-- more -->
需要注意的是，把压缩包下载下来以后，不要急着上传，先解压，你会得到一个 wp-config.php 和另一个压缩包。请修改 wp-config.php 里
第 19 行
```php
define('DB_NAME', '你的数据库名');

```

和第 37 行
```php
define('BCMS_QUEUE', '云消息Key');

```

为您的数据库名和 BCMS Queue 然后将该文件拖入另一个压缩包，上传另一个压缩包即可
下载地址：[WordPress 3.5.1 for BAE](http://pan.baidu.com/share/link?shareid=2679139762&uk=3725396711)
