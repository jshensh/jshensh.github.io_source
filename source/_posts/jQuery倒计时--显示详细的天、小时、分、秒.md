---
author: 403 Forbidden
comments: true
date: 2013-08-12 04:29:11+00:00
layout: post
slug: jquery%e5%80%92%e8%ae%a1%e6%97%b6-%e6%98%be%e7%a4%ba%e8%af%a6%e7%bb%86%e7%9a%84%e5%a4%a9%e3%80%81%e5%b0%8f%e6%97%b6%e3%80%81%e5%88%86%e3%80%81%e7%a7%92
title: jQuery倒计时--显示详细的天、小时、分、秒
wordpress_id: 614
categories:
- Web 开发
---
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=gbk" /> 
<title>Jquery实现倒计时效果</title> 
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
 
<script type="text/javascript"> 
 var SysSecond; 
 var InterValObj; 
  
 $(document).ready(function() { 
  SysSecond = parseInt($("#remainSeconds").html()); //这里获取倒计时的起始时间 
  InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行 
 }); 
 
 //将时间减去1秒，计算天、时、分、秒 
 function SetRemainTime() { 
  if (SysSecond > 0) { 
   SysSecond = SysSecond - 1; 
   var second = Math.floor(SysSecond % 60);             // 计算秒     
   var minite = Math.floor((SysSecond / 60) % 60);      //计算分 
   var hour = Math.floor((SysSecond / 3600) % 24);      //计算小时 
   var day = Math.floor((SysSecond / 3600) / 24);        //计算天 
 
   $("#remainTime").html(day + "天" + hour + "小时" + minite + "分" + second + "秒"); 
  } else {//剩余时间小于或等于0的时候，就停止间隔函数 
   window.clearInterval(InterValObj); 
   //这里可以添加倒计时时间为0后需要执行的事件 
  } 
 } 
</script> 
 
</head> 
 
<body> 
     
<div id="remainSeconds" style="display:none">360000</div> 
<div id="remainTime" style="font-size:20px;font-weight:800;color:#FF9900"></div> 
 
</body> 
</html>

```

