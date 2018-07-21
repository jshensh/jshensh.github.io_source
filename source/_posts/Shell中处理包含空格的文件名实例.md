---
author: 403 Forbidden
comments: true
date: 2015-04-13 12:24:29+00:00
layout: post
slug: shell%e4%b8%ad%e5%a4%84%e7%90%86%e5%8c%85%e5%90%ab%e7%a9%ba%e6%a0%bc%e7%9a%84%e6%96%87%e4%bb%b6%e5%90%8d%e5%ae%9e%e4%be%8b
title: Shell中处理包含空格的文件名实例
wordpress_id: 2200
categories:
- VPS 技术
---
这篇文章主要介绍了Shell中处理包含空格的文件名实例,需要的朋友可以参考下

今天在处理文件时遇到个问题，当文件名包含空格时，for循环就出问题了。
例如，我在当前文件夹下建立3个文件名包含空格的文件：
```shell
keakons-MacBook-Pro:test keakon$ touch "test 1"
keakons-MacBook-Pro:test keakon$ touch "test 2"
keakons-MacBook-Pro:test keakon$ touch "test 3"
keakons-MacBook-Pro:test keakon$ ls
test 1 test 2 test 3
```


然后for循环输出文件名：
```shell
keakons-MacBook-Pro:test keakon$ for file in `ls`;
> do echo $file;
> done
test
1
test
2
test
3
```


可以看到，文件名被分开了。
复制操作也不行：
```shell
keakons-MacBook-Pro:test keakon$ mkdir ../bak
keakons-MacBook-Pro:test keakon$ for file in `ls`; do cp "$file" ../bak; done
cp: bak is a directory (not copied).
cp: test: No such file or directory
cp: 1: No such file or directory
cp: test: No such file or directory
cp: 2: No such file or directory
cp: test: No such file or directory
cp: 3: No such file or directory
```


要解决这个问题，当然就要从单词分隔符着手。而bash中使用的是$IFS（Internal Field Separator）这个变量，内容为" \n\t"：
```shell
keakons-MacBook-Pro:test keakon$ echo $IFS  
 keakons-MacBook-Pro:test keakon$ echo "$IFS" | od -t x1
0000000    20  09  0a  0a                                                
0000004
keakons-MacBook-Pro:test keakon$ echo "" | od -t x1
0000000    0a                                                            
0000001 
```


然后把它改成"\n\b"，记得修改前先保存一下：
```shell
keakons-MacBook-Pro:test keakon$ SAVEIFS=$IFS
keakons-MacBook-Pro:test keakon$ IFS=$(echo -en "\n\b")
```


现在再执行上述命令就正常了：
```shell
keakons-MacBook-Pro:test keakon$ for file in `ls`; do echo $file; done
test 1
test 2
test 3
keakons-MacBook-Pro:test keakon$ for file in `ls`; do cp "$file" ../bak; done
keakons-MacBook-Pro:test keakon$ ls ../bak
test 1 test 2 test 3
```


最后，别忘了恢复$IFS：
```shell
keakons-MacBook-Pro:test keakon$ IFS=$SAVEIFS
keakons-MacBook-Pro:test keakon$ echo "$IFS" | od -t x1
0000000    20  09  0a  0a                                                
0000004
keakons-MacBook-Pro:test keakon$ IFS=$(echo -en " \n\t")
keakons-MacBook-Pro:test keakon$ echo "$IFS" | od -t x1
0000000    20  0a  09  0a                                                
0000004
```


转载自 [http://www.jb51.net/article/49797.htm](http://www.jb51.net/article/49797.htm)
