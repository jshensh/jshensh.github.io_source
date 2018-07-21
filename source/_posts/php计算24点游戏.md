---
author: 403 Forbidden
comments: true
date: 2014-01-20 03:42:43+00:00
layout: post
slug: php%e8%ae%a1%e7%ae%9724%e7%82%b9%e6%b8%b8%e6%88%8f
title: php计算24点游戏
wordpress_id: 1220
categories:
- Web 开发
---
修改了下，加了个表单。原文转载自 [http://www.alixixi.com/program/a/2008050731708.shtml](http://www.alixixi.com/program/a/2008050731708.shtml)
```php
<?php
set_time_limit(0);
?>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta http-equiv="pragram" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache, must-revalidate">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="Content-Type" content="text/HTML; charset=utf-8">
		<title>24 点计算器</title>
	</head>
	<body>
<?php
$values = explode(' ',$_POST['num']);
$result = 24;

$list = array();

if ($_POST) {
makeValue($values); 
echo '<pre>';
print_r($list);
echo '</pre>';
}

function makeValue($values, $set=array()) 
{ 
	$words = array("+", "-", "*", "/"); 
	if(sizeof($values)==1) 
	{ 
		$set[] = array_shift($values); 
		return makeSpecial($set); 
	} 
	
	foreach($values as $key=>$value) 
	{ 
		$tmpValues = $values; 
		unset($tmpValues[$key]); 
		foreach($words as $word) 
		{ 
			makeValue($tmpValues, array_merge($set, array($value, $word))); 
		} 
	} 
} 

function makeSpecial($set) 
{ 
	$size = sizeof($set);

	if($size<=3 || !in_array("/", $set) && !in_array("*", $set)) 
	{ 
		return makeResult($set); 
	}

	for($len=3; $len<$size-1; $len+=2) 
	{ 
		for($start=0; $start<$size-1; $start+=2) 
		{ 
			if(!($set[$start-1]=="*" || $set[$start-1]=="/" || $set[$start+$len]=="*" || $set[$start+$len]=="/")) 
				continue; 
			$subSet = array_slice($set, $start, $len); 
			if(!in_array("+", $subSet) && !in_array("-", $subSet)) 
				continue; 
			$tmpSet = $set; 
			array_splice($tmpSet, $start, $len-1); 
			$tmpSet[$start] = "(".implode("", $subSet).")"; 
			makeSpecial($tmpSet); 
		} 
	} 
}

function makeResult($set) 
{ 
	global $result, $list; 
	$str = implode("", $set); 
	@eval("\$num=$str;"); 
	if($num==$result && !in_array($str, $list)) 
	$list[] = $str; 
}

?>
	<center>
			<form action="" method="post">
				<p><label>请输入四个数字，空格分割：<br /><input type="text" name="num" /></label></p>
				<p><input type="submit" name="submit" value="提交" /></p>
			</form>
		</center>
	</body>
</html>
```

