<div class="blog-article">
<h1><a href="p.html?p=\python\pycham最新激活方法" class="title">pycham最新激活方法</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-06 08:51</span>
<span><a href="tags.html?t=python" class="tag">python</a></span>
</div>
<br/>

# pycham最新激活方法
> pycham2019.3.2亲测有效，理论上以前的版本都支持
## 使用方法

1. 先下载压缩包解压后得到jetbrains-agent.jar，把它放到你认为合适的⽂件夹内。
**如果你是⽆外⽹环境，将jetbrains-agent.jar更名为jetbrains-agent-offline.jar**
百度网盘下载：[https://pan.baidu.com/s/1eNE_DLvsff4Ao0npIZCCQQ](https://pan.baidu.com/s/1eNE_DLvsff4Ao0npIZCCQQ) 密码：9ttb

2. 启动pycham，如果上来就需要注册，选择：试⽤（Evaluate for free）进⼊pycham。

3. 点击 Configure 或 Help -> Edit Custom VM Options ...
如果提示是否要创建⽂件，请点 Yes 。

4. 在打开的vmoptions编辑窗⼝末⾏添
加： -javaagent:/absolute/path/to/jetbrains-agent.jar
⼀定要⾃⼰确认好路径(**不要使⽤中⽂路径**)，填错会导致IDE打不开！！！最好使⽤绝对路径。
⼀个vmoptions内只能有⼀个 -javaagent 参数。

![enter image description here](assets/images/2020/02/pm9je1trfagfuou4pj1eprie1m.png)

5. 重启pycham

6. 点击IDE菜单 Help -> Register... 或 Configure -> Manage License...
⽀持两种注册⽅式：**License server** 和 **Activation code**:

> 1.选择License server⽅式，地址填⼊： http://jetbrains-license-server （应该会⾃
动填上）
或者点击按钮： Discover Server 来⾃动填充地址。⽹络不佳的⻅第2种⽅式。

> 2.选择Activation code⽅式离线激活，请使⽤： ACTIVATION_CODE.txt 内的注册码激活。
**如果激活窗⼝⼀直弹出（error 1653219），请去hosts⽂件⾥移除jetbrains相关的项⽬。
License key is in legacy format == Key invalid，表示agent配置未⽣效。**

7. 激活完成