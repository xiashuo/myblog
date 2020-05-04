<div class="blog-article">
    <h1><a href="p.html?p=算法/7剑指offer之斐波拉契数列" class="title">剑指offer之斐波拉契数列</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-22 04:42</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项。n<=39
## 思路 ##
> 斐波拉契数列都知道，0，1，1，2，3 。。。
f(n)表示第n项的值，递推式也很容易，f(n)=f(n-1)+f(n-2),n>=3
第一反应是用递归啊，递归代码多简洁啊，几行代码就搞定。

```python
# -*- coding:utf-8 -*-
class Solution:
    def Fibonacci(self, n):
        if n<=1:
            return n
        return self.Fibonacci(n-1)+self.Fibonacci(n-2)
```
然并卵，当n较大时，这个递归消耗太大了，会超时。

所以只能用非递归做，简单的做法就是设置两个变量a和b，分别代表前两个元素的值，
每迭代一次，将a和b分别指向下一个元素，即a,b=b,a+b。这种写法是python中特有
的，同时赋值，不需要借助第三个变量。如果是c或者java的话，temp=b,b=a+b,
a=temp
## python实现 ##
```python
# -*- coding:utf-8 -*-
class Solution:
    def Fibonacci(self, n):
        if n<=1:
            return n
        a,b=0,1
        for _ in range(1,n):
            a,b=b,a+b
        return b
```