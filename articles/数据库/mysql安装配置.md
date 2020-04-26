<div class="blog-article">
<h1><a href="p.html?p=\数据库\mysql安装配置" class="title">mysql的安装与配置以及navicat的安装破解与使用</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2018-12-17 12:12</span>
<span><a href="tags.html?t=数据库" class="tag">数据库</a></span>
</div>
<br/>

昨天一个非计算机专业的朋友让我教他用数据库，好久没碰了，按照网上的教程的弄了一遍，这里记录下。
## MySQL安装 ##
### 下载与安装
从网上下载MySQL，我这里用的是zip版，版本为 8.0.13，也可以使用安装版msi，[下载地址](https://dev.mysql.com/downloads/mysql/)

![](assets/images/2018/12/437re1qe50jg8rndrioa5alk0e.png)

![](assets/images/2018/12/rl0d0bjucggdqr03fc381cm5va.png)

### 解压下载的压缩包 
根据自己需要解压到相应位置，我的位置为 `D:\programming\mysql-8.0.13-winx64`
### 配置文件 ###
首先在解压的路径下查看是否含有my.ini的文件，如果没有则新建一个，内容如下：

```
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=D:\programming\mysql-8.0.13-winx64
# 设置mysql数据库的数据的存放目录
datadir=D:\programming\mysql-8.0.13-winx64\data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=UTF8MB4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```

上面文件里要注意的有两个地方：一是`basedir`和`datadir`的地址要正确填写，二是`character-set-server`写成`UTF8MB4`，不然会有warning。

### 数据库配置 ###
通过管理员权限进入cmd（如果不是管理员权限就会出现问题） ，进入MySQL安装目录的bin目录下。

接着输入

`mysqld --initialize --console`

不报错的话，会出现数据库初试连接密码，记住这个密码，后面连接数据库时会用到。当然要是不小心关掉了或者没记住，删掉初始化的 data目录，
再执行一遍初始化命令又会重新生成。

再然后输入`mysqld --install`安装mysql服务，输入`net start mysql`启动服务，备注：`mysqld --remove`是卸载MySQL服务，`net stop mysql`是停止服务。

输入`mysql -u root -p`后会让你输入密码，密码为前面让你记住的密码。

接着更改密码，输入

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';`

到此，MySQL数据库就安装完成了。

测试一下，查看默认数据库：

`show databases;`

全部过程如下图：

![](assets/images/2018/12/209dgb99p8glrpk27r6638s299.png)

## Navicat安装 ##
### Navicat11.2.15 下载安装 ###
链接: https://pan.baidu.com/s/11jWZRQqWEk4Mq72ThQZK0Q 提取码: zvq6
### Navicat破解 ###
链接: https://pan.baidu.com/s/1AbRLF6yDahDsN-9WlVQG-A 提取码: kf22

 将工具放在安装目录下运行即可。
### 连接数据库 ###
![](assets/images/2018/12/51222u6u0qhibqdrak5vl2aab7.png)

![](assets/images/2018/12/sfbpeekmg2h97q6kbrqv8avqvv.png)

![](assets/images/2018/12/quf618cu2ggiaqtse7261oia5q.png)