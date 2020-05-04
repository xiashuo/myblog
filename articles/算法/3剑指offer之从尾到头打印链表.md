<div class="blog-article">
    <h1><a href="p.html?p=算法/3剑指offer之从尾到头打印链表" class="title">剑指offer之从尾到头打印链表</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-20 05:25</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 输入一个链表，从尾到头打印链表每个节点的值。
## 思路 ##
> 正常思路就是，从头到尾遍历每个节点，每次将当前节点的值插入到列表的第一位，最后返回列表，即实现了从尾到头。也可以使用递归，思想与上面类似。
## python实现 ##

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # 返回从尾部到头部的列表值序列，例如[1,2,3]
    #非递归版
    def printListFromTailToHead(self, listNode):
        # write code here
        res=[]
        while listNode:
            res.insert(0,listNode.val)
            listNode=listNode.next
        return res
    #递归版本
    def printListFromTailToHead2(self, listNode):
        # write code here
        res=[]
        if listNode:
            res.extend(self.printListFromTailToHead2(listNode.next))
            res.append(listNode.val)
        return res
```