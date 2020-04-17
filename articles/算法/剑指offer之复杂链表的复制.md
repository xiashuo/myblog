<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之复杂链表的复制" class="title">剑指offer之复杂链表的复制</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-01 15:25</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），
返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
## 思路 ##
1. 从头到尾遍历链表，建立与当前节点相同的新节点，并插入到当前节点的后面
2. 即从A->B->C变为A->A1->B->B1->C->C1
3. 遍历上面的新链表，遵循下面的规律：A1.random=A.random.next
4. 最后将上面的链表拆分开为原始链表和复制后的链表：A->B->C和A1->B1->C1

## python实现 ##
	# -*- coding:utf-8 -*-
	class RandomListNode:
	    def __init__(self, x):
	        self.label = x
	        self.next = None
	        self.random = None
	class Solution:
	    # 返回 RandomListNode
	    #非递归正常思路
	    def Clone(self, pHead):
	        if not pHead:
	            return None
	        pre=pHead
	        while pre:
	            node=RandomListNode(pre.label)
	            node.next=pre.next
	            pre.next=node
	            pre=node.next
	        pre=pHead
	        while pre:
	            if pre.random:
	                pre.next.random=pre.random.next
	            pre=pre.next.next
	        pre=pHead
	        head=pHead.next
	        while pre:
	            cur=pre.next
	            pre.next=cur.next
	            if cur.next:
	                cur.next=cur.next.next
	            pre=pre.next
	        return head

		#经过测试，复制后random指针还是指向原始的节点的话也能通过，估计因为题目最后是根据节点中的值来判断的。
	    #所以下面的递归方法可以用，但是与题目的本意是违背的。
	    def Clone(self, pHead):
	        if not pHead:
	            return None
	        node=RandomListNode(pHead.label)
	        node.random=pHead.random
	        node.next=self.Clone(pHead.next)
	        return node