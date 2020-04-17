<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之构建乘积数组" class="title">剑指offer之构建乘积数组</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-12 11:01</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。
不能使用除法。
## 思路 ##
B[i]的值可以看作下图的矩阵中每行的乘积。

下三角用连乘可以很容求得，上三角，从下向上也是连乘。

因此我们的思路就很清晰了，先算下三角中的连乘，即我们先算出B[i]中的一部分，然后倒过来按上三角中的分布规律，把另一部分也乘进去。

![](http://www.xsblog.club/assets/images/2018/07/3uqes6ala8jt3rk47mrva1ev5t.jpg)

## python实现 ##
	class Solution:
	    def multiply(self, A):
	        B=[1]
	        n=len(A)
	        for i in range(n-1):
	            B.append(A[i]*B[i])
	        temp=A[n-1]
	        for i in range(n-2,-1,-1):
	            B[i] *=temp
	            temp *=A[i]
	        return B