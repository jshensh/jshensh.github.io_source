---
author: 403 Forbidden
comments: true
date: 2014-03-06 13:49:13+00:00
layout: post
slug: wordpress-%e5%a4%8d%e5%88%b6%e6%97%b6%e8%87%aa%e5%8a%a8%e6%b7%bb%e5%8a%a0%e6%96%87%e7%ab%a0%e7%89%88%e6%9d%83
title: WordPress 复制时自动添加文章版权
wordpress_id: 1463
categories:
- 建站相关
---
这个我在许多博客也看到有，我这个版本的好像是 WP 大学流出来的。用法很简单，如下：

将如下的代码加入到 functions.php 就可以了：
```php
//自动添加文章版权
function add_copyright_text() { ?>
<script type='text/javascript'>
function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    var pagelink = "<br /><br />本文来源：<a href='"+document.location.href+"'>"+document.location.href+"</a>"; 
    var copy_text = selection + pagelink;
    var new_div = document.createElement('div');
    new_div.style.left='-99999px';
    new_div.style.position='absolute';
    body_element.appendChild(new_div );
    new_div.innerHTML = copy_text ;
    selection.selectAllChildren(new_div );
    window.setTimeout(function() {
        body_element.removeChild(new_div );
    },0);
}
document.oncopy = addLink;
</script>
<?php
}
add_action( 'wp_footer', 'add_copyright_text');
```


加完你再复制就会出现类似如下的：
```
这只是一个例子

本文来源：http://www.zntec.cn/?p=7664&preview=true
```


转载自 [http://www.zntec.cn/archives/wordpress-auto-copyright.html](http://www.zntec.cn/archives/wordpress-auto-copyright.html)

另注: 该方法在 Android UC 浏览器上实测无效
