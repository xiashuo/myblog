<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之二叉树中和为某一值的路径" class="title">剑指offer之二叉树中和为某一值的路径</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-01 09:28</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一颗二叉树和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
## 思路 ##
1. 这道题思路很简单，就是直接前序遍历二叉树
2. 保存所有访问过的节点的路径route
3. 每当到达叶子节点时，判断当前路径route的和是否等于所给值，如果等于则将这条route加入到所有路径res中
4. 如果不等，就返回到上个节点，返回之前需要将route中的最后一个元素删除，也就是当前叶子节点。
5. 这道题虽然简单，但是坑不少，我用python调了很久才通过。

## python实现 ##
	# -*- coding:utf-8 -*-
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    # 返回二维列表，内部每个列表表示找到的路径
	    def FindPath(self, root, expectNumber):
	        route,res=[],[] #这里如果使用类成员变量，牛客网会有问题，只能作为参数才能过，无语
	        if root:
	            self.travelTree(root,expectNumber,route,res)
	        return res
	    def travelTree(self,root,expectNumber,route,res):
	        route.append(root.val)
	        if root.left:
	            self.travelTree(root.left,expectNumber-root.val,route,res)
	        if root.right:
	            self.travelTree(root.right,expectNumber-root.val,route,res)
	        if not root.left and not root.right and root.val==expectNumber :
	            rote=[ val for val in route] #这个地方也需要注意
	            res.append(rote)
	        route.pop()