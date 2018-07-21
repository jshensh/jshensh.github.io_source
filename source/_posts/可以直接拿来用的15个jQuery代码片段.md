---
author: 403 Forbidden
comments: true
date: 2013-07-18 04:31:25+00:00
layout: post
slug: '%e5%8f%af%e4%bb%a5%e7%9b%b4%e6%8e%a5%e6%8b%bf%e6%9d%a5%e7%94%a8%e7%9a%8415%e4%b8%aajquery%e4%bb%a3%e7%a0%81%e7%89%87%e6%ae%b5'
title: 可以直接拿来用的15个jQuery代码片段
wordpress_id: 437
categories:
- Web 开发
---
jQuery里提供了许多创建交互式网站的方法，在开发Web项目时，开发人员应该好好利用jQuery代码，它们不仅能给网站带来各种动画、特效，还会提高网站的用户体验。
本文收集了15段非常实用的jQuery代码片段，你可以直接复制黏贴到代码里，但请开发者注意了，要理解代码再使用哦。下面就让我们一起来享受jQuery代码的魅力之处吧。
1.预加载图片
```js
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
jQuery.preLoadImages(&quot;image1.gif&quot;, &quot;/path/to/image2.png&quot;);

```


2. 让页面中的每个元素都适合在移动设备上展示
```js
var scr = document.createElement('script');
scr.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');
document.body.appendChild(scr);
scr.onload = function(){
	$('div').attr('class', '').attr('id', '').css({
		'margin' : 0,
		'padding' : 0,
		'width': '100%',
		'clear':'both'
	});
};

```


3.图像等比例缩放
```js
$(window).bind(&quot;load&quot;, function() {
	// IMAGE RESIZE
	$('#product_cat_list img').each(function() {
		var maxWidth = 120;
		var maxHeight = 120;
		var ratio = 0;
		var width = $(this).width();
		var height = $(this).height();
		if(width &gt; maxWidth){
			ratio = maxWidth / width;
			$(this).css(&quot;width&quot;, maxWidth);
			$(this).css(&quot;height&quot;, height * ratio);
			height = height * ratio;
		}
		var width = $(this).width();
		var height = $(this).height();
		if(height &gt; maxHeight){
			ratio = maxHeight / height;
			$(this).css(&quot;height&quot;, maxHeight);
			$(this).css(&quot;width&quot;, width * ratio);
			width = width * ratio;
		}
	});
	//$(&quot;#contentpage img&quot;).show();
	// IMAGE RESIZE
});

```


4.返回页面顶部
```js
// Back To Top
$(document).ready(function(){ 
  $('.top').click(function() {  
     $(document).scrollTo(0,500);  
  });
}); 
//Create a link defined with the class .top
&lt;a href=&quot;#&quot; class=&quot;top&quot;&gt;Back To Top&lt;/a&gt;

```


5.使用jQuery打造手风琴式的折叠效果
```js
var accordion = {
     init: function(){
           var $container = $('#accordion');
           $container.find('li:not(:first) .details').hide();
           $container.find('li:first').addClass('active');
           $container.on('click','li a',function(e){
                  e.preventDefault();
                  var $this = $(this).parents('li');
                  if($this.hasClass('active')){
                         if($('.details').is(':visible')) {
                                $this.find('.details').slideUp();
                         } else {
                                $this.find('.details').slideDown();
                         }
                  } else {
                         $container.find('li.active .details').slideUp();
                         $container.find('li').removeClass('active');
                         $this.addClass('active');
                         $this.find('.details').slideDown();
                  }
           });
     }
};

```


6.通过预加载图片廊中的上一幅下一幅图片来模仿Facebook的图片展示方式
```js
var nextimage = &quot;/images/some-image.jpg&quot;;
$(document).ready(function(){
window.setTimeout(function(){
var img = $(&quot;&quot;).attr(&quot;src&quot;, nextimage).load(function(){
//all done
});
}, 100);
});

```


7.使用jQuery和Ajax自动填充选择框
```js
$(function(){
$(&quot;select#ctlJob&quot;).change(function(){
$.getJSON(&quot;/select.php&quot;,{id: $(this).val(), ajax: 'true'}, function(j){
var options = '';
for (var i = 0; i &lt; j.length; i++) {
options += '
' + j[i].optionDisplay + '
';
}
$(&quot;select#ctlPerson&quot;).html(options);
})
})
})

```


8.自动替换丢失的图片
```js
// Safe Snippet
$(&quot;img&quot;).error(function () {
	$(this).unbind(&quot;error&quot;).attr(&quot;src&quot;, &quot;missing_image.gif&quot;);
});
// Persistent Snipper
$(&quot;img&quot;).error(function () {
	$(this).attr(&quot;src&quot;, &quot;missing_image.gif&quot;);
});

```


9.在鼠标悬停时显示淡入/淡出特效
```js
 $(document).ready(function(){
    $(&quot;.thumbs img&quot;).fadeTo(&quot;slow&quot;, 0.6); // This sets the opacity of the thumbs to fade down to 60% when the page loads
    $(&quot;.thumbs img&quot;).hover(function(){
        $(this).fadeTo(&quot;slow&quot;, 1.0); // This should set the opacity to 100% on hover
    },function(){
        $(this).fadeTo(&quot;slow&quot;, 0.6); // This should set the opacity back to 60% on mouseout
    });
});

```


10.清空表单数据
```js
function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = &quot;&quot;;
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

```


11.预防对表单进行多次提交
```js
$(document).ready(function() {
  $('form').submit(function() {
    if(typeof jQuery.data(this, &quot;disabledOnSubmit&quot;) == 'undefined') {
      jQuery.data(this, &quot;disabledOnSubmit&quot;, { submited: true });
      $('input[type=submit], input[type=button]', this).each(function() {
        $(this).attr(&quot;disabled&quot;, &quot;disabled&quot;);
      });
      return true;
    }
    else
    {
      return false;
    }
  });
});

```


12.动态添加表单元素
```js
//change event on password1 field to prompt new input
$('#password1').change(function() {
        //dynamically create new input and insert after password1
        $(&quot;#password1&quot;).append(&quot;&quot;);
});

```


13.让整个Div可点击
blah blah blah. link
The following lines of jQuery will make the entire div clickable: 
```js
$(&quot;.myBox&quot;).click(function(){ window.location=$(this).find(&quot;a&quot;).attr(&quot;href&quot;); return false; }); 

```


14.平衡高度或Div元素
```js
var maxHeight = 0;
$(&quot;div&quot;).each(function(){
   if ($(this).height() &gt; maxHeight) { maxHeight = $(this).height(); }
});
$(&quot;div&quot;).height(maxHeight);

```


15. 在窗口滚动时自动加载内容
```js
var loading = false;
$(window).scroll(function(){
	if((($(window).scrollTop()+$(window).height())+250)&gt;=$(document).height()){
		if(loading == false){
			loading = true;
			$('#loadingbar').css(&quot;display&quot;,&quot;block&quot;);
			$.get(&quot;load.php?start=&quot;+$('#loaded_max').val(), function(loaded){
				$('body').append(loaded);
				$('#loaded_max').val(parseInt($('#loaded_max').val())+50);
				$('#loadingbar').css(&quot;display&quot;,&quot;none&quot;);
				loading = false;
			});
		}
	}
});
$(document).ready(function() {
	$('#loaded_max').val(50);
});

```


