---
author: 403 Forbidden
comments: true
date: 2016-03-01 15:09:43+00:00
layout: post
slug: jquery%e4%ba%8b%e4%bb%b6%e9%87%8d%e5%a4%8d%e7%bb%91%e5%ae%9a%e8%a7%a3%e5%86%b3%e5%8a%9e%e6%b3%95
title: jquery事件重复绑定解决办法
wordpress_id: 2479
categories:
- Web 开发
---
1. $.fn.live 重复绑定
解决：使用die()方法，在live()方法绑定前，将此元素上的前面被绑定的事件统统解除，然后再通过live()方法绑定新的事件。
```js
//先通过die()方法解除，再通过live()绑定
$(“#selectAll”).die().live(“click”,function(){
//事件运行代码
});
```


2. click等事件
解决:使用unbind("click")方法先解除绑定的事件再绑定新事件,即在给对象绑定事件之前先移除该对象上的原有事件
完整测试代码:
```js
        <div class="box">
            <button id="test">重复绑定触发按钮</button>(点击此按钮两次及以上,即可触发重复绑定,再点击下面的按钮就可看到结果)
            <br/><br/>
            <button id="test1">click重复绑定测试按钮</button>
            <button id="test2">click绑定一次测试按钮</button>
            <button id="test3">live重复绑定测试按钮</button>
            <button id="test4">live绑定一次测试按钮</button>
        </div>
        <script type="text/javascript" src="../static/jquery-1.6.1.min.js"></script>
        <script type="text/javascript">
            $(function(){
                var i = 1,j=1,k=1,h=1,n=1;
                var triggerBind = function(){
                    $("#test1").click(function() {
                        alert("click未解除绑定重复绑定执行第" + j++ + "次");
                    });
                    $("#test2").unbind('click').click(function() {
                        alert("click解除绑定执行" + k++ + "次");
                    });
                    
                    $("#test3").live("click",function() {
                        alert("live未解除绑定重复执行第" + h++ + "次");
                    });
                    $("#test4").die().live("click",function() {
                        alert("live解除绑定后执行" + n++ + "次");
                    });
                }                
                $("#test").click(function() {
                    triggerBind();
                    alert("触发绑定点击第" + i++ + "次");
                });
            });
        </script>
```

转载自 [http://www.cnblogs.com/heiniuhaha/archive/2011/08/07/jquery-event-repeat-bind.html](http://www.cnblogs.com/heiniuhaha/archive/2011/08/07/jquery-event-repeat-bind.html)
