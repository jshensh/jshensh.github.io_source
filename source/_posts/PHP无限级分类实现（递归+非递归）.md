---
author: 403 Forbidden
comments: true
date: 2017-10-28 12:21:16+00:00
layout: post
slug: php%e6%97%a0%e9%99%90%e7%ba%a7%e5%88%86%e7%b1%bb%e5%ae%9e%e7%8e%b0%ef%bc%88%e9%80%92%e5%bd%92%e9%9d%9e%e9%80%92%e5%bd%92%ef%bc%89
title: PHP无限级分类实现（递归+非递归）
wordpress_id: 2736
categories:
- Web 开发
---
```php
<?php
/**
 * Created by PhpStorm.
 * User: qishou
 * Date: 15-8-2
 * Time: 上午12:00
 */
//准备数组，代替从数据库中检索出的数据(共有三个必须字段id,name,pid)
header("content-type:text/html;charset=utf-8");
$categories = array(
    array('id'=>1,'name'=>'电脑','pid'=>0),
    array('id'=>2,'name'=>'手机','pid'=>0),
    array('id'=>3,'name'=>'笔记本','pid'=>1),
    array('id'=>4,'name'=>'台式机','pid'=>1),
    array('id'=>5,'name'=>'智能机','pid'=>2),
    array('id'=>6,'name'=>'功能机','pid'=>2),
    array('id'=>7,'name'=>'超级本','pid'=>3),
    array('id'=>8,'name'=>'游戏本','pid'=>3),
);

/*======================非递归实现========================*/
$tree = array();
//第一步，将分类id作为数组key,并创建children单元
foreach($categories as $category){
    $tree[$category['id']] = $category;
    $tree[$category['id']]['children'] = array();
}
//第二步，利用引用，将每个分类添加到父类children数组中，这样一次遍历即可形成树形结构。
foreach($tree as $key=>$item){
    if($item['pid'] != 0){
        $tree[$item['pid']]['children'][] = &$tree[$key];//注意：此处必须传引用否则结果不对
        if($tree[$key]['children'] == null){
            unset($tree[$key]['children']); //如果children为空，则删除该children元素（可选）
        }
    }
}
////第三步，删除无用的非根节点数据
foreach($tree as $key=>$category){
    if($category['pid'] != 0){
        unset($tree[$key]);
    }
}

print_r($tree);

/*======================递归实现========================*/
$tree = $categories;
function get_attr($a,$pid){
    $tree = array();                                //每次都声明一个新数组用来放子元素
    foreach($a as $v){
        if($v['pid'] == $pid){                      //匹配子记录
            $v['children'] = get_attr($a,$v['id']); //递归获取子记录
            if($v['children'] == null){
                unset($v['children']);             //如果子元素为空则unset()进行删除，说明已经到该分支的最后一个元素了（可选）
            }
            $tree[] = $v;                           //将记录存入新数组
        }
    }
    return $tree;                                  //返回新数组
}
echo "<br/><br/><br/>";

print_r(get_attr($tree,0));

```


转载自 [http://blog.csdn.net/qishouzhang/article/details/47204359](http://blog.csdn.net/qishouzhang/article/details/47204359)
