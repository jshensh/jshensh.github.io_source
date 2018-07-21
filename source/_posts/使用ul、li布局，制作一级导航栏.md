---
author: 403 Forbidden
comments: true
date: 2013-10-06 03:39:18+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8ul%e3%80%81li%e5%b8%83%e5%b1%80%ef%bc%8c%e5%88%b6%e4%bd%9c%e4%b8%80%e7%ba%a7%e5%af%bc%e8%88%aa%e6%a0%8f'
title: 使用ul、li布局，制作一级导航栏
wordpress_id: 884
categories:
- Web 开发
---
```html
    <div id="menu">
        <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">新闻</a></li>
            <li><a href="#">财经</a></li>
            <li><a href="#">汽车</a></li>
            <li><a href="#">手机</a></li>
            <li><a href="#">体育</a></li>
            <li><a href="#">游戏</a></li>
            <li><a href="#">论坛</a></li>
        </ul>
    </div>
```

这样就会列出导航菜单来，但是是纵向的，下面我们来调节一下样式：①去掉li前面的圆点②设置成横向③字体样式和间距④去除超链接下划线
```html
    <style type="text/css">
        #menu ul li
        {
            list-style: none;
            float: left;
            width: 85px;
            font-family: 微软雅黑;
            font-size: x-large;
        }
        #menu ul li a
        {
            text-decoration: none;
        }
    </style>
```

