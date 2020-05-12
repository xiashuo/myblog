<div class="blog-article">
    <h1><a href="p.html?p=算法/16剑指offer之合并两个排序的链表" class="title">剑指offer之合并两个排序的链表</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-26 08:56</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
## 思路 ##
1. 这道题类似于两个递增数组的合并
2. 做法就是两个链表同时从头开始遍历，每次比较两个链表当前节点的值的大小
3. 创建一个空节点current，哪个链表当前节点的值小，current.next值就指向哪个链表
4. 然后current后移，值小的链表头指针后移
5. 可以分别使用递归和非递归方法实现上面的过程

## python实现 ##
```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
class Solution:
    # 返回合并后列表
    #递归方法
    def Merge(self, pHead1, pHead2):
        if not pHead1:
            return pHead2
        if not pHead2:
            return pHead1
        pHead=pHead1 if pHead1.val < pHead2.val else pHead2
        if pHead1.val<pHead2.val:
            pHead.next=self.Merge(pHead1.next,pHead2)
        else:
            pHead.next=self.Merge(pHead1,pHead2.next)
        return pHead
    #非递归方法
    def Merge2(self, pHead1, pHead2): 
        current=ListNode(None)
        pre=current #这里保存这个节点，最终返回该节点的下一个节点为头节点
        while pHead1 and pHead2:
            if pHead1.val<pHead2.val:
                current.next=pHead1
                current=pHead1
                pHead1=pHead1.next
            else:
                current.next=pHead2
                current=pHead2
                pHead2=pHead2.next
        if not pHead1:
            current.next=pHead2
        else:
            current.next=pHead1
        return pre.next
```