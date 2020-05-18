<div class="blog-article">
<h1><a href="p.html?p=\python\python函数中的可变长度参数" class="title">python函数中的可变长度参数</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-09 07:56</span>
<span><a href="tags.html?t=python" class="tag">python</a></span>
</div>
<br/>

# python函数所有参数类型
**Python里面对函数参数传递分以下几种：**
- 位置参数
- 默认参数（在函数运行前参数就被赋了值）
- 关键字参数（通过变量名字进行匹配，而不是通过位置）
- `可变长度参数：`

  1 任意多个非关键字可变长参数（元组）

  2 任意多个关键字变量参数（字典）

前面三种参数类型没什么好说的，很常见。这里主要记录下后面的两种参数类型。

先看一个打印分数的函数，这个函数设计的比较死板，看python是如何解决的。

```
def printScore(msg,values):
	if not values:
		print msg
	else:
		values_str=', '.join(str(x)for x in values)
		print ('{},{}'.format(msg,values_str))

printScore('My scores are',[100,90])
printScore('My scores are',[]) #那怕你不想输入分数，也必须输入一个空的列表
```
**My scores are,100, 90**
**My scores are**

仔细看这个打印log的函数，它一个`固定参数个数的函数`，这个函数接受两个参数：一个message,一个values。

准确的说是必须要`接受两个参数，这样就很死板`，比如我只需要打印一个消息，但是调用的人必须要上面一样，哪怕你传入的是一个空列表。

`这种写法既麻烦，又显的有点乱`，有没有办法`把第二个参数完全省略掉`. 有的，python设计者设计了可变函数参数功能,也就是上面的第4种方式。

# 任意多个位置参数的函数

python有两种方式声明可变参数，先说第一种:

在printScore函数中，**我们做一小丢丢的改动**，我们`在参数values前面加*,变成(msg,*values)`,表示只有第一个参数的msg是调用者必须要指定的，该参数后面，`可以跟任意数量的位置参数`(主要是任意数量，当然包含懒人专用的省略不写拉)

```
def printScore(msg,*values):
	if not values:
		print msg
	else:
		values_str=', '.join(str(x)for x in values)
		print ('{},{}'.format(msg,values_str))

printScore('My scores are')
```
**My scores are**

是不是很爽，刚才说任意数量，我们加多个参数试试看：

```
printScore('My scores are',100,90,80)
```
**My scores are,100, 90, 80**

一下把100,90,80都打印出来呢，是怎么做到的，是因为python会自动把*操作符后面的`形参变成元组传给函数`.

# 任意多个关键字形式的参数

如何能接受任意数量的关键字参数，是`用**双星号操作符来表示`。

```
def printScore(msg,**values):
    print (msg)
    if values:
        for key,v in values.items():
            print ('{}：{}'.format(key,v))
printScore("我的成绩是：",语文=110,数学=130)
```
**我的成绩是：**
**语文：110**
**数学：130**

其实就是把`**后面的变量参数`，按照`字典`来处理,传递给函数.

# 综合例子
最后拿一个综合例子结尾:(**包含了关键字参数，默认参数，可变任意数量参数**)

```
def total(initial=5,*numbers,**keywords):
	count=initial
	for number in numbers:
		count+=number

	for key in keywords:
		count+=keywords.get(key)
	return count

print total(10,1,2,3,apple=50,orange=100)
```
**166**