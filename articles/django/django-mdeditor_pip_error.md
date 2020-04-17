<div class="blog-article">
<h1><a href="p.html?p=\django\django-mdeditor_pip_error" class="title">pip安装django-mdeditor包的时候报'gbk'编码错误的解决办法</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-24 07:42</span>
<span><a href="tags.html?t=django" class="tag">django</a></span>
</div>
<br/>

# 错误代码

> 今天用pip安装`django-mdeditor`包的时候报错，详细错误代码如下：
```
ERROR: Command errored out with exit status 1:
     command: 'D:\programing\anaconda3-python3.6_based\envs\django-blog\python.exe' -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\Administrator\\AppData\\Local\\Temp\\pip-install-x231a7kc\\django-mdeditor\\setup.py'"'"'; __file__='"'"'C:\\Users\\Administrator\\AppData\\Local\\Temp\\pip-install-x231a7kc\\django-mdeditor\\setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\Administrator\AppData\Local\Temp\pip-install-x231a7kc\django-mdeditor\pip-egg-info'
         cwd: C:\Users\Administrator\AppData\Local\Temp\pip-install-x231a7kc\django-mdeditor\
    Complete output (5 lines):
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "C:\Users\Administrator\AppData\Local\Temp\pip-install-x231a7kc\django-mdeditor\setup.py", line 5, in <module>
        long_description = readme.read()
    UnicodeDecodeError: 'gbk' codec can't decode byte 0xad in position 167: illegal multibyte sequence
    ----------------------------------------
ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
```
# 解决办法

找到错误代码行：`long_description = readme.read()`，`UnicodeDecodeError: 'gbk' codec can't decode byte 0xad in position 167: illegal multibyte sequence`

原因是编码问题，默认是`'gbk'`编码，所以需要改为`'utf-8'`编码。

下载要安装的这个包`django-mdeditor-0.1.17.tar.gz`，解压，打开`setup.py`文件，找到报错的那行代码，修改为如下：

```
with open(os.path.join(os.path.dirname(__file__), 'README.md'),encoding='UTF-8') as readme:
    long_description = readme.read()
```
修改完后保存，重新编译打包：

```
#命令行进入该目录，输入下面的命令
python setup.py dist
```
这将创建一个名为 `dist` 的目录并重新打包为 `django-mdeditor-0.1.17.tar.gz`。

然后使用`pip`安装这个本地包就可以成功安装了。

```
#进入到包所在目录，输入下面的命令
pip install django-mdeditor-0.1.17.tar.gz
```

