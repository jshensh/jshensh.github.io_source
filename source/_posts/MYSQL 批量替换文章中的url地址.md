---
author: 403 Forbidden
comments: true
date: 2013-04-26 12:08:40+00:00
layout: post
slug: mysql-%e6%89%b9%e9%87%8f%e6%9b%bf%e6%8d%a2%e6%96%87%e7%ab%a0%e4%b8%ad%e7%9a%84url%e5%9c%b0%e5%9d%80
title: MYSQL 批量替换文章中的url地址
wordpress_id: 40
categories:
- 建站相关
---
博客建立初期，因为使用了免费域名，所以文章中上传的图片地址都用了这个域名，导致现在含有这些图片的文章在显示中受到了影响，域名现在已经不再属于我，所以使用 MYSQL 去批量替换掉那些带有旧域名的图片地址被摆上了日程。

MYSQL 替换语句 UPDATE
UPDATE 是 MYSQL 的替换语句，英文直译是更新。

UPDATE 语句使用

```sql
UPDATE 表名 SET 字段 = REPLACE(字段,'待替换内容','替换值');
```


表明和字段名都不需要引号，只是在待替换内容和替换值上是需要引号的，因为他们是字符串类型的，这里要注意下。

操作步骤：

1. 备份数据库

不论你要对你的数据进行何种形式的操作，第一条建议就是备份。

2. 进入空间上提供的 PHPMYADMIN 面板。
这玩意现在的空间上大都给提供，你可以使劲找找，这里要提示一下的是，有的空间上给的面板是分字符编码的，WordPress 的朋友注意使用UTF-8的。

3. 文章内容的位置
WordPress 中的文章被放置在 post 表中的 post_content 字段中。

4. 点选 SQL，在语句执行框中输入你刚才学到的 UPDATE 语句，
当然这要配合你自己的数据表名、数据库名、替换规则等，
我的很简单，像如下那样：
```sql
UPDATE wp_posts SET post_content = REPLACE( post_content, 'xn--1jv01l0h.tk', '233.imjs.work' );
```

执行结束后会有替换数量和时间的提示。
点击执行，就大功告成了。
