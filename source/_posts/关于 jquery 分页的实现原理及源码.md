---
author: 403 Forbidden
comments: true
date: 2014-02-28 05:36:29+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-jquery-%e5%88%86%e9%a1%b5%e7%9a%84%e5%ae%9e%e7%8e%b0%e5%8e%9f%e7%90%86%e5%8f%8a%e6%ba%90%e7%a0%81'
title: 关于 jquery 分页的实现原理及源码
wordpress_id: 1434
categories:
- 程序发布
---
最近做了个用来查课本词汇表的站 [http://lab.imjs.work/cihui/](http://lab.imjs.work/cihui/) ，为了增强用户体验，于是用了 jquery 的 ajax 实现分页功能。随后在某个 web 技术交流群中和别人交流了下，有位童鞋认为这个功能不错，并希望我能提供下源码。正好有段时间没发自己原创的文章了，我就发在这里并摘部分的源码吧解释一下吧。现在数据库有点不完整，缺了三十几页的数据，希望各位如果有这书的童鞋能把数据库补充完整，在此先感谢一下。

不想看解释的直接拉到最后下载吧。

为了数据传输方便使用了 json，但由于默认的 json_encode 函数会将中文重新编码，为了调试方便，我写了一个函数用来将中文先用 urlencode 编码，输出之后再解码，给出递归处理准备输出的数据的 function:
```js
    function url_encode_array($val) {
        if (is_array($val)) { //判断传入的数据是否为数组
            foreach ($val as $k=>$v) { //如果是数组就循环处理获取值
                $val[$k]=url_encode_array($v); //调用自身继续处理
            }
            return $val; //返回编码好的数组
        } else {
            return urlencode($val); //如果传入值不是数组则直接返回经 urlencode 编码后的字符串
        }
    }
```


输出时就用 
```php
exit(urldecode(json_encode(url_encode_array($result_array)))); //先使用自定义的 url_encode 函数对传入值进行 urlencode 编码，之后用 json_encode 对值进行 json 编码，再然后用 urldecode 解码，最后用 exit 断绝之后可能的任何输出
```
 输出

数据库部分就不讲了，和分页没什么关系。

现在我们已经有了查询接口了，接下来自然就要用 $.ajax 去请求数据啦，不熟悉 $.ajax 的可以去 [http://w3school.com.cn/jquery/ajax_ajax.asp](http://w3school.com.cn/jquery/ajax_ajax.asp) 看下，这部分就不详解了。接下来说说分页功能(./js/functions.js line 18-77):
```js
            success: function(re) { //ajax 请求成功之后将得到的 json 对象 re 传入当前 function
                if (re['status']=="error") { //如果返回的 status 为 error
                    $("#search_result").html('<div class="alert alert-info">'+re['message']+'</div>'); //输出返回的错误信息
                } else {
                    var ta='<table class="table table-hover"><tr><th>#</th><th>单词</th><th>词性</th><th>释义</th></tr>'; //创建 ta 变量，值为将要输出表格的表头
                    var tmpword; //创建 tmpword 变量，判断本行的单词是否与上行相同，即判断是否为一词多义
                    var iii=1; //计数器
                    $.each(re['result_data'], function(i,v) { //类似 php 的 foreach 函数，i 为键值，v 为值
                        if (tmpword==v['word']) { //如果是一词多义
                            v['word']='&nbsp;'; //将输出值替换为空，但为了与部分浏览器兼容，将值改为 &nbsp;
                            tiii='&nbsp;'; //同上
                        } else {
                            tmpword=v['word']; //如果不是一词多义，将当前单词赋值给该变量
                            tiii=iii; //之后的表格输出序号
                            iii++;
                        }
                        ta=ta+'<tr><td>'+tiii+'</td><td>'+v['word']+'</td><td>'+v['speech']+'</td><td>'+v['trans']+'</td></tr>'; //输出的表格添加一行
                    });
                    ta=ta+'</table><p style="text-align: center">'; //表格结尾
                    var pgs=5; //显示页数选择的链接，要求为奇数，大于等于 3
                    if (re['max_length']>pgs) { //如果返回的总页数大于要求显示的链接数
                        if (page>=((pgs+1)/2+1)) { //如果当前页大于 (pgs+1)/2+1，例如当前页码为 3，pgs 为 3，将进行以下操作
                            if (re['max_length']-page<((pgs-1)/2)) { //如果返回的 总页数-当前页 小于 (pgs-1)/2，则执行以下操作
                                var ti=re['max_length']-(pgs-1); //定义循环输出初始变量
                            } else {
                                var ti=page-(pgs-1)/2; //定义循环输出初始变量，当前页-(pgs-1)/2
                            }
                            var tmpi=ti+(pgs-1); //定义循环输出结束变量
                        } else {
                            var ti=1;
                            var tmpi=pgs;
                        }
                    } else {
                        var ti=1;
                        var tmpi=re['max_length'];
                    }
                    if (page!==1) {
                        ta=ta+'<a href="####" id="page_'+(page-1)+'">上一页</a>&nbsp;&nbsp;'; //如果当前页不是第一页，就输出第一页的字样
                    }
                    if (ti!==1) {
                        ta=ta+'<a href="####" id="page_1">1</a>&nbsp;&nbsp;...&nbsp;&nbsp;'; //如果循环初始值不是 1 则输出第一页链接
                    }
                    for (var i=ti;i<=tmpi;i++) {
                        if (i==page) { //如果循环到了当前页
                            ta=ta+i+'&nbsp;&nbsp;'; //不输出链接，直接输出页码
                        } else {
                            ta=ta+'<a href="####" id="page_'+i+'">'+i+'</a>&nbsp;&nbsp;'; //输出链接
                        }
                    }
                    if (tmpi!=re['max_length']) {
                        ta=ta+'...&nbsp;&nbsp;<a href="####" id="page_'+re['max_length']+'">'+re['max_length']+'</a>&nbsp;&nbsp;'; //如果循环结束的页码不等于总页码将显示最后一页的页码
                    }
                    if (page!=re['max_length']) {
                        ta=ta+'<a href="####" id="page_'+(page+1)+'">下一页</a>'; //如果当前页不是最后一页则显示下一页的链接
                    }
                    ta=ta+'</p><p style="text-align: right">每页显示<select name="limit" id="limit"><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>个</p>'; //输出选择显示数量的 select
                    $("#search_result").html(ta); //最终的输出
                    $("#limit").val(limit); //赋值给 select，确保当前页显示数量与 select 的值相等
                }
            }
```


另外还有一段，为了防止用户使用 enter 提交的:
```js
    $('#search_input').keypress(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if(keyCode === 13){
            submit_search($("#search_input").val());
            return false;
        }
    });
```


但 UC 浏览器上无效，只能再加一段对 get 值的判断:
```js
    getr=GetQueryString("search_input");
    if (getr!==null) {
        $("#search_input").val(getr);
            submit_search(getr);
    }
```


如果还有别的什么问题欢迎评论本文，源码下载(需要修改 ./php/config.php): [cihui](/uploads/2014/02/cihui.zip)
相应的数据库下载(需要解压然后导入数据): [vocabulary.sql_.zip](/uploads/2014/02/vocabulary.sql_.zip)
