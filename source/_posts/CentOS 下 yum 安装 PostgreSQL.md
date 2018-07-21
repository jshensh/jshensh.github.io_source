---
author: 403 Forbidden
comments: true
date: 2015-09-07 12:50:25+00:00
layout: post
slug: centos%e4%b8%8byum%e5%ae%89%e8%a3%85postgresql
title: CentOS 下 yum 安装 PostgreSQL
wordpress_id: 2276
categories:
- VPS 技术
---
**Configure YUM repository**
```shell
vim /etc/yum.repos.d/CentOS-Base.repo
```

[base] and [updates] sections添加：
```
exclude=postgresql*
```


**Install PGDG RPM file**
go http://yum.postgresql.org and find your correct RPM.
For example, to install PostgreSQL 9.4 on CentOS 6 64-bit:
打开 http://yum.postgresql.org/repopackages.php#pg94 后找到 CentOS 6 - x86_64
then:
```shell
yum localinstall http://yum.postgresql.org/9.4/redhat/rhel-6-x86_64/pgdg-centos94-9.4-1.noarch.rpm
```


**Install PostgreSQL**
list available packages:
```shell
yum list postgres*
```

For example, to install a basic PostgreSQL 9.4 server:
```shell
yum install postgresql94-server
```

Other packages can be installed according to your needs.

**配置**
After installing the packages, a database needs to be initialized and configured.
PostgreSQL data directory（/var/lib/pgsql/9.4/data） contains all of the data files for the database.

**Initialize**
The first command (only needed once) is to initialize the database：
```shell
service postgresql-9.4 initdb
```

正在初始化数据库：                                         [确定]

**Startup**
开机启动：
```shell
chkconfig postgresql-9.4 on
service postgresql-9.4 start
```


转载自 [http://www.centoscn.com/CentosServer/sql/2014/0923/3821.html](http://www.centoscn.com/CentosServer/sql/2014/0923/3821.html)
