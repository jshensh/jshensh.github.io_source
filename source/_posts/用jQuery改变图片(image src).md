---
author: 403 Forbidden
comments: true
date: 2013-10-12 06:16:03+00:00
layout: post
slug: '%e7%94%a8jquery%e6%94%b9%e5%8f%98%e5%9b%be%e7%89%87image-src'
title: 用jQuery改变图片(image src)
wordpress_id: 931
categories:
- Web 开发
---
可以使用jQuery的attr()函数，请看下面的例子：
 
```html
<img id="my_image" src="first.jpg"/>
```

 
jQuery改变src:
```js
$("#my_image").attr("src","second.jpg");
```

 
绑定onclick事件:
```js
$("#my_image").click( function() {
      $("#my_image").attr("src","second.jpg");
});
```

 
单机更改图片:
```js
$("img").click( function() {
      var src = ($(this).attr("src") === "img1_on.jpg")
                    ? "img2_on.jpg" 
                    : "img1_on.jpg";
      $(this).attr("src", src);
});
```

