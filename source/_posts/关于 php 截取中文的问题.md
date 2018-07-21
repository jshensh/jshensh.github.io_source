---
author: 403 Forbidden
comments: true
date: 2014-10-01 03:38:53+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-php-%e6%88%aa%e5%8f%96%e4%b8%ad%e6%96%87%e7%9a%84%e9%97%ae%e9%a2%98'
title: 关于 php 截取中文的问题
wordpress_id: 1946
categories:
- Web 开发
---
众所周知，php 自带的 strlen 与 substr 函数没法处理中文字符，于是，我们会用 mb_ 系列函数替代。但是，没有 mbstring 库怎么办？这就需要我们自己写一个来替代了，废话不多说，先上代码
```php
if ( !function_exists('mb_strlen') ) {
	function mb_strlen ($text, $encode) {
		if ($encode=='UTF-8') {
			return preg_match_all('%(?:
					  [\x09\x0A\x0D\x20-\x7E]           # ASCII
					| [\xC2-\xDF][\x80-\xBF]            # non-overlong 2-byte
					|  \xE0[\xA0-\xBF][\x80-\xBF]       # excluding overlongs
					| [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} # straight 3-byte
					|  \xED[\x80-\x9F][\x80-\xBF]       # excluding surrogates
					|  \xF0[\x90-\xBF][\x80-\xBF]{2}    # planes 1-3
					| [\xF1-\xF3][\x80-\xBF]{3}         # planes 4-15
					|  \xF4[\x80-\x8F][\x80-\xBF]{2}    # plane 16
					)%xs',$text,$out);
		}else{
			return strlen($text);
		}
	}
}

/* from Internet, author unknown */
if (!function_exists('mb_substr')) {
    function mb_substr($str, $start, $len = '', $encoding="UTF-8"){
        $limit = strlen($str);
 
        for ($s = 0; $start > 0;--$start) {// found the real start
            if ($s >= $limit)
                break;
 
            if ($str[$s] <= "\x7F")
                ++$s;
            else {
                ++$s; // skip length
 
                while ($str[$s] >= "\x80" && $str[$s] <= "\xBF")
                    ++$s;
            }
        }
 
        if ($len == '')
            return substr($str, $s);
        else
            for ($e = $s; $len > 0; --$len) {//found the real end
                if ($e >= $limit)
                    break;
 
                if ($str[$e] <= "\x7F")
                    ++$e;
                else {
                    ++$e;//skip length
 
                    while ($str[$e] >= "\x80" && $str[$e] <= "\xBF" && $e < $limit)
                        ++$e;
                }
            }
 
        return substr($str, $s, $e - $s);
    }
}
```

以上代码摘自 wp-utf8-excerpt 插件，效果可以见本站首页，所有文章摘要都是该插件负责截取的。
