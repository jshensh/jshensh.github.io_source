---
author: 403 Forbidden
comments: true
date: 2016-12-23 17:59:20+00:00
layout: post
slug: jqueryselector-html-%e8%bf%87%e6%bb%a4-script-tag-%e7%9a%84%e8%a7%a3%e5%86%b3%e6%96%b9%e6%b3%95
title: jQuery(selector).html() 过滤 script tag 的解决方法
wordpress_id: 2647
categories:
- Web 开发
---
　　之前用 pjax 做个项目，使用了 .html() 方法将获取到的数据插入 container。但是却发现其会自动过滤 script tag，现找到解决方法 ([jquery html() strips out script tags](http://stackoverflow.com/questions/4079179/jquery-html-strips-out-script-tags))，在此记录一下
　　以下是我应用到项目里的部分代码，对 stackoverflow 的答案多进行了一次判断
```js
    $(document).on("pjax:end", function(event, data) {
        var responseDom = $(data.responseText);
        if (!$(event.target).filter("script").length) {
            responseDom.filter('script').each(function(){
                if (this.src) {
                    var script = document.createElement('script'), i, attrName, attrValue, attrs = this.attributes;
                    for(i = 0; i < attrs.length; i++) {
                        attrName = attrs[i].name;
                        attrValue = attrs[i].value;
                        script[attrName] = attrValue;
                    }
                    event.target.appendChild(script);
                } else {
                    $.globalEval(this.text || this.textContent || this.innerHTML || '');
                }
            });
        }
    });

```

