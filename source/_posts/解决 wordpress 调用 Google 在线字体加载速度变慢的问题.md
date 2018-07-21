---
author: 403 Forbidden
comments: true
date: 2014-06-02 11:21:20+00:00
layout: post
slug: '%e8%a7%a3%e5%86%b3-wordpress-%e8%b0%83%e7%94%a8-google-%e5%9c%a8%e7%ba%bf%e5%ad%97%e4%bd%93%e5%8a%a0%e8%bd%bd%e9%80%9f%e5%ba%a6%e5%8f%98%e6%85%a2%e7%9a%84%e9%97%ae%e9%a2%98'
title: 解决 wordpress 调用 Google 在线字体加载速度变慢的问题
wordpress_id: 1598
categories:
- 建站相关
---
```shell
sed -i s/fonts\.googleapis\.com/fonts.useso.com/g `grep fonts\.googleapis\.com -rl ./`
```

解决问题



~~最近有消息称我们伟大的墙又升级了，Google 遭到的封锁更加严重，加了 https 都没法打开。这不是问题关键，关键是，wordpress 调用了 Google 的 Open Sans 在线字体，但域 fonts.googleapis.com 也已无法正常访问，导致站点打开速度变慢，这怎么能忍？简直丧心病狂！表示过会还得去看看 chart.googleapis.com 是不是也被封了。。。如果封掉了还得。。。跑偏了，接下来说说应该怎么解决这个问题了。。。
之前看到有人说直接禁用 wordpress 调用 Open Sans 字体([关闭谷歌的Open Sans字体为WordPress后台加速](http://www.zzfly.net/open-sans-google-wordpress/))，但总觉得这样做未免有点太绝，而且我也有点强迫症。。。总觉得原版的才是最好的。。。于是我就给 fonts.googleapis.com 搭了个反代(其实可以把文件下到自己服务器上改调用地址的，但又不想改 wordpress 文件结构，所以就用 vpsme 搭了个反代)。。。
首先，我用 vpsme 搭了个反代，域 fonts.imjs.work，因为是共享 ip，端口 20808，附带个规则~~
```
server        {
        listen          80;
        server_name     fonts.imjs.work;
 
        location / {
        proxy_pass          http://fonts.googleapis.com/;
        proxy_redirect      off;
        proxy_set_header    X-Real-IP       $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

然后，重载一下配置
```shell
service nginx reload
```


其次，我进自己 vps ssh 搜了下有哪些文件调用了 Google Apis 的字体
```shell
grep -r "fonts.googleapis.com" /home/wwwroot/233.imjs.work
```

出来了五个结果
[![Screenshot_2014-06-02-18-09-11](/uploads/2014/06/Screenshot_2014-06-02-18-09-11-576x1024.png)](/uploads/2014/06/Screenshot_2014-06-02-18-09-11.png)
其中，三个是需要改的(另外两个是别的主题里的，我用不到)
```
/home/wwwroot/233.imjs.work/themes/twentytwelve/functions.php:              $font_url = add_query_arg( $query_args, "$protocol://fonts.googleapis.com/css" );

/home/wwwroot/233.imjs.work/wp-includes/script-loader.php:    $open_sans_font_url = "//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,300,400,600&subset=$subsets";

/home/wwwroot/233.imjs.work/wp-includes/js/tinymce/plugins/compat3x/css/dialog.css:@import url(//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,300,400,600&subset=latin-ext,latin);
```

将 fonts.googleapis.com 都修改为刚才的我们的域 fonts.imjs.work:20808，保存，立即生效。

现在可以访问测试下啦，不过我的站还是有点慢的。。。azure 流量超了。。。用 bluevm 的 128 撑一会。。。17 号搬回去。。。</del>
