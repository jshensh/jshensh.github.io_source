---
author: 403 Forbidden
comments: true
date: 2021-09-01 09:27:09+00:00
layout: post
title: Openwrt 21 / LEDE 编译配置 Nginx + Mysql + PHP 环境
categories:
- openwrt
---
编译时勾选以下 mod

- Languages
    - PHP7
        - php7
        - PHP7 LIBXML support
            - Use system timezone data instead of php's built-in database
        - php7-cli
        - php7-fpm
        - php7-mod-bcmath
        - php7-mod-calendar
        - php7-mod-ctype
        - php7-mod-curl
        - php7-mod-dom
        - php7-mod-exif
        - php7-mod-fileinfo
        - php7-mod-filter
        - php7-mod-ftp
        - php7-mod-gd
        - php7-mod-gettext
        - php7-mod-gmp
        - php7-mod-iconv
        - php7-mod-imap
        - php7-mod-json
        - php7-mod-ldap
        - php7-mod-mbstring
        - php7-mod-mysqli
        - php7-mod-mysqlnd
        - php7-mod-opcache
        - php7-mod-openssl
        - php7-mod-pcntl
        - php7-mod-pdo
        - php7-mod-pdo-mysql
        - php7-mod-phar
        - php7-mod-session
        - php7-mod-simplexml
        - php7-mod-sockets
        - php7-mod-tokenizer
        - php7-mod-xml
        - php7-mod-xmlreader
        - php7-mod-xmlwriter
        - php7-mod-zip
- LuCI
    - Collections
        - luci-nginx
        - luci-ssl-nginx
        - luci-ssl-openssl
- Network
    - SSH
        - openssh-sftp-server
    - Web Servers/Proxies
        - nginx-all-module
        - nginx-mod-luci
        - nginx-ssl-util
        - uwsgi
- Utilities
    - Compression
        - unzip
    - Database
        - mariadb-common
            - mariadb-client-base
                - mariadb-client
            - mariadb-server-base
                - mariadb-server

并调整 ``Target Images`` 中的 ``Root filesystem partition size``

刷入后配置

```shell
#!/bin/bash

domain="${HOSTNAME,,}.lan"
ip=$(ip r | grep br-lan | awk '{print $NF}')
wwwroot="/mnt/mmcblk2p4/wwwroot"

cd ~

# dnsmasq
uci add_list dhcp.@dnsmasq[0].address="/.${domain}/${ip}"
uci commit dhcp
/etc/init.d/dnsmasq restart

# nginx
sed -i 's/\(fastcgi_param  \)SCRIPT_NAME.*/\1SCRIPT_FILENAME    $document_root$fastcgi_script_name;/' /etc/nginx/fastcgi_params
sed -i 's/http {/http {\n        server_names_hash_bucket_size 64;/' /etc/nginx/uci.conf.template

# php
ln -s /usr/bin/php-cli /usr/bin/php
sed -i 's/memory_limit = 8M/memory_limit = 1024M/' /etc/php.ini

# mariadb
uci set mysqld.general.enabled='1'
uci set mysqld.general.options='--datadir=/mnt/mmcblk2p4/mariadb'
uci commit mysqld
sed -i 's/\(datadir\s\+\=\).*/\1\/mnt\/mmcblk2p4\/mariadb/' /etc/mysql/conf.d/50-server.cnf
mysql_install_db --user=mariadb --basedir=/usr --datadir=/mnt/mmcblk2p4/mariadb
/etc/init.d/mysqld start

# composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/bin/composer

# vhost
mkdir -p "${wwwroot}/php.${domain}"
cd "${wwwroot}/php.${domain}"
cat > "/etc/nginx/conf.d/php.${domain}.conf" <<EOF
server
    {
        listen 80;
        #listen [::]:80;
        server_name php.${domain};
        index index.html index.htm index.php default.html default.htm default.php;
        root  ${wwwroot}/php.${domain};

        location ~ [^/]\.php(/|$)
        {
            try_files \$uri =404;
            fastcgi_pass  unix:/tmp/run/php7-fpm.sock;
            fastcgi_index index.php;
            include /etc/nginx/fastcgi_params;
        }

        location ~ /.well-known {
            allow all;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log off;
    }
EOF
/etc/init.d/nginx restart
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.1/phpMyAdmin-5.1.1-all-languages.zip
unzip phpMyAdmin-5.1.1-all-languages.zip
rm phpMyAdmin-5.1.1-all-languages.zip
mv phpMyAdmin-5.1.1-all-languages phpmyadmin
chmod +x phpmyadmin/index.php
mkdir phpmyadmin/tmp
chmod 0777 phpmyadmin/tmp
cp phpmyadmin/config.sample.inc.php phpmyadmin/config.inc.php
sed -i "s/\(\$cfg\['Servers'\]\[\$i\]\['host'\] = \).*/\\1'127.0.0.1';/" phpmyadmin/config.inc.php
```