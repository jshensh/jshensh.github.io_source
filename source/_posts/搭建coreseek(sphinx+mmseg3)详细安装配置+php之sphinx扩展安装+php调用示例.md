---
author: 403 Forbidden
comments: true
date: 2015-03-20 13:32:49+00:00
layout: post
slug: '%e6%90%ad%e5%bb%bacoreseeksphinxmmseg3%e8%af%a6%e7%bb%86%e5%ae%89%e8%a3%85%e9%85%8d%e7%bd%aephp%e4%b9%8bsphinx%e6%89%a9%e5%b1%95%e5%ae%89%e8%a3%85php%e8%b0%83%e7%94%a8%e7%a4%ba%e4%be%8b'
title: 搭建coreseek(sphinx+mmseg3)详细安装配置+php之sphinx扩展安装+php调用示例
wordpress_id: 2193
categories:
- Web 开发
---
一个文档包含了安装、增量备份、扩展、api调用示例，省去了查找大量文章的时间。

**搭建coreseek(sphinx+mmseg3)安装
[第一步] 先安装mmseg3**
```shell
cd /var/install
wget http://www.coreseek.cn/uploads/csft/4.0/coreseek-4.1-beta.tar.gz
tar zxvf coreseek-4.1-beta.tar.gz

cd coreseek-4.1-beta
cd mmseg-3.2.14
./bootstrap
./configure --prefix=/usr/local/mmseg3
make && make install
```

遇到的问题:
```
error: cannot find input file: src/Makefile.in
```
或者遇到其他类似error错误时...

解决方案：
依次执行下面的命令，我运行'aclocal'时又出现了错误，解决方案请看下文描述
```shell
yum -y install libtool

aclocal
libtoolize --force
automake --add-missing
autoconf
autoheader
make clean
```

安装好'libtool'继续从'aclocal'开始执行上面提到的一串命令，执行完后再运行最开始的安装流程即可。

**[第二步] 安装coreseek**
```shell
##安装coreseek
$ cd csft-3.2.14 或者 cd csft-4.0.1 或者 cd csft-4.1
$ sh buildconf.sh                                         #输出的warning信息可以忽略，如果出现error则需要解决
$ ./configure --prefix=/usr/local/coreseek  --without-unixodbc --with-mmseg --with-mmseg-includes=/usr/local/mmseg3/include/mmseg/ --with-mmseg-libs=/usr/local/mmseg3/lib/ --with-mysql
##如果提示mysql问题，可以查看MySQL数据源安装说明   http://www.coreseek.cn/product_install/install_on_bsd_linux/#mysql
$ make && make install
$ cd ..


##命令行测试mmseg分词，coreseek搜索（需要预先设置好字符集为zh_CN.UTF-8，确保正确显示中文）
$ cd testpack
$ cat var/test/test.xml    #此时应该正确显示中文
$ /usr/local/mmseg3/bin/mmseg -d /usr/local/mmseg3/etc var/test/test.xml
$ /usr/local/coreseek/bin/indexer -c etc/csft.conf --all
$ /usr/local/coreseek/bin/search -c etc/csft.conf 网络搜索
```

出现这个 xmlpipe2 support NOT compiled in. To use xmlpipe2, install missing XML libra  错误
执行以下命令：
```shell
yum -y install expat expat-devel
```

依次安装后，从新编译coreseek，然后再生成索引，就可以通过了。
结果如下：
```
Coreseek Fulltext 4.1 [ Sphinx 2.0.2-dev (r2922)]  
Copyright (c) 2007-2011,  
Beijing Choice Software Technologies Inc (http://www.coreseek.com)  
 
using config file 'etc/csft.conf'...  
index 'xml': query '网络搜索 ': returned 1 matches of 1 total in 0.000 sec  
 
displaying matches:  
1. document=1, weight=1590, published=Thu Apr  1 07:20:07 2010, author_id=1  
 
words:  
1. '网络': 1 documents, 1 hits  
2. '搜索': 2 documents, 5 hits  
```


**下面开始sphinx与mysql的配置**
创建sphinx统计表，在coreseek_test库中执行。
```sql
CREATE TABLE sph_counter
(
    counter_id INTEGER PRIMARY KEY NOT NULL,
    max_doc_id INTEGER NOT NULL
);
```


创建配置sphinx与mysql的配置文件
```shell
vi /usr/local/coreseek/etc/csft_mysql.conf
```

