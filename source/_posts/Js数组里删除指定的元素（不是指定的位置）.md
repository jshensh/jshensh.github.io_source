---
author: 403 Forbidden
comments: true
date: 2015-11-02 13:34:04+00:00
layout: post
slug: js%e6%95%b0%e7%bb%84%e9%87%8c%e5%88%a0%e9%99%a4%e6%8c%87%e5%ae%9a%e7%9a%84%e5%85%83%e7%b4%a0%ef%bc%88%e4%b8%8d%e6%98%af%e6%8c%87%e5%ae%9a%e7%9a%84%e4%bd%8d%e7%bd%ae%ef%bc%89
title: Js数组里删除指定的元素（不是指定的位置）
wordpress_id: 2360
categories:
- Web 开发
---
之前一直是做后端的，从来也没有写过js，但是却一直想学学，也只是基于兴趣而已！现在到了这个公司，确实大量的写js。但也一直都是没有系统的去看过js！都是搞什么查什么！  
最近要解决一个问题，但是用到了js的数组，知道了元素要去删除这个数组中的这个指定的元素。网上找到了一些解决办法，在这里做个笔记记下来：  
首先可以给js的数组对象定义一个函数，用于查找指定的元素在数组中的位置，即索引，代码为：  
```js
Array.prototype.indexOf = function(val) {              
    for (var i = 0; i < this.length; i++) {  
        if (this[i] == val) return i;  
    }  
    return -1;  
};
```


然后使用通过得到这个元素的索引，使用js数组自己固有的函数去删除这个元素：  
代码为： 
```js
Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
};
```


这样就构造了这样一个函数，比如我有有一个数组： 
```js
var emp = ['abs','dsf','sdf','fd'];
```


假如我们要删除其中的fd,就可以使用: 
```js
emp.remove('fd');
```


转载自 [http://my.oschina.net/zh119893/blog/265964](http://my.oschina.net/zh119893/blog/265964)
