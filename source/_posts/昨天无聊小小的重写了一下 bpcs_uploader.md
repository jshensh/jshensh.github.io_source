---
author: 403 Forbidden
comments: true
date: 2014-08-09 10:31:35+00:00
layout: post
slug: '%e6%98%a8%e5%a4%a9%e6%97%a0%e8%81%8a%e5%b0%8f%e5%b0%8f%e7%9a%84%e9%87%8d%e5%86%99%e4%ba%86%e4%b8%80%e4%b8%8b-bpcs_uploader'
title: 昨天无聊小小的重写了一下 bpcs_uploader
wordpress_id: 1747
categories:
- 程序发布
---
   首先，我得声明，源项目在此 [https://github.com/oott123/bpcs_uploader](https://github.com/oott123/bpcs_uploader)。
    其次，我得说明下我修改了那些部分，以及，为什么要对其进行修改。
    在我第一次接触这份源码时，我只是将它用来备份网站数据。但是，随着时间的推移，我的博客也从 vps 转移到了别人的虚拟空间(好吧是因为手头有点紧和该死的 azure)。于是，我重写了我的备份脚本，将原先的 从服务器上传备份文件 改成了 由百度网盘下载我博客的服务提供商的自动备份文件。开始的一段时间还算正常，但渐渐的，突然发现少了好几天的备份。通过手动执行备份脚本，发现其在运行时报错，其返回"{"error_code":36013,"error_msg":"too many tasks","request_id":**********}"。想进入百度网盘查看离线下载任务，居然发现其离线下载列表与 api 的离线下载是分开来的。之后，我就改了它。╮(╯▽╰)╭
    其实修改很简单，照着 [百度提供的 api](http://developer.baidu.com/wiki/index.php?title=docs/pcs/rest/file_data_apis_list) 新加一个获取离线下载列表功能就行了。期间想过再加一个取消失效任务的功能，但我试着访问了几次 api 以后发现，不需要，pcs 会自行删除失效任务。
    上代码
```php
//./bpcs_uploader.php Line 24 之后加入的，额这句加不加其实无所谓 ╮(╯_╰)╭
Usage: $argv[0] fetch_list
```

```php
//./bpcs_uploader.php Line 97 之后加入的
case 'fetch_list':
  //离线下载列表
  fetch_file_list($access_token);
  break;
```

```php
//./_bpcs_files_/core.php Line 177 之后加入的
function fetch_file_list($access_token){
  $fetch=do_api('https://pcs.baidu.com/rest/2.0/pcs/services/cloud_dl',"method=list_task&access_token=".$access_token,'POST');
  $fetch=json_decode($fetch,1);
  apierr($fetch);
  $tmp=array();
  $task_ids=array();
  if (empty($fetch["task_info"])) {
      echon("暂无离线下载任务");
      die();
  }
  foreach ($fetch["task_info"] as $v) {
      $task_ids[]=$v["task_id"];
  }
  $fetch2=do_api('https://pcs.baidu.com/rest/2.0/pcs/services/cloud_dl',"method=query_task&op_type=1&access_token=".$access_token."&task_ids=".implode(",",$task_ids),'POST');
  $fetch2=json_decode($fetch2,1);
  apierr($fetch2);
  $i=0;
  $status_codes=array(0=>"下载成功",1=>"下载进行中",2=>"系统错误",3=>"资源不存在",4=>"下载超时",5=>"资源存在但下载失败",6=>"存储空间不足",7=>"目标地址数据已存在",8=>"任务取消");
  foreach ($fetch2["task_info"] as $k=>$v) {
      $tmp[$i]["task_id"]=$k;
      $tmp[$i]["task_name"]=$v["task_name"];
      $tmp[$i]["status"]=$status_codes[$v["status"]];
      $tmp[$i]["source_url"]=$v["source_url"];
      $tmp[$i]["create_time"]=date("Y-m-d H:i:s",$v["create_time"]);
      if (isset($v["finished_size"])) {
          $tmp[$i]["finished"]=(round($v["finished_size"]/$v["file_size"]*10000)/100)."%";
      }
      $i++;
  }
  echon("离线下载任务列表:");
  foreach ($tmp as $v) {
      echon("----------------------------------");
      echon("    任务 ID: ".$v["task_id"]);
      echon("    文件名: ".$v["task_name"]);
      echon("    任务状态: ".$v["status"]);
      if (isset($v["finished"])) {
          echon("    下载进度: ".$v["finished"]);
      }
      echon("    下载源: ".$v["source_url"]);
      echon("    创建时间: ".$v["create_time"]);
  }
  return $tmp;
}
```

另外，比较看不顺眼执行时的刷屏，我把 curl 显示进度关掉了
```php
//./_bpcs_files_/common.inc.php Line 79-83 被修改成了
		if($method == 'POST'){
			$cmd = "curl -X POST -k -L --data \"$param\" \"$url\" 2>/dev/null";
		}else{
			$cmd = "curl -X $method -k -L \"$url?$param\" 2>/dev/null";
		}
```


    OK，就这样了。
