---
author: 403 Forbidden
comments: true
date: 2013-07-14 04:51:39+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-discuz-x2-5-%e8%87%aa%e5%ae%9a%e4%b9%89%e6%a0%8f%e7%9b%ae%e7%94%a8%e4%ba%8e%e6%b3%a8%e5%86%8c%e6%97%b6%e7%9a%84%e6%95%b0%e6%8d%ae%e6%a0%a1%e9%aa%8c'
title: 关于 Discuz! x2.5 自定义栏目用于注册时的数据校验
wordpress_id: 388
categories:
- Web 开发
---
以真实姓名为例，我只允许在名单里的童鞋注册，并且不允许重复注册，效果如图：
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz3.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz3.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(2)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz2.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz2.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(7)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz7.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz7.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(5)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz5.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz5.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(6)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz6.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz6.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(1)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz1.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz1.png)
[![立即注册 - 曹杨二中附属学校 2013 届 初三(5)班 班级论坛 - Powered by Discuz!(4)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz4.png)](/uploads/201307/立即注册-曹杨二中附属学校-2013-届-初三5班-班级论坛-Powered-by-Discuz4.png)

弹窗效果是字段值不符合要求时点击提交后给出的提示，并且不允许提交

前端验证数据使用的是 jQuery，中间遇到了一点小坎坷，但还是解决了。

实现方法如下：

1. 先在 后台→用户→用户栏目 创建一个你要求的栏目，并勾选 是否启用 与 注册页显示。
[![曹杨二中附属学校 2013 届 初三(5)班 班级论坛 管理中心 - 用户 - 用户栏目](/uploads/201307/曹杨二中附属学校-2013-届-初三5班-班级论坛-管理中心-用户-用户栏目.png)](/uploads/201307/曹杨二中附属学校-2013-届-初三5班-班级论坛-管理中心-用户-用户栏目.png)

2. 接下来就是修改代码了，先下载 jQuery 库，复制至你论坛的 static/js 目录下备用
下载 jQuery 库：[jquery-1.8.3.min](/uploads/201307/jquery-1.8.3.min_.js)

3. 使用代码编辑器打开 source/class/class_member.php ，找到这一句
```php
foreach($_G['cache']['fields_register'] as $field) {

```


4. 然后将
```php
$field_key = $field['fieldid'];
$field_val = $_GET[''.$field_key];

```

移至
```php
if(defined('IN_MOBILE')) {
	break;
}

```

之前，为了之后手机版注册时做准备

5. 在
```php
$field_key = $field['fieldid'];
$field_val = $_GET[''.$field_key];
```

之后插入这样一段代码，请按照注释根据自己的情况进行修改
```php
/*
检测用户提交的真实姓名是否存在并且是否已经注册
*/
//check realname start
if ($field_key=='realname') { //请将 realname 修改为该栏目在前端注册时表单中使用的 name
	$get_realname=(get_magic_quotes_gpc())?$_POST['realname']:addslashes($_POST['realname']); //同上
	if (empty($get_realname)) { //如果你修改了上面的变量名称，请一并修改这里的
		showmessage('请输入您的真实姓名'); //调用 dz 自带的函数进行弹窗提示
	}
	$realname_query_1=mysql_query('SELECT `realname` FROM `pre_common_member_realname` where `realname`=\''.$get_realname.'\''); //查询用户提交的真实姓名是否存在于自己允许注册的表中，这个表需要自己创建
	if (mysql_num_rows($realname_query_1)==0) { //如果返回行数为 0
		showmessage('您输入的真实姓名有错误，请重新输入'); //修改提示语
	}
	$realname_query_2=mysql_query('SELECT `realname` FROM `pre_common_member_profile` where `realname`=\''.$get_realname.'\''); //查询用户提交的真实姓名是否已经被注册
	if (mysql_num_rows($realname_query_2)!==0) { //如果返回的行数不等于 0
		showmessage('请您不要重复注册'); //修改提示语
	}
}
//check realname end
```


6. 修改手机版模板，使用代码编辑器打开文件 template/default/mobile/member/register.htm ，在适当的区域加上

