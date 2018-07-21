---
author: 403 Forbidden
comments: true
date: 2013-10-02 04:18:59+00:00
layout: post
slug: '%e7%94%a8jquery%e6%9d%a5%e7%9b%91%e5%90%ac%e6%b5%8f%e8%a7%88%e5%99%a8%e6%94%b9%e5%8f%98%e7%aa%97%e5%8f%a3%e5%a4%a7%e5%b0%8f%e4%ba%8b%e4%bb%b6'
title: 用JQuery来监听浏览器改变窗口大小事件
wordpress_id: 874
categories:
- Web 开发
---
做web开发的时候会遇到需要监听浏览器窗口大小改变事件，而进行相关操作。这里向大家介绍一下 JQuery 浏览器窗口改变事件。
```js
$(window).resize();
```

这里需要注意 这个事件不要写在页面加载完成事件（ $(function(){…} ）内部，而需要写在他外面。
```html
<script type=”text/javascript”>
$(window).resize(function() {
var width = $(this).width();
var height = $(this).height();
alert('width'+width+'-height'+height);
});
</script>
```