```
#MySQL数据源配置，详情请查看：http://www.coreseek.cn/docs/coreseek_4.1-sphinx_2.0.1-beta.html#conf-reference

#源定义
source main
{
    type                    = mysql

    sql_host                = localhost
    sql_user                = root
    sql_pass                = 123456 
    sql_db                  = coreseek_test
    sql_port                = 3306
    sql_query_pre           = SET NAMES utf8
    sql_query_pre        = REPLACE INTO sph_counter SELECT 1,MAX(id) FROM hr_spider_company;
    sql_query               = SELECT * FROM hr_spider_company WHERE id<=( SELECT max_doc_id FROM sph_counter WHERE counter_id=1 ) 
                                                         #sql_query第一列id需为整数
                                                         #title、content作为字符串/文本字段，被全文索引
    sql_attr_uint            = id                        #从SQL读取到的值必须为整数
    sql_attr_uint            = from_id                #从SQL读取到的值必须为整数，不支持全文检索
    sql_attr_uint            = link_id                #从SQL读取到的值必须为整数，不支持全文检索
    sql_attr_uint            = add_time                #从SQL读取到的值必须为整数，不支持全文检索
    sql_field_string         = link_url                 #字符串字段(可全文搜索，可返回原始文本信息)
    sql_field_string          = company_name          #字符串字段(可全文搜索，可返回原始文本信息)
    sql_field_string          = type_name             #字符串字段(可全文搜索，可返回原始文本信息)
    sql_field_string          = trade_name             #字符串字段(可全文搜索，可返回原始文本信息)
    sql_field_string          = email                 #字符串字段(可全文搜索，可返回原始文本信息)
    sql_field_string          = description             #字符串字段(可全文搜索，可返回原始文本信息)

    sql_query_info_pre      = SET NAMES utf8         #命令行查询时，设置正确的字符集
    sql_query_info            = SELECT id,from_id,link_id,company_name,type_name,trade_name,address,description, FROM_UNIXTIME(add_time) AS add_time  FROM hr_spider_company  WHERE id=$id                     #命令行查询时，从数据库读取原始数据信息
}

source delta : main  
{  
    sql_query_pre           = SET NAMES utf8  
    sql_query               = SELECT * FROM hr_spider_company WHERE id>( SELECT max_doc_id FROM sph_counter WHERE counter_id=1 )
    sql_query_post_index    = REPLACE INTO sph_counter SELECT 1,MAX(id) FROM hr_spider_company
}  



#index定义
index main
{
    source                = main                         #对应的source名称
    path                  = /usr/local/coreseek/var/data/mysql     #请修改为实际使用的绝对路径，例如：/usr/local/coreseek/var/...
    docinfo               = extern
    mlock                 = 0
    morphology            = none
    min_word_len          = 1
    html_strip            = 0

    #中文分词配置，详情请查看：http://www.coreseek.cn/products-install/coreseek_mmseg/
    charset_dictpath     = /usr/local/mmseg3/etc/          #BSD、Linux环境下设置，/符号结尾
    charset_type        = zh_cn.utf-8
}

index delta : main  
{  
    source          = delta  
    path            = /usr/local/coreseek/var/data/delta 
}


#全局index定义
indexer
{
    mem_limit            = 128M
}

#searchd服务定义
searchd
{
    listen              = 9312
    read_timeout        = 5
    max_children        = 30
    max_matches         = 1000
    seamless_rotate     = 0
    preopen_indexes     = 0
    unlink_old          = 1
    pid_file         = /usr/local/coreseek/var/log/searchd_mysql.pid   #请修改为实际使用的绝对路径，例如：/usr/local/coreseek/var/...
    log             = /usr/local/coreseek/var/log/searchd_mysql.log        #请修改为实际使用的绝对路径，例如：/usr/local/coreseek/var/...
    query_log         = /usr/local/coreseek/var/log/query_mysql.log    #请修改为实际使用的绝对路径，例如：/usr/local/coreseek/var/...
    binlog_path     =                                              #关闭binlog日志
}
```

我的测试表名为hr_spider_company，你只需要根据实际需求更改为自己的表名即可。

调用命令列表：
启动后台服务（必须开启）
```shell
/usr/local/coreseek/bin/searchd -c /usr/local/coreseek/etc/csft_mysql.conf
```

执行索引（查询、测试前必须执行一次）
```shell
/usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf --all --rotate
```

执行增量索引
```shell
/usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf delta --rotate
```

合并索引
```shell
/usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf --merge main delta --rotate --merge-dst-range deleted 0 0
```

(为了防止多个关键字指向同一个文档加上--merge-dst-range deleted 0 0)
后台服务测试
```shell
/usr/local/coreseek/bin/search -c /usr/local/coreseek/etc/csft_mysql.conf  aaa
```

关闭后台服务
```shell
/usr/local/coreseek/bin/searchd -c /usr/local/coreseek/etc/csft_mysql.conf --stop
```

自动化命令：
```shell
crontab -e
```

```
*/1 * * * * /bin/sh /usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf delta --rotate
*/5 * * * * /bin/sh /usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf --merge main delta --rotate --merge-dst-range deleted 0 0
30 1 * * *  /bin/sh /usr/local/coreseek/bin/indexer -c /usr/local/coreseek/etc/csft_mysql.conf --all --rotate
```

以上任务计划的意思是：每隔一分钟执行一遍增量索引，每五分钟执行一遍合并索引，每天1:30执行整体索引。

