<div class="blog-article">
    <h1><a href="p.html?p=\python\python中的内置可重写函数" class="title">python中的内置可重写函数</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-05-18 21:15</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div>
<br/>

# 内置可重写函数
> Python中，以双下划线开头、双下划线结尾的是系统定义的成员。我们可以在自定义类中进行重写，从而改变其行为。

## 转换字符串
### __str__函数：将对象转换为字符串(对人友好的)

```python
"""
    多态 -- 内置可重写函数
        重写:子类与父类方法相同(名称/参数)
        __str__
"""


# class Commodity(object):

class Commodity:
    def __init__(self, cid, name, price):
        self.cid = cid
        self.name = name
        self.price = price

    def __str__(self):
        return "%s的编号是%d,单价是%d"%(self.name,self.cid, self.price)

kz = Commodity(1001, "口罩", 30)

# <__main__.Commodity object at 0x7f74c5a1f208>

# print(kz)

content = kz.__str__() # 如果儿子没有,将执行爸爸的.
print(content)
```

### __repr__函数：将对象转换为字符串(解释器可识别的)

```python
"""
    多态 -- 内置可重写函数
        重写:子类与父类方法相同(名称/参数)
"""


class Commodity:
    def __init__(self, cid, name, price):
        self.cid = cid
        self.name = name
        self.price = price

    # 对象 --> 字符串 : 没有语法限制,根据需求灵活自由的选择字符串格式
    # 适用性：　给人看
    # def __str__(self):
    #     return "%s的编号是%d,单价是%d"%(self.name,self.cid, self.price)
    
    # 对象 --> 字符串 : 有语法限制,按照创建对象的Python语法格式
    # 适用性：　机器干(执行)　
    def __repr__(self):
        return 'Commodity(%d, "%s", %d)' % (self.cid, self.name, self.price)


# 创建对象

kz1 = Commodity(1001, "口罩", 30)

# 与eval函数配合

# eval函数: 将字符串作为Python代码执行

# re = eval("1+2*3")

# print(re)# 7

# 在终端中输入的内容,将作为代码执行.  "无所不能"

# eval(input())

# 获取该对象的实例化代码

str_code = kz1.__repr__() # 'Commodity(1001, "口罩", 30)'
kz2 = eval(str_code)

# 拷贝

kz1.price = 50
print(kz2.price)
```

## 运算符重载
> 定义：让自定义的类生成的对象(实例)能够使用运算符进行操作。

### 算数运算符
![](./assets/images/2020/05/算法运算符.png)

```python
"""
    重写　算数运算符
"""


class Vector2:
    """
        二维向量
    """

    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # 自定义对象可以使用+符号
    def __add__(self, other):
        return Vector2(self.x + other.x, self.y + other.y)


pos01 = Vector2(1, 2)
pos02 = Vector2(3, 4)
pos03 = pos01 + pos02  # 本质: pos01.__add__(pos02)
print(pos03.x)  # 4
print(pos03.y)  # 6
```

### 复合运算符重载
![](./assets/images/2020/05/复合运算符重载.png)

```python
"""
    重写　算数运算符
"""

class Vector2:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __iadd__(self, other):
        self.x += other.x
        self.y += other.y
        return self # 可变对象,尽量在原有基础上修改(返回原始对象)


pos01 = Vector2(1, 2)
pos01 += Vector2(3, 4) # 本质: pos01.__iadd__(pos02)
print(pos01.x, pos01.y)


# 可变对象+=前后是同一对象

list01 = [1]
print(id(list01))  # 140046617805192
list01 += [2]
print(id(list01))  # 140046617805192
print(list01)  # [1, 2]

# 不可变对象+=前后不是同一对象(创新新对象)

tuple01 = (1,)
print(id(tuple01))  # 140224199621768
tuple01 += (2,)
print(id(tuple01))  # 140224169166984
print(tuple01)  # (1, 2)
```

### 比较运算重载
![](./assets/images/2020/05/比较运算符重载.png)

```python
class Commodity:
    def __init__(self, cid=0, name="", price=0):
        self.cid = cid
        self.name = name
        self.price = price

    # 内容是否相同的依据
    def __eq__(self, other):
        # if type(other) == Commodity:
        return self.cid == other.cid

    # 比较大小的依据
    def __lt__(self, other):
        return self.price < other.price



list_commodity_infos = [
    Commodity(1001, "屠龙刀", 10000),
    Commodity(1002, "倚天剑", 10000),
    Commodity(1003, "金箍棒", 52100),
    Commodity(1004, "口罩", 20),
    Commodity(1005, "酒精", 30),
]
# 不同类型 比较 无意义
# print(Commodity(1001, "屠龙刀", 10000) == 1001)

# 1. 在商品列表中,查找Commodity(1003)的索引  列表.index
print(list_commodity_infos.index(Commodity(1003)))
# 2. 在商品列表中,判断是否存在Commodity(1005)的商品 Commodity(1005) in 列表
print(Commodity(1003) in list_commodity_infos)
# 3. 在商品列表中,移除Commodity(1002)对象
list_commodity_infos.remove(Commodity(1002))
for val in list_commodity_infos:
    print(val.__dict__)
# 4. 在商品列表中,根据升序排列
list_commodity_infos.sort()
for val in list_commodity_infos:
    print(val.__dict__)
# 5. 在商品列表中,获取单价最高的商品
min_value = min(list_commodity_infos)
print(min_value.__dict__)
```

