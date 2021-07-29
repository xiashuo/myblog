<div class="blog-article">
    <h1><a href="p.html?p=\python\使用pyinstaller打包多文件和目录的python项目" class="title">使用pyinstaller打包多文件和目录的python项目</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2021-07-29 14:46</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div><br/>

> 不管是`nuitka`还是`pyinstaller`打包python项目时都存在大量的坑，这里记录下打包的过程。本文的例子的环境为python3.8，pyinstaller4.3，windows10。

## pyinstaller的安装与使用

### 1. 通过pip安装

```shell
pip install pyinstaller
```

### 2. 基本使用方法

Pyinstaller可以通过简单的命令进行python代码的打包工作，其基本的命令为：

```shell
pyinstaller -option xxx.py
```

options的详情可参考[官方文档](https://pyinstaller.readthedocs.io/en/stable/usage.html)，这边只介绍用到的option：

- -D：生成一个文件目录包含可执行文件和相关动态链接库和资源文件等
- -F：仅生成一个可执行文件

对于打包结果较大的项目，选用`-d`生成目录相比单可执行文件的打包方式，执行速度更快，但包含更加多的文件。本文的例子选中-d方式打包。

## 打包python项目

> 以一个多文件和目录的Python项目为例，项目文件包含：1.Python源代码文件；2.图标资源文件；3.其它资源文件

### 1. 项目结构

![](assets/images/2021/07/项目结构.png)

以图中项目为例，Python源代码文件在多个目录下：项目根目录，train_qt/，train_qt/dataset/，train_qt/loss/，train_qt/metrics，train_qt/model；图标资源文件在icon/和pic/目录下；pyside2界面ui文件在main_windows/和sub_windows/目录下，模型训练的yaml配置文件在train_qt/yamls/目录下。其中KQRS-AI.py为程序运行入口文件。

### 2. spec文件生成

为了进行自定义配置的打包，首先需要编写打包的配置文件.spec文件。当使用pyinstaller -d xxx.py时候会生成默认的xxx.spec文件进行默认的打包配置。通过配置spec脚本，并执行pyinstaller -d xxx.spec完成自定义的打包。

通过生成spec文件的命令，针对代码的主程序文件生成打包对应的spec文件

```shell
pyi-makespec -w KQRS-AI.py
```

打开生成的spec文件，修改其默认脚本，完成自定义打包需要的配置。spec文件是一个python脚本，其默认的结构如下例所示:

```python
# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['KQRS-AI.py'],
             pathex=['E:\\workspace\\KQRS-AI'],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='KQRS-AI',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=False )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='KQRS-AI')
```

spec文件中主要包含4个class：

- Analysis：Analysis以py文件为输入，它会分析py文件的依赖模块，并生成相应的信息
- PYZ：PYZ是一个.pyz的压缩包，包含程序运行需要的所有依赖
- EXE：EXE根据上面两项作为参数进行打包操作
- COLLECT：COLLECT生成其他部分的输出文件夹，COLLECT也可以没有　

### 3. spec文件配置

首先给出举例python项目的spec文件配置

```python
# -*- mode: python ; coding: utf-8 -*-
import sys
import os.path as osp
sys.setrecursionlimit(5000)

block_cipher = None


SETUP_DIR = 'E:/workspace/KQRS-AI/'


a = Analysis(['KQRS-AI.py',
            'childwindows.py',
            'color_list.py',
            'detection.py',
            'detection_gray.py',
            'train_qt/train.py',
            'train_qt/dataset/__init__.py',
            'train_qt/dataset/base_dataset.py',
            'train_qt/dataset/sandiao_jz_dataset.py',
            'train_qt/dataset/sandiao_multi_dataset.py',
            'train_qt/loss/__init__.py',
            'train_qt/loss/cross_entropy_loss.py',
            'train_qt/loss/dice_bce_loss.py',
            'train_qt/metrics/__init__.py',
            'train_qt/metrics/segmentation_metrics.py',
            'train_qt/model/__init__.py',
            'train_qt/model/base_module.py',
            'train_qt/model/deeplabv3.py',
            'train_qt/model/dinknet.py',
            'train_qt/model/resnet.py',
            'train_qt/model/unet.py'
            ],
             pathex=['E:\\workspace\\KQRS-AI'],
             binaries=[],
             datas=[(SETUP_DIR + 'icon','icon'),(SETUP_DIR + 'pic','pic'),(SETUP_DIR + 'main_windows','main_windows'),
             (SETUP_DIR + 'sub_windows','sub_windows'),(SETUP_DIR + 'model','model'),(SETUP_DIR + 'train_qt/yamls','yamls')],
             hiddenimports=['PySide2.QtXml'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='KQRS-AI',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='KQRS-AI')

```

- py文件打包配置

  针对多目录多文件的python项目，打包时候需要将所有相关的py文件输入到Analysis类里。Analysis类中的pathex定义了打包的主目录，对于在此目录下的py文件可以直接写相对路径。如上的spec脚本，将所有项目中的py文件路径以列表形式写入Analysis。

- 资源文件打包配置

  资源文件包括打包的python项目使用的相关文件，如图标文件，ui文件，配置文件等。对于此类资源文件的打包需要设置Analysis的datas，如例子所示datas接收元组：`datas=[(SETUP_DIR + 'icon','icon'),(SETUP_DIR + 'pic','pic'),(SETUP_DIR + 'main_windows','main_windows'), (SETUP_DIR + 'sub_windows','sub_windows'),(SETUP_DIR + 'model','model'),(SETUP_DIR + 'train_qt/yamls','yamls')]`。元组的组成为(原项目中资源文件路径，打包后路径)，例子中的`(SETUP_DIR + 'icon','icon')`表示从`E:/workspace/KQRS-AI/icon`下的图标文件打包后放入打包结果路径下的`icon`目录。

- Hidden import配置

  pyinstaller在进行打包时，会解析打包的python文件，自动寻找py源文件的依赖模块。但是pyinstaller解析模块时可能会遗漏某些模块（not visible to the analysis phase），造成打包后执行程序时出现类似No Module named xxx。这时我们就需要在Analysis下hiddenimports中加入遗漏的模块，如例子中所示，`hiddenimports=['PySide2.QtXml']`。

  **这里就是一个大坑，之前用nuitka打包时也是因为pyside2这个包有问题，估计也是这个原因，项目中使用到了pyside2，必须要隐式导入`PySide2.QtXml`这个。**

- exe参数设置

  默认`console=False`，表示不显示黑窗口，因为需要用到黑窗口，所以这里改成True

- 递归深度设置

  在打包导入某些模块时，常会出现"RecursionError: maximum recursion depth exceeded"的错误，这可能是打包时出现了大量的递归超出了python预设的递归深度。因此需要在spec文件上添加递归深度的设置，设置一个足够大的值来保证打包的进行，即

  ```python
  import sys
  sys.setrecursionlimit(5000)
  ```

### 4. 使用spec执行打包命令

```
pyinstaller -D xxx.spec
```

打包生成两个文件目录build和dist，build为临时文件目录完成打包后可以删除；dist中存放打包的结果，可执行文件和其它程序运行的关联文件都在这个目录下。

### 5. 打包运行成功

![](assets/images/2021/07打包成功.png)

