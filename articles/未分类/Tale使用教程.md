<div class="blog-article">
<h1><a href="p.html?p=\未分类\Tale使用教程" class="title">Tale使用教程</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-01-16 07:06</span>
<span><a href="tags.html?t=未分类" class="tag">未分类</a></span>
</div>
<br/>

# Tale使用教程
## 必须环境
> 该说明针对于服务器环境，如 Ubuntu、CentOS，您只需要有 JDK8 的环境即可。
### JDK8
#### Ubuntu

	sudo add-apt-repository ppa:webupd8team/java
	sudo apt update
	sudo apt install -y oracle-java8-installer
	sudo apt install -y oracle-java8-set-default
	java -version
	
#### CentOS

	wget -c --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.rpm
	sudo yum localinstall -y jdk-8u131-linux-x64.rpm
	java -version

## 安装 Tale 博客
> 执行如下命令

```
$ wget -qO- git.io/fxsWx | bash
$ cd tale
$ chmod +x ./tool
$ ./tool start
```

> 然后访问浏览器的 http://IP:9000 即可安装。
> 如果您通过该脚本下载失败可能是服务器无法连接到 Github，参考 install.sh 下载最新版本进行手动安装。
> 后台登录地址：http://IP:9000/login

## 启动博客程序
### 脚本说明
> 在 tale 根目录下有一个名为 tool 的文件，该文件为帮助脚本。

	$ bash tool
	Usage: tool {start | stop | restart | status | upgrade | log}

- start: 启动 tale
- stop: 停止 tale
- restart: 重启 tale
- status: 查看 tale 运行状态
- log: 查看 tale 运行日志
- upgrade: 升级 tale，会自动备份

## Nginx 配置
>如果你想使用 Nginx 绑定域名，下面是一份参考配置。

	server {
	  listen 80;
	  server_name tale.biezhi.me;
	  access_log off;
	
	  location / {
	    proxy_pass http://127.0.0.1:9000;
	    proxy_read_timeout 300;
	    proxy_connect_timeout 300;
	    proxy_redirect     off;
	
	    proxy_set_header   X-Forwarded-Proto $scheme;
	    proxy_set_header   Host              $http_host;
	    proxy_set_header   X-Real-IP         $remote_addr;
	  }
	  
	}

## 其他注意事项
> 在整个博客系统中，当你第一次搭建成功后会在 resources 目录下生成一个名为 tale.db 的数据库文件，该文件是博客系统的所有文章数据。 如果你想备份的话，直接备份这个文件就可以了，想备份 SQL 语句可以使用 sqlite3 tale.db < tale_0912.sql 进行备份。