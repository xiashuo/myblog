<div class="blog-article">
    <h1><a href="p.html?p=\python\Windows上利用nuitka打包pytorch程序为exe文件" class="title">Windows上利用nuitka打包pytorch程序为exe文件</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-11-16 15:21</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div><br/>
## 1. 安装 C 编译器

- 下载并安装 `mingw64`，[下载地址](https://sourceforge.net/projects/mingw-w64/files/mingw-w64/)

  ![](images/mingw64下载版本选择.png)

  根据机器架构选择最新相对应版本，64位系统这里推荐选择免安装版`x86_64-win32-sjlj`版，直接解压就能用。这里有[版本区别详解](https://www.pcyo.cn/linux/20181212/216.html)供参考

- 将下载的压缩包中的 `mingw64` 文件夹解压到目录：`C:\\MinGW64`下。(这里解压到别的地方也可以，只要加入到系统环境变量就行，官方推荐是c盘)

- 将 文件路径 `C:\\MinGW64\\mingw64\\bin` 加入到系统环境变量

- 使用命令验证是否配置成功：`gcc --version`

## 2. 安装python环境

- 这里需要配置纯净的`python`环境，千万不要使用`anaconda`虚拟环境，因为在虚拟环境下打包的`exe`貌似只能进入虚拟环境下才能运行，这就会导致在其他机器上无法运行。
- 我这里用的 `python3.6` 版本，其他版本没测试
-  `torch`的版本我这里做了很多测试，低于1.6的版本的`torch`必须配合低版本`numpy`，例如`numpy1.6`。大于等于1.6版本的`torch`，我这里用默认的`numpy1.19`版本也能运行成功。
- 海域项目中用到的其他第三方包版本好像没有严格要求，`cv2`，`tqdm`，`torchsummary` 都没有出现报错的情况

## 3. 安装nuitka

- 使用pip命令安装：`pip install nuitka`
- 使用命令验证：`nuitka --version`

## 4. 打包

> 打包这块踩了不少坑，官方文档里对各个打包命令参数只有简单的介绍，没有详细的例子，只能一个个摸索，最后勉强打包成功吧。

- **基本参数**

  > 打包命令形如：`nuitka  [options]  xxx.py`

  - `--mingw64`

    实际上 `--mingw64`与`--msvc=MSVC`是一对孪生参数，这两个参数二选一，用于指定编译器，如果当前环境既安装了mingw64，又安装了msvc，可以使用该参数选择兼容性最好的编译器,建议使用mingw64。如果不存在上面两种编译器都存在的情况，就不需要显式设置这个参数，默认会调用系统中能用的编译器。

  -  `-o FILENAME`

    指定生成的可执行文件的文件名，但是生成pyd的时候无法使用，也就是在使用`--module`的时候无法为pyd文件指定一个其他的文件名。
    
  - `--output-dir=DIRECTORY`

    指定打包好的文件存放的目录，默认为当前目录。
    
  - `--remove-output`

    使用nuitka进行打包的过程中，会生成一个用于build的中间临时目录，若可以使用该参数，命令完成后会自动删除build目录
    
  - `--show-progress` 和 `--show-scons`

    用来显示详细打包过程。这部分还有几个类似的参数如下：
    
  ```shell
    --show-scons        Operate Scons in non-quiet mode, showing the executed
    commands. Defaults to off.
    --show-progress     Provide progress information and statistics. Defaults
    to off.
    --show-memory       Provide memory information and statistics. Defaults to
    off.
    --show-modules      Provide a final summary on included modules. Defaults
    to off.
    --verbose           Output details of actions taken, esp. in
    optimizations. Can become a lot. Defaults to off.
    ```
    
    

  

- **打包模块与follow import**

  `follow import`这部分命令参数是导入包或者模块的，这部分参数一共有五个：

  ```shell
   --follow-stdlib, --recurse-stdlib
       Also descend into imported modules from standard
       library. This will increase the compilation time by a
       lot. Defaults to off.
   --nofollow-imports, --recurse-none
       When --recurse-none is used, do not descend into any
       imported modules at all, overrides all other recursion
       options. Defaults to off.
   --follow-imports, --recurse-all
       When --recurse-all is used, attempt to descend into
       all imported modules. Defaults to off.
   --follow-import-to=MODULE/PACKAGE, --recurse-to=MODULE/PACKAGE
       Recurse to that module, or if a package, to the whole
       package. Can be given multiple times. Default empty.
   --nofollow-import-to=MODULE/PACKAGE, --recurse-not-to=MODULE/PACKAGE
       Do not recurse to that module name, or if a package
       name, to the whole package in any case, overrides all
       other options. Can be given multiple times. Default
       empty.
  
  ```

  这一部分参数可以说是nuitka的核心。nuitka能够根据py文件中的import语句找到所有引用的库，然后将这些库文件打包进二进制文件中。
  
  
  
  

