---
author: 403 Forbidden
comments: true
date: 2016-07-24 14:27:10+00:00
layout: post
slug: '%e7%99%be%e5%ba%a6-fex-%e7%9a%84-webuploader-%e4%b8%8a%e4%bc%a0%e6%96%87%e4%bb%b6%e6%90%ba%e5%b8%a6%e5%85%b6%e4%bb%96%e5%8f%82%e6%95%b0'
title: 百度 Fex 的 webUploader 上传文件携带其他参数
wordpress_id: 2609
categories:
- Web 开发
---
目前有两种设置的方法。

全局设置，就是每个文件上传的时候都会携带的。通过修改options.formData来控制。比如如下demo添加一个uid=123。
```js
// 初始化的时候直接添加
var uploader = new WebUploader.Uploader({
    ...
    formData: {
        uid: 123
    }
    ...
});

// 初始化以后添加
uploader.options.formData.uid = 123;
局部设置，给每个独立的文件上传设置。通过绑定一个uploadBeforeSend事件来添加。

uploader.on( 'uploadBeforeSend', function( block, data ) {
    // block为分块数据。

    // file为分块对应的file对象。
    var file = block.file;


    // 修改data可以控制发送哪些携带数据。
    data.uid = 123;

    // 将存在file对象中的md5数据携带发送过去。
    // data.fileMd5 = file.md5;

    // 删除其他数据
    // delete data.key;
});
```


转载自 [https://github.com/fex-team/webuploader/issues/145](https://github.com/fex-team/webuploader/issues/145)
