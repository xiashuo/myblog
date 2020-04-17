<div class="blog-article">
    <h1><a href="p.html?p=黑科技/利用VPS+SoftEther实现校园网免登录上网" class="title">利用VPS+SoftEther实现校园网免登录上网</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2017-09-15 15:17</span>
    <span><a href="tags.html?t=黑科技" class="tag">黑科技</a></span>
    </div>
<br/>

　　学校实验室最近开始限制流量了，每月6G，少的感人。看到网上有破解办法，自己也折腾了一下，成功实现了免费上校园网，去tm的校园网。。。

下面开始教程：

## 前提 ##

　　首先你需要准备VPS一台，国内国外的都行，建议选国外的，弄好后既可以免费上网，还可以翻墙。推荐搬瓦工vps，价格便宜，口碑也不错。一年19.9刀，网上找个优惠码，一个月差不多10块钱的样子。比起一个月50，一个学期200的校园网来说。。。

　　系统的话建议选centos7，因为我用的是centos7搭建的没毛病:relaxed:

## vps上搭建softeher服务端 ##
用工具连上服务器（连接工具xshell，putty等随意）

### 安装依赖包 ###

	　yum update -y
	　yum groupinstall "Development Tools" -y
	　yum install zlib-devel openssl-devel readline-devel ncurses-devel wget tar dnsmasq net-tools iptables-services system-config-firewall-tui vim -y
###  关闭SElinux ###
如果你开启了SElinux，执行下面命令禁用SELinux：

	sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
重启系统，使升级的内核和SELinux生效

	reboot
### 暂时停用防火墙 ###
如果你开启了iptables，执行下面的命令

	　iptables
	　service iptables save
	　service iptables stop
	　chkconfig iptables off


如果使用了firewall防火墙，执行

	　systemctl disable firewalld
	　systemctl stop firewalld

### softeher软件下载安装 ###
有两种方式，可以去[官网](http://www.softether-download.com/cn.aspx?product=softether)上下载linux64位版本的包，然后上传到服务器，或者利用wget命令直接下载（前提是下载地址要对，网上那些教程里的地址都已经失效）。

根据服务器系统和cpu去[官网](http://www.softether-download.com/cn.aspx?product=softether)上选择：

![](assets/images/2017/09/0gj61jpgbeghioee60gg3hbd22.png)

下载
	
	　wget http://www.softether-download.com/files/softether/v4.22-9634-beta-2016.11.27-tree/Linux/SoftEther_VPN_Server/64bit_-_Intel_x64_or_AMD64/softether-vpnserver-v4.22-9634-beta-2016.11.27-linux-x64-64bit.tar.gz
解压

	　tar zxvf softether-vpnserver-v4.22-9634-beta-2016.11.27-linux-x64-64bit.tar.gz
此时会在当前目录解压出一个vpnserver目录，接下来运行安装脚本：

	　cd vpnserver
	　make
接下来按照提示，依次输入3次 “1” 回车即可。如果满足运行条件，会提“The command completed successfully.”；
反之，若不满足条件，则会提示相应的错误（一般是前面提到的依赖的库没有安装完全）。

### 配置SoftEther ###

启动程序

执行以下命令启动Softether VPN Server服务：

	./vpnserver start
运行vpncmd：

	./vpncmd
![](assets/images/2017/09/uijvm95oniic6qj2r6ofbivn06.png)

**选择1，然后后面两次都回车直接跳过**


![](assets/images/2017/09/u7f1a0qm2khhhp83dqtv15h8mg.png)

设置VPN管理员密码：
	
	ServerPasswordSet 	//输入两次密码，一会连接时会用到
到这里，基本上服务端就搭建好了。

## 客户端下载与配置 ##
### softeher软件下载 ###
根据自己的系统去[官网](http://www.softether-download.com/cn.aspx?product=softether)上下载相应的windows版本**服务端**与**客户端**，注意是两个软件哦

### 服务端安装与配置 ###
![](assets/images/2017/09/6f19814cpah0kp64uf740eveah.png)

**默认一直下一步安装就好了，安装好后按照下面的流程配置：**

![](assets/images/2017/09/1f4r4i3dfsho9r23501887vqvg.png)
![](assets/images/2017/09/6ts2ni9cdgih4oc50rt1f1lajj.png)

填好后点确定，然后连接

![](assets/images/2017/09/126i7jbmsoh7vq17kpefc83e0k.jpg)

![](assets/images/2017/09/595e0d8v7oj7ppio38uiro3tcb.png)

![](assets/images/2017/09/4486ergqakg92qp61i2f4ajai6.jpg)

![](assets/images/2017/09/tiskcjmrl6hgdompti0nhnbafl.jpg)

![](assets/images/2017/09/1sm8m2b7o6ia7prl2barbdvj6o.jpg)

![](assets/images/2017/09/2vcljjk2hchlvpqpojlqu53k7v.jpg)

![](assets/images/2017/09/6iu91lnks0hsqrki2csdna5do8.png)

## 客户端安装与配置 ##
![](assets/images/2017/09/pfipn2aj9cgrpp28f8u7tccqef.png)

![](assets/images/2017/09/3eir6elml8jicoh7k543u5npsu.png)

![](assets/images/2017/09/o80ffkdmn6ho9ru0q957fc127d.png)

**好了，所有配置到这里就全部结束了，以后开机就直接打开客户端连接就好了。**

**最后说下，用这个网下载速度什么的还是很给力的，翻墙速度很快，油管什么的1080p毫无压力，国内的网站要响应要慢点，打游戏就不怎么好使了，延迟感人，稳定300以上，而且国服好多登录不了。要想打游戏的话，建议用国内的vps，阿里云，腾讯云，应会好一点吧X﹏X**