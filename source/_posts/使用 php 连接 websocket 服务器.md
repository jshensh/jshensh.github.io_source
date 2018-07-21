---
author: 403 Forbidden
comments: true
date: 2015-01-21 08:03:00+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8-php-%e8%bf%9e%e6%8e%a5-websocket-%e6%9c%8d%e5%8a%a1%e5%99%a8'
title: 使用 php 连接 websocket 服务器
wordpress_id: 2108
categories:
- Web 开发
---
　　最近在写一个问卷调查（也可以投票用）系统，因为有一个大屏幕需要实时显示结果，于是用了 websocket。考虑到投票用户用的浏览器可能不支持 websocket，于是就只写了一个普通的表单，向 websocket 传消息的任务就交给了 php。百度了下，找到了个现成的客户端（[PHP Websocket 客户端 - 下载频道 - CSDN.NET](http://download.csdn.net/download/byjlwaa/5389173)），但是下载下来以后试了下发现无法正常使用，于是调整了它的 header，server 端则打印出通讯的 log，结果发现，连接是可以正常建立的，发送数据却失败。查了下资料（[关于websocket - 轩脉刃 - 博客园](http://www.cnblogs.com/yjf512/archive/2013/03/11/2953483.html)），发现源码中的 senddata 的 function 是错误的，它没有对数据进行处理就直接发送了。发现问题后，我根据通讯协议对源码做了如下修改：
```php
	public function sendData($data)
	{
		// send actual data:
		fwrite($this->_Socket, $this->encode($data)) or die('Error:' . $errno . ':' . $errstr);
		$wsData = fread($this->_Socket, 2000);
		$retData = trim($wsData,chr(0).chr(255));        
		return $retData;
	}
 
    private function encode( $data ) {
        $data = is_array( $data ) || is_object( $data ) ? json_encode( $data ) : (string) $data;
        $len = strlen( $data );
        $mask=array();
        for ($j=0;$j<4;$j++) {
            $mask[]=mt_rand(1,255);
        }
        $head[0] = 129;
        if ( $len <= 125 ) {
            $head[1] = $len;
        } elseif ( $len <= 65535 ) {
            $split = str_split( sprintf('%016b', $len ), 8 );
            $head[1] = 126;
            $head[2] = bindec( $split[0] );
            $head[3] = bindec( $split[1] );
        } else {
            $split = str_split( sprintf('%064b', $len ), 8 );
            $head[1] = 127;
            for ( $i = 0; $i < 8; $i++ ) {
                $head[$i+2] = bindec( $split[$i] );
            }
            if ( $head[2] > 127 ) {
                return false;
            }
        }
        $head[1]+=128;
        $head=array_merge($head,$mask);
        foreach( $head as $k => $v ) {
            $head[$k] = chr( $v );
        }

        $mask_data='';
        for ($j=0;$j<$len;$j++) {
            $mask_data.=chr(ord($data[$j]) ^ $mask[$j % 4]);
        }
        return implode('', $head ) . $mask_data;
    }

	private function _connect($host, $port)
	{
		$key1 = $this->_generateRandomString(32);
		$key2 = $this->_generateRandomString(32);
		$key3 = $this->_generateRandomString(8, false, true);		
 
                $header = "GET ws://".$host.":".$port."/ HTTP/1.1\r\n";
                $header.= "Host: ".$host.":".$port."\r\n";
                $header.= "Connection: Upgrade\r\n";
                $header.= "Pragma: no-cache\r\n";
                $header.= "Cache-Control: no-cache\r\n";
                $header.= "Upgrade: websocket\r\n";
                $header.= "Sec-WebSocket-Version: 13\r\n";
                $header.= "User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36\r\n";
                $header.= "Accept-Encoding: gzip, deflate, sdch\r\n";
                $header.= "Accept-Language: zh-CN,zh;q=0.8\r\n";
                $header.= "Sec-WebSocket-Key: " . $key1 . "\r\n";
                $header.= "Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n";
                $header.= "\r\n";
 
 
		$this->_Socket = fsockopen($host, $port, $errno, $errstr, 2); 
		fwrite($this->_Socket, $header) or die('Error: ' . $errno . ':' . $errstr); 
		$response = fread($this->_Socket, 2000);
 
		/**
		 * @todo: check response here. Currently not implemented cause "2 key handshake" is already deprecated.
		 * See: http://en.wikipedia.org/wiki/WebSocket#WebSocket_Protocol_Handshake
		 */		
 
		return true;
	}
```

　　替换源码中的 sendData 与 _connect 并添加 encode function 即可，因为修改之前的源码是别人发布的，所以下载见文章开头的 csdn 链接。
