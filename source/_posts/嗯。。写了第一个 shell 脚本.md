---
author: 403 Forbidden
comments: true
date: 2014-01-11 15:38:09+00:00
layout: post
slug: '%e5%97%af%e3%80%82%e3%80%82%e5%86%99%e4%ba%86%e7%ac%ac%e4%b8%80%e4%b8%aa-shell-%e8%84%9a%e6%9c%ac'
title: 嗯。。写了第一个 shell 脚本
wordpress_id: 1128
categories:
- 程序发布
---
备份网站用的，需要安装 mutt 支持邮件发送。本脚本将备份 nginx 的 /usr/local/nginx/conf/vhost 下的所有配置文件，/home/wwwroot 下的所有文件，以及除 performance_schema information_schema mysql 以外的所有数据库。网站文件将切割为 10MB 大小的文件。本脚本已在 centos 6.5 下通过测试。

**2014-01-13 重要更新，在文件头添加了 export 语句，定义系统字符集，解决了发出邮件乱码的问题**

效果
[![20140113001439](/uploads/2014/01/20140113001439.jpg)](/uploads/2014/01/20140113001439.jpg)

需要先安装 mutt
```
yum install mutt
```


源码
```shell
#!/bin/bash
# 常规定义
export LANG=zh_CN.UTF-8
MYSQL_USER="root" #mysql 用户
MYSQL_PASS="root" #mysql 密码
BACK_DIR="bk" #无需修改
to_mail='admin@imjs.work' #收件人
# 备份网站数据目录
NGINX_DATA="/usr/local/nginx/conf/vhost"
BACKUP_DEFAULT="/home/wwwroot"
# 定义备份文件名
mysql_DATA=mysql_$(date +"%Y%m%d").tar.gz
www_DEFAULT=wwwroot_$(date +%Y%m%d)
nginx_CONFIG=nginx_$(date +%Y%m%d).tar.gz
# 判断本地备份目录，不存在则创建
if [ ! -d $BACK_DIR ] ;
  then
   mkdir -p "$BACK_DIR"
fi

# 进入备份目录
cd $BACK_DIR

# 备份所有数据库
# 导出需要备份的数据库，清除不需要备份的库
mysql -u$MYSQL_USER -p$MYSQL_PASS -B -N -e 'SHOW DATABASES' > databases.db
sed -i '/performance_schema/d' databases.db
sed -i '/information_schema/d' databases.db
sed -i '/mysql/d' databases.db

for db in $(cat databases.db)
 do
   mysqldump -u$MYSQL_USER -p$MYSQL_PASS ${db} | gzip -9 - > ${db}.sql.gz
done

# 打包数据库
tar -zcvf $mysql_DATA *.sql.gz

# 打包本地网站数据，排除 phpmyadmin
tar -zcvf ${www_DEFAULT}.tar.gz --exclude=${BACKUP_DEFAULT}/default/phpmyadmin $BACKUP_DEFAULT
mkdir ${www_DEFAULT}
cd ${www_DEFAULT}
split -a 2 -d -b 10m ../${www_DEFAULT}.tar.gz $www_DEFAULT
rm -rf ${www_DEFAULT}.tar.gz
cd ../

# 打包Nginx配置文件
tar -zcvf $nginx_CONFIG $NGINX_DATA/*.conf

# upload
echo `date +%Y-%m-%d`' 的备份文件'|mutt $to_mail -s `date +%Y-%m-%d`' 的备份文件 - nginx 与 mysql' -a $nginx_CONFIG $mysql_DATA
echo -e "nginx and mysql is done"
i=0
message='copy /b '
for file in ${www_DEFAULT}/*
do
sleep 15s
tmp=$i
echo `date +%Y-%m-%d`' 的备份文件'|mutt $to_mail -s `date +%Y-%m-%d`' 的备份文件 - 网站文件 - '${www_DEFAULT}`printf %02d $tmp` -a $file
message=${message}${www_DEFAULT}`printf %02d $tmp`'+'
echo -e ${file}" is done"
let i+=1
done
message=${message%+*}' '${www_DEFAULT}'.tar.gz'
echo '合并方法 '${message}|mutt $to_mail -s `date +%Y-%m-%d`' 的备份文件已发送完毕，网站文件共有'${i}'个分段'
cd ../

# Delete all local backup
rm -rf $BACK_DIR

exit 0
```

