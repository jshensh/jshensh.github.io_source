---
author: 403 Forbidden
comments: true
date: 2015-07-11 13:29:02+00:00
layout: post
slug: '%e9%ab%98%e6%95%88%e7%8e%87%e5%8e%bb%e6%8e%89js%e6%95%b0%e7%bb%84%e4%b8%ad%e9%87%8d%e5%a4%8d%e9%a1%b9'
title: 高效率去掉js数组中重复项
wordpress_id: 2252
categories:
- Web 开发
---
Array类型并没有提供去重复的方法，如果要把数组的重复元素干掉，那得自己想办法：
```js
function unique(arr) {
    var result = [], isRepeated;
    for (var i = 0, len = arr.length; i < len; i++) {
        isRepeated = false;
        for (var j = 0, len = result.length; j < len; j++) {
            if (arr[i] == result[j]) {   
                isRepeated = true;
                break;
            }
        }
        if (!isRepeated) {
            result.push(arr[i]);
        }
    }
    return result;
}
```


总体思路是把数组元素逐个搬运到另一个数组，搬运的过程中检查这个元素是否有重复，如果有就直接丢掉。从嵌套循环就可以看出，这种方法效率极低。我们可以 用一个hashtable的结构记录已有的元素，这样就可以避免内层循环。恰好，在Javascript中实现hashtable是极为简单的，改进如 下：
```js
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
//http://www.cnblogs.com/sosoft/
}
```


转载自 [http://www.cnblogs.com/sosoft/archive/2013/12/08/3463830.html](http://www.cnblogs.com/sosoft/archive/2013/12/08/3463830.html)
