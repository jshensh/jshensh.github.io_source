---
author: 403 Forbidden
comments: true
date: 2015-02-09 15:41:09+00:00
layout: post
slug: php-%e5%88%a9%e7%94%a8-redis-%e5%81%9a%e7%bb%9f%e8%ae%a1%e7%bc%93%e5%ad%98mysql%e7%9a%84%e5%8e%8b%e5%8a%9b
title: PHP 利用 redis 做统计缓存mysql的压力
wordpress_id: 2160
categories:
- Web 开发
---
```php
<?php
    header("Content-Type:text/html;charset=utf-8");
    include 'lib/mysql.class.php';
    $mysql_obj = mysql::getConn();
    //redis 
    $redis = new Redis();
    $redis->pconnect('127.0.0.1', 6379);

    if(isset($_SERVER['HTTP_REFERER'])){
        $url_md5 = md5($_SERVER['HTTP_REFERER']);
    }
    $adve_key = 'adve'; 
    $adve_key_exists = 'adve_exists';
    if(!$redis->exists($adve_key_exists)){
        $list = $mysql_obj->fetch_array("select * from user_online_adve");
        if($list){
            foreach ($list as $key => $value) {
                $url_hash = md5($value['adve_url']);
                $adve_hash_key = $adve_key.":".$url_hash;
                $id = $value['id'];
                $redis->set($adve_hash_key,$id);
                $redis->set($adve_key_exists,true);
                //$redis->hmset($adve_hash_key, array('id' =>$id));
                //print_r($redis->get($adve_hash_key));
            }
        }
    }
    $adve_new_key = $adve_key.':'.$url_md5;
    if($redis->exists($adve_new_key)){
            $adve_plus = $adve_new_key.":plus" ;

            if(!$redis->exists($adve_plus)){
                $redis->set($adve_plus,1);  
            }else{
                $redis->incr($adve_plus);
                $num = $redis->get($adve_plus);
                if($num >10){
                    $id = $redis->get($adve_new_key);
                    // insert to sql;
                    $mysql_obj->query("update user_online_adve set adve_num=adve_num+$num where id=$id");
                    $redis->set($adve_plus,1);
                }
            }
    }
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://itunes.apple.com/cn/app/san-guo-zhi15-ba-wangno-da-lu/id694974270?mt=8');


/*
    if(){
            $adve_plus = $adve_key.":plus" ;
            if($redis->exists($adve_plus)){
                $redis->incr($adve_plus);
            }else{
                $redis->set($adve_plus,1);  
            }
            echo $redis->get($adve_plus);
    }

    foreach ($list as $key => $value) {
            $url_hash = md5($value['adve_url']);
            $id = $value['id'];
            $adve_num = $value['adve_num'];
            $adve_plus = $adve_key.":plus" ;
            if($redis->exists($adve_plus)){
                $redis->incr($adve_plus);
            }else{
                $redis->set($adve_plus,1);  
            }
            echo $redis->get($adve_plus);
            //if($redis->)
            //$redis->hmset($adve_key, array('id' =>$id, 'adve_num'=>$adve_num));
            //print_r($redis->hmget("adve:$url_hash", array('adve_num')));
    }


        print_r($list);
*/
```


转载自 [http://www.cnblogs.com/jackluo/p/3401999.html](http://www.cnblogs.com/jackluo/p/3401999.html)
