<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之跳台阶" class="title">剑指offer之跳台阶</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-22 08:31</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
## 分析 ##
简单的动态规划问题了，f（n）表示跳n级台阶的跳法，根据题目意思，很容易可以得出递推式为，f(n)=f(n-1)+f(n-2),n>=3.

1. 第一次跳有两种情况：跳1级或者跳2级。
2. 跳1级，则剩余n-1个台阶，则共有1*f(n-1)种跳法
3. 跳2级，则剩余n-2个台阶，则共有1*f(n-2)种跳法
4. 两种情况相加可得上面的递推式。

可以看出，这个式子和斐波拉契数列数列的递推式子是一样的，不同的是，初始元素不太一样，这里实际情况是，n=1时，f(n)=1;n=2时，f(n)=2.即台阶数为1时，只能挑1级一种情况，台阶数为2时，可以连续跳两个1级和跳一个2级两种情况。

和之前一样，这里不能使用递归，会超时。

## python实现 ##
	# -*- coding:utf-8 -*-
	class Solution:
	    def jumpFloor(self, number):
	        if number<=2:
	            return number
	        a,b=1,2
	        for _ in range(2,number):
	            a,b=b,a+b
	        return b