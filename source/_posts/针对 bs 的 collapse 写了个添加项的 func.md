---
author: 403 Forbidden
comments: true
date: 2016-08-09 17:42:58+00:00
layout: post
slug: '%e9%92%88%e5%af%b9-bs-%e7%9a%84-collapse-%e5%86%99%e4%ba%86%e4%b8%aa%e6%b7%bb%e5%8a%a0%e9%a1%b9%e7%9a%84-func'
title: 针对 bs 的 collapse 写了个添加项的 func
wordpress_id: 2615
categories:
- Web 开发
---
最近在做个项目，用到了 bs 的 collapse，模拟了 select 的操作。但是其中选择的项不是很方便更改，于是写了个 function 来更改其中的 li。在这做个笔记，避免日后忘记，大神见笑。
```js
var createPanel=function(to,id,title,lis) {
    var collapseIn=typeof arguments[4]!=="undefined"?arguments[4]:$("#"+to+" .panel").length?1:0;
    $("#"+to).append($('<div class="panel panel-default" id="panel_'+to+'_'+id+'"><div class="panel-heading" role="tab" id="heading_'+to+'_'+id+'"><h4 class="panel-title"><a'+(collapseIn?'':' class="collapsed"')+' role="button" data-toggle="collapse" data-parent="#'+to+'" href="#collapse_'+to+'_'+id+'" aria-expanded="'+(collapseIn?'false':'true')+'" aria-controls="collapse_'+to+'_'+id+'">'+title+'</a></h4></div><div id="collapse_'+to+'_'+id+'" class="panel-collapse collapse'+(collapseIn?'':' in')+'" role="tabpanel" aria-labelledby="heading_'+to+'_'+id+'"><ul class="list-group">'+((function() { var op=""; for (var i in lis) { op+='<li class="list-group-item" data-menuid="'+i+'">'+lis[i]+'</li>'; } return op; })())+'</ul></div></div>'));
};

```


用法：
```js
mixed createPanel ( string appendToDomId, mixed panelId, mixed title, object liData, [ bool collapseIn ] )
```

```html
<div class="panel-group" id="subject" role="tablist" aria-multiselectable="true"></div>
```

```js
createPanel("subject",0,"学科1",{1:"Chinese",2:"English",3:"German"},true);
createPanel("subject","1","学科2",{1:"Physics",2:"Economics"});
```


我不忍吐槽 bs 的文档，汉化根本不完全。。。这是原文档链接 [http://v3.bootcss.com/javascript/#collapse](http://v3.bootcss.com/javascript/#collapse)。嗯，就这样吧。。。
