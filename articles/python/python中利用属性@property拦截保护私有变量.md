<div class="blog-article">
    <h1><a href="p.html?p=\python\python中利用属性@property拦截保护私有变量" class="title">python中利用属性@property拦截保护私有变量</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-05-18 20:42</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div>
<br/>

# @property

> 在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检
查参数，导致可以随意更改属性的值，这显然不合逻辑。在其他语言中，如java，通常是定义
set和get方法，然后再对私有变量进行赋值，修改和限制。但是在python中内置了
@property装饰器，用来修饰方法,将方法变为属性。

## 作用
1. 使用@property装饰器来创建只读属性，@property装饰器会将方法转换为相同
名称的只读属性。
2. 可以与所定义的属性配合使用，这样可以防止属性被修改。

## 使用@property配合属性，拦截保护私有变量
```python
"""
    创建敌人类
    创建实例变量并保证数据在有效范围内
        姓名、血量、攻击力、防御力
              0-100  1 – 30、 0 – 20
"""

# 实例变量

class Enemy:
    def __init__(self, name, health, attack, defense):
        # 实例变量
        self.name = name
        # 属性
        self.health = health
        self.attack = attack
        self.defence = defense

    @property
    def health(self):
        return self.__health
    
    @health.setter
    def health(self, value):
        if 0 <= value <= 100:
            self.__health = value
        else:
            raise Exception("血量超过范围")  # 产生错误
    
    @property
    def attack(self):
        return self.__attack
    
    @attack.setter
    def attack(self, value):
        if 1 <= value <= 30:
            self.__attack = value
        else:
            raise Exception("攻击不在范围内")
    
    # 快捷键:props + 回车
    @property
    def defence(self):
        return self.__defence
    
    @defence.setter
    def defence(self, value):
        if 0 <= value <= 30:
            self.__defence = value
        else:
            raise Exception("防御力超过范围")


mb = Enemy("灭霸", 100, 30, 20)
print(mb.__dict__)
print(mb.name)
print(mb.health)
print(mb.attack)
print(mb.defence)
```