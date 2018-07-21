---
author: 403 Forbidden
comments: true
date: 2016-04-03 08:23:23+00:00
layout: post
slug: '%e6%a0%91%e8%8e%93%e6%b4%be%e6%95%99%e7%a8%8b%ef%bc%9a%e5%88%a9%e7%94%a8-ngrok-%e7%a9%bf%e9%80%8f%e5%86%85%e7%bd%91%e8%ae%bf%e9%97%ae%e6%a0%91%e8%8e%93%e6%b4%be'
title: 树莓派教程：利用 Ngrok 穿透内网访问树莓派
wordpress_id: 2513
categories:
- VPS 技术
---
我的树莓派接在局域网中，如果在外网对其进行访问，以前只能选择花生壳，而现在则有了开源方案 [Ngrok](https://github.com/inconshreveable/ngrok)。Ngrok 可以选择用官网的服务，不过很可惜的是被墙了，如果不怕麻烦，也可以翻墙使用，我们这里选择自建 Ngrok 服务。Ngrok 分为服务端和客户端，服务端需安装在有独立 IP 的外网中，我用的是 Ramnode KVM VPS，客户端安装在处于内网的树莓派中。

**编译服务端、客户端**
下载 golang，准备编译环境：

```shell
wget http://www.golangtc.com/static/go/1.6/go1.6.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.6.linux-amd64.tar.gz
cat >>/etc/profile<<EOF
export PATH=$PATH:/usr/local/go/bin
EOF
source /etc/profile
#检查下是否成功
go version
#在当前用户目录下新建go目录作为项目目录
mkdir -p $HOME/go
#用cat的方法在尾部增加配置配置golang的 GOROOT GOPATH
cat >>$HOME/.bash_profile<<EOF
export GOROOT=/usr/local/go
export GOPATH=\$HOME/go
export PATH=\$PATH:\$GOROOT/bin
EOF
#让配置生效
source $HOME/.bash_profile
#检查下go的env环境变量
go env
```


下载 ngrok

```shell
git clone https://github.com/inconshreveable/ngrok.git
cd ngrok
```


生成自签名 SSL 证书，example.com 替换为自己的域名：

```shell
openssl genrsa -out base.key 2048
openssl req -new -x509 -nodes -key base.key -days 10000 -subj "/CN=example.com" -out base.pem
openssl genrsa -out server.key 2048
openssl req -new -key server.key -subj "/CN=example.com" -out server.csr
openssl x509 -req -in server.csr -CA base.pem -CAkey base.key -CAcreateserial -days 10000 -out server.crt
```


将原始的 ngrokroot.crt 替换为生成的 pem 文件：

```shell
cp base.pem assets/client/tls/ngrokroot.crt
cp server.crt assets/server/tls/snakeoil.crt
cp server.key assets/server/tls/snakeoil.key
```


编译 Ngrok 服务端：

```shell
GOOS=linux GOARCH=amd64 make release-server
```


编译 Ngrok 客户端：

```shell
GOOS=linux GOARCH=arm make release-client
```


将服务端和客户端分别拷贝到 VPS 和树莓派的可执行路径下。

**设置域名解析**
把域名 example.com 解析到 VPS 上，假如只需要一个二级域名 abc，可直接设置将其 A 记录解析到 VPS 的 IP 上，如果需要很多二级域名，可以直接把 * 解析到 IP 上。
[![7hvs9nrxl84n4uoe](/uploads/2016/04/7hvs9nrxl84n4uoe.png)](/uploads/2016/04/7hvs9nrxl84n4uoe.png)

**服务端启动**
从命令行启动：

```shell
./bin/ngrokd -tlsKey=server.key -tlsCrt=server.crt -domain=example.com -httpAddr=:8080 -httpsAddr=:8081
```


设置为开机自动启动：

```shell
vim /etc/init.d/ngrokd
```


```shell
#!/bin/sh
### BEGIN INIT INFO
# Provides:          ngrokd
# Required-Start:    $local_fs $remote_fs $network
# Required-Stop:     $local_fs $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: ngrokd
# Description:
#
### END INIT INFO

NAME=ngrokd
DAEMON=/home/user/ngrok/bin/$NAME
KEY=/home/user/ngrok/server.key
CRT=/home/user/ngrok/server.crt
DOMAIN="example.com"
HTTPADDR=":8080"
HTTPSADDR=":8081"

[ -x "$DAEMON" ] || exit 0

case "$1" in
  start)
    echo "Starting $NAME..."
    start-stop-daemon --start --chuid seogod --exec $DAEMON --quiet --oknodo --background -- -tlsKey=$KEY -tlsCrt=$CRT -domain=$DOMAIN -httpAddr=$HTTPADDR -httpsAddr=$HTTPSADDR || return 2
    ;;
  stop)
    echo "Stopping $NAME..."
    start-stop-daemon --stop --exec $DAEMON --quiet --oknodo --retry=TERM/30/KILL/5 || return 2
    ;;
  restart)
    $0 stop && sleep 2 && $0 start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
    ;;
esac
exit 0
```


```shell
update-rc.d ngrokd defaults
```


**客户端启动**
对默认设置文件 /root/ngrok.cfg 进行编辑：

```
server_addr: example.com:4443
trust_host_root_certs: false
tunnels:
    ngrok:
        hostname: 'ngrok.pi.imjs.work:38482'
        auth: "AuthUser:AuthPassWord"
        proto:
            http: 80
    ssh:
        remote_port: 34356
        proto:
            tcp: 22
```


从命令行启动：

```shell
./bin/ngrok start ngrok ssh
```


当客户端使用 http/https 协议连接，可指定一个二级域名，服务端会分配该二级域名给客户端作为入口，比如 web.example.com; 当客户端使用 tcp 协议连接，则服务端不会分配二级域名，改为监控一个随机端口，比如 example.com:12345，remote_port 可由客户端对该端口进行指定，比如 example.com:34356。

客户端和服务端建立连接后，访问 web.example.com:8080 可以穿透内网访问树莓派的 web 服务，执行 ssh -p34356 pi@example.com 可以穿透内网登陆树莓派的 ssh 服务。

设置为开机自动启动（**使用了[面板](https://github.com/jshensh/ngrokConfEditor)的同学请不要设置！！！**）：

```shell
vim /etc/init.d/ngrok
```


```shell
#!/bin/sh
### BEGIN INIT INFO
# Provides:          ngrok
# Required-Start:    $local_fs $remote_fs $network
# Required-Stop:     $local_fs $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: ngrok
# Description:
#
### END INIT INFO

NAME=ngrok
DAEMON=/root/$NAME
CONFIG=/root/.ngrok
TUNNELS="ngrok ssh"

[ -x "$DAEMON" ] || exit 0

case "$1" in
  start)
    echo "Starting $NAME..."
    start-stop-daemon --start --chuid pi --exec $DAEMON --quiet --oknodo --background -- -config $CONFIG start $TUNNELS || return 2
    ;;
  stop)
    echo "Stopping $NAME..."
    start-stop-daemon --stop --exec $DAEMON --quiet --oknodo --retry=TERM/30/KILL/5 || return 2
    ;;
  restart)
    $0 stop && sleep 2 && $0 start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
    ;;
esac
exit 0
```


```shell
update-rc.d ngrok defaults
```


参考




    
  * [centos安装go搭建ngrok服务](https://www.w2bc.com/article/97751)

    
  * [树莓派教程：利用 Ngrok 穿透内网访问树莓派](https://www.jmlog.com/raspberry-tutorial-access-intranet-via-ngrok/)


