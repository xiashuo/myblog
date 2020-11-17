<div class="blog-article">
    <h1><a href="p.html?p=\python\Windows上利用nuitka打包pytorch程序为exe文件" class="title">Windows上利用nuitka打包pytorch程序为exe文件</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-11-16 15:21</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div><br/>


## 1. 安装 C 编译器

- 下载并安装 `mingw64`，[下载地址](https://sourceforge.net/projects/mingw-w64/files/mingw-w64/)

  ![](assets/images/2020/11/mingw64下载版本选择.png)

  根据机器架构选择最新相对应版本，64位系统这里推荐选择免安装版`x86_64-win32-sjlj`版，直接解压就能用。这里有[版本区别详解](https://www.pcyo.cn/linux/20181212/216.html)供参考

- 将下载的压缩包中的 `mingw64` 文件夹解压到目录：`C:\\MinGW64`下。(这里解压到别的地方也可以，只要加入到系统环境变量就行，官方推荐是c盘)

- 将 文件路径 `C:\\MinGW64\\mingw64\\bin` 加入到系统环境变量

- 使用命令验证是否配置成功：`gcc --version`

## 2. 安装python环境

- 这里需要配置纯净的`python`环境，千万不要使用`anaconda`虚拟环境，因为在虚拟环境下打包的`exe`貌似只能进入虚拟环境下才能运行，这就会导致在其他机器上无法运行。
- 我这里用的 `python3.6` 版本，其他版本没测试
- `torch`的版本我这里做了很多测试，低于1.6的版本的`torch`必须配合低版本`numpy`，例如`numpy1.6`。大于等于1.6版本的`torch`，我这里用默认的`numpy1.19`版本也能运行成功。
- 海域项目中用到的其他第三方包版本好像没有严格要求，`cv2`，`tqdm`，`torchsummary` 都没有出现报错的情况

## 3. 安装nuitka

- 使用pip命令安装：`pip install nuitka`
- 使用命令验证：`nuitka --version`

## 4. 打包命令介绍

> 打包这块踩了不少坑，官方文档里对各个打包命令参数只有简单的介绍，没有详细的例子，只能一个个摸索，最后勉强打包成功吧。

- 先附上nuitka[官方文档](http://www.nuitka.net/doc/user-manual.html)

- **基本参数**

  > 打包命令形如：`nuitka  [options]  xxx.py`

  - `--mingw64`

    实际上 `--mingw64`与`--msvc=MSVC`是一对孪生参数，这两个参数二选一，用于指定编译器，如果当前环境既安装了mingw64，又安装了msvc，可以使用该参数选择兼容性最好的编译器,建议使用mingw64。如果不存在上面两种编译器都存在的情况，就不需要显式设置这个参数，默认会调用系统中能用的编译器。

  - `-o FILENAME`

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

  - `--standalone`

    默认包含参数`--follow-imports`，即会尝试对所有的引用到的库都进行打包，将这些库中的py或者pyc打包进exe，然后再将所依赖的二进制文件（dll或者pyd）拷贝到exe所在文件夹。只要命令能够执行完成不出错，生成的exe就可以完全脱离python环境独立运行。

    - **depends.exe**

      在第一次使用`--standalone`时，会提示安装 **[Dependency Walker](http://www.dependencywalker.com/)**，nuitka需要使用这个工具来解析所有的依赖，从而决定拷贝哪些文件(dll,pyd)到exe目录。命令进行的过程中会自动检测该工具是否存在，没有的话会自动提示进行下载，网络没问题的时候直接回车或者输入yes就行了。

  

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

  - `--follow-imports, --recurse-all`

    这个是打包整个工程，会将程序中依赖的所有的模块/包（包括第三方库）进行打包编译。

    **如果项目中只是用了自定义的一些模块，用这个参数打包运行应该没什么问题，但是如果有第三方库，比如torch，numpy之类的，虽然能打包成功，但是无法运行。**

    ps：这里我就踩坑了，因为看官方文档是有对pytorch和numpy这两个库的支持的，所以我就一直尝试对这两个库也进行打包，但是最终没能将程序运行成功,,ԾㅂԾ,,

  - `--nofollow-imports, --recurse-none`

    不会打包除主程序外其他任何模块和包。

    nuitka打包相对来说是比较耗费时间的，特别是针对像pytorch这种比较大的库，可以暂时不对这些库进行打包（--nofollow-imports），而是将这些库手动拷贝到搜索路径中，比如exe同级目录。只要能够找到这些库，程序就能正常运行。

  - `--follow-stdlib, --recurse-stdlib`

    只选择标准库。

  - `--follow-import-to=MODULE/PACKAGE, --recurse-to=MODULE/PACKAGE`

    只选择指定的模块/包。

    这里参数官方的解释是：`Recurse to that module, or if a package, to the whole package. Can be given multiple times. Default empty.`

    这里我在原项目结构上尝试该参数去导入各个自定义的包和模块，但是打包后会发现包下面的模块还是会提示没导入。最后只好选择删除所有自定义包，将所有模块放到同级目录下并重组，才打包运行通过。

  - `--nofollow-import-to=MODULE/PACKAGE, --recurse-not-to=MODULE/PACKAGE`

    不选择指定模块/包，这个选项会覆盖其他递归选项，也就是说最后用。

  如果某些库没有被打包进exe，程序仍会试图通过`python3x.dll`去搜索路径中查找这些库，然后进行调用，调用方式跟py文件一模一样。

  

- **关于python3x.dll**

  > python3x.dll是与版本相对应的，如果是python3.6.5，那么就是python36.dll。实际上，这个文件和python安装目录下面的python3x.dll是同一个文件（的拷贝）。python3x.dll相当于一个运行时（runtime），类似于javac，或者微软的framwork，python代码通过nuitka生成了二进制代码（exe或者pyd），但仍然通过python3x.dll保留了python的特性，比如调用一个python模块

- **参数plugin control**

  这部分参数用于设置对某些第三方库或者python功能进行支持，在使用`--standalone`时才会用到。可以使用 `nuitka --plugin-list`查看可用的插件

  ```shell
  C:\Users\Administrator\Desktop\haiyu>nuitka  --plugin-list
                   The following plugins are available in Nuitka
  --------------------------------------------------------------------------------
   data-files
   dill-compat
   enum-compat
   eventlet          Required by the eventlet package
   gevent            Required by the gevent package
   implicit-imports
   multiprocessing   Required by Python's multiprocessing module
   numpy             Required for numpy, scipy, pandas, matplotlib, etc.
   pbr-compat
   pmw-freezer       Required by the Pmw package
   pylint-warnings   Support PyLint / PyDev linting source markers
   qt-plugins        Required by the PyQt and PySide packages
   tensorflow        Required by the tensorflow package
   tk-inter          Required by Python's Tk modules
   torch             Required by the torch / torchvision packages
  ```

  如果程序中使用了torch或者numpy等，那么

  ```shell
  --plugin-enable=torch --plugin-enable=numpy
  ```

  **但是，这里实际测试中，即使使用了这个参数，对torch以及numpy的打包也并没有成功,,ԾㅂԾ,,**

- **include部分有四个具体的参数**

  - `--include-package=PACKAGE`

    指定一个package

  - `--include-module=MODULE`

    指定一个module

  - `--include-plugin-directory=MODULE/PACKAGE`

    指定一个目录，里面包含的所有包/模块都会被打包（覆盖其他递归选项）

  - `--include-plugin-files=PATTERN`

    与pattern匹配的所有文件都会被打包（覆盖其他递归选项）

还有一些参数暂时没有涉及到，详情可以参考[官方文档](http://www.nuitka.net/doc/user-manual.html)

## 5. 项目打包

我的项目目录结构为：

```shell
haiyu:.
    BaseSet.py
    eval.py
    parsers.py
    ppm.py
    pp_unet.py
    trainer.py
    unet.py
```

所有模块都放在了项目同级目录下，然后使用下面的打包命令进行打包：

```shell
nuitka --standalone --mingw64 --nofollow-imports --follow-import-to=unet,BaseSet,parsers,pp_unet,ppm --show-progress --show-scons --output-dir=output
```

命令解释：

1. `--standalone`：打包后的exe以及所有依赖文件放到一个dist文件夹中
2. `--mingw64`：指定c编译器
3. 使用`--nofollow-imports`指定不全选打包。
4. 使用 `-follow-import-to`将这里的自定义模块unet,BaseSet,parsers,pp_unet,ppm进行指定打包。

打包完成之后，运行dist文件夹下的exe文件依然会报错，因为这里并没有选择导入整个项目中所有依赖的包和模块，只选择了自定义的几个模块。

为什么这么做，前面参数介绍里也说了，因为nuitka对第三方库如torch，numpy等并没有支持那么好，打包后会报错。所以这里先只打包自定义模块，再根据运行时的报的第三方包未导入的错误信息，进行手动导入。提示缺什么包，就从python环境下的 `\Lib\site-packages`中将相应的包复制到exe的同级目录中。

这里在所有需要的包都导入成功后，运行时依然报了如下错误：

```python
Traceback (most recent call last):
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\trainer.py", line 46, in <module>
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\trainer.py", line 41, in main
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\unet.py", line 104, in train_unet
  File "C:\Users\Administrator\Desktop\haiyu\output\trainer.dist\torch\utils\data\dataloader.py", line 291, in __iter__
    return _MultiProcessingDataLoaderIter(self)
  File "C:\Users\Administrator\Desktop\haiyu\output\trainer.dist\torch\utils\data\dataloader.py", line 737, in __init__
    w.start()
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\multiprocessing\process.py", line 105, in start
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\multiprocessing\context.py", line 223, in _Popen
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\multiprocessing\context.py", line 322, in _Popen
  File "C:\Users\ADMINI~1\Desktop\haiyu\output\TRAINE~1.DIS\multiprocessing\popen_spawn_win32.py", line 48, in __init__
FileNotFoundError: [WinError 2] 系统找不到指定的文件。
```

网上查到是多进程的问题，代码中DataLoader加载数据是用了多进程，`num_workers=2`

```python
val_loader = DataLoader(val, batch_size=cfgs.batch_size, shuffle=False, num_workers=2, pin_memory=True,
                            drop_last=True)
```

这个问题暂时没能解决，只好去掉`num_workers=2`这项，再重新打包，运行就没问题了。实际测试中，去掉这项后，对数据加载的速度影响不大，依然大概是10张图 / 秒的速度。exe运行截图如下：

![](assets/images/2020/11/nuitka打包成功截图.png)

整个项目的打包流程大概就是这样，当然这只是对简单项目结构下的脚本进行了打包尝试。在对更大的复杂项目结构的打包还需要进一步研究和尝试。