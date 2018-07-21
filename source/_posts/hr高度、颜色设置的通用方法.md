---
author: 403 Forbidden
comments: true
date: 2013-10-04 03:36:00+00:00
layout: post
slug: hr%e9%ab%98%e5%ba%a6%e3%80%81%e9%a2%9c%e8%89%b2%e8%ae%be%e7%bd%ae%e7%9a%84%e9%80%9a%e7%94%a8%e6%96%b9%e6%b3%95
title: hr高度、颜色设置的通用方法
wordpress_id: 880
categories:
- Web 开发
---
经过反复试验，发现hr其实是个框。所以，我们把它当做一个框来处理就可以了。
可是又经过反复试验以后，发现设置background-color的方法在IE下无效，所以只能选择设置border，这是在FF、IE、Chrome下通用的方法。
以下给出代码：
```css
hr{
	border:none;
	border-top:1px solid red;
	height:0;
}
```

