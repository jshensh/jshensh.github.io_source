---
author: 403 Forbidden
comments: true
date: 2016-04-09 06:03:39+00:00
layout: post
slug: '%e5%b0%86-ngrok-conf-editor-%e5%8a%a0%e5%85%a5%e8%87%aa%e5%90%af%e5%8a%a8%e9%a1%b9'
title: 将 Ngrok Conf Editor 加入自启动项
wordpress_id: 2535
categories:
- 树莓派
---
Centos 7：
```shell
vi /usr/lib/systemd/system/ngrokConfEditor.service
```

```
[Unit]
Description=ngrok conf editor
Documentation=https://github.com/jshensh/ngrokConfEditor
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/node-v4.4.2-linux-armv7l/bin/forever start /ngrokConfEditor/app.js
ExecStop=/usr/local/node-v4.4.2-linux-armv7l/bin/forever stop /ngrokConfEditor/app.js
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

```shell
systemctl enable ngrokConfEditor.service
systemctl reboot
```


Raspbian：
```shell
vi /etc/init.d/ngrokconfeditor
```

```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          ngrokconfeditor
# Required-Start:    $remote_fs
# Required-Stop:     $remote_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start or stop the HTTP Proxy.
### END INIT INFO
case $1 in
    start)
        /usr/local/node-v4.4.2-linux-armv7l/bin/forever start /ngrokConfEditor/app.js
        ;;
    stop)
        /usr/local/node-v4.4.2-linux-armv7l/bin/forever stop /ngrokConfEditor/app.js
        ;;
*)
echo "Usage: $0 (start|stop)"
;;
esac
```

```shell
update-rc.d ngrokconfeditor defaults
reboot
```

