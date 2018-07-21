---
author: 403 Forbidden
comments: true
date: 2014-01-13 03:14:57+00:00
layout: post
slug: '%e4%bf%ae%e6%ad%a3-syntaxhighlighter-%e7%9a%84%e5%b7%a5%e5%85%b7%e6%a0%8f%e5%ae%bd%e5%ba%a6%e9%ab%98%e5%ba%a6%e5%80%bc%e7%9a%84-bug'
title: 修正 SyntaxHighlighter 的工具栏宽度高度值的 bug
wordpress_id: 1134
categories:
- 建站相关
---
话不多说。。先上对比图

修改前
[![toolbar0](/uploads/2014/01/toolbar0.jpg)](/uploads/2014/01/toolbar0.jpg)
修改后
[![toolbar1](/uploads/2014/01/toolbar1.jpg)](/uploads/2014/01/toolbar1.jpg)

相信许多博客和本站一样，使用了 SyntaxHighlighter Evolved 这款代码高亮插件，但是，开了工具栏以后，会发现工具栏的下半部分有很多的留白，效果很不好。修改的方法很简单，相信看了上面两张图就能知道，给 div 一个固定的高度与宽度就行了。

打开 你的博客的根目录/plugins/syntaxhighlighter/syntaxhighlighter2/styles/shCore.css ，定位到第 165 行，插入下面的两句代码
```css
	height: 16px !important;
	width: 96px !important;

```

如图
[![toolbar](/uploads/2014/01/toolbar.jpg)](/uploads/2014/01/toolbar.jpg)

保存以后上传覆盖源文件即可

表示我也是看到 [http://www.oschina.net/code/snippet_59831_15056](http://www.oschina.net/code/snippet_59831_15056) 的效果以后才想起来改这个的。。。不改的话太难看了。。。
