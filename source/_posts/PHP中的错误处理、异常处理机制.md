---
author: 403 Forbidden
comments: true
date: 2013-06-23 13:49:42+00:00
layout: post
slug: php%e4%b8%ad%e7%9a%84%e9%94%99%e8%af%af%e5%a4%84%e7%90%86%e3%80%81%e5%bc%82%e5%b8%b8%e5%a4%84%e7%90%86%e6%9c%ba%e5%88%b6
title: PHP中的错误处理、异常处理机制
wordpress_id: 293
categories:
- Web 开发
---
在编写php程序时，错误处理是一个重要的部分。如果程序中缺少错误检测代码，那么看上去很不专业，也为安全风险敞开了大门

例：
```php
<?php 
	$a = fopen('test.txt','r');
	//这里并没有对文件进行判断就打开了，如果文件不存在就会报错
?>
```


那么正确的写法应该如下：
```php
<?php
	if(file_exists('test.txt')){
		$f=fopen('test.txt','r');
		//使用完后关闭
		fclose($f);
	} 
?>
```


一、PHP错误处理的三种方式

A、简单的die()语句；
	等价于exit();
例：
```php
	if(!file_exists('aa.txt')){
		die('文件不存在');
	} else {
		//执行操作
	}
	//如果上面die()被触发，那么这里echo接不被执行
	echo 'ok';

```

	简洁写法：
```php
	file_exits('aaa.txt') or die('文件不存在');
	echo 'ok';

```


B、自定义错误和错误触发器

1、错误处理器（自定义错误，一般用于语法错误处理）
		创建自定义错误函数（处理器），该函数必须有能力处理至少两个参数（error_level和errormessage），但是可以接受最多五个参数（error_file、error_line、error_context）
		语法：
```php
		function error_function($error_level,$error_message,$error_file,$error_line,$error_context)
		//创建好后还需要改写set_error_handler();函数
		set_error_handler('error_function',E_WARNING);//这里error_function对应上面创建的自定义处理器名，第二个参数为使用自定义错误处理器的错误级别；

```


错误报告级别(了解即可)

这些错误报告级别是错误处理程序旨在处理的错误的不同的类型：

| 值   | 常量                | 描述                                                                                     |
| ---- | ------------------- | ---------------------------------------------------------------------------------------- |
| 2    | E_WARNING 			 | 非致命的 run-time 错误。不暂停脚本执行。                                                 |
| 8    | E_NOTICE     		 | Run-time 通知。<br />脚本发现可能有错误发生，但也可能在脚本正常运行时发生。              |
| 256  | E_USER_ERROR 		 | 致命的用户生成的错误。这类似于程序员使用 PHP 函数 trigger_error() 设置的 E_ERROR。       |
| 512  | E_USER_WARNING 	 | 非致命的用户生成的警告。这类似于程序员使用 PHP 函数 trigger_error() 设置的 E_WARNING。   |
| 1024 | E_USER_NOTICE 		 | 用户生成的通知。这类似于程序员使用 PHP 函数 trigger_error() 设置的 E_NOTICE。            |
| 4096 | E_RECOVERABLE_ERROR | 可捕获的致命错误。类似 E_ERROR，但可被用户定义的处理程序捕获。(参见 set_error_handler()) |
| 8191 | E_ALL 			     | 所有错误和警告，除级别 E_STRICT 以外。<br />（在 PHP 6.0，E_STRICT 是 E_ALL 的一部分）   |


2、错误触发器（一般用于处理逻辑上的错误）
需求：比如要接收一个年龄，如果数字大于120，就认为是一个错误
传统方法：
```php
	if($age>120){
		echo '年龄错误';exit();
	}

```

	使用触发器：
```php
	if($age>120){
		//trigger_error('错误信息'[，'错误等级']);这里错误等级为可选项，用于定义该错误的级别
		//用户定义的级别包含以下三种：E_USER_WARNING 、E_USER_ERROR 、E_USER_NOTICE
		trigger_error('年龄错误');//这里是调用的系统默认的错误处理方式，我们也可以用自定义处理器
	}
	//自定义处理器，与上面相同
	function myerror($error_level,$error_message){
		echo 'error text';
	}
	//同时需要改变系统默认的处理函数
	set_error_handler('myerror',E_USER_WARNING);//同上面，第一个参数为自定义函数的名称，第二个为错误级别【这里的错误级别通常为以下三种：E_USER_WARNING 、E_USER_ERROR 、E_USER_NOTICE】
	//现在再使用trigger_error就可以使用自定义的错误处理函数了

```


