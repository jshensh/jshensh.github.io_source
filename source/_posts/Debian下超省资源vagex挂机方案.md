---
author: 403 Forbidden
comments: true
date: 2014-01-06 14:49:28+00:00
layout: post
slug: debian%e4%b8%8b%e8%b6%85%e7%9c%81%e8%b5%84%e6%ba%90vagex%e6%8c%82%e6%9c%ba%e6%96%b9%e6%a1%88
title: Debian下超省资源vagex挂机方案
wordpress_id: 1086
categories:
- 杂七杂八
---
最近免费VPS出的比较多，免费的显而易见性能不会那么好，所以就需要一个更省资源的挂机方案！
所以选择了debian，以下步骤仅仅适用于debian 6 32bits系统！
64位的和其他系统自己根据实际情况修改！
**提醒一点，因为是编译安装，编译过程会比较慢，这个跟VPS的性能有关，时间最长的我经历过4个小时以上！所以建议以下所有的过程都在screen里面执行！**

1.安装相关依赖
```shell
apt-get -q -y --force-yes install vnc4server xterm jwm mercurial libasound2-dev libcurl4-openssl-dev libnotify-dev libxt-dev libiw-dev mesa-common-dev autoconf2.13 yasm bzip2 libidl-dev zip
```


2.下载firefox 3.6.28的源码包，解压并编译安装。
```shell
wget http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/3.6.28-candidates/build1/source/firefox-3.6.28.source.tar.bz2
bzip2 -d firefox-3.6.28.source.tar.bz2
tar -xvf firefox-3.6.28.source.tar
cd mozilla-*
./configure --enable-application=browser && make && make install
```


3.下载flash插件并安装
```shell
wget http://fpdownload.adobe.com/get/flashplayer/pdc/10.3.183.19/install_flash_player_10_linux.tar.gz
tar xvzf install_flash_player_10_linux.tar.gz
mkdir -p ~/.mozilla/plugins/
cp libflashplayer.so ~/.mozilla/plugins/
```


4.启动VNC并设置
```shell
vncserver
vi ~/.vnc/xstartup
```


把以下两行内容添加到末尾
```shell
startjwm &
firefox --display=:1
```


添加权限
```shell
chmod +x ~/.vnc/xstartup
```


5.设置VNC开机启动
```shell
vi /etc/init.d/vncserver
```


将以下内容填入
```
### BEGIN INIT INFO
# Provides: vncserver
# Required-Start: $remote_fs $syslog
# Required-Stop: $remote_fs $syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Start daemon at boot time
# Description: Enable service provided by daemon.
### END INIT INFO
PATH="$PATH:/usr/X11R6/bin/"
# The Username:Group that will run VNC
export USER="root"
#${RUNAS}
# The display that VNC will use
DISPLAY="1"
# Color depth (between 8 and 32)
DEPTH="16"
# The Desktop geometry to use.
#GEOMETRY="x"
GEOMETRY="800x600"
#You Can Choice GEOMETRY="1024x768" && GEOMETRY="1280x1024"
# The name that the VNC Desktop will have.
NAME="Vncserver"
OPTIONS="-name ${NAME} -depth ${DEPTH} -geometry ${GEOMETRY} :${DISPLAY}"
. /lib/lsb/init-functions
case "$1" in
start)
su ${USER} -c "/usr/bin/vncserver ${OPTIONS}"
;;
stop)
su ${USER} -c "/usr/bin/vncserver -kill :${DISPLAY}"
;;
restart)
$0 stop
$0 start
;;
esac
exit 0
```


添加权限
```shell
chmod +x /etc/init.d/vncserver
```


使配置生效
```shell
update-rc.d vncserver defaults
```


6.添加计划任务，定时重启vnc或者系统，以防止firefox假死不出分
```shell
crontab -e
```


规则就不多说，根据自己的实际情况编写。

规则编写可参考以下两篇文章
[http://www.linuxde.net/2011/12/3758.html](http://www.linuxde.net/2011/12/3758.html)
[
http://hi.baidu.com/aboc/blog/item/3d469358b9f468cd9d82047d.html](http://hi.baidu.com/aboc/blog/item/3d469358b9f468cd9d82047d.html)

7.重启，安装插件进行相关设置即可！
```shell
reboot
```


相关设置，请参考
[http://sunsea.im/linux-vps-vagex-automatic-money.html](http://sunsea.im/linux-vps-vagex-automatic-money.html)

转载自：[http://sunsea.im/debian-vagex.html](http://sunsea.im/debian-vagex.html)