```html
<label><strong>真实姓名*</strong><input type="text" name="realname" autocomplete="off" id="realname" class="txt" /> </label>
```

注意请根据自己实际情况进行修改

7. 修改电脑版模板，使用代码编辑器打开文件 template/default/member/register.htm，在
```html
<!--{eval updatesession();}-->
```

前加上以下代码，注意请根据自己实际情况进行修改
```html
<script type="text/javascript" src="static/js/jquery-1.8.3.min.js" charset="UTF-8"></script>
<script type="text/javascript">
	var jq = jQuery.noConflict();
	jq("#tip_realname").html("请输入您的真实姓名");
	jq(function() {
		jq("#realname").focus( function() {
			jq("#tip_realname").css("display","block");
			jq("#chk_realname").html("");
			jq("#td_realname").removeClass("p_right");
			jq("#realname").removeClass("er");
		});
		jq("#realname").blur( function() {
			jq("#tip_realname").css("display","none");
			var realn = jq("#realname").val();
			jq("#td_realname").removeClass("p_right");
			if (realn != "" && realn != null) {
				jq.post("source/function/function_check_realname.php", { "realname": realn }, function (rnresult) {
					if (rnresult != "" && rnresult != null) {
						jq("#chk_realname").html(rnresult);
						jq("#realname").addClass("er");
					} else {
						jq("#td_realname").addClass("p_right");
						jq("#realname").removeClass("er");
					}
				});
			} else {
				jq("#chk_realname").html("请输入您的真实姓名");
				jq("#realname").addClass("er");
			}
		});
	});
</script>
```


8. 找到
```html
<!--{loop $_G['cache']['fields_register'] $field}-->
```

与
```html
<!--{/loop}-->
```

它们以及它们中间那段代码正是循环输出自定义栏目的代码。
修改
```html
<td class="tipcol" >
```

为
```html
<td id="td_$field['fieldid']" class="tipcol" >
```

以供之后 jQuery 使用。

9. 新建文件 source/function/function_check_realname.php ，并使用代码编辑器打开
输入以下代码，和前面的 class_member.php 差不多，注意根据自己实际情况修改
```php
<?php
	/*替换为你自己的数据库名（可从管理中心查看到）*/
	$dbname = 'XQMOszFiQwWvbnsOHGwq';
	 
	/*从环境变量里取出数据库连接需要的参数*/
	$host = getenv('HTTP_BAE_ENV_ADDR_SQL_IP');
	$port = getenv('HTTP_BAE_ENV_ADDR_SQL_PORT');
	$user = getenv('HTTP_BAE_ENV_AK');
	$pwd = getenv('HTTP_BAE_ENV_SK');
	 
	/*接着调用mysql_connect()连接服务器*/
	$link = @mysql_connect("{$host}:{$port}",$user,$pwd,true);
	if(!$link) {
		die("Connect Server Failed: " . mysql_error());
	}
	/*连接成功后立即调用mysql_select_db()选中需要连接的数据库*/
	if(!mysql_select_db($dbname,$link)) {
		die("Select Database Failed: " . mysql_error($link));
	}

	/*
	检测用户提交的真实姓名是否存在并且是否已经注册
	*/
	//check realname start
	$get_realname=(get_magic_quotes_gpc())?$_POST['realname']:addslashes($_POST['realname']);
	$realname_query_1=mysql_query('SELECT `realname` FROM `pre_common_member_realname` where `realname`=\''.$get_realname.'\'');
	if (mysql_num_rows($realname_query_1)==0) {
		echo '您输入的真实姓名有错误，请重新输入';
		exit();
	}
	$realname_query_2=mysql_query('SELECT `realname` FROM `pre_common_member_profile` where `realname`=\''.$get_realname.'\'');
	if (mysql_num_rows($realname_query_2)!==0) {
		echo '请您不要重复注册';
		exit();
	}
	//check realname end
```

10. 现在，就大功告成啦。。。效果 [http://95bbs.imjs.work](http://95bbs.imjs.work)

P.S. 因为 jQuery 和 dz 自带的 js 效果有冲突，所以需要加上一句
```js
var jq = jQuery.noConflict();
```

并将所有的 $ 替换为 jq
