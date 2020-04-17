<div class="blog-article">
    <h1><a href="p.html?p=Linux\centOS下设置开机自动运行脚本" class="title">centOS下设置开机自动运行脚本</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-01-08 09:48</span>
    <span><a href="tags.html?t=Linux" class="tag">Linux</a></span>
    </div>
<br/>

服务器经常需要重启，一重启所有自己的程序都需要重新启动，所以将自己的脚本加入到开机启动项还是很有必要的（以前每次都是手动开启，太蛋疼了）。网上的方法很多，我选了自认为比较简单的，测试有效，下面总结下。
## 赋予 /etc/rc.d/rc.local 文件可执行权限 	
在centos7中,/etc/rc.d/rc.local文件的权限被降低了,开机的时候执行自己的脚本是不能起动一些服务的,执行下面的命令将文件标记为可执行文件

	chmod +x /etc/rc.d/rc.local
## 编辑 /etc/rc.d/rc.local文件 
打开rc.local文件，在末尾添加所有需要启动的程序的命令，一行一条。也将所有启动程序的命令写在一个自定义的shell脚本中，然后在rc.local文件末尾添加执行这个脚本的命令（注意也需要先给这个脚本赋予可执行权限）。
例如我的rc.local文件如下：
	
	#!/bin/bash
	# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
	#
	# It is highly advisable to create own systemd services or udev rules
	# to run scripts during boot instead of using this file.
	#
	# In contrast to previous versions due to parallel execution during boot
	# this script will NOT be run after all other services.
	#
	# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
	# that this script will be executed during boot.
	touch /var/lock/subsys/local
	/opt/vpnserver/vpnserver start  #从这里开始，是我所添加
	/usr/local/nginx/sbin/nginx
	systemctl start haproxy-lkl
	sh /usr/local/nginx/html/tale/bin/tale.sh start
	~                                                                                       
	~                                                                                       
	~                                                                                       
	~                                                                                       
	~                                                                                       
	~                                                                                       
	~                                                                                       
	"rc.local" 17L, 608C
然后保存，退出，重启就大功告成了。