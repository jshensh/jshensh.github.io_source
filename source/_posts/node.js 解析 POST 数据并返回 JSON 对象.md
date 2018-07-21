---
author: 403 Forbidden
comments: true
date: 2016-04-03 03:47:19+00:00
layout: post
slug: node-js-%e8%a7%a3%e6%9e%90-post-%e6%95%b0%e6%8d%ae
title: node.js 解析 POST 数据并返回 JSON 对象
wordpress_id: 2508
categories:
- Web 开发
---
网上许多教程都有部分遗漏，被坑惨的我查了官方教程（[http://expressjs.com/en/4x/api.html#req.body](http://expressjs.com/en/4x/api.html#req.body)），写篇文章做个笔记

后端：
```js
var express = require('express');
var app = express();
var http = require('http').Server(app);

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


app.post('/getJSON', upload.array(), function(req, res) {
    res.send(JSON.stringify(req.body) || "");
});
```


前端：
```js
$.ajax({
    type: 'post',
    url: '/getJSON',
    dataType: 'json',
    timeout: 5000,
    data: $("#dataForm").serialize(),
    success: function(re) {
        console.log(re);
    }
});
```

