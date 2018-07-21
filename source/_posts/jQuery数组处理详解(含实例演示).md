---
author: 403 Forbidden
comments: true
date: 2013-08-23 03:55:15+00:00
layout: post
slug: jquery%e6%95%b0%e7%bb%84%e5%a4%84%e7%90%86%e8%af%a6%e8%a7%a3%e5%90%ab%e5%ae%9e%e4%be%8b%e6%bc%94%e7%a4%ba
title: jQuery数组处理详解(含实例演示)
wordpress_id: 678
categories:
- Web 开发
---
jQuery的数组处理,便捷,功能齐全. 最近的项目中用到的比较多,深感实用,一步到位的封装了很多原生js数组不能企及的功能. 最近时间紧迫,今天抽了些时间回过头来看 jQuery中文文档 中对数组的介绍,顺便对jQuery数组做个总结.温故,知新.  

**强烈建议你打开DEMO演示后再看下面的详解: **[点此查看DEMO](http://mrthink.net/demo/ijq20101125.htm)  

**1. $.each(array, [callback]) 遍历**[常用]  

**解释: **不同于例遍 jQuery 对象的 $.each() 方法,此方法可用于例遍任何对象(不仅仅是数组哦~). 回调函数拥有两个参数：第一个为对象的成员或数组的索引, 第二个为对应变量或内容. 如果需要退出 each 循环可使回调函数返回 false, 其它返回值将被忽略.  

 each遍历,相信都不陌生,在平常的事件处理中,是for循环的变体,但比for循环强大.在数组中,它可以轻松的攻取数组索引及对应的值.例:


```js
var _mozi=['墨家','墨子','墨翟','兼爱非攻','尚同尚贤']; //本文所用到的数组, 下同
$.each(_mozi,function(key,val){
	//回调函数有两个参数,第一个是元素索引,第二个为当前值
	alert('_mozi数组中 ,索引 : '+key+' 对应的值为: '+val);
});

```



相对于原生的for..in,each更强壮一点. for..in也可以遍历数组,并返回对应索引,但值是需要通过arrName[key]来获取;  

**2. $.grep(array, callback, [invert]) 过滤数组**[常用]  

**解释: **使用过滤函数过滤数组元素.此函数至少传递两个参数(第三个参数为true或false,对过滤函数返回值取反,个人觉得用处不大): 待过滤数组和过滤函数. 过滤函数必须返回 true 以保留元素或 false 以删除元素. 另外,过滤函数还可以是可设置为一个字条串(个人不推荐,欲了解自行查阅);


```js
$.grep(_mozi,function(val,key){
	//过滤函数有两个参数,第一个为当前元素,第二个为元素索引
	if(val=='墨子'){
		alert('数组值为 墨子 的下标是: '+key);
	}
});

var _moziGt1=$.grep(_mozi,function(val,key){
	return key>1;
});
alert('_mozi数组中索引值大于1的元素为: '+_moziGt1);

var _moziLt1=$.grep(_mozi,function(val,key){
	return key>1;
},true);
//此处传入了第三个可靠参数,对过滤函数中的返回值取反
alert('_mozi数组中索引值小于等于1的元素为: '+_moziLt1);

```



**3. $.map(array,[callback])按给定条件转换数组 **[一般]  

**解释:**作为参数的转换函数会为每个数组元素调用, 而且会给这个转换函数传递一个表示被转换的元素作为参数. 转换函数可以返回转换后的值、null(删除数组中的项目)或一个包含值的数组, 并扩展至原始数组中.  

这个是个很强大的方法,但并不常用. 它可以根据特定条件,更新数组元素值,或根据原值扩展一个新的副本元素.


```js
var _mapArrA=$.map(_mozi,function(val){
	return val+'[新加]';
});
var _mapArrB=$.map(_mozi,function(val){
	return val=='墨子' ? '[只给墨子加]'+val : val;
});
var _mapArrC=$.map(_mozi,function(val){
	//为数组元素扩展一个新元素
	return [val,(val+'[扩展]')];
});
alert('在每个元素后面加\'[新加]\'字符后的数组为: '+ _mapArrA);
alert('只给元素 墨子 添加字符后的数组为: '+ _mapArrB);
alert('为原数组中每个元素,扩展一个添加字符\'[新加]\'的元素,返回的数组为 '+_mapArrC);

```



**4 .$.inArray(val,array)判断值是否存在于数组中**[常用]  

**解释: **确定第一个参数在数组中的位置, 从0开始计数(如果没有找到则返回 -1 ).  

记得indexOf()方法了吗? indexOf()返回字符串的首次出现位置,而$.inArray()返回的是传入参数在数组中的位置,同样的,如果找到的,返回的是一个大于或等于0的值,若未找到则返回-1.现在, 知道怎么用了吧. 有了它, 判断某个值是否存在于数组中,就变得轻而易举了.


```js
var _exist=$.inArray('墨子',_mozi);
var _inexistence=$.inArray('卫鞅',_mozi)
if(_exist>=0){
	alert('墨子 存在于数组_mozi中,其在数组中索引值是: '+_exist);
}
if(_inexistence<0){
	alert('卫鞅 不存在于数组_mozi中!,返回值为: '+_inexistence+'!');
}

```



**5 .$.merge(first,second)合并两个数组**[一般]  

**解释: **返回的结果会修改第一个数组的内容——第一个数组的元素后面跟着第二个数组的元素.  

这个方法是用jQuery的方法替代原生concat()方法, 但功能并没有concat()强大, concat()可以同时合并多个数组.


```js
//原生concat()可能比它还简洁点
_moziNew=$.merge(_mozi,['鬼谷子','商鞅','孙膑','庞涓','苏秦','张仪'])
alert('合并后新数组长度为: '+_moziNew.length+'. 其值为: '+_moziNew);

```



**6 .$.unique(array)过滤数组中重复元素**[不常用]  

**解释: **删除数组中重复元素. 只处理删除DOM元素数组,而不能处理字符串或者数字数组.  

第一次看到这个方法,觉得这是个很便捷的方法, 可以过滤重复, 哈, 多完美, 但仔细一看, 仅限处理DOM元素. 功能8折了.所以, 我给它定义成了一个不常用的元素, 至少, 我用jQuery以来没用到过它.


```js
var _h2Arr=$.makeArray(h2obj);
//将数组_h2Arr重复一次
_h2Arr=$.merge(_h2Arr,_h2Arr);
var _curLen=_h2Arr.length;
_h2Arr=$.unique(_h2Arr);
var _newLen=_h2Arr.length;
alert('数组_h2Arr原长度值为: '+_curLen+' ,过滤后为: '+_newLen
      +' .共过滤 '+(_curLen-_newLen)+'个重复元素')

```



**7. $.makeArray(obj) 将类数组对象转换为数组**[不常用]  

**解释: **将类数组对象转换为数组对象, 类数组对象有 length 属性,其成员索引为0至 length-1.  

这是个多余的方法, 无所不能的$本来就包含了这个功能. jQuery官网上解释的非常模糊. 其实, 它就是将某个类数组对象(比如用getElementsByTagName获取的元素对象集合)转换成数组对象.


```js
var _makeArr=$.makeArray(h2obj);
alert('h2元素对象集合的数据类型转换为: '+_makeArr.constructor.name);//输出Array

```



**8. $(dom).toArray()将所有DOM元素恢复成数组**[不常用]  

**解释: **把jQuery集合中所有DOM元素恢复成一个数组;  

并不常用的方法, 个人甚至觉得它和$.makeArray一样多余.


```js
var _toArr=$('h2').toArray();
alert('h2元素集合恢复后的数据类型是: '+_toArr.constructor.name);

```


转载自 [jQuery数组处理详解(含实例演示)@Mr.Think](http://mrthink.net/jquery-array-eachgrepinarray/)
