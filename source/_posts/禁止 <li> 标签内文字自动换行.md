---
author: 403 Forbidden
comments: true
date: 2013-10-03 04:32:10+00:00
layout: post
slug: '%e7%a6%81%e6%ad%a2-%e6%a0%87%e7%ad%be%e5%86%85%e6%96%87%e5%ad%97%e8%87%aa%e5%8a%a8%e6%8d%a2%e8%a1%8c'
title: 禁止 <li> 标签内文字自动换行
wordpress_id: 876
categories:
- Web 开发
---
当中文文字很长的时候（中间没有空格也没有换行符号），不管是IE还是firefox，到达边界都会自动换行。 
但是有的情况，我们并不希望这样。比如：当在几个li并排排列，不想让每行的最后的一个li的文字自动换行，那就可以用本属性了。
使用这个css属性之后，文本只有在遇到空格或者是换行符的时候才能 换行
比如：
```html
<style type="text/css">   
div{width:300px;border:1px solid red;margin:10px;overflow:hidden;}   
    .nowrap{white-space: nowrap;}   
</style>
<div class="nowrap">   
这是一段很长的文字中间没有空格也没有换行它不会自动换行直到被截取掉<br />胡锦涛抵达日本开始访问日本方面最高规格迎接 更多<br />   
</div>   
<div>这是一段很长的文字中间没有空格也没有换行但它会自动换行<br />胡锦涛抵达日本开始访问日本方面最高规格迎接 更多<br /></div>   
<p>上面两个div里超宽的文字，第一个里面的被禁止换行，然后超宽的被截取了；第二个不做设置，于是自动换行了</p>   
<a href="?">Web标准化 <a href="http://www.div-css.com">www.div-css.com</a></a>
```

