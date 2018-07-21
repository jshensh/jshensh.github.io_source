---
author: 403 Forbidden
comments: true
date: 2013-10-05 03:37:31+00:00
layout: post
slug: jquery%e8%8e%b7%e5%8f%96%e6%b5%8f%e8%a7%88%e5%99%a8%e4%b8%ad%e7%9a%84%e5%88%86%e8%be%a8%e7%8e%87
title: jQuery获取浏览器中的分辨率
wordpress_id: 882
categories:
- Web 开发
---
```js
<script type="text/javascript">
$(document).ready(function()         
{
alert($(window).height()); //浏览器当前窗口可视区域高度
alert($(document).height()); //浏览器当前窗口文档的高度
alert($(document.body).height());//浏览器当前窗口文档body的高度
alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
alert($(window).width()); //浏览器当前窗口可视区域宽度
alert($(document).width());//浏览器当前窗口文档对象宽度
alert($(document.body).width());//浏览器当前窗口文档body的高度
alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin
alert(screen.height);//显示器分辨率，只能用JavaScript代码获取
alert(screen.width);
})
</script>
```


网页可见区域宽： ``document.body.clientWidth``
网页可见区域高： ``document.body.clientHeight``
网页可见区域宽： ``document.body.offsetWidth`` (包括边线的宽)
网页可见区域高： ``document.body.offsetHeight`` (包括边线的高)
网页正文全文宽： ``document.body.scrollWidth``
网页正文全文高： ``document.body.scrollHeight``
网页被卷去的高： ``document.body.scrollTop``
网页被卷去的左： ``document.body.scrollLeft``
网页正文部分上： ``window.screenTop``
网页正文部分左： ``window.screenLeft``
屏幕分辨率的高： ``window.screen.height``
屏幕分辨率的宽： ``window.screen.width``
屏幕可用工作区高度： ``window.screen.availHeight``
屏幕可用工作区宽度： ``window.screen.availWidth``
