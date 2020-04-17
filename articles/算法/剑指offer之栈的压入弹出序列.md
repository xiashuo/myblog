<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之栈的压入弹出序列" class="title">剑指offer之栈的压入弹出序列</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-28 08:59</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，
序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。
（注意：这两个序列的长度是相等的）
## 思路1 ##
1. 这道题的做法有很多，大同小异，主要还是抓住入栈出栈的规律
2. 看的比较多的一种做法是，利用一个辅助栈stack
3. 分别从头开始遍历pushV和popV，首先pushV[i]入栈stack，判断栈顶元素stack[-1]是否与popV[j]相等，如果相等，则出栈stack.pop(),i++,如果不等，则j++,i++
4. 最终判断stack是否为空，如果为空则返回true，否则false

## python实现 ##

	# -*- coding:utf-8 -*-
	class Solution:
	    def IsPopOrder(self, pushV, popV):
	        stack=[]
	        for val in pushV:
	            stack.append(val)
	            while popV and stack[-1]==popV[0]:
	                stack.pop()
	                popV.pop(0)
	        return False if stack else True
## 思路2 ##
1. 我自己做的时候想到的一种方法，不用借助辅助栈。
2. i从0到len(popV)-2遍历popV，通过popV[i],popV[i+]的值分别去查找pushV中的索引index1，index2
3. 由出栈入栈的规律，可以得出，要么index1比index2大1，要么index1比index2要小，其他情况则不成立。
4. 需要注意的是，上面考虑的情况是数组长度大于等于2的情况，当长度为1时需要单独考虑

## python实现 ##
	def IsPopOrder(self, pushV, popV):
	        if len(pushV)==1 and pushV[0]!=popV[0]:
	            return False
	        for i in range(len(popV)-1):
	            index1=pushV.index(popV[i])
	            index2=pushV.index(popV[i+1])
	            if index1-index2!=1 and index2<index1:
	                return False
	            del pushV[index1]
	        return True