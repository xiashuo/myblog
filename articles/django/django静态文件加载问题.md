<div class="blog-article">
<h1><a href="p.html?p=\django\django静态文件加载问题" class="title">django静态文件加载问题</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-20 15:08</span>
<span><a href="tags.html?t=django" class="tag">django</a></span>
</div>
<br/>

> 今天学习`django`的时候，遇到`css`和`图片`无法加载的问题，折腾了一会才解决，这里记录下。

# 配置文件
1. 在项目根目录下创建`static`文件夹，所有的静态文件都放在里面。`Django` 将在该目录下查找静态文件。
2. `setting.py`中`INSTALLED_APPS`必须包含`polls.apps.PollsConfig`。

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    ...
]
```
3. `setting.py`中必须添加` STATIC_URL = '/static/'`

```python
STATIC_URL = '/static/'
```
4. 上面的代码正常情况下，系统其实已经自带完成了。最主要的是要加上下面这行代码：

```
STATICFILES_DIRS = [os.path.join(BASE_DIR,'static')]
```
> 而且注意`STATICFILES_DIRS `关键字不能写错。

5. html页面中，使用`{% static 'polls/style.css' %}`导入静态文件

```html
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'polls/style.css' %}">
```
***********
# 补充
今天再次看官方文档时发现，官方文档例子里的static文件夹是放在app应用目录下的，而不是工程根目录，所以不需要加`STATICFILES_DIRS = [os.path.join(BASE_DIR,'static')]`这条代码也可以。