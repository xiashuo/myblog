<div class="blog-article">
    <h1><a href="p.html?p=\Linux\UOS系统(arm64)下从源码编译安装qt5.15.2" class="title">UOS系统(arm64)下从源码编译安装qt5.15.2</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2021-08-02 17:56</span>
    <span><a href="tags.html?t=Linux" class="tag">Linux</a></span>
    </div><br/>

## 环境

- 系统：UOS20
- 内核版本：4.19.0-arm64-desktop
- 处理器：飞腾FT-2000/4x4

## Qt源码下载

> 由于Qt官方提供的安装包都是x86架构下的，不能直接在arm架构下安装，在arm64，UOS系统下，通过apt能找到qt包，但是版本较旧，最新只到5.11版本。这里是通过下载Qt源码进行编译安装。

### 下载

qt源码下载地址：[https://download.qt.io/archive/qt/5.15/5.15.2/single/](https://download.qt.io/archive/qt/5.15/5.15.2/single/)

![](assets/images/2021/08/qt源码下载.png)

**注意：一定要下载 `.tar.xz`格式的源码包，`zip`格式的应该是在windows上使用的，编译时会报错。**

网页右键复制源码包链接地址，地址为：[https://download.qt.io/archive/qt/5.15/5.15.2/single/qt-everywhere-src-5.15.2.tar.xz](https://download.qt.io/archive/qt/5.15/5.15.2/single/qt-everywhere-src-5.15.2.tar.xz)

然后在终端进入要存放源码包的目录，下载：

```shell
wget https://download.qt.io/archive/qt/5.15/5.15.2/single/qt-everywhere-src-5.15.2.tar.xz
```

### 解压

```shell
tar -xvf qt-everywhere-src-5.15.2.tar.xz
```

## 编译安装

### 检查编译器

在编译前，先检查一下本机是否有安装编译工具，这里用的编译工具是aarch64-linux-gnu-g++ ，在终端输入`aarch64-linux-gnu-` 然后按两次tab键 会看到下面列表，说明本机已经安装过了

![](assets/images/2021/08/检查编译器.png)

如果没有安装的话，可以通过apt命令安装，先输入下面的命令查找：

```shell
apt search aarch64-linux-gnu
```

![](assets/images/2021/08/安装aarch64-linux-gnu.png)

然后通过apt直接安装 **binutils-aarch64-linux-gnu**

```shell
sudo apt install binutils-aarch64-linux-gnu
```

### 创建配置脚本

解压后，进入到源码目录，新建一个脚本文件并编辑：`vi autoConfigure.sh`

```shell
#!/bin/sh
./configure /
-prefix /usr/bin/qt5.15.2_ARM /
-confirm-license /
-opensource /
-release /
-make libs /
-xplatform linux-aarch64-gnu-g++ /
-pch /
-qt-libjpeg /
-qt-libpng /
-qt-zlib /
-opengl /
-bundled-xcb-xinput /

```

- `prefix /usr/bin/qt5.15.2_ARM` 是配置编译完成后安装的地址，可自行设置
- `-xplatform linux-aarch64-gnu-g++` 是设置交叉编译器

其他配置参数的详细说明可以[参考这里](https://www.cnblogs.com/liushui-sky/p/9121907.html)

- `-bundled-xcb-xinput`：这个配置参数比较关键，也是遇到的一个坑。xcb是很重要的一个东西，没有这个的话，基于qt的界面程序运行会报错：**qt.qpa.plugin: Could not find the Qt platform plugin “xcb” in ""**

**注意：网上的教程里，关于`xcb`这项参数用的都是`-xcb`或者`-qt-xcb`，但是qt版本从5.15开始，这个参数已经换了写法：`-bundled-xcb-xinput`，在这里有[修改说明](https://codereview.qt-project.org/c/qt/qtdoc/+/300877/3/doc/src/platforms/linux.qdoc#b132)**

![](assets/images/2021/08/xcb参数配置说明.png)

### 开始编译

```shell
chmod 777 autoConfigure.sh # 赋可执行权限
sudo ./autoConfigure.sh  # 运行脚本
sudo make -j4 # 开始编译
```

编译过程有点久，等待编译完成不报错就ok了

运行**autoConfigure.sh**脚本的时候如果**xcb**报错：`[qt5-base] build failure: Feature 'xcb' was enabled, but the pre-condition 'features.thread && libs.xcb && tests.xcb_syslibs && features.xkbcommon-x11' failed.`

则需要安装**xcb**相关包，具体只需要安装下面的哪几个，没有验证，不确定，直接全部安装一遍就好（有一些系统已经自动安装过）。

```shell
libx11-dev
libx11-xcb-dev
libxext-dev
libxfixes-dev
libxi-dev
libxrender-dev
libxcb1-dev
libxcb-glx0-dev
libxcb-keysyms1-dev
libxcb-image0-dev
libxcb-shm0-dev
libxcb-icccm4-dev
libxcb-sync-dev
libxcb-xfixes0-dev
libxcb-shape0-dev
libxcb-randr0-dev
libxcb-render-util0-dev
libxcb-xinerama0-dev (should be libxcb-xinerama0-dev on ubuntu 18.04)
libxkbcommon-dev
libxkbcommon-x11-dev
```

**注意：**

- `libxcb-xinerama0-dev`：在UOS和ubuntu上包名都是这个，在其他系统上，可能包名里没有`0`，即 `libxcb-xinerama-dev`
- `libxcb-sync-dev`：在UOS和Ubuntu上是这个，在其他系统上，可能包名是：`libxcb-sync0-dev`

### 安装

```shell
sudo make install
```

安装完成后，安装目录为之前编译配置设置的：`/usr/bin/qt5.15.2_ARM`

### 添加环境变量

```shell
vi ~/.profile
```

在最后面添加：

```shell
export PATH=/usr/bin/qt5.15.2_ARM/bin:$PATH
```

更新

```shell
source ~/.profile
```

验证

```shell
qmake -v
```

能输出版本信息则成功

```shell
QMake version 3.1
Using Qt version 5.15.2 in /usr/bin/qt5.15.2_ARM/lib
```

到这里，Qt5.15.2从源码编译安装就结束了。