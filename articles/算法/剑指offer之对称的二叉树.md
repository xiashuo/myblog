<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之对称的二叉树" class="title">剑指offer之对称的二叉树</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-18 02:21</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。
## 思路 ##
如果一个一颗二叉树是对称的，则从根节点root开始，root的左节点和右节点值相等，然后左节点的左节点和右节点的右节点、左节点的右节点和右节点的左节点值相等...

所以上述的过程很容易用递归实现，递归函数参数为左右对称的两个节点：

从根节点开始，如果左右子节点left和right相等，则递归调用left.left，right.right和left.right，right.left。

递归终止条件有3个：

1. 如果左右对称节点不相等时，直接返回False
2. 如果左右对称节点都为空时，返回True
3. 如果左右对称节点只有一个为空时，返回False

## python实现 ##
	# -*- coding:utf-8 -*-
	'''
	第五十八题
	请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，
	定义其为对称的。
	'''
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    def isSymmetrical(self, pRoot):
	        if not pRoot:
	            return True
	        return self.judge(pRoot.left,pRoot.right)
	    def judge(self,left,right):
	        if not left:
	            return not right
	        if not right:
	            return False
	        if left.val!=right.val:
	            return False
	        return self.judge(left.left,right.right) and self.judge(left.right,right.left)