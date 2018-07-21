---
author: 403 Forbidden
comments: true
date: 2014-11-28 14:31:26+00:00
layout: post
slug: linux%e4%b8%8bssh%e4%bc%a0%e8%be%93%e6%96%87%e4%bb%b6
title: linux下SSH传输文件
wordpress_id: 2014
categories:
- VPS 技术
---
通过ssh传输文件
SSH进入对方机器：
```shell
ssh remoteIP
```


```shell
scp -rp /path/filename username@remoteIP:/path #将本地文件拷贝到服务器上
```

```shell
scp -rp username@remoteIP:/path/filename /path #将远程文件从服务器下载到本地
```


```shell
tar cvzf - /path/ | ssh username@remoteip "cd /some/path/; cat -> path.tar.gz" #压缩传输
```

```shell
tar cvzf - /path/ | ssh username@remoteip "cd /some/path/; tar xvzf -" #压缩传输一个目录并解压
```


转载自 [http://blog.chinaunix.net/uid-20545423-id-1930177.html](http://blog.chinaunix.net/uid-20545423-id-1930177.html)
