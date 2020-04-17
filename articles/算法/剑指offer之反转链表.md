<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之反转链表" class="title">剑指offer之反转链表</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-26 07:38</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一个链表，反转链表后，输出新链表的表头。
## 思路 ##
### 解法一 ###
1. 借助一个辅助列表array
2. 从头到尾遍历整个链表，将每个节点放入array中
3. 最后从右至左遍历array，执行反转链表的操作，即array[i].next=array[i-1]

### 解法二 ###
1. 设置两个指针变量，p1=None，p2=None
2. p1指向的是当前节点的前一个，p2用来表示当前节点的下一个节点
3. 循环条件为当前节点pHead是否空，每次循环，首先将p2指向pHead的下一个节点，即p2=pHead.next,然后执行pHead.next=p1,此时已完成反转。最后将p1指向pHead，pHead指向p2，即p1=pHead,pHead=p2,继续循环
4. 当pHead为空，退出循环，返回p1

### 解法三 ###
1. 可以使用递归的方法，从头递归到尾部，终止条件为pHead.next为空或者pHead为空，
2. 前者为空，说明到达最后一个节点，后者说明链表为空
3. 若达到终止条件，则返回尾节点pHead
4. 否则，执行递归操作，更新每个节点的next值
5. 最终返回尾节点
6. 注意每个递归过程返回值其实都是相同的，即尾部节点。

## python实现 ##
	# -*- coding:utf-8 -*-
	class ListNode:
	    def __init__(self, x):
	        self.val = x
	        self.next = None
	class Solution:
	    # 返回ListNode
		#解法一
	    def ReverseList(self, pHead):
	        if not pHead:
	            return None
	        array=[]
	        while pHead:
	            array.append(pHead)
	            pHead=pHead.next
	        for i in range(len(array)-1,0,-1):
	            array[i].next=array[i-1]
	        array[0].next=None
	        return array[-1]
		#解法二
	    def ReverseList2(self, pHead):
	        p1,p2=None,None
	        while pHead:
	            p2=pHead.next
	            pHead.next=p1
	            p1=pHead
	            pHead=p2
	        return p1 
		#解法三
	    def ReverseList3(self, pHead):
	        if not pHead or not pHead.next:
	            return pHead
	        head=self.ReverseList3(pHead.next) //这里的head值一直是最后一个节点
	        pHead.next.next=pHead
	        pHead.next=None
	        return head