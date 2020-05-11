<div class="blog-article">
    <h1><a href="p.html?p=算法/14剑指offer之链表中的倒数第k个节点" class="title">剑指offer之链表中的倒数第k个节点</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-25 13:10</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 输入一个链表，输出该链表中倒数第k个结点。
## 思路1 ##
1. 利用一个辅助列表array，从头到尾遍历链表，将每个节点放入列表array中。
2. 判断，如果k<=0或者k的值大于array的长度len（array），返回None
3. 否则，返回列表array的倒数第k个值arra[-k]

## 思路2 ##
1. 遍历整个链表，统计节点的个数count
2. 判断，如果k<=0或者k>count,返回None
3. 否则，令n=count-k，从头开始遍历链表，直到第n+1个节点（即倒数第k个）

## 思路3 ##
1. 设置两个指针，p1，p2，都指向head
2. 先将p2向后移动k次，这里需要注意的是k大于节点数的情况，循环过程中如果
出现p2为空，直接返回None
3. 然后p1和p2一起向后移动
4. 当p2到达尾节点时，p1正是所求倒数第k个

## python实现 ##
```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def FindKthToTail(self, head, k):
        array=[]
        while head:
            array.append(head)
            head=head.next
        return array[-k] if 0< k <=len(array) else None    
    def FindKthToTail2(self, head, k):
        count,pre=0,head
        while pre:
            count +=1
            pre=pre.next
        if k>count or k<=0:
            return None
        n=count-k
        for _ in range(n):
            head=head.next
        return head
    def FindKthToTail3(self, head, k):
        p1,p2=head,head
        for _ in range(k):
            if not p2:
                return None
            p2=p2.next
        while p2:
            p1=p1.next
            p2=p2.next
        return p1
```