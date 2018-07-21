---
author: 403 Forbidden
comments: true
date: 2013-12-10 04:28:46+00:00
layout: post
slug: '%e6%b7%b1%e5%85%a5%e7%90%86%e8%a7%a3jquery%e4%b8%ad-get%e3%80%81-post%e3%80%81-getjson%e5%92%8c-ajax%e7%9a%84%e7%94%a8%e6%b3%95'
title: 深入理解jQuery中$.get、$.post、$.getJSON和$.ajax的用法
wordpress_id: 1014
categories:
- Web 开发
---
当我们用javascript写ajax程序写得很“开心”的时候，突然有人告诉你有一种东西叫jquery，它会告诉你不直接和HttpRequest是多么的快乐，同时你再也不需要再烦恼纠结的ajax乱码问题，更幸福的是你的js代码将大大地简化，看完本文，你会发现，ajax，简单的来讲就是一句话的事情。

本文重点是来讲讲jQuery中调用ajax的4种方法：$.get、$.post、$getJSON、$ajax。如果读者没有javascript和jquery的知识，或者没有ajax的概念，那么请先去问问google老大，再来读本文。

**1、$.get**
$.get()方法使用GET方式来进行异步请求，它的语法结构为：
```js
$.get( url [, data] [, callback] )
```

解释一下这个函数的各个参数：
url：string类型，ajax请求的地址。
data：可选参数，object类型，发送至服务器的key/value数据会作为QueryString附加到请求URL中。
callback：可选参数，function类型，当ajax返回成功时自动调用该函数。
最后写一个$.get()的实例供大家参考：
```js
$.get(
    "submit.aspx",{
        id:     '123',
        name:   '青藤园',
    },function(data,state){
        //这里显示从服务器返回的数据
        alert(data);
        //这里显示返回的状态
        alert(state);
    }
)

```


**2、$.post()**
$.post()方法使用POST方式来进行异步请求，它的语法结构为：
```js
$.post(url,[data],[callback],[type])
```

这个方法和$.get()用法差不多，唯独多了一个type参数，那么这里就只介绍type参数吧，其他的参考上面$.get()的。
type：type为请求的数据类型，可以是html,xml,json等类型，如果我们设置这个参数为：json，那么返回的格式则是json格式的，如果没有设置，就和$.get()返回的格式一样，都是字符串的。
最后写一个$.post()的实例供大家参考：
```js
$.post(
    "submit.aspx",{
        id:     '123',
        name:   '青藤园',
    },function(data,state){
        //这里显示从服务器返回的数据
        alert(data);
        //这里显示返回的状态
        alert(state);
    },
    "json"
)

```


**3、$.getJSON()**
$.getJSON()是专门为ajax获取json数据而设置的，并且支持跨域调用，其语法的格式为：
```js
$.getJSON(url,[data],[callback])
```

url：string类型， 发送请求地址 
data ：可选参数， 待发送 Key/value 参数 ，同get，post类型的data
callback ：可选参数，载入成功时回调函数，同get，post类型的callback
JSON是一种理想的数据传输格式，它能够很好的融合与JavaScript或其他宿主语言，并且可以被JS直接使用。使用JSON相比传统的通过 GET、POST直接发送“裸体”数据，在结构上更为合理，也更为安全。至于jQuery的getJSON()函数，只是设置了JSON参数的 ajax()函数的一个简化版本。这个函数也是可以跨域使用的，相比get()、post()有一定优势。另外这个函数可以通过把请求url写 成"myurl?callback=X"这种格式，让程序执行回调函数X。

**4、$.ajax()**
$.ajax()是jquery中通用的一个ajax封装，其语法的格式为：
```js
$.ajax(options)
```

其中options是一个object类型，它指明了本次ajax调用的具体参数，这里我把最常用的几个参数附上
```js
$.ajax({
        url: 'submit.aspx',
        datatype: "json",
        type: 'post',
        success: function (e) {   //成功后回调
            alert(e); 
        },
        error: function(e){    //失败后回调
            alert(e);
        },
        beforeSend: function(){  /发送请求前调用，可以放一些"正在加载"之类额话
            alert("正在加载");
        }
})

```


好了，以上就是jquery实现ajax调用的几种方法，希望对大家有所帮助。

转载自：[http://www.itivy.com/jquery/archive/2011/7/6/jquery-get-post-getjson-ajax.html](http://www.itivy.com/jquery/archive/2011/7/6/jquery-get-post-getjson-ajax.html)