**Sphinx扩展安装**
Coreseek官方教程中建议php使用直接include一个php文件进行操作，事实上php有独立的sphinx模块可以直接操作coreseek(coreseek就是sphinx！)已经进入了php的官方函数库，而且效率的提升不是一点点！但php模块依赖于libsphinxclient包。
**[第一步] 安装依赖libsphinxclient**
```shell
# cd /var/install/coreseek-4.1-beta/csft-4.1/api/libsphinxclient/
# ./configure  --prefix=/usr/local/sphinxclient

configure: creating ./config.status
config.status: creating Makefile
config.status: error: cannot find input file: Makefile.in   #报错configure失败    

//处理configure报错
编译过程中报了一个config.status: error: cannot find input file: src/Makefile.in这个的错误，然后运行下列指令再次编译就能通过了：
# aclocal
# libtoolize --force
# automake --add-missing
# autoconf
# autoheader
# make clean

//从新configure编译
# ./configure

# make && make install
```


**[第二步] 安装sphinx的PHP扩展**
```shell
http://pecl.php.net/package/sphinx
# wget http://pecl.php.net/get/sphinx-1.3.0.tgz
# tar zxvf sphinx-1.3.0.tgz
# cd sphinx-1.3.0
# phpize
# ./configure --with-php-config=/usr/bin/php-config --with-sphinx=/usr/local/sphinxclient
# make && make install
# cd /etc/php.d/
# cp gd.ini  sphinx.ini
# vi sphinx.ini

extension=sphinx.so

# service php-fpm restart
```

打开phpinfo看一下是否已经支持了sphinx模块。

**php调用sphinx示例：**
```php
<?php
    $s = new SphinxClient;
    $s->setServer("127.0.0.1", 9312);

    $s->setMatchMode(SPH_MATCH_PHRASE);
    $s->setMaxQueryTime(30);
    $res = $s->query("宝马",'main'); #[宝马]关键字，[main]数据源source
    $err = $s->GetLastError();
    var_dump(array_keys($res['matches']));
    echo "<br>"."通过获取的ID来读取数据库中的值即可。"."<br>";
    
    echo '<pre>';
    var_dump($res);
    var_dump($err);
    echo '</pre>';
```


调用示例二：支持分页
```php
<?php
	header("Content-type: text/html; charset=utf-8");
	require("./sphinxapi.php");
    $s = new SphinxClient;
    $s->setServer("192.168.252.132", 9312);
	
	//SPH_MATCH_ALL, 匹配所有查询词(默认模式); SPH_MATCH_ANY, 匹配查询词中的任意一个; SPH_MATCH_EXTENDED2, 支持特殊运算符查询
    $s->setMatchMode(SPH_MATCH_ALL);
    $s->setMaxQueryTime(30);										//设置最大搜索时间
	$s->SetArrayResult(false);										//是否将Matches的key用ID代替
	$s->SetSelect ( "*" );											//设置返回信息的内容,等同于SQL
	$s->SetRankingMode(SPH_RANK_BM25);								//设置评分模式，SPH_RANK_BM25可能使包含多个词的查询的结果质量下降。 
	//$s->SetSortMode(SPH_SORT_EXTENDED);							//发现增加此参数会使结果不准确
	//$s->SetSortMode(SPH_SORT_EXTENDED,"from_id asc,id desc");		//设置匹配项的排序模式, SPH_SORT_EXTENDED按一种类似SQL的方式将列组合起来，升序或降序排列。
	$weights = array ('company_name' => 20);
	$s->SetFieldWeights($weights);									//设置字段权重
	$s->SetLimits ( 0, 30, 1000, 0 );								//设置结果集偏移量  SetLimits (便宜量,匹配项数目,查询的结果集数默认1000,阀值达到后停止)
	//$s->SetFilter ( $attribute, $values, $exclude=false );		//设置属性过滤
	//$s->SetGroupBy ( $attribute, $func, $groupsort="@group desc" );	//设置分组的属性
    $res = $s->query('@* "汽车"','main','--single-0-query--'); #[宝马]关键字，[news]数据源source
	
	
	//代码高亮
	$tags = array();
	$tags_name = array();
	foreach($res['matches'] as $key=>$value){
		$tags[] = $value['attrs'];
  		$company_name[] = $value['attrs']['company_name'];
  		$description[] = $value['attrs']['description'];
	}
	$company_name = $s->BuildExcerpts ($company_name, 'main', '汽车', $opts=array() );		//执行高亮，这里索引名字千万不能用*
	$description = $s->BuildExcerpts ($description, 'main', '汽车', $opts=array() );		//执行高亮，这里索引名字千万不能用*
	foreach($tags as $k=>$v)
	{
		$tags[$k]['company_name'] = $company_name[$k];	//高亮后覆盖
		$tags[$k]['description'] = $description[$k];	//高亮后覆盖
	}
	
	// 高亮后覆盖
	$i = 0;
	foreach($res['matches'] as $key=>$value){
		$res['matches'][$key] = $tags[$i];
		$i++;
	}
	
    $err = $s->GetLastError();
	
    echo '<pre>';
    var_export($res);
    var_export($err);
    echo '</pre>';
```


还有很对地方需要参考：[http://www.coreseek.cn/docs/coreseek_4.1-sphinx_2.0.1-beta.html#api-reference](http://www.coreseek.cn/docs/coreseek_4.1-sphinx_2.0.1-beta.html#api-reference)

转载自 [http://blog.csdn.net/e421083458/article/details/21529969](http://blog.csdn.net/e421083458/article/details/21529969)
