<div class="blog-article">
<h1><a href="p.html?p=\js\prism.js" class="title">使用prism.js让博客代码高亮显示并加行号</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-08 13:03</span>
<span><a href="tags.html?t=js" class="tag">js</a></span>
</div>
<br/>

疫情爆炸，假期一拖再拖，实在无聊，好久不写博客了，突然发现博客的代码页面显示是真的难看，之前用的是highlight.js进行的代码高亮和加行号，行号和代码之间的距离太近，简直没法看，记得之前也尝试过调，没成功。正好这次有时间，就研究了下，发现了prism.js，因为本身对前端的东西不太熟，所以也费了不劲才成功。

# prism.js
> Prism 是一款轻量、可扩展的代码语法高亮库，使用现代化的 Web 标准构建。引用 `prism.css` 和 `prism.js`，使用合适的 HTML5 标签（code.language-xxxx）,就ok

官网下载prism.js和prism.css：[http://prismjs.com/](http://prismjs.com/)

![](assets/images/2020/02/rdoeuli3oqgb3qbp7s0p15vglp.png)

下载时需要选择`核心代码`（必选），`主题`，`语言`以及`插件`。其实所有的主题我都试过了，还是觉得“`dark`”主题比较好看。语言的话按需勾选，选的越多当然越大，我这里只选了几种常用的语言。插件有很多，没试过，我只选了`加行号`和`复制代码`。

选择好后分别下载`prism.js`和`prism.css`就好了。
# 配置
先将下载好的`prism.js`和`prism.css`放到相应的文件夹下。

在博客文章显示页面中引入`prism.js`和`prism.css`

```html
<link href="${theme_url('/static/css/prism.css')}" rel="stylesheet">
<script src="${theme_url('/static/js/prism.js')}"></script>
```
仅仅引入`prism.js`和`prism.css`发现并没有效果，官方要求是需要给`<code/>`加上一个class属性，`class="language-xxx"`，xxx代表语言，如`python`。如果要显示行号的话，则也需要给`<pre/>`标签也加上`class="line-numbers"`。

由于我使用的Tale博客初始并没有加`class`这个属性，所以开始以为需要去修改源码。后来搜索之后发现可以通过js直接给页面的标签加上`class`。

这里用了`Jquery`实现，所以先新引入`Jquery.js`

```html
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```
js代码如下：

```js
<script type="text/javascript">
  $('pre').addClass("line-numbers").css("white-space", "pre-wrap");
  $('code').addClass("language-python")
</script>
```
因为必须要填确定的语言，所以我直接填了`python`。

这个地方有个问题弄了很久，我把上面的`js`代码放在`body`里，并在本地写了一个测试页面，效果显示没有问题。但是放到服务器上的博客页面里时也始终显示不出来，蛋疼了好久，差点就放弃了。后来偶然发现本地的测试页面里，我把js放在的是`body`的最下面,也就是页面元素的下面。恍然大悟，这段`js`,必须要在页面元素的下面才有效，代码执行顺序是从上到下的，我想可能是需要等页面元素加载出来吧（对这块也不太熟悉），于是试了一下，终于达到了要的效果。
# 效果展示
看一下`python`代码的效果吧O(∩_∩)O

```python
import random    
if __name__ =="__main__":    #四位数字字母验证码的生成
    checkcode="" #保存验证码的变量
    for i in range(4):
        index=random.randrange(0,4)  #生成一个0~3中的数
        if index!=i and index +1 !=i:
            checkcode +=chr(random.randint(97,122))  # 生成a~z中的一个小写字母
        elif index +1==i:
            checkcode +=chr(random.randint(65,90) ) # 生成A~Z中的一个大写字母
        else:
            checkcode +=str(random.randint(1,9))  # 数字1-9
    print(checkcode)
```