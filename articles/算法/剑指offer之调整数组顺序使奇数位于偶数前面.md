<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之调整数组顺序使奇数位于偶数前面" class="title">剑指offer之调整数组顺序使奇数位于偶数前面</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-25 12:13</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。
## 思路一 ##
1. 类似于冒泡，两层循环，i从0到length-1,j从0到length-1-i
2. 每次遇到array[j]为偶数，array[j+1]为奇数的情况，就将二者交换位置。
3. 每轮循环可以保证最右边的前i个偶数已排好顺序。

## 思路二 ##
1. 借助另外两个数组res1，res2
2. 遍历数组array，元素为奇数就加入到res1中，为偶数就加入到res2中
3. 将res1和res2连接成一个数组

## python实现 ##
	# -*- coding:utf-8 -*-
	class Solution:
		#思路一
	    def reOrderArray(self, array):
	        res1,res2=[],[]
	        for i in range(len(array)):
	            if array[i]%2==1:
	                res1.append(array[i])
	            else:
	                res2.append(array[i])
	        return res1+res2
		#思路二
	    def reOrderArray2(self, array):
	        for i in range(len(array)):
	            for j in range(len(array)-1-i):
	                if array[j]%2==0 and array[j+1]%2==1:
	                    array[j],array[j+1]=array[j+1],array[j]
	        return array