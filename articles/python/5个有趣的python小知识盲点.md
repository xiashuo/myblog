<div class="blog-article">
<h1><a href="p.html?p=python/5个有趣的python小知识盲点" class="title">5个有趣的python小知识盲点</a></h1>
<span class="author">xiashuobad</span>
<span class="time">2020-02-07 08:26</span>
<span><a href="tags.html?t=python" class="tag">python</a></span>
</div>
<br/>

# 1.字符串驻留

> 字符串驻留是一种仅保存一份相同且不可变字符串的方法。
> 
> 基本原理：系统维护interned字典，记录已被驻留的字符串对象。当字符串对象a需要驻留时，先在interned检测是否存在，若存在则指向存在的字符串对象，a的引用计数减1；若不存在，则记录a到interned中。
> 
> 为什么要字符串驻留？显而易见，节省大量内存在字符串比较时，非驻留比较效率o(n)，驻留时比较效率o(1)。

**字符串只会在编译时驻留，而运行时不会**
```python
a="hello"+"world"
c="helloworld"
print("编译：",a is c)

a="hello"
b="world"
print("运行：",a+b is c)
```
编译： True
运行： False

**字符串长度为0和1时，默认都采用了驻留机制。**
   
```python
a="@"
b="@"
print("len=1:",a is b)

a="@@"
b="@@"
print("len=2:",a is b)
```
len=1: True
len=2: False

**字符串>1时，且只含大小写字母、数字、下划线时，才会默认驻留。**

```python
a="test1_"
b="test1_"
print("字母，数字，下划线：",a is b)

a="test@"
b="test@"
print("其他字符：",a is b)
```
字母，数字，下划线： True
其他字符： False

**用乘法得到的字符串，有以下2种情况：**
-  乘数为1时，与上面的规则一样。
-  乘数>=2时，字符串总长度大于20时都不驻留，其他规则一样。

```python
a="test_"*4
b="test_"*4
print("长度小于等于20：",a is b)

a="test_"*5
b="test_"*5
print("长度大于等于20：",a is b)
```
长度小于等于20： True
长度大于等于20： False

**字符串被sys.intern() 指定驻留。**

```python
from sys import intern
a=intern("@!#")
b=intern("@!#")
print("intern指定驻留：",a is b)
```
intern指定驻留： True

**此外， 对于[-5,256]之间的整数数字，Python默认驻留。**

```python
a=-6
b=-6
print("小于-5：",a is b)

a1,a2=-5,256
b1,b2=-5,256
print("-5到256之间：",a1 is b1,a2 is b2)

a=257
b=257
print("大于256：",a is b)
```
小于-5： False
-5到256之间： True True
大于256： False

# 2.相同值的不可变对象

```python
d={}
d[1]="java"
d[1.0]="python"
print("d[1]:",d[1])
print("d[1.0]:",d[1.0])
```
d[1]: python
d[1.0]: python

**key=1,value=java的键值对神器消失了**
这是因为具有相同值的不可变对象在Python中始终具有相同的`哈希值`，由于存在`哈希冲突`，不同值的对象也可能具有相同的哈希值。
# 3.对象销毁顺序
创建一个类**SE**:

```python
class SE(object):
  def __init__(self):
    print('init')
  def __del__(self):
    print('del')
```

```
# 创建两个SE实例，使用is判断
print(SE() is SE())
```
init
init
del
del
False

```
# 创建两个SE实例，使用id判断：
print(id(SE()) == id(SE()))
```
init
del
init
del
True

调用id函数, Python 创建一个 SE 类的实例，并使用id函数获得内存地址后，销毁内存丢弃这个对象。

**当连续两次进行此操作, Python会将相同的内存地址分配给第二个对象，所以两个对象的id值是相同的.**

但是is行为却与之不同，通过打印顺序就可以看到。

# 4.充分认识 for

```python
for i in range(5):
    print(i)
    i=10
```
为什么不是执行一次就退出？

按照for在Python中的工作方式, i = 10 并不会影响循环。range(5)生成的下一个元素就被解包，并赋值给目标列表的变量i.

# 5.认识执行时机

```python
array = [1, 3, 5]
g = [x for x in array if array.count(x) > 0]
g
```
[1, 3, 5]
这个结果这不足为奇。但是，请看下例：

```python
array = [1, 3, 5]
g = (x for x in array if array.count(x) > 0)
array = [5, 7, 9]
list(g)
```
[5]
这有些不可思议~~ 原因在于：
**生成器表达式中, in 子句在声明时执行, 而条件子句则是在运行时执行。**
所以代码：

```python
array = [1, 3, 5]
g = (x for x in array if array.count(x) > 0)
array = [5, 7, 9]
```
等价于：

```python
g = (x for x in [1,3,5] if [5,7,9].count(x) > 0)
```