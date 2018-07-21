---
author: 403 Forbidden
comments: true
date: 2016-02-11 17:00:09+00:00
layout: post
slug: '%e4%bd%bf%e7%94%a8nsenter%e8%bf%9b%e5%85%a5docker%e5%ae%b9%e5%99%a8'
title: 使用nsenter进入Docker容器
wordpress_id: 2464
categories:
- VPS 技术
---
Docker容器运行后，如何进入容器进行操作呢？起初我是用SSH。如果只启动一个容器，用SSH还能应付，只需要将容器的22端口映射到本机的一个端口即可。当我启动了五个容器后，每个容器默认是没有配置SSH Server的，安装配置SSHD，映射容器SSH端口，实在是麻烦。
我发现很多Docker镜像都是没有安装SSHD服务的，难道有其他方法进入Docker容器？
浏览了Docker的文档，我没有找到答案。还是要求助于无所不能的Google，万能的Google告诉我用nsenter吧。
在大多数Linux发行版中，util-linux包中含有nsenter.如果没有，你需要安装它.
```shell
cd /tmp
curl https://www.kernel.org/pub/linux/utils/util-linux/v2.24/util-linux-2.24.tar.gz \
  | tar -zxf-
cd util-linux-2.24
./configure --without-ncurses
make nsenter
cp nsenter /usr/local/bin
```

使用shell脚本 docker-enter，将如下代码保存为 docker-enter, chomod +x docker-enter
```shell
  #!/bin/sh

  if [ -e $(dirname "$0")/nsenter ]; then
    # with boot2docker, nsenter is not in the PATH but it is in the same folder
    NSENTER=$(dirname "$0")/nsenter
  else
    NSENTER=nsenter
  fi

  if [ -z "$1" ]; then
    echo "Usage: `basename "$0"` CONTAINER [COMMAND [ARG]...]"
    echo ""
    echo "Enters the Docker CONTAINER and executes the specified COMMAND."
    echo "If COMMAND is not specified, runs an interactive shell in CONTAINER."
  else
    PID=$(docker inspect --format "{{.State.Pid}}" "$1")
    if [ -z "$PID" ]; then
      exit 1
    fi
    shift

    OPTS="--target $PID --mount --uts --ipc --net --pid --"

    if [ -z "$1" ]; then
      # No command given.
      # Use su to clear all host environment variables except for TERM,
      # initialize the environment variables HOME, SHELL, USER, LOGNAME, PATH,
      # and start a login shell.
      "$NSENTER" $OPTS su - root
    else
      # Use env to clear all host environment variables.
      "$NSENTER" $OPTS env --ignore-environment -- "$@"
    fi
  fi
```

运行 docker-enter  ，这样就进入到指定的容器中

关于nsenter更详细的使用方法见这里 [https://github.com/jpetazzo/nsenter](https://github.com/jpetazzo/nsenter)

转载自 [http://www.tuicool.com/articles/eYnUBrR](http://www.tuicool.com/articles/eYnUBrR)
