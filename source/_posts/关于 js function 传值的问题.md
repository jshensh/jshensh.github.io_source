---
author: 403 Forbidden
comments: true
date: 2014-05-16 16:05:24+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-js-function-%e4%bc%a0%e5%80%bc%e7%9a%84%e9%97%ae%e9%a2%98'
title: 关于 js function 传值的问题
wordpress_id: 1578
categories:
- Web 开发
---
最近无聊在做一个解三元一次方程组的网页，用的 javascript，好吧其实大部分是 jquery 框架。现在已经基本完工了，除了判断方程组是否无解或者有无穷解的部分以外。下午碰到一个挺有意思的问题，拿出来分享一下。
先上部分关键代码
```js
function get_swap(arr_a,arr_b,k) { //交换系数
    arr_a=$.extend(true, {}, arr_a); //坑啊这句
    for (i=0;i<3;++i) {
        arr_a[i][k]=arr_b[i];
    }
    return arr_a;
}
function get_tteleg(arr_a,arr_b) { //主 function，出结果用
    var gc=(typeof(arguments[2])=="undefined")?false:arguments[2]; //如果 false 就不要过程。。。
    var d=get_array_fj(arr_a);
    var x=get_array_fj(get_swap(arr_a,arr_b,0))/d;
    var y=get_array_fj(get_swap(arr_a,arr_b,1))/d;
    var z=get_array_fj(get_swap(arr_a,arr_b,2))/d;
    if (gc) {
        var op='<img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('D='+get_array_gc(arr_a))+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('D='+get_array_fj_gc(arr_a)+'='+d)+'" style="border:none;" /><br />';
        op+='<img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('x= \\frac{'+get_array_gc(get_swap(arr_a,arr_b,0))+'}{D}')+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('x= \\frac{'+get_array_fj_gc(get_swap(arr_a,arr_b,0))+'}{'+d+'}='+x)+'" style="border:none;" /><br />';
        op+='<img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('y= \\frac{'+get_array_gc(get_swap(arr_a,arr_b,1))+'}{D}')+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('y= \\frac{'+get_array_fj_gc(get_swap(arr_a,arr_b,1))+'}{'+d+'}='+y)+'" style="border:none;" /><br />';
        op+='<img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('z= \\frac{'+get_array_gc(get_swap(arr_a,arr_b,2))+'}{D}')+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('z= \\frac{'+get_array_fj_gc(get_swap(arr_a,arr_b,2))+'}{'+d+'}='+z)+'" style="border:none;" />';
    } else {
        var op='<img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('d='+d)+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('x='+x)+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('y='+y)+'" style="border:none;" /><br /><img src="http://chart.googleapis.com/chart?cht=tx&chl='+encodeURIComponent('z='+z)+'" style="border:none;" />';
    }
    return op;
}

```

各种各样的 img 标签是调用 Google 的 api 用 TeX 输出，这个就不细说了。看上面代码中有一句 ``arr_a=$.extend(true, {}, arr_a);``
 原先并没有这一句，但因为 get_swap() 是用来交换系数用的，每次交换完输出的 arr_a 就不正常，于是就开始找起了 bug，但由于我并不怎么接触 javascript，只以为它和 php 是一样的，找了半天都没找到问题，但直觉告诉我可能是因为全局变量或者传值的问题，可是我没有定义全局变量啊。直至经位高人指点，才发现 javascript 里 function 传对象和数组传的都是地址，而非值。(参考 [http://www.cftea.com/c/2010/07/TKE282SFVCKL2RLS.asp](http://www.cftea.com/c/2010/07/TKE282SFVCKL2RLS.asp))这简直就是天大的坑啊，于是乎就想着把数组拆开，一个一个传值，但这样又显得太麻烦，毕竟 4*3 的增广矩阵呢，这不得写死人。。。罢了罢了，后来想过把数组转成 json 格式字符串，传进 function 再 eval，结果发现 jquery 的 $.toJSON 要另外引插件($.toJSON 我 tm 以前做播放器的时候不是用过嘛。。。居然忘记了)，顿时放弃了，然后百度了一两个小时，终于被我找到方法了。我思路是这样的，既然它传地址进来我为何不重新定义一个数组然后 copy 原先那个数组的值呢？嗯。。。其实这个思路也是百度到的。。。。开始是用了 arr.concat() 和 arr.slice(0)，发现无效，原因是我的数组是一个二维数组，不支持。卧槽，然后才发现了这个 [http://www.cnblogs.com/RascallySnake/archive/2010/05/07/1729563.html](http://www.cnblogs.com/RascallySnake/archive/2010/05/07/1729563.html)，$.extend，jquery 自带，效果甚是满意。放个链接出来给各位测试一下 [http://lab.imjs.work/math/tteleg.html](http://lab.imjs.work/math/tteleg.html)

P.S. 关于三元一次方程组是否无解还有是否有无穷解的问题到现在还是没解决，求个方便点的算法研究一下。。。(不是我要做伸手党。。。实在是高一党，啊呸，中专党对线性代数有点力不从心啊)刚刚倒是问了几位大神，说是增广矩阵的秩可以用来判断，但秩却又是什么。。。又有说可以用高斯消元法去做，做下来的行数还是列数来着的是秩。。。。卧槽这什么跟什么呀。。。我解个三元一次方程组我容易么我。。。二元一次方程组的时候用行列式感觉还行，没想到三元一次的这么复杂啊卧槽。。。附张百度百科的截图，完整的内容戳链接 [增广矩阵 - 百度百科](http://wapbaike.baidu.com/view/1961580.htm) 
[![Screenshot_2014-05-16-23-58-32](/uploads/2014/05/Screenshot_2014-05-16-23-58-32-168x300.png)](/uploads/2014/05/Screenshot_2014-05-16-23-58-32.png)
诶对还有，一直有个问题想不明白，二元一次方程组可以理解为一个直角平面里两根直线的相交点，三元的则是一个三维的物体，那四元及以上的呢？求解释。。。
