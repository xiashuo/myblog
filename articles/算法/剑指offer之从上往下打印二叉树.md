<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之从上往下打印二叉树" class="title">剑指offer之从上往下打印二叉树</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-29 02:27</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
从上往下打印出二叉树的每个节点，同层节点从左至右打印。
## 思路 ##
1. 可以利用一个辅助队列queue
2. 先从根节点root开始进入队列
3. 然后进行循环，条件为queue是否为空
4. 循环中，每次将队头节点出队的同时，将该节点的左子树和右子树分别加入队列
5. 这样就保证了从上到下，从左到右的顺序。
6. 这道题目还有一个升级版，就是分层打印，要求每一层分开。
7. 做法就是，每次先统计下一层的节点个数，即当前队列的长度
8. 然后打印相应个数的节点后，再重现获取当前队列的长度，继续循环打印

## python实现 ##
	# -*- coding:utf-8 -*-
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    # 返回从上到下每个节点值列表，例：[1,2,3]
	    def PrintFromTopToBottom(self, root):
	        res=[]
	        if not root:
	            return res
	        queue=[root]
	        while queue:
	            node=queue.pop(0)
	            res.append(node.val)
	            if node.left:
	                queue.append(node.left)
	            if node.right:
	                queue.append(node.right)
	        return res
	    # 题目升级，分层打印
	    def PrintFromTopToBottom2(self, root):
	        res=[]
	        if not root:
	            return res
	        queue=[root]
	        while queue:
	            i=len(queue)
	            layer=[]
	            while i:
	                node=queue.pop(0)
	                i-=1
	                layer.append(node.val)
	                if node.left:
	                    queue.append(node.left)
	                if node.right:
	                    queue.append(node.right)
	            res.append(layer)
	        return res