<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之字符串的全排列" class="title">剑指offer之字符串的全排列</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-02 09:04</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,
则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
## 思路 ##
1. 这道题是经典的全排列问题，例如：1 、2 、3三个元素的全排列为：
{1，2，3}，{1，3，2}，{2，1，3}，{2，3，1}，{3，1，2}，{3，2，1}。
2. 要对1、2、3、4进行排序，第一个位置上的元素有四种可能：1或2或3或4，假如已经确定了第一个元素为4，剩下的第二个位置上可以是1、2、3，很显然这具有递归结构，如果原始要排列的数组顺序为1、2、3、4，现在只要分别交换1、2，1、3，1、4然后对剩下的3个元素进行递归的排列。
3. 这道题中会有重复的字符，所以需要去掉重复。
4. 具体做法是，在每次进行交换时，判断下当前元素是否在前面出现过，如果出现过，直接跳过。

## python实现 ##
	# -*- coding:utf-8 -*-
	class Solution:
	    def Permutation(self, ss):
	        ss=list(ss) #字符串无法改变值，所以先转换成list
	        res=self.all_order(ss,len(ss),len(ss),[])
	        return sorted(res) #按字典顺序排序
	        # return sorted(list(set(res)))
	    def all_order(self,ss,k,n,res):
	        if k==1:
	            aa=[val for val in ss]
	            res.append(''.join(aa))
	        for i in range(n-k,n):
	            if ss[i] in ss[n-k:i]: #判断字符是否重复
	                continue
	            ss[n-k],ss[i]=ss[i],ss[n-k] #每次将第n-k个与第i个交换
	            self.all_order(ss,k-1,n,res)
	            ss[n-k],ss[i]=ss[i],ss[n-k] #需要还原位置，否则会重复
	        return res