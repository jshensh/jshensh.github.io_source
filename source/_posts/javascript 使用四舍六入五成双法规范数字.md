---
author: 403 Forbidden
comments: true
date: 2014-09-25 10:56:28+00:00
layout: post
slug: javascript-%e4%bd%bf%e7%94%a8%e5%9b%9b%e8%88%8d%e5%85%ad%e5%85%a5%e4%ba%94%e6%88%90%e5%8f%8c%e6%b3%95%e8%a7%84%e8%8c%83%e6%95%b0%e5%ad%97
title: javascript 使用四舍六入五成双法规范数字
wordpress_id: 1928
categories:
- Web 开发
---
最近因为一些特殊原因，要用到使用 [四舍六入五成双](http://baike.baidu.com/view/1245064.htm) 的规则进行有效数字的规范。百度了半天没找到解决方法，居然还有人说 Math.round 是用这种方法的，简直坑爹。。。于是我自写了个算法，要是有什么 bug 欢迎各位帮忙指正，谢谢。
```js
function get_significant_figure(num,len) {
    var num=parseFloat(num);
    var len=parseInt(len);
    var _len=len;
    if (parseFloat(num)==0) {
        return num;
    }
    var yxsz=parseInt(String(num).replace(/[^\d]/g,""));
    if (String(yxsz)[0]>=8) {
        len-=1;
    }
    if (len<=0) {
        len=1;
    }
    if (len>=String(yxsz).length) {
        return num.toPrecision(len);
    } else {
        var tmp=String((Math.floor(yxsz/Math.pow(10,(String(yxsz).length-len))*100)/100).toFixed(2)).split(".");
        for (var i=0;i<tmp.length;i++) {
            tmp[i]=parseInt(tmp[i]);
        }
        if (tmp[1]/100>0.5) {
            tmp[0]++;
        } else if (tmp[1]/100==0.5) {
            if (parseInt(String(tmp[0])[String(tmp[0]).length-1])%2==1) {
                tmp[0]++;
            }
        }
    }
    return (tmp[0]*(Math.pow(10,(String(yxsz).length+(parseInt(String(yxsz)[0])>=8?1:0)-String(tmp[0]).length)))*(num/yxsz)).toPrecision(_len);
}
```

原理是取出所有的有效数字，并截取要求截取的长度 +2，两位用来判断是否需要进位。最后填充 0 直至结果整数与开始时获取到的有效数字长度一致，并根据最初的有效数字与输入数字的比来还原结果，如果长度不符合要求就继续填充 0。例如 3.16501 要求保留三位有效数字，那就是这样的 3.16501-->316501-->31650-->316.50-->316-->316*1e(4-3)*(3.165/3165)-->3160-->3.16。

P.S. 我们还要求首位有效数字如果大于等于 8 则多看一位。
