---
author: 403 Forbidden
comments: true
date: 2014-07-26 13:53:48+00:00
layout: post
slug: php-file_get_contents%e8%ae%be%e7%bd%ae%e8%b6%85%e6%97%b6%e5%a4%84%e7%90%86%e6%96%b9%e6%b3%95
title: PHP file_get_contents设置超时处理方法
wordpress_id: 1734
categories:
- Web 开发
---
话说，从PHP5开始，file_get_content已经支持context了（手册上写着：5.0.0 Added the context support. ），也就是说，从5.0开始，file_get_contents其实也可以POST数据。
今天说的这篇是讲超时的，确实在跨服务器提交的时候，不可避免的会遇到超时的情况，这个时候怎么办？set_time_limit是没有用的，只有用context中的timeout时间来控制。相反，我们不是要抑止，而是要管理。比如在超时返回错误后，进行一次尝试，就象js中的 settimeout那样，对函数重新处理。错误超过3次或者5次后，我们就确实的认为无法连接服务器而彻底放弃。这，是一个好办法，应该值得推荐使用。其实。不全是file_get_contents，只要支持context的都应该加上，避免超时浪费时间。这样可以被支持的函数大致有：fsocketopen（该函数的最后一个参数。好象比较推荐在读stream的时候，使用stream_time_out函数进行控制）,fopen（也是从PHP5开始加入context支持）,file(PHP5加入支持),curl（curl有自已的变量 CURLOPT_TIMEOUT）等 。
在使用file_get_contents函数的时候，经常会出现超时的情况，在这里要通过查看一下错误提示，看看是哪种错误，比较常见的是读取超时，这种情况大家可以通过一些方法来尽量的避免或者解决。这里就简单介绍两种：
一、增加超时的时间限制
这里需要注意：set_time_limit只是设置你的PHP程序的超时时间，而不是file_get_contents函数读取URL的超时时间。
我一开始以为set_time_limit也能影响到file_get_contents，后来经测试，是无效的。真正的修改 file_get_contents延时可以用resource $context的timeout参数：
```php
$opts = array(
    'http'=>array(
        'method'=>"GET",
        'timeout'=>1,//单位秒
    )
);
$cnt=0;
while($cnt<3 && ($bb=file_get_contents("http://www.jb51.net", false, stream_context_create($opts)))===FALSE) $cnt++;
echo $cnt;
echo $bb;
```

二、一次有延时的话那就多试几次
有时候失败是因为网络等因素造成，没有解决办法，但是可以修改程序，失败时重试几次，仍然失败就放弃，因为file_get_contents()如果失 败将返回 FALSE，所以可以下面这样编写代码：
```php
$cnt=0;
while($cnt<3 && ($bb=file_get_contents("http://www.jb51.net", false, stream_context_create($opts)))===FALSE) $cnt++;
```

以上方法对付超时已经OK了。那么Post呢？细心点有人发现了'method'=>”GET”, 对！是不是能设置成post呢？百度找了下相关资料，还真可以！而且有人写出了山寨版的post传值函数，如下：
```php
function Post($url, $post = null){
    $context = array ();
    if (is_array ( $post )) {
        ksort ( $post );
        $context ['http'] = array (
            'timeout' => 60,
            'method' => 'POST',
            'content' => http_build_query( $post, '', '&' )
        );
    }
     return file_get_contents ( $url, false, stream_context_create ( $context ) );
}
$data = array (
    'name' => 'test',
    'email' => 'admin@admin.com',
    'submit' => 'submit',
);
echo Post ( 'http://www.jb51.net', $data );
```

OK , 上面函数完美了，既解决了超时控制又解决了Post传值。

转载自 [http://www.jb51.net/article/41833.htm](http://www.jb51.net/article/41833.htm)
