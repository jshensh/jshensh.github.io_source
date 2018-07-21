---
author: 403 Forbidden
comments: true
date: 2016-04-08 16:36:08+00:00
layout: post
slug: centos-%e5%ae%89%e8%a3%85-pip
title: CentOS 安装 pip
wordpress_id: 2533
categories:
- VPS 技术
---
之前有的朋友问我，CentOS版本怎么安装python的pip，我之前给出的Ubuntu下apt-get的方法
ubuntu 需要先安装下pip吧，
```shell
apt-get install python-pip
```

安装requests
```shell
pip install requests
```


但是有的朋友由于是centos的，直接 yum install pip 或者 yum install python-pip 都是不行的。
其实不能yum那就直接下载编译安装呗。。。

方法如下：
截至写本文的时候，pip最新为 8.1.1
```shell
wget --no-check-certificate https://github.com/pypa/pip/archive/8.1.1.tar.gz
```

注意：wget获取https的时候要加上：--no-check-certificate

```shell
tar zvxf 8.1.1.tar.gz    #解压文件
cd pip-8.1.1/
python setup.py install
```

OK，这样就安装好pip了，

下面来安装 requests吧。
```shell
pip install requests
```


转载自 [http://www.linuxde.net/2014/05/15576.html](http://www.linuxde.net/2014/05/15576.html) 有删改
