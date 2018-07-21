---
author: 403 Forbidden
comments: true
date: 2015-08-05 14:58:15+00:00
layout: post
slug: wifidog-portal%e8%ae%a4%e8%af%81%e7%a4%ba%e4%be%8bphp%e8%84%9a%e6%9c%ac
title: Wifidog Portal认证示例PHP脚本
wordpress_id: 2271
categories:
- openwrt
---
在上一篇文章“ OpenWRT下实现Portal认证(WEB认证) ”发布之后，很多人留言和发邮件与我交流，我感到很是欣慰。我之所以写上一篇文章的目的，一方面Wifidog是很好的解决方案，虽然有很成熟的应用，但相关技术性的文章很少，官方文档也不全。已完成开发的一般也就做成商业解决方案收费，让很多爱折腾的极客难以入手。实际上Wifidog的功能我还没发掘完，如果你有能力，你同意通过各种分析手段尽心分析，甚至是自行解读源代码。我在写了上一篇文章，我自行写了一些PHP测试代码，测试Portal功能能否正确实现，当然我没有公布测试代码，初衷是希望授之以鱼不如授之以渔，不过鉴于给个测试代码可能对初学者更有帮助，另外也有很多人来邮询问，故经修改公开供读者学习。
声明：代码属于测试代码，缺乏安全性等方面的优化，用于线上环境请慎重，因此而出现的任何问题我当然不会负责。转载请说明出处。
PHP脚本，Portal服务器需要有Apache或Nginx环境，当然如果你会配置，IIS也行，另外需要使用数据库存储用户的用户名和密码，我选择使用常用的MySQL。
先介绍数据库的结构，我构建的数据库名是portal，表名是User，用于记录等录用用户的用户名、密码等的信息:
```sql
create database portal;
CREATE TABLE `User` (
`Username` varchar(255) NOT NULL,
`Password` text NOT NULL,
`Token` text,
`LoginTime` datetime DEFAULT NULL,
`Gw_address` text,
`Gw_port` text,
`Gw_id` text,
`Mac` text,
`Url` text,
PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

首先介绍的是登陆脚本，即上一篇文章介绍的LoginScriptPathFragment配置项配置的脚本(详细介绍见上一篇文章)。
auth.php，主要用于认证服务器验证路由网关提交的token。
```php
<?php
	//首先获取URL传递过来的参数，包括stage、ip、mac、token、incoming、outgoing和gw_id.
	$stage = isset($_GET["stage"]) ? $_GET["stage"] : null;
	$ip = isset($_GET["ip"]) ? $_GET["ip"] : null;
	$mac = isset($_GET["mac"]) ? $_GET["mac"] : null;
	$token = isset($_GET["token"]) ? $_GET["token"] : null;
	$incoming = isset($_GET["incoming"]) ? $_GET["incoming"] : null;
	$outgoing = isset($_GET["outgoing"]) ? $_GET["outgoing"] : null;
	$gw_id = isset($_GET["gw_id"]) ? $_GET["gw_id"] : null;
	//mac和token是必需参数，不能为空，只有mac和token均不为空才有可能通过验证，缺失参数将不显示登录表单.
	if(!empty($mac) && !empty($token)){
		//mysql连接，相应的参数mysql_host、mysql_user和mysql_password需要换成你自己的参数.
		$con = mysql_connect(‘mysql_host’, ‘mysql_user’, ‘mysql_password’);
		//数据库连接失败，验证不通过.
		if(!$con){
			echo "Auth: 0";
		}
		else{
			//选择mysql数据库，如果你的数据库名不是portal，请自行更改.
			mysql_select_db(‘portal’, $con);
			//用户登陆成功后，会把用户的参数(ip、mac和系统自动生成的token等)记录到数据库，系统主要通过mac识别用户，当然这种方式在大规模系统中可能存在漏洞.
			$result = mysql_query("SELECT * FROM User WHERE Mac='".$mac."' AND Token='".$token."'");
			//如果token匹配，验证通过，否则验证失败.
			if(!empty($result) && mysql_num_rows($result) != 0){
				echo "Auth: 1";
			}
			else{
				echo "Auth: 0";
			}
		}
	}
	else{
		echo "Auth: 0";
	}
?>
```

接下来介绍的是登陆成功脚本，即上文介绍的PortalScriptPathFragment配置项配置的脚本(详细介绍见上一篇文章)。
portal.php，主要作用是告知用户登录成功，并跳转用户登录前访问的页面。
```php
<?php
	//告知用户登陆成功.
	//echo ‘登录成功’;
	//认证前用户访问任意url，然后被重定向登录页面，session记录的是这个“任意url”.
	$url = $_SESSION["url"];
	//跳转到登陆前页面.
	header("Location: ".$url);
?>
```

当然，这个脚本没有任何界面，为提升用户体验，你可以设计一个好的界面，显示登陆成功信息。
 
接下来介绍的是错误信息展示脚本，即上文介绍的MsgScriptPathFragment配置项配置的脚本，(详细介绍见上一篇文章)。
gw_message.php，主要作用是当认证过程出现错误的时候，向用户显示用户信息。
```php
<?php
	$message = null;
	if(isset($_GET["message"])){
		$message = $_GET["message"];
	}
	echo $message;
