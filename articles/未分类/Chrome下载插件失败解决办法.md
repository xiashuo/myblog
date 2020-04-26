<div class="blog-article">
<h1><a href="p.html?p=\未分类\Chrome下载插件失败解决办法" class="title">关于Chrome下载提示失败，病毒扫描失败的解决办法</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2018-12-28 09:02</span>
<span><a href="tags.html?t=未分类" class="tag">未分类</a></span>
</div>
<br/>

最近使用谷歌应用商店下载插件时才发现这个问题，刚开始以为只是谷歌插件下载不了。因为这个问题之前也遇到过，是代理的问题，
把SSR代理设置成全局就ok了。试了很久发现没有用，后面发现不是这个问题，所有下载都失败。

![alt](assets/images/2018/12/580qvp0o4mgi9o6g2pl65ecq8b.jpg)

![alt](assets/images/2018/12/uu6b925qccj0jpr087el5da770.jpg)

这是个但蛋疼的问题，下载完成之后你给提示失败，而且文件都被删除了，难受的一批，试了很多网上的办法都没用，重启系统了也还是没用。后来再搜，
终于找到解决方案了：
1. 在命令行中输入regedit打开注册表，注册表的打开方式：XP中点击”开始”——“运行”——输入regedit，回车；Win7中点击“开始”——搜索框中直接输入
“regedit”，回车。

2. 打开注册表后，定位到HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Attachments，打开目录Attachments，
在右边的框框中找到名称为ScanWithAntiVirus 属性。 

3. 击ScanWithAntiVirus属性，选择修改，将其值改为1，确定。

4. 重启电脑——收工！