---
author: 403 Forbidden
comments: true
date: 2014-07-02 17:59:30+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e%e7%99%be%e5%ba%a6%e9%9f%b3%e4%b9%90%e7%9a%84-lrc-%e6%ad%8c%e8%af%8d-api'
title: 关于百度音乐的 lrc 歌词 api
wordpress_id: 1679
categories:
- Web 开发
---
前段时间转了一个别人的 HTML5 音乐播放器，[一个挺有意思的 html5 播放器](http://futa.ooo/1648.html)，想着应该怎么改进一下，结果发现 lrc 歌词可以自动获取，例如可以使用百度音乐提供的 api，虽然度娘没公开，虽然收录的歌词有点少。。。
百度了一下，发现了篇文章，没想到还能用，[百度MP3音乐API接口及应用](http://blog.csdn.net/mirkerson/article/details/8656930)，暑假正好闲着无聊，于是写了一个 lrc 歌词获取工具咳咳，返回 json 字符串或者 jsonp，具体可以看注释。
附测试链接 [http://lab.imjs.work/getlrc/?name=%E7%AC%A8%E5%B0%8F%E5%AD%A9&singer;=%E5%88%98%E5%BE%B7%E5%8D%8E&callback;=test](http://lab.imjs.work/getlrc/?name=%E7%AC%A8%E5%B0%8F%E5%AD%A9&singer=%E5%88%98%E5%BE%B7%E5%8D%8E&callback=test)

P.S. 
callback 参数非必需，若是同站可以不使用；playerid 同样可选

源码
```php
<?php
    /**************************************************************************************/
    /* 百度音乐 lrc 歌词获取工具 api                                                      */
    /* 作者 admin@imjs.work                                                                  */
    /* 博客 http://futa.ooo                                                             */
    /* 返回格式: json 或 jsonp 字符串                                                     */
    /* 包含参数:                                                                          */
    /* status，值为 success 或 error                                                      */
    /* errcode, 值为 0,-1,-2,-3,-4,-5                                                     */
    /*          0 无错误                                                                  */
    /*         -1 为服务器没有接收到完整数据                                              */
    /*         -2 为无法正常获取 xml 文件                                                 */
    /*         -3 为找不到该曲目                                                          */
    /*         -4 为未收录 lrc 歌词                                                       */
    /*         -5 为无法正常获取 lrc 歌词                                                 */
    /* result, 当 status=success 时返回 lrc 歌词数组                                      */
    /* 请求参数: name 歌曲名, singer 歌手名, callback 回调函数（可选）, playerid 可选     */
    /**************************************************************************************/
    
    header("Content-type: text/javascript; charset=utf-8");
    
    function curl_get_contents($url) { //封装 curl
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); //超时五秒
        $output = curl_exec($ch);
        curl_close($ch);
        if ($output===false) {
            return false;
        }
        return $output;
    }
    
    function url_encode_array($val) { //递归处理数组
        if (is_array($val)) {
            foreach ($val as $k=>$v) {
                $val[$k]=url_encode_array($v);
            }
            return $val;
        } else {
            return urlencode($val);
        }
    }
    
    function output($result_array) { //输出函数
        if ($_GET['playerid'] && $result_array['status']=='success') {
            $playerid=htmlspecialchars($_GET['playerid']);
        }
        echo ($_GET['callback']?htmlspecialchars($_GET['callback']).'(':'').urldecode(json_encode(url_encode_array($result_array))).($_GET['callback']?(($playerid?(',\''.(get_magic_quotes_gpc()?$playerid:addslashes($playerid)).'\''):'').');'):'');
        exit();
    }
    
    //function 部分到此结束
    
    $name=rawurldecode($_GET['name']);
    $singer=rawurldecode($_GET['singer']);
    
    /*
    $name='笨小孩';
    $singer='刘德华';
    */
    
    if ($name=='' || $singer=='') {
        output(array('status'=>'error','errcode'=>-1));
    }
    
    $xml_data=curl_get_contents('http://box.zhangmen.baidu.com/x?op=12&count=1&title='.rawurlencode($name).'$$'.rawurlencode($singer).'$$$$');
    
    if (!$xml_data) {
        output(array('status'=>'error','errcode'=>-2));
    }
    
    if (preg_match("/<count>(\d*?)<\/count>/",$xml_data,$_count)) {
        if ($_count[1]) {
            preg_match_all("/<lrcid>(\d*?)<\/lrcid>/",$xml_data,$_lrcids);
            $lrcid=array_unique($_lrcids[1]);
            $lrc_data=array();
            foreach ($lrcid as $id) {
                if ($lrcid!='0') {
                    $_lrc=str_replace("\n","<br />",iconv('GBK','UTF-8',curl_get_contents('http://box.zhangmen.baidu.com/bdlrc/'.floor($id/100).'/'.$id.'.lrc')));
                    if (!$_lrc) {
                        output(array('status'=>'error','errcode'=>-5));
                    } else {
                        $lrc_data[]=$_lrc;
                    }
                }
            }
            if (empty($lrc_data)) {
                output(array('status'=>'error','errcode'=>-4));
            } else {
                output(array('status'=>'success','errcode'=>0,'result'=>$lrc_data),$_GET['callback']);
            }
        } else {
            output(array('status'=>'error','errcode'=>-3));
        }
    } else {
        output(array('status'=>'error','errcode'=>-2));
    }
?>
```

