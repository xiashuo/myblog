<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之和为s的连续正数序列" class="title">剑指offer之和为s的连续正数序列</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-08 03:39</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。
但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,
他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,
你能不能也很快的找出所有和为S的连续正数序列? Good Luck!
## 思路 ##
这道题基本上是数学方法，利用连续正数的求和公式（a1+ak）*k/2

这里ak=a1+k-1，带入上面的式子得：（2*a1+k-1）*k/2

令tsum=（2*a1+k-1）*k/2，求得：a1=（2*tsum/k -k+1）/2

令m=a1+ak，即m=2*tsum/k

这里我们可以枚举k，k表示个数，k的值从2开始，k的上界需要简单的数学不等式求解。

简单分析就能知道，当a1=1时，k可以取得最大，此时（1+k）*k/2=tsum,

由上式tsum > k*k/2  ==> k<math.sqrt(2*tsum)

在枚举的过程中，m必须是整数，因为a1，ak都是整数。

再观察 a1=（m-k+1）/2,要使得a1为整数，则只有两种情况，m为奇数，k为偶数，或者，m为偶数，k为奇数。

剩下的就是写代码了

## python实现 ##
	# -*- coding:utf-8 -*-
	import math
	class Solution:
	    def FindContinuousSequence(self, tsum):
	        result=[]
	        for l in range(int(math.sqrt(2*tsum)),1,-1):
	            if 2*tsum % l==0:
	                k=2*tsum/l
	                if (k%2==1 and l%2==0) or (k %2==0 and l%2==1):
	                    an=(k+l-1)/2
	                    a1 = (k - l + 1) / 2
	                    result.append(list(range(a1,an+1)))
	        return result