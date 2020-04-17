<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之替换空格" class="title">剑指offer之替换空格</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-19 14:33</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
## 解题思路 ##
首先，统计字符串中的空格的数量为count，因为需要将每个空格替换成“%20”，相当于每个空格字符串需要增加2个长度。原始字符串长度为length，
所以，字符串最终长度应该为length+count*2

先将原始字符串末尾加上count*2个空格，转换时，为了使字符移动次数最少，从字符串的最后一个字符开始向前遍历。
## python实现 ##
	# -*- coding:utf-8 -*-
	class Solution:
	    # s 源字符串
	    def replaceSpace(self,s):
	        s=list(s) #字符串无法改变值，所以先转换成list
	        count=s.count(' ')
	        length=len(s)
	        s.extend(' '*count*2) 
	        i,j=length-1,length+count*2-1
	        while i>=0:
	            if s[i]!=' ':
	                s[j]=s[i]
	                i-=1
	                j-=1
	            else:
	                s[j-2:j+1]=['%','2','0']
	                i-=1
	                j-=3
	        return ''.join(s)

上面是C或者java的做法，如果只是为了刷题，从左边开始遍历，python代码可以更简洁。

	def replaceSpace2(self,s):
	        s=list(s)
	        count=s.count(' ')
	        for i in range(len(s)+count*2):
	            if s[i]==' ':
	                s=s[:i]+list("%20")+s[i+1:]
	        return ''.join(s)