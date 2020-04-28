<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之二维数组中的查找" class="title">剑指offer之二维数组中的查找</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-19 13:25</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下
> 递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中
> 是否含有该整数。

## 解题思路 ##
> 由于数组每行从左到右，每列从上到下都是有序的，所以可以从左下角或者右上角开
> 始查找。这里选择从左下角开始查找，假设二维数组有row行，col列，即初始下标
> i=row-1,j=0 。进入循环，如果当前值比目标值小，i--，如果大，j++，如果相等则表示找到，
> 返回True。直到i或者j有一个越界时停止循环。

## python2.7实现 ##

```python
# -*- coding:utf-8 -*-
class Solution:
    # array 二维列表
    def Find(self, target, array):
        # write code here
        i,j=len(array)-1,0
        while i>=0 and j<len(array[0]):
            if target<array[i][j]:
                i -=1
            elif target>array[i][j]:
                j +=1
            else:
                return True
        return False
```
