---
author: 403 Forbidden
comments: true
date: 2013-07-02 05:47:57+00:00
layout: post
slug: php%e4%b8%ad%e6%95%b0%e5%ad%97%e6%a3%80%e6%b5%8b-is_numeric-%e4%b8%8e-ctype_digit-%e7%9a%84%e5%8c%ba%e5%88%ab%e4%bb%8b%e7%bb%8d
title: PHP中数字检测 is_numeric 与 ctype_digit 的区别介绍
wordpress_id: 335
categories:
- Web 开发
---
PHP中的两个函数is_numeric和ctype_digit都是检测字符串是否是数字，但也存在一点区别
is_numeric：检测是否为数字字符串，可为负数和小数 
ctype_digit：检测字符串中的字符是否都是数字，负数和小数会检测不通过 
注意，参数一定要是字符串，如果不是字符串，则会返回0/FASLE 
下面是测试例子： 
```php
$a = 0001111222 ; 
var_dump($a); 
var_dump(is_numeric($a)); //true 
var_dump(ctype_digit($a)); //true 
$a = 0.1 ; 
var_dump($a); 
var_dump(is_numeric($a)); //true 
var_dump(ctype_digit($a)); //false 
$a = -1 ; 
var_dump($a); 
var_dump(is_numeric($a)); //true 
var_dump(ctype_digit($a)); //false 
$a = 'a' ; 
var_dump($a); 
var_dump(is_numeric($a)); //false 
var_dump(ctype_digit($a)); //false 

```

