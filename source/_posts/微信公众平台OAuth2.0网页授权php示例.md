---
author: 403 Forbidden
comments: true
date: 2015-11-23 06:51:43+00:00
layout: post
slug: '%e5%be%ae%e4%bf%a1%e5%85%ac%e4%bc%97%e5%b9%b3%e5%8f%b0oauth2-0%e7%bd%91%e9%a1%b5%e6%8e%88%e6%9d%83php%e7%a4%ba%e4%be%8b'
title: 微信公众平台OAuth2.0网页授权php示例
wordpress_id: 2395
categories:
- Web 开发
---
1、配置授权回调页面域名，如 www.aaa.com

2、模拟公众号的第三方网页，fn_system.php
```php
<?php
    if(empty($_SESSION['user'])) {
        header("Location:http://www.aaa.com/uc/fn_wx_login.php");
    } else {
        print_r($_SESSION['user']);
    }
?>
```


3、访问第三方网页时，如果检查session中不存在会话信息，则跳转至登陆页，fn_wx_login.php
```php
<?php
    $appid = "公众号在微信的appid";
    $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri=http%3a%2f%2fwww.aaa.com%2fuc%2ffn_callback.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    header("Location:".$url);
?>
```


4、在登陆页组装appid，回跳url等信息，然后跳转至微信的用户授权页。

5、在微信的用户授权页，如果用户选择了“同意授权”，则微信重新回跳至第三方网页的回跳地址时，会附带上code参数。
 
6、第三方网页的回跳url中，首先从请求中取得code，然后根据code进一步换取openid和access_token，然后就可以根据openid和access_token调用微信的相关接口查询用户信息了。
```php
<?php
    $appid = "公众号在微信的appid";
    $secret = "公众号在微信的app secret";
    $code = $_GET["code"];
    $get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$get_token_url);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $res = curl_exec($ch);
    curl_close($ch);
    $json_obj = json_decode($res,true);

    //根据openid和access_token查询用户信息
    $access_token = $json_obj['access_token'];
    $openid = $json_obj['openid'];
    $get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$get_user_info_url);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $res = curl_exec($ch);
    curl_close($ch);

    //解析json
    $user_obj = json_decode($res,true);
    $_SESSION['user'] = $user_obj;
    print_r($user_obj);
?>
```


转载自 [http://huangqiqing123.iteye.com/blog/2005770](http://huangqiqing123.iteye.com/blog/2005770)