?>
```

脚本非常简单，错误信息就在message参数中，告知用户即可。当然这个错误信息是英文的，如有需要，可以做做翻译，以提升用户体验。这个脚本同样没有任何界面，需自行设计。
 
接下来介绍的是心跳脚本，即上文介绍的PingScriptPathFragment配置项配置的脚本，(详细介绍见上一篇文章)。
ping.php，其主要作用是路由确认认证服务器仍然存活，没有死机，另外一个功能是认证服务器可以收集路由的负载等的信息。路由器会定时访问这个脚本，脚本必须回复Pong，否则将认为认证服务器失效而出错。
```php
<?php
	echo ‘Pong’;
?>
```


最后介绍的是登陆脚本，即上文介绍的AuthScriptPathFragment配置项配置的脚本，(详细介绍见上一篇文章)。
login.php，主要作用是显示登录界面，用户登陆成功后，跳转到路由器网关的特定接口。
```php
<?php
	//获取url传递过来的参数
	$gw_address = isset($_GET["gw_address"]) ? $_GET["gw_address"] : null;
	$gw_port = isset($_GET["gw_port"]) ? $_GET["gw_port"] : null;
	$gw_id = isset($_GET["gw_id"]) ? $_GET["gw_id"] : null;
	$mac = isset(isset($_GET["mac"]) ? isset($_GET["mac"] : null;
	$url = isset($_GET["url"]) ? $_GET["url"] : null;
	//gw_address、gw_port、gw_id和mac是必需参数，缺少不能认证成功.
	if(!empty($gw_address) && !empty($gw_port) && !empty($gw_id) && !empty($mac)){
		//参数初始化
		$post_username = null;
		$post_password = null;
		$error_message = null;
		//如果用户提交用户名和密码，进行验证
		if(isset($_POST["username"]) && isset($_POST["password"])){
			$post_username = $_POST["username"];
			$post_password = $_POST["password"];
			//mysql数据库连接，相应的参数mysql_host、mysql_user和mysql_password需要换成你自己的参数.
			$con = mysql_connect(‘mysql_host’, ‘mysql_user’, ‘mysql_password’);
			//数据库连接失败，展示错误信息
			if(!$con){
				$error_message = "数据库连接错误!".mysql_error();
				//login_view.php展示的是登陆表单(下文介绍)，如有错误，展示错误信息.
				include("login_view.php");
			}
			else{
				//选择mysql数据库，如果你的数据库名不是portal，请自行更改.
				mysql_select_db(‘portal’, $con);
				//用户名和密码验证.
				$result = mysql_query("SELECT * FROM User WHERE Username='".$post_username."' AND Password='".$post_password."'");
				if(!empty($result) && mysql_num_rows($result) != 0){
					//用户名和密码验证成功，生成随机token.
					$token = "";
					$pattern="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ";
					for($i=0;$i<32;$i++){
						$token .= $pattern{mt_rand(0,35)};
					}
					//把token等参数写入数据库，已被用于后续验证(上文提到的auth.php).
					mysql_query("Update User SET Token='".$token."', LoginTime='".date("Y-m-d H:i:s")."', Gw_address='".$gw_address."', Gw_port='".$gw_port."', Gw_id='".$gw_id."', Mac='".$mac."', Url='".$url."' WHERE Username='".$post_username."'");
					$error_message = mysql_error();
					//把用户名和url存进session，以备后续使用.
					session_start();
					$_SESSION['username'] = $post_username;
					$_SESSION['url'] = $url;
					//登陆成功，跳转到路由网管指定的页面.
					header("Location: http://".$gw_address.":".$gw_port."/wifidog/auth?token=".$token);
				}
				else{
					//登录失败，显示错误信息.
					$error_message = "用户名或密码错误！";
					include("login_view.php");
				}
			}
		}
		else{
			include("login_view.php");
		}
	}
?>
```


Login_view.php登陆表单。
```html
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />
	<title>Portal Login</title>
</head>
<body>
	<form method="post" action="<?php echo "login.php?gw_address=$gw_address&gw_port=$gw_port&gw_id=$gw_id&mac=$mac&url=$url"; ?>">
		<label for="username">Username</label>
		<input type="text" id="username" name="username" value="<?php echo $post_username; ?>"/>
		<label for="password">Password</label>
		<input type="password" id="password" name="password" value="<?php echo $post_password; ?>"/>
		<?php
			if(!empty($error_message)){
				echo "<h4>$error_message</h4>";
			}
		?>
		<input type="submit" value="Submit"/>
	</form>
</body>
```


这大致就是一个简单的认证系统脚本。再次啰唆，脚本安全性、稳定现等均得不到保证，不能防范sql注入等的黑客主机，仅供交流和测试，线上使用需慎重。转载请注明出处。当然，系统仍然有位开发的功能，有待各位自行发掘。

转载自 [http://talk.withme.me/?p=267](http://talk.withme.me/?p=267)
