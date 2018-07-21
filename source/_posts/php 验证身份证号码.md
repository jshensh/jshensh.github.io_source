---
author: 403 Forbidden
comments: true
date: 2014-08-20 15:58:31+00:00
layout: post
slug: php-%e9%aa%8c%e8%af%81%e8%ba%ab%e4%bb%bd%e8%af%81%e5%8f%b7%e7%a0%81
title: php 验证身份证号码
wordpress_id: 1808
categories:
- 杂七杂八
---
**身份证号码的结构**
身份证号码是特征组合码，由17位数字本体码和一位校验码组成。
排列顺序从左至右依此为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。

**地址码（前六位数）**
表示编码对象常住户口所在县（市、旗、区）的行政区划代码，按GB/T2260的规定执行。

**出生日期码（第七位至十四位）**
表示编码对象出生的年、月、日，按GB/T7408的规定执行，年、月、日代码之间不用分隔符。

**顺序码（第十五位至十七位）**
表示在同一地址码所标识的区域范围，对同年、同月、同日出生的人编定的顺序号，顺序码奇数分配给男性，偶数分配给女性。

**校验码（第十八位数）**
1.十七位数字本体码加权求和公式
S= SUM(Ai * Wi), i=0, ... , 16, 先对前17位数字的权求和。
Ai：表示第i位置上的身份证号码数字值
Wi：表示第i位置上的加权因子
Wi：7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2

2. 计算模
Y = mod(S, 11)

3.通过模得到对应的校验码
Y： 0 1 2 3 4 5 6 7 8 9 10
校验码： 1 0 X 9 8 7 6 5 4 3 2 

验证身份证号码方法：
```php
<?php
function checkIdCard($idcard){

    // 只能是18位
    if(strlen($idcard)!=18){
        return false;
    }

    // 取出本体码
    $idcard_base = substr($idcard, 0, 17);

    // 取出校验码
    $verify_code = substr($idcard, 17, 1);

    // 加权因子
    $factor = array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);

    // 校验码对应值
    $verify_code_list = array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');

    // 根据前17位计算校验码
    $total = 0;
    for($i=0; $i<17; $i++){
        $total += substr($idcard_base, $i, 1)*$factor[$i];
    }

    // 取模
    $mod = $total % 11;

    // 比较校验码
    if($verify_code == $verify_code_list[$mod]){
        return true;
    }else{
        return false;
    }

}


$idcard = '这里填写要验证的身份证号码';
var_dump(checkIdCard($idcard));
?>
```


转载自 [http://blog.csdn.net/fdipzone/article/details/35859879](http://blog.csdn.net/fdipzone/article/details/35859879)
