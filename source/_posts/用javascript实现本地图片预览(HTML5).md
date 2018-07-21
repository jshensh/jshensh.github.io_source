---
author: 403 Forbidden
comments: true
date: 2015-03-11 10:56:51+00:00
layout: post
slug: '%e7%94%a8javascript%e5%ae%9e%e7%8e%b0%e6%9c%ac%e5%9c%b0%e5%9b%be%e7%89%87%e9%a2%84%e8%a7%88html5'
title: 用javascript实现本地图片预览(HTML5)
wordpress_id: 2191
categories:
- Web 开发
---
使用FileReader实现打开本地图片并预览。 
挺方便的，可惜不是所有浏览器都支持，坑爹的IE。 

```html
<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">  
<script type="text/javascript">
function preImg(sourceId, targetId) {
	if (typeof FileReader === 'undefined') {
		alert('Your browser does not support FileReader...');
		return;
	}
	var reader = new FileReader();

	reader.onload = function(e) {
		var img = document.getElementById(targetId);
		img.src = this.result;
	}
	reader.readAsDataURL(document.getElementById(sourceId).files[0]);
}
</script>
</head>
<body>
<form action="">
	<input type="file" name="imgOne" id="imgOne" onchange="preImg(this.id,'imgPre');" />
	<img id="imgPre" src="" style="display: block;" />  
</form>
</body>
</html>
```

转载自 [http://crayster.iteye.com/blog/1543058](http://crayster.iteye.com/blog/1543058)
