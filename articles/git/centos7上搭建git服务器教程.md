<div class="blog-article">
    <h1><a href="p.html?p=\git\centos7上搭建git服务器教程" class="title">centos7上搭建git服务器并一键部署nginx教程</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-03-02 22:15</span>
    <span><a href="tags.html?t=git" class="tag">git</a></span>
    </div>
<br/>

>最近换了静态博客，写博客都是在本地操作，然后上传到服务器，所以需要在vps上
搭建一个git服务器，然后每次写完一篇博客，可以一键push到服务器上，并部署。
下面是整个过程的教程。

# 安装git
> 环境：
> - 服务器：centos7
> - 客户端：windows10

## windows安装git
> windows安装就不用说了，直接取官网下载最新版本安装包安装即可，
>[下载地址](https://git-scm.com/download/win)

## centos7 安装
> centos系统可以直接使用`yum install git`命令安装，但是yum源的版本都很旧，
>最新的才到
> 版本1.8。想要下载新版本的git，可以有几个方式：
> - 下载最新版`git`源码，自行编译安装。
> - 通过`IUS`源安装。（不是最新版，但相对较新）

这里我们使用第二种方法安装`git`

centos7运行下面的命令：
```
yum install \
https://repo.ius.io/ius-release-el7.rpm \
https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```

安装好IUS仓库之后，使用`yum repolist`命令，看到`ius/x86_64`说明安装成功。
```
[root@vultr ~]# yum repolist
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * base: repos.lax.layerhost.com
 * epel: d2lzkl7pfhq30w.cloudfront.net
 * extras: mirror.fileplanet.com
 * updates: repos.lax.layerhost.com
源标识                    源名称                                                 状态
!base/7/x86_64            CentOS-7 - Base                                        10,097
!epel/x86_64              Extra Packages for Enterprise Linux 7 - x86_64         13,196
!extras/7/x86_64          CentOS-7 - Extras                                         323
!ius/x86_64               IUS for Enterprise Linux 7 - x86_64                       953
!nginx/x86_64             nginx repo                                                172
!updates/7/x86_64         CentOS-7 - Updates                                      1,478
repolist: 26,219
```

使用命令`yum provides git`可以查看所有软件仓库提供的git软件包的信息。
看到IUS提供了git222软件包（新版本）。
```
[root@vultr ~]# yum provides git
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * base: repos.lax.layerhost.com
 * epel: d2lzkl7pfhq30w.cloudfront.net
 * extras: mirror.fileplanet.com
 * updates: repos.lax.layerhost.com
git-1.8.3.1-20.el7.x86_64 : Fast Version Control System
源    ：base

git-1.8.3.1-21.el7_7.x86_64 : Fast Version Control System
源    ：updates

git216-2.16.6-1.el7.ius.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.16.6-1.el7.ius

git216-2.16.6-2.el7.ius.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.16.6-2.el7.ius

git222-2.22.0-2.el7.ius.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.22.0-2.el7.ius

git222-2.22.1-1.el7.ius.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.22.1-1.el7.ius

git222-2.22.2-1.el7.ius.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.22.2-1.el7.ius

git2u-2.16.5-1.ius.el7.x86_64 : Fast Version Control System
源    ：ius
匹配来源：
提供    ：git = 2.16.5-1.ius.el7

git222-2.22.2-1.el7.ius.x86_64 : Fast Version Control System
源    ：@ius
匹配来源：
提供    ：git = 2.22.2-1.el7.ius
```

然后输入命令`yum install git222`（刚才查到的git新版本包的名称），即可安装。

git安装到这里就结束了

# 服务器端创建 git 用户，用来管理 Git 服务，并为 git 用户设置密码
```
useradd git
passwd git
```

# 服务器端创建 Git 仓库

设置 /home/git/MyBlog.git 为 Git 仓库

然后把 Git 仓库的 owner 修改为 git

```
[root@vultr ~]# cd /home/git
[root@vultr home]# git init --bare myblog.git
初始化空的 Git 版本库于 /home/git/myblog.git/
[root@vultr home]# chown -R git:git myblog.git/
```
# 客户端 clone 远程仓库
> 进入 `Git Bash` 命令行客户端,然后从Centos7 Git 服务器上 clone 项目：

```
git clone git@xsblog.club:/home/git/myblog.git
```

当第一次连接到目标 Git 服务器时会得到一个提示，输入 `yes`

```
The authenticity of host '192.168.20.101 (192.168.20.101)' can't be established.
ECDSA key fingerprint is SHA256:HEaAUZgd3tQkEuwzyVdpGowlI6YKeQDfTBS6vVkY6Zc.
Are you sure you want to continue connecting (yes/no)?
```

输入git设置的密码:

```
Warning: Permanently added '192.168.20.101' (ECDSA) to the list of known hosts.
git@192.168.20.101's password:
```

此时 `C:\Users\用户名\.ssh` 下会多出一个文件 `known_hosts`，
以后在这台电脑上再次连接目标 Git 服务器时不会再提示上面的语句。

# 客户端创建 SSH 公钥和私钥
查看`C:\Users\用户名\.ssh`目录下是否有`id_rsa` 和 `id_rsa.pub`两个文件，如果有，则
直接跳过本步骤，因为这是之前连接github时创建的公钥和私钥，应该可以直接用。没有则继续
下面的步骤：

打开git bash 命令窗口，运行
```
ssh-keygen -t rsa -C "654017381@qq.com"
```
这里邮箱改成自己的邮箱,然后一路回车就行。

此时 `C:\Users\用户名\.ssh` 下会多出两个文件 `id_rsa` 和 `id_rsa.pub`

`id_rsa` 是私钥，`id_rsa.pub` 是公钥

# 服务器端 Git 打开 RSA 认证

进入 `/etc/ssh` 目录，编辑 `sshd_config`，打开以下三个配置的注释：
```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```
保存并重启 sshd 服务：

```shell script
systemctl restart sshd.service
```

由 `AuthorizedKeysFile` 得知公钥的存放路径是 `.ssh/authorized_keys`

实际上是 `$Home/.ssh/authorized_keys`

由于管理 Git 服务的用户是 git，所以实际存放公钥的路径是 `/home/git/.ssh/authorized_keys`

在 `/home/git/` 下创建目录 `.ssh`

```shell script
mkdir .ssh
```

然后把 `.ssh `文件夹的 owner 修改为 git

```shell script
chown -R git:git .ssh
```

# 将客户端公钥导入服务器端 `/home/git/.ssh/authorized_keys` 文件

回到 `Git Bash` 下，导入文件：

```
ssh git@xsblog.club 'cat >> .ssh/authorized_keys' < ~/.ssh/id_rsa.pub
```
这里实际上就是将`id_rsa.pub`中的内容复制到`authorized_keys`中，通过其他方式随意。

回到服务器端，查看 .ssh 下是否存在 authorized_keys 文件：

`重要：`
- `修改 .ssh 目录的权限为 700`
- `修改 .ssh/authorized_keys 文件的权限为 600`

```
chmod 700 /home/git/.ssh
chmod 600 /home/git/.ssh/authorized_keys
```

不出意外的话，客户端与git服务器的ssh连接应该已经成功了。使用`git clone`或者`git push`试一下。

```
git clone git@xsblog.club:/home/git/myblog.git
git push git@xsblog.club:/home/git/myblog.git
```

# 禁止 git 用户 ssh 登录服务器

在服务器端创建的 git 用户不允许 ssh 登录服务器

编辑 `/etc/passwd`

```
vi /etc/passwd
```
找到：
```
git:x:1000:1000::/home/git:/bin/bash
```
改为：
```
git:x:1000:1000::/home/git:/bin/git-shell
```
这里面的数字1000不同机器会有差别，不影响，只改后面的`bash`为`git-shell`就行

此时 git 用户可以正常通过 ssh 使用 git，但无法通过 ssh 登录系统。

# 使用git hook 部署项目
> MyBlog.git是速度比较快的bare仓库，并不是可直接使用的目录，所以需要制作一个
> POST Hooks将这个仓库clone到实际项目发布的目录。

## git hooks
> 这里使用到的`post-recieve`脚本

```shell script
cd /home/git/myblog.git/hooks
touch post-receive
vi post-receive
```
`注意：这里不要为了方便，使用可视化外置编辑器编辑脚本，导致编码有问题，脚本无法运行。
我就踩坑了。`

脚本里写入下面的代码：

```shell script
GIT_REPO=/home/git/myblog.git
PUBLIC_WWW=/usr/share/nginx/html
#clean directory
rm -rf ${PUBLIC_WWW}
git clone $GIT_REPO $PUBLIC_WWW
```
`GIT_REPO`是git仓库的目录，`PUBLIC_WWW`是项目发布的目录，我这里用的是nginx，按
实际填写就好。脚本里每次`clone`的时候需要目录为空，所以每次要执行`rm`删除

## 更改脚本权限和`PUBLIC_WWW`目录权限

```shell script
chmod +x post-receive
chown -R git:git post-receive
chmod 775 -R /usr/share/nginx/html
chown -R git:git /usr/share/nginx/html
```

`所以的权限全部给了，免得到时候脚本因为权限问题无法运行。。。这里我也踩坑了,,ԾㅂԾ,,`

然后应该就大功告成了。当本地博客更新后，直接在本地执行push操作就可以一键上传到vps，
并且自动部署到nginx了。下面来试一下本篇博客的`git push`更新

```
(base) F:\服务器\MyBlog>git add .

(base) F:\服务器\MyBlog>git commit -m '博客更新'
[master cb1212e] '博客更新'
 2 files changed, 138 insertions(+), 19 deletions(-)

(base) F:\服务器\MyBlog>git push git@xsblog.club:/home/git/myblog.git
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 8 threads
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 2.55 KiB | 2.55 MiB/s, done.
Total 7 (delta 5), reused 0 (delta 0)
remote: rm: cannot remove '/usr/share/nginx/html': Permission denied
remote: Cloning into '/usr/share/nginx/html'...
remote: done.
To xsblog.club:/home/git/myblog.git
   e118a4f..cb1212e  master -> master
```
注意到我这里的反馈是先报了个`remote: rm: cannot remove '/usr/share/nginx/html/MyBlog': Permission denied`
但是好像还是执行clone成功了(￣▽￣)。我这里该给的权限都给了，这个提示 依然存在，但是并不影响结果，
也就懒得折腾了。其他如果提示没有权限，脚本运行失败的.给相应权限。










