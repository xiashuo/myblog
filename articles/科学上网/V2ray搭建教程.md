<div class="blog-article">
<h1><a href="p.html?p=\科学上网\V2ray搭建教程" class="title">CentOs7搭建V2ray服务科学上网</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-13 14:09</span>
<span><a href="tags.html?t=科学上网" class="tag">科学上网</a></span>
</div>
<br/>

自从去年国庆节开始，`SSR`就开始变得不行了，`搬瓦工`疯狂被封ip，后来换了`vutlr`，可以免费换ip，但至今也被封了不少次，而且速度一直不太理想。今天偶然在油管上看到一个科学上网评测视频，里面提到了`V2ray`，据说是可以伪装协议，逃脱`GFW`，更稳定，速度更快，于是搜了相关教程，搭建了一下试试，`服务端`搭建以及`客户端`配置过程如下：

# 搭建v2ray服务
## 安装wget
> 如果wget命令可用，直接忽略本条

```
yum -y install wget
```
## 下载脚本

```
wget https://install.direct/go.sh
```
## 安装unzip
> 因为centos不支持apt-get，我们需要安装unzip，详见[官方说明](https://www.v2ray.com/chapter_00/install.html)

```
yum install -y zip unzip
```

## 执行安装

```
[root@xiashuobadxi ~]# bash go.sh 
Installing V2Ray v4.22.1 on x86_64
Downloading V2Ray: https://github.com/v2ray/v2ray-core/releases/download/v4.22.1/v2ray-linux-64.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   608  100   608    0     0   5194      0 --:--:-- --:--:-- --:--:--  5241
100 11.6M  100 11.6M    0     0  21.2M      0 --:--:-- --:--:-- --:--:-- 21.2M
Extracting V2Ray package to /tmp/v2ray.
Archive:  /tmp/v2ray/v2ray.zip
  inflating: /tmp/v2ray/config.json  
   creating: /tmp/v2ray/doc/
  inflating: /tmp/v2ray/doc/readme.md  
  inflating: /tmp/v2ray/geoip.dat    
  inflating: /tmp/v2ray/geosite.dat  
   creating: /tmp/v2ray/systemd/
  inflating: /tmp/v2ray/systemd/v2ray.service  
   creating: /tmp/v2ray/systemv/
  inflating: /tmp/v2ray/systemv/v2ray  
  inflating: /tmp/v2ray/v2ctl        
 extracting: /tmp/v2ray/v2ctl.sig    
  inflating: /tmp/v2ray/v2ray        
 extracting: /tmp/v2ray/v2ray.sig    
  inflating: /tmp/v2ray/vpoint_socks_vmess.json  
  inflating: /tmp/v2ray/vpoint_vmess_freedom.json  
PORT:19343
UUID:b9f584d3-8c9a-492a-85cf-eb085f36b832
Created symlink from /etc/systemd/system/multi-user.target.wants/v2ray.service to /etc/systemd/system/v2ray.service.
V2Ray v4.22.1 is installed.
```
## 相关命令
> 在首次安装完成之后，V2Ray不会自动启动，需要手动运行上述启动命令。而在已经运行V2Ray的VPS上再次执行安装脚本，安装脚本会自动停止V2Ray 进程，升级V2Ray程序，然后自动运行V2Ray。在升级过程中，配置文件不会被修改。

```
## 启动
systemctl start v2ray

## 停止
systemctl stop v2ray

## 重启
systemctl restart v2ray

## 开机自启
systemctl enable v2ray
```
> 关于软件更新：更新 V2Ray 的方法是再次执行安装脚本！再次执行安装脚本！再次执行安装脚本！

## 配置
> 如果你按照上面的命令执行安装完成之后，服务端其实是不需要再进行任何配置的，配置文件位于`/etc/v2ray/config.json`，使用`cat /etc/v2ray/config.json`查看配置信息。接下来进行客户端配置就行了。
> 
> **说明：**
> - 配置文件中的id、端口、alterId需要和客户端的配置保持一致；
> - 服务端使用脚本安装成功之后默认就是vmess协议；

```
[root@xiashuobadxi v2ray]# cat config.json 
{
  "inbounds": [{
    "port": 19343,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "b9f584d3-8c9a-492a-85cf-eb085f36b832",
          "level": 1,
          "alterId": 64
        }
      ]
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  },{
    "protocol": "blackhole",
    "settings": {},
    "tag": "blocked"
  }],
  "routing": {
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "blocked"
      }
    ]
  }
}
```

## 防火墙开放端口
> 有的vps端口默认不开放，可能导致连接不成功，如果有这种情况，需要配置一下防火墙。
> 编辑防火墙配置文件 `/etc/firewalld/zones/public.xml`
> 将上面配置文件 `/etc/v2ray/config.json`里的端口号：`19343`按下面的语法添加到文件中。

```
[root@xiashuobadxi ~]# vi /etc/firewalld/zones/public.xml

<?xml version="1.0" encoding="utf-8"?>
<zone>
  <short>Public</short>
  <description>For use in public areas. You do not trust the other computers on networks to not harm your computer. Only selected incoming connections are accepted.</description>
  <service name="dhcpv6-client"/>
  <service name="ssh"/>
  <port protocol="tcp" port="8088"/>
  <port protocol="udp" port="8088"/>
  <port protocol="tcp" port="80"/>
  <port protocol="udp" port="80"/>
  <port protocol="tcp" port="8888"/>
  <port protocol="udp" port="8888"/>
  <port protocol="tcp" port="19343"/>
  <port protocol="udp" port="19343"/>

</zone>
```

# Windows 客户端
> 推荐使用`v2rayN`,对比网上说的`v2rayW`，感觉速度快点不知道是不是我的错觉或者其他原因(●'◡'●)
> - 下载：[GitHub](https://github.com/2dust/v2rayN/releases)
> 
> 下载最新版本3.5就可以了， 如果你用的是旧版本的`v2rayN`,可能还需要下载 [v2ray-windows-64.zip](https://github.com/v2ray/v2ray-core/releases) ，并将`v2ray-windows-64.zip`和`v2rayN.zip`解压到同一文件夹。

# 安卓客户端
> - `birfrostV` 推荐这个，v2rayNG对于很多国内的网址，还是会走代理。
> - `v2rayNG`
> 去应用商店下载就可以了。

# ios客户端
> 可以用 `Shadowrocket`，苹果应用市场应该可以下载。