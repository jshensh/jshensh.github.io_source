---
author: 403 Forbidden
comments: true
date: 2014-09-28 00:40:46+00:00
layout: post
slug: '%e5%85%b3%e4%ba%8e-shellshock'
title: 关于 Shellshock
wordpress_id: 1935
categories:
- VPS 技术
---
相信各位应该早就知道了。。。昨天一大早起床就看到俩负责的国外厂商发的邮件
[![Screenshot_2014-09-27-19-59-33](/uploads/2014/09/Screenshot_2014-09-27-19-59-33-576x1024.png)](/uploads/2014/09/Screenshot_2014-09-27-19-59-33.png)
之所以只有国外的，当然不是想说国内的厂商不负责，只是因为我个人不喜欢用国内的而已。咳咳扯远了。随手点开其中一封看了下:
[![Screenshot_2014-09-27-20-00-21](/uploads/2014/09/Screenshot_2014-09-27-20-00-21-576x1024.png)](/uploads/2014/09/Screenshot_2014-09-27-20-00-21.png)
附上邮件中的原文链接: [https://www.digitalocean.com/community/tutorials/how-to-protect-your-server-against-the-shellshock-bash-vulnerability](https://www.digitalocean.com/community/tutorials/how-to-protect-your-server-against-the-shellshock-bash-vulnerability)
接下来说说应该怎么确定这个 bug

首先，在你的 shell 中执行以下语句
```shell
env VAR='() { :;}; echo Bash is vulnerable!' bash -c "echo Bash Test"
```

如果输出
```
Bash is vulnerable!
Bash Test
```

就代表漏洞存在
如果输出类似
```
bash: warning: VAR: ignoring function definition attempt
bash: error importing function definition for `VAR'
Bash Test
```

则不存在漏洞

修复漏洞:
**APT-GET: Ubuntu / Debian**
Update Bash to the latest version available via apt-get:
```shell
sudo apt-get update && sudo apt-get install --only-upgrade bash
```

Now check your system vulnerability again by running the command in the previous section ([Check System Vulnerability](https://www.digitalocean.com/community/tutorials/how-to-protect-your-server-against-the-shellshock-bash-vulnerability#check-system-vulnerability)).

**YUM: CentOS / Red Hat / Fedora**
Update Bash to the latest version available via the yum:
```shell
sudo yum update bash
```

Now check your system vulnerability again by running the command in the previous section ([Check System Vulnerability](https://www.digitalocean.com/community/tutorials/how-to-protect-your-server-against-the-shellshock-bash-vulnerability#check-system-vulnerability)).

大功告成

P.S. 坑爹的腾讯电脑管家闹笑话了
[![Screenshot_2014-09-27-19-55-19](/uploads/2014/09/Screenshot_2014-09-27-19-55-19-576x1024.png)](/uploads/2014/09/Screenshot_2014-09-27-19-55-19.png)
[![Screenshot_2014-09-27-19-55-29](/uploads/2014/09/Screenshot_2014-09-27-19-55-29-576x1024.png)](/uploads/2014/09/Screenshot_2014-09-27-19-55-29.png)
[![69b019d1gw1ekq1gfouswj20n80efwfu](/uploads/2014/09/69b019d1gw1ekq1gfouswj20n80efwfu.jpg)](/uploads/2014/09/69b019d1gw1ekq1gfouswj20n80efwfu.jpg)
