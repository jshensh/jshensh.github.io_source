---
author: 403 Forbidden
comments: true
date: 2016-06-16 05:08:25+00:00
layout: post
slug: css3-calc%ef%bc%9acss%e7%ae%80%e5%8d%95%e7%9a%84%e6%95%b0%e5%ad%a6%e8%bf%90%e7%ae%97-%e5%8a%a0%e5%87%8f%e4%b9%98%e9%99%a4
title: css3 calc()：css简单的数学运算-加减乘除
wordpress_id: 2578
categories:
- Web 开发
---
多好的东西啊，不用js，一个css就解决了。
```css
.box{
border:1px solid #ddd;
width:calc(100% - 100px);
background:#9AC8EB;
}
```
3栏等宽布局。
```css
.box{
margin-left:20px;
width:calc(100%/3 - 20px);
}
.box:nth-child(3n){
margin-left:0;
}
```

**实例：**
```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>css3 calc()：css简单的数学运算-加减乘除--刘和虎的博客</title>
<script type="text/javascript" src="http://www.liuhehu.com/themes/sohodesign/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="js/iehtml5.js"></script>
<style>
.box{
border:1px solid #ddd;
margin:0 auto;
width:calc(100% - 100px);
width:-moz-calc(100% - 100px);
width:-webkit-calc(100% - 100px);
background:#9AC8EB;
}
</style>
</head>
<body>
<div class="box">width:calc(100% - 100px)</div>
<script>
/*
作者：刘和虎
*/
$(function(){
});
</script>
</body>
</html>
```

**运算规则**
calc()使用通用的数学运算规则，但是也提供更智能的功能：

使用“+”“-”“*”“/”四则运算；
可以使用百分比、px、em、rem等单位；
可以混合使用各种单位进行计算。

**浏览器支持**
firefox 4.0+已经开支支持calc()功能，不过要使用-moz-calc()私有属性，chrome从19 dev版，也开始支持私有的-webkit-calc()写法，IE9这次则牛逼了一次，原生支持标准的不带前缀的写法了。Opera貌似还不支持～～

**注意：**
在http://www.qianduan.net/calc-at-at-at-page-intelligent-layout.html看到的，他的原文中width:calc(100%-100px)是没有空格的，经测试无效，就像其评论中：calc()里面的表达式好像要注意格式。

转载自 [http://www.liuhehu.com/?p=320](http://www.liuhehu.com/?p=320)
