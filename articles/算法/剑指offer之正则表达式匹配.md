<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之正则表达式匹配" class="title">剑指offer之正则表达式匹配</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-15 10:38</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，
而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。
例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配
## 思路 ##
当模式中的第二个字符不是'*'时：

1、如果字符串第一个字符和模式中的第一个字符相匹配，那么字符串和模式都后移一个字符，然后匹配剩余的。

2、如果字符串第一个字符和模式中的第一个字符相不匹配，直接返回false。

而当模式中的第二个字符是“*”时：

如果字符串第一个字符跟模式第一个字符不匹配，则模式后移2个字符，继续匹配。如果字符串第一个字符跟模式第一个字符匹配，可以有2种匹配方式：

1、模式后移2字符，相当于x*被忽略；

2、字符串后移1字符，模式不变，即继续匹配字符下一位，因为*可以匹配多位；

上面的思路用递归实现相对较容易一点，递归终止条件有两个：当字符串为空且模式串也为空时，说明匹配成功，返回True；当字符串不为空，模式串为空时，匹配失败，返回False。

## python递归实现 ##
	#递归方法
	class Solution:
	    # s, pattern都是字符串
	    def match(self, s, pattern):
	        # write code here
	        if not s and not pattern:
	            return True
	        if (s and not pattern) or (not s and pattern):
	            return False
	        if len(pattern)>1 and pattern[1]=='*':
	            if s and (s[0]==pattern[0] or pattern[0]=='.'):
	                return self.match(s[1:],pattern) or self.match(s,pattern[2:])
	            else:
	                return self.match(s,pattern[2:])
	        else:
	            if s and (s[0]==pattern[0] or pattern[0]=='.'):
	                return self.match(s[1:],pattern[1:])
	            else:
	                return False
非递归做法稍微麻烦一点，因为当模式中的第二个字符是“*”，并且字符串第一个字符跟模式第一个字符匹配时，这种情况下有2种匹配方式，是or的关系。

这里可以设置一个变量c，表示为“ * ”一共可以匹配的次数。c的值需要简单计算求得，c=len（s）-（len（pattern）-pattern.count('*')*2）。

只要c大于0，就执行第二种匹配方式，“ * ”每匹配一次，c的值就减一，当c=0时，执行第一种匹配方式。
## 非递归实现 ##
	class Solution:
	    # s, pattern都是字符串
	    #非递归方法
	    def match(self, s, pattern):
	        length_s=len(s)
	        length_pattern=len(pattern)
	        copy=length_s-(length_pattern-2*pattern.count('*'))
	        if not s and copy==0:
	            return True
	        i,j=0,0
	        while i<length_s and j<length_pattern-1:
	            if pattern[j+1]=='*':
	                if copy==0 or s[i]!=pattern[j]:
	                    j +=2
	                elif s[i]==pattern[j] or pattern[j]=='.':
	                    i +=1
	                    copy -=1
	            else:
	                if s[i]==pattern[j] or pattern[j]=='.':
	                    i +=1
	                    j +=1
	                else:
	                    return False
	        if i==length_s:
	            if j==length_pattern or (j==length_pattern-2 and pattern[-1]=='*'):
	                return True
	        return False