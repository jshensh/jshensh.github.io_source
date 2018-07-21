---
author: 403 Forbidden
comments: true
date: 2015-12-20 07:55:06+00:00
layout: post
slug: '%e5%b0%86-func-uc_authcode-%e7%bf%bb%e8%af%91%e6%88%90%e4%ba%86-node-%e7%89%88%ef%bc%8c%e7%95%99%e5%a4%87%e7%94%a8'
title: 将 func uc_authcode 翻译成了 node 版，留备用
wordpress_id: 2424
categories:
- Web 开发
---
原版 PHP :
```php
function uc_authcode($str, $operation = 'DECODE', $key = '', $expiry = 0) {

    $ckey_length = 4;

    $key = md5($key);
    $keya = md5(substr($key, 0, 16));
    $keyb = md5(substr($key, 16, 16));
    $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($str, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';

    $cryptkey = $keya.md5($keya.$keyc);
    $key_length = strlen($cryptkey);

    $str = $operation == 'DECODE' ? base64_decode(substr($str, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($str.$keyb), 0, 16).$str;
    $str_length = strlen($str);

    $result = '';
    $box = range(0, 255);

    $rndkey = array();
    for($i = 0; $i <= 255; $i++) {
        $rndkey[$i] = ord($cryptkey[$i % $key_length]);
    }

    for($j = $i = 0; $i < 256; $i++) {
        $j = ($j + $box[$i] + $rndkey[$i]) % 256;
        $tmp = $box[$i];
        $box[$i] = $box[$j];
        $box[$j] = $tmp;
    }

    for($a = $j = $i = 0; $i < $str_length; $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box[$a]) % 256;
        $tmp = $box[$a];
        $box[$a] = $box[$j];
        $box[$j] = $tmp;
        $result .= chr(ord($str[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
    }
    if($operation == 'DECODE') {
        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
            return substr($result, 26);
        } else {
            return '';
        }
    } else {
        return $keyc.str_replace('=', '', base64_encode($result));
    }
}
```


node：
```js
var Buffer = require("buffer").Buffer;
var crypto = require("crypto");

String.prototype.md5=function () {
    return crypto.createHash("md5").update(this.toString(),'utf8').digest("hex");
}

var microtime=function() {
    var d=new Date();
    return (d.getMilliseconds()/1000).toFixed(8)+" "+Math.floor(d.getTime()/1000);
}

var uc_authcode=function(str,operation,key,expiry) {

    var operation=operation || 'DECODE';
    var key=key?key.md5():'d41d8cd98f00b204e9800998ecf8427e';
    var expiry=expiry?expiry:0;

    var ckey_length=4;
    var keya=key.substr(0,16).md5();
    var keyb=key.substr(16,16).md5();
    var keyc=ckey_length ? (operation === 'DECODE' ? str.substr(0, ckey_length): microtime().md5().substr(-ckey_length)) : '';

    var cryptkey=keya+(keya+keyc).md5();
    var key_length=cryptkey.length;
    str = (operation === 'DECODE' ? new Buffer(str.substr(ckey_length),'base64') : (("000000000"+( expiry ? parseInt(expiry) + Math.floor(new Date().getTime()/1000) : 0)).substr(-10)+(str+keyb).md5().substr(0, 16)+str));
    var str_length=str.length;

    var box=[];
    for (var i=0;i<256;i++) {
        box[i]=i;
    }
    var rndkey=[];
    for (var i = 0; i <= 255; i++) {
        rndkey[i]=cryptkey[i % key_length].charCodeAt();
    }
    

    for (var j=i=0;i<256;i++) {
        j = (j + box[i] + rndkey[i]) % 256;
        tmp = box[i];
        box[i] = box[j];
        box[j] = tmp;
    }

    var result = new Buffer(str_length);
    for (var a = j = i = 0; i < str_length; i++) {
        a = (a + 1) % 256;
        j = (j + box[a]) % 256;
        tmp = box[a];
        box[a] = box[j];
        box[j] = tmp;
        var charcode = operation === 'DECODE' ? str[i] ^ (box[(box[a] + box[j]) % 256]) : str[i].charCodeAt() ^ (box[(box[a] + box[j]) % 256]);
        result[i] = charcode;
    }

    

    if (operation === 'DECODE') {
        result = result.toString();
        if ((parseInt(result.substr(0, 10)) === 0 || parseInt(result.substr(0, 10)) - Math.floor(new Date().getTime()/1000) > 0) && result.substr(10, 16) == (result.substr(26)+keyb).md5().substr(0, 16)) {
            return result.substr(26);
        } else {
            return '';
        }
    } else {
        return (keyc+result.toString("base64").replace(/=/g,""));
    }
};

console.log(uc_authcode("aaaaaa", 'ENCODE', 'testkey'));
console.log(uc_authcode("950ewo3CtcO9wrzCpsKBwrnChQbCgcOPwrJCe1Jow5LCnzJawrvCvcOzwpXDn8OqZcKFwpA8w7LCqg", 'DECODE', 'testkey'));
```


另附一个前端用的：[js版uc_authcode例子](/uploads/2015/12/js版uc_authcode例子.zip)，by [zhengshuiguang](http://download.csdn.net/download/zhengshuiguang/8289509)
