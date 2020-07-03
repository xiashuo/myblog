<div class="blog-article">
    <h1><a href="p.html?p=\算法\34剑指offer之第一个只出现一次的字符" class="title">剑指offer34之第一个只出现一次的字符</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-07-03 21:51</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div><br/>

# 题目描述
> 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次
>的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.（从0开始计数）

# 算法思路
1. 这道题目比较初级，简单，直接用哈希法，即用字典统计所有字符的个数，然后返回
第一个个数为1的字符就ok了。
2. 需要循环2遍，第一遍将所有字符存入字典，得到所有字符的个数；第二遍循环去判断
字符个数是否为1，返回第一个个数为1的字符。时间复杂度为O(2n)

# python实现
```python
class Solution:
    def FirstNotRepeatingChar(self, s):
        if not s:
            return -1
        char_count = {}
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1
        for i in range(len(s)):
            if char_count[s[i]] == 1:
                return i
```