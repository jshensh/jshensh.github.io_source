---
author: 403 Forbidden
comments: true
date: 2015-04-07 15:05:30+00:00
layout: post
slug: redbean%ef%bc%9a%e5%85%a5%e9%97%a8%e4%b8%80-%e5%a2%9e%e5%88%a0%e6%94%b9%e6%9f%a5
title: Redbean：入门(一) - 增删改查
wordpress_id: 2198
categories:
- Web 开发
---
```php
<?php
    require_once 'rb.php';
    $tableName = "link";
    //链接数据库
    R::setup("mysql:host=localhost;dbname=hwibs_model","root","");
    //创建一个表（也可以指为实例化一个表）
    $handler = R::dispense($tableName);
    
    
    #####################################   add #####################################
    
    /*同上[同时实例化多个表]
        list($handler_1,$handler_2) = R::dispenseALL("test_1,test_2");
    */
    //对象方式给字段赋值
    //::注意，如果字段不存在，store方法过后，会自动添加对应的字段，并且自动根据字段值设置字段的对应字段类型
    $handler->name = "haha";
    $handler->url = "isxiugai";
    $handler->plushtime = time() - 5000;
    //如果有下划线的字段名，则可以使用驼峰法命名，将自动转换为下划线
    $handler->isMyName = false;// = is_my_name
    //执行,此静态方法会返回添加成功后的自增id值(单个)
    $inser_id = R::store($handler);
    
    #####################################   query ####################################
    //获取记录句柄(参数1为表名，参数2为id值),返回值为对象集合
    //如果id不存在，则返回0
    //注意，这个获取到的句柄，可以用于删除操作
    $bean  = R::load($tableName,4);//获取单个
    $beans = R::loadAll($tableName,array(1,2,3,4));//获取多个

    #####################################   update #####################################
    
    //1.注意，修改跟add的唯一区别就是id，如果id不为空，则为修改，否则则为添加!
    //2.如果id不存在的情况下，既不会添加，也不会修改！所以一般在修改前，需要事先用load进行判断是否存在
    
    foreach ($beans as $k=>$v){
        $beans[$k]->url = rand(100,5555);//测试[循环将每个记录对象中的url赋值一个随机数]
    }
    R::storeAll($beans);//执行修改
    
    
    #####################################   delete #####################################
    //删除单个::成功或失败都是返回null
    var_dump(R::trash(R::load($tableName,1)));
    //删除多个::如果有不存在的，则会只删除存在的,成功或失败都是返回null
    var_dump(R::trashAll(R::loadALL($tableName,array(117,118))));
    
    
    #####################################   other #####################################
    //清除表中所有数据::相当于truncate，因为会将自增指针重置
    //R::wipe($tableName);
    //删除数据库中所有的表,[无语的功能，要这个搞毛]
    //var_dump(R::nuke());
    //关闭链接
    R::close();
?>
```


转载自 [http://www.cnblogs.com/shibazi/archive/2014/08/02/3887246.html](http://www.cnblogs.com/shibazi/archive/2014/08/02/3887246.html)
