<div class="blog-article">
    <h1><a href="p.html?p=\django\Django之ORM外部python脚本使用" class="title">Django之ORM外部python脚本使用</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-08-03 22:34</span>
    <span><a href="tags.html?t=django" class="tag">django</a></span>
    </div><br/>

## 错误描述
`django.core.exceptions.ImproperlyConfigured: Requested setting INSTALLED_APPS, but settings are not configured. You must either define the environment variable DJANGO_SETTINGS_MODULE or call settings.configure() before accessing settings.
`
> 今天想在代码中批量插入数据库的时候，报了上面的错误。因为之前使用django操作ORM的时候
>都是使用`python manage.py shell` 终端测试的，很不方便，而且代码无法保存。用django的
>测试环境又无法真实的插入数据到数据库。所以想直接写个py脚本将所有的测试数据
>进行真实的插入，并测试联合查询等。

## 错误原因
> 单独运行py文件时，缺少django的配置环境，所以是无法操作ORM的。而平常被忽略的
>manage.py脚本中其实就是配置django的运行环境。下面是manage.py的代码：

```python
import os
import sys
def main():
    # 这一行是配置django的环境
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'petshop.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
if __name__ == '__main__':
    main()
```

## 解决办法
> 参照上面`manage.py`里注释的那行代码，将该代码加入到要运行的py脚本的首部，
> 然后使用`django.setup()`启动django项目。之后就可以独立运行这个py脚本进行
>操作django模型了。脚本首部添加代码如下：

```python
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'petshop.settings')
import django
django.setup()
```
`说明：petshop是我的项目名，然后py脚本要放在项目根目录下，与mangge.py同级`