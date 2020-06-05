---
author: 403 Forbidden
comments: true
date: 2020-06-06 02:33:33+00:00
layout: post
title: 记一次给家宽 DDNS 配置 ssl 双向认证
categories:
- 建站相关
---
### 用 Let's encrypt 配置 HTTPS
---

1. 安装 certbot

```shell
yum install python2-certbot-dns-cloudflare
```

2. 登录 [Cloudflare](https://www.cloudflare.com/a/profile) 获取 Api Key，填入文件 /etc/letsencrypt/cloudflareapi.cfg 内

```
dns_cloudflare_email = 
dns_cloudflare_api_key = 
```

3. 签发多域名证书

```shell
certbot-2 certonly --cert-name ddns.example.com --dns-cloudflare --dns-cloudflare-credentials /etc/letsencrypt/cloudflareapi.cfg --server https://acme-v02.api.letsencrypt.org/directory -d "*.ddns.example.com" -d ddns.example.com
```

4. 设置 crontab 在每天凌晨 2:30 自动续签证书

```
30 2 * * * certbot-2 renew --noninteractive && service nginx reload
```

### 自签双向认证证书
---

[下载签发脚本](https://gist.github.com/jshensh/9442300c6a86b1ab08040d39de37df5b)，先使用 create_ca_cert.sh 签发 CA 证书，然后使用 create_client_cert.sh 签发客户端证书：

```shell
./create_client_cert.sh --ou 财务部 --cn 财务经理 --email cy@example.com
```

吊销已签发的客户端证书：

```shell
 ./revoke_cert.sh 财务经理
```

### 替换 lnmp 脚本，创建 vhost
---

将 /usr/bin/lnmp 替换为 [lnmp](https://gist.github.com/jshensh/ae59190701bd00bc69251a99f4183422)

```shell
wget https://gist.github.com/jshensh/ae59190701bd00bc69251a99f4183422/raw/f2e4f4c9167c22557119014c223bc72be5c4bf14/lnmp -O /usr/bin/lnmp
chmod +x /usr/bin/lnmp
lnmp vhost add_ddns
```

脚本内弟 22-23 行为域名和端口配置，需要修改

```shell
ddns_domain="ddns.example.com"
port="49527"
```

为屏蔽无效请求添加了第 1281 行的规则，可视情况处理

### 放行端口
---

```shell
iptables -I INPUT -p tcp --dport 49527 -j ACCEPT
iptables-save
service iptables restart
```

### 参考文章
---

* [如何使用CentOS 7上的CloudFlare验证来检索让我们加密SSL通配符证书](https://cloud.tencent.com/developer/article/1360712)
* [Nginx SSL快速双向认证配置(脚本)](https://segmentfault.com/a/1190000015295122)