练习题：
```php
<?php
    date_default_timezone_set('PRC');
    function myerror($error_level,$error_message){
        $info= "错误号：$error_level\n";
        $info.= "错误信息：$error_message\n";
        $info.= '发生时间：'.date('Y-m-d H:i:s');
        $filename='aa.txt';
        if(!$fp=fopen($filename,'a')){
            '创建文件'.$filename.'失败';
        }
        if(is_writeable($filename)){
            if(!fwrite($fp,$info)){
                echo '写入文件失败';
            } else {
                echo '已成功记录错误信息';
            }
                        fclose($fp);
        } else {
            echo '文件'.$filename.'不可写';
        }
        exit();
    }
    set_error_handler('myerror',E_WARNING);
    $fp=fopen('aaa.txt','r');
?>
```


C、错误日志 
 
	默认的根据php.ini中error_log配置，php向服务器的错误记录系统或文件发送错误记录。通过使用error_log()函数可以向文件或远程目的地发送错误记录;
	语法：
```php
		error_log(error[,type,destination,headers])

```

	type部分一般用3，表示在文件后面追加错误信息，而不会覆盖原内容
	destination表示目的地，即存放的文件或远程目的地
	如：``error_log("$error_info",3,"errors.txt");``

 
二、PHP异常处理【重点】

1、基本语法
```php
	try{
		//可能出现错误或异常的代码
		//catch 捕获  Exception是php已定义好的异常类
	} catch(Exception $e){
		//对异常处理，方法：
			//1、自己处理
			//2、不处理，将其再次抛出
	}

```


2、处理程序应当包括：
Try - 使用异常的函数应该位于 "try"  代码块内。如果没有触发异常，则代码将照常继续执行。但是如果异常被触发，会抛出一个异常。
Throw - 这里规定如何触发异常。每一个 "throw" 必须对应至少一个 "catch"
Catch - "catch" 代码块会捕获异常，并创建一个包含异常信息的对象 
让我们触发一个异常：
```php
<?php
 //创建可抛出一个异常的函数
 function checkNum($number){
     if($number>1){
         throw new Exception("Value must be 1 or below");
     }
     return true;
 }
 
 //在 "try" 代码块中触发异常
 try{
     checkNum(2);
     //如果异常被抛出，那么下面一行代码将不会被输出
     echo 'If you see this, the number is 1 or below';
 }catch(Exception $e){
     //捕获异常
     echo 'Message: ' .$e->getMessage();
 }
 ?>

```


上面代码将获得类似这样一个错误：

Message: Value must be 1 or below 
例子解释：

上面的代码抛出了一个异常，并捕获了它：

创建 checkNum() 函数。它检测数字是否大于 1。如果是，则抛出一个异常。
在 "try" 代码块中调用 checkNum() 函数。
checkNum() 函数中的异常被抛出
"catch" 代码块接收到该异常，并创建一个包含异常信息的对象 ($e)。
通过从这个 exception 对象调用 $e->getMessage()，输出来自该异常的错误消息
不过，为了遵循“每个 throw 必须对应一个 catch”的原则，可以设置一个顶层的异常处理器来处理漏掉的错误。
```php
set_exception_handler()函数可设置处理所有未捕获异常的用户定义函数

//设置一个顶级异常处理器

function myexception($e){

　　 echo 'this is top exception';

} //修改默认的异常处理器

set_exception_handler("myexception");

try{

　　$i=5;

　　if($i<10){

　　　　throw new exception('$i must greater than 10');

　　}

}catch(Exception $e){

　　//处理异常

　　echo $e->getMessage().'  
';

　　//不处理异常，继续抛出

　　throw new exception('errorinfo'); //也可以用throw $e 保留原错误信息;

}

创建一个自定义的异常类

class customException extends Exception{

　　public function errorMessage(){

　　　　//error message $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile().': **'.$this->getMessage().'** is not a valid E-Mail address'; return $errorMsg;

　　}

}

//使用

try{

　　throw new customException('error message');

}catch(customException $e){

　　echo $e->errorMsg();

}

可以使用多个catch来返回不同情况下的错误信息

try{

　　$i=5;

　　if($i>0){

　　　　throw new customException('error message');//使用自定义异常类处理

　　} if($i<-10){

　　　　throw new exception('error2');//使用系统默认异常处理

　　}

}catch(customException $e){

　　echo $e->getMessage();

}catch(Exception $e1){

　　echo $e1->getMessage();

}

```


异常的规则

1. 需要进行异常处理的代码应该放入 try 代码块内，以便捕获潜在的异常。
2. 每个try或throw代码块必须至少拥有一个对应的 catch 代码块。
3. 使用多个 catch 代码块可以捕获不同种类的异常。
4. 可以在try代码内的catch 代码块中再次抛出（re-thrown）异常。
5. 简而言之：如果抛出了异常，就必须捕获它。
