<div class="blog-article">
    <h1><a href="p.html?p=算法/12剑指offer之数值的整数次方" class="title">剑指offer之数值的整数次方</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-24 03:01</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
## 思路1 ##
1. base的exponent次方，其实就是exponent个base累乘的结果
2. 所以，只需设置一个变量sum=1，利用循环，每次将sum*base的值赋给sum，一共循环exponent次，最终返回sum。
3. 一个问题是，这里exponent可以是负数，当为负数时，可以先转换成正数求得sum，返回其倒数，1/sum 。

## 思路2 ##
1. 还有一种比较好的方法，比上面的方法要优。
2. 同样设置sum=1,令n=exponent,通过判断n&1的值是否为真，为真说明n二进制最右边第一位值为1，则sum *=base,然后将n右移1位，n=n>>1,
然后将base的指数翻倍，base *=base.这里因为n右移一位后，表示进了一位，相当于指数乘以了2，所以翻了一倍。
3. 举个例子说明，求2的3次方，base=2,n=3,n的二进制为0011，从最右边第1个1开始，此时base=2，则sum=sum*base=2^1;n右移后，n=0001,此时base指数翻倍，base=base^2,此时sum *=base，相当于原始base的3次方。
4. 仔细想想，其实上面base的指数的变化过程，实际上反映的就是将n的二进制转换成十进制的过程。

## python实现 ##
```python
# -*- coding:utf-8 -*-
class Solution:
    #思路1
    def Power(self, base, exponent):
        sum=1
        n=abs(exponent)
        for _ in range(n):
            sum *=base
        return sum if exponent>0 else 1/sum 
    #思路2   
    def Power2(self, base, exponent):
        sum=1
        n=abs(exponent)
        while n:
            if n&1:
                sum *=base
            base *=base
            n=n>>1
        return sum if exponent>0 else 1/sum
```