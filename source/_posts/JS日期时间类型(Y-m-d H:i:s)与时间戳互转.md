---
author: 403 Forbidden
comments: true
date: 2013-08-13 03:35:19+00:00
layout: post
slug: js%e6%97%a5%e6%9c%9f%e6%97%b6%e9%97%b4%e7%b1%bb%e5%9e%8by-m-d-his%e4%b8%8e%e6%97%b6%e9%97%b4%e6%88%b3%e4%ba%92%e8%bd%ac
title: JS日期时间类型(Y-m-d H:i:s)与时间戳互转
wordpress_id: 616
categories:
- Web 开发
---
JS中没有类似PHP那样简便的函数可以直接将时间戳与日期类型格式相互转换。于是只好自己写一个函数，使用时方便调用。

```js
function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime()/1000);
}
 
function unix_to_datetime(unix) {
    var now = new Date(parseInt(unix) * 1000);
    return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
 
var datetime = '2012-11-16 10:36:50';
var unix = datetime_to_unix(datetime);
document.write(datetime+' 转换后的时间戳为: '+unix+'
');
 
var unix = 1353033300;
var datetime = unix_to_datetime(unix);
document.write(unix+' 转换后的日期为: '+datetime);

```


转载自：[http://www.qttc.net/201211246.html](http://www.qttc.net/201211246.html)
