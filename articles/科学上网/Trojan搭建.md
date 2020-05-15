<div class="blog-article">
<h1><a href="p.html?p=\科学上网\Trojan搭建" class="title">最新翻墙方法Trojan，vps一键搭建教程及客户端配置</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-24 09:42</span>
<span><a href="tags.html?t=科学上网" class="tag">科学上网</a></span>
</div>
<br/>


# 前言
>之前SSR频繁被封vps，且翻墙速度不理想，故而放弃了SSR转战V2ray，结果没用多久vps又被封了。据说Trojan比较稳定，被封的概率很小，
>因为`Trojan模仿了互联网上最常见的 HTTPS 协议，以诱骗子gfw封锁认为它就是 HTTPS，从而不被识别。trojan 处理来自外界的 HTTPS 请求，
>如果是合法的，那么为该请求提供服务，否则将该流量转交给 web 服务器 Nginx，由 Nginx 为其提供服务。基于这个工作过程可以知道，
>Taojan 的一切表现均与 Nginx 一致，不会引入额外特征，从而达到无法识别的效果`。

# 脚本准备及功能
> - 系统支持 centos7 /debian9 /ubuntu16
> - 域名解析到 VPS 并生效。
> - 脚本自动续签 SSL 证书
> - 自动配置伪装网站，位于 `/usr/share/nginx/html/` 目录下，可自行替换其中内容

# 一键脚本代码
> 这里用的是波仔大神的一键Trojan脚本，该脚本合成了 4 IN 1 的一个 BBRPLUS 加速脚本，非常牛逼。

`安装前必须先将域名解析到vps并生效`

安装好 curl，若是有此环境，请跳过

```
apt-get update -y && apt-get install curl -y    ##Ubuntu/Debian 系统安装 Curl 方法
yum update -y && yum install curl -y            ##Centos 系统安装 Curl 方法
```

有些 VPS 需要安装` XZ `压缩工具

```
apt-get install xz-utils   #Debian/Ubuntu 安装 XZ 压缩工具命令
yum install xz    #CentOS 安装 XZ 压缩工具
```
Trojan 一键脚本代码：
```
bash <(curl -s -L https://github.com/V2RaySSR/Trojan/raw/master/Trojan.sh)
```
安装好后服务端配置文件：`/usr/src/trojan/server.conf`

默认已加入开机自启动

`启动/重启/停止命令：systemctl start/restart/stop trojan`

# 客户端配置
## windows
安装完成后，会展示一条下载地址，复制地址，并下载下来即可。

Trojan Windows 客户端：[下载地址](https://github.com/trojan-gfw/trojan/releases)

客户端文件解压后，配置文件为 `config.json`，从vps上下载下来的默认是一键配置好了的，不用修改配置文件，直接运行 `trojan.exe`。配置文件内容如下：
```
{
    "run_type": "client",
    "local_addr": "127.0.0.1",
    "local_port": xxx,
    "remote_addr": "xxx.xxx",
    "remote_port": 443,
    "password": [
        "xxx"
    ],
    "log_level": 1,
    "ssl": {
        "verify": true,
        "verify_hostname": true,
        "cert": "fullchain.cer",
        "cipher_tls13":"TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384",
"sni": "",
        "alpn": [
            "h2",
            "http/1.1"
        ],
        "reuse_session": true,
        "session_ticket": false,
        "curves": ""
    },
    "tcp": {
        "no_delay": true,
        "keep_alive": true,
        "fast_open": false,
        "fast_open_qlen": 20
    }
}
```

需要修改的部分只有`xxx`，`local_port` 默认`1080`，`remote_addr` 填写自己的`域名`，`password` 按服务端配置文件里的填写，其他默认。

注意：
1. 如果运行`trojan.exe`失败，先安装`vc`运行环境，文件夹自带就有下载，安装 `VC_redist.x64.exe` 即可。
2. 如果运行时，黑窗口一闪就关闭了，说明配置文件有问题，需要修改。我就在这里卡了好久，以为客户端有什么问题，最后找到原因：因为`1080端口被占用`了，因为之前的代理软件V2ray或SSR可能占用了1080，修改为其他即可。

trojan运行后，可以配合浏览器插件使用，也可以使用`V2rayN`，推荐使用这个，因为之前V2ray就是使用这个软件，这里选择`socks`代理。只需要填一下本地地址 `127.0.0.1` 和本地代理端口：`xxx ` （与配置文件一致）

[V2rayN下载地址](https://github.com/2dust/v2rayN/releases)   下载最新版本即可

## 安卓
安卓手机使用点火器（`Igniter`）：[下载地址](https://github.com/trojan-gfw/igniter/releases)

配置的话也简单，就填`域名地址`，`端口443`和`密码`这3个就可以了。
## 苹果
垃圾苹果，不用，不想写。。。







