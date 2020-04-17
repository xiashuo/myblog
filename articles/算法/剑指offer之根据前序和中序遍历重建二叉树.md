<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之根据前序和中序遍历重建二叉树" class="title">剑指offer之根据前序和中序遍历重建二叉树</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-20 06:36</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

## 思路 ##
1. 前序遍历结果pre的第一位是根节点root。
2. 通过root的值求得中序遍历结果tin中root的索引值index，index左边的所有节点构成左子树，右边为右子树。

3. 此时，root的左子树的前序遍历为pre[1:index+1],中序遍历为tin[:index];root的右子树的前序遍历为pre[index+1:],中序遍历为tin[index+1:]。
4. 上面的过程就变成了子问题，所以递归求解，每次返回根节点root。
5. 递归的大致过程：如果当前前序或者中序（二者其实是同步的，判断一个为空即可）为空，则返回None，否则，求得根节点root，以及左子树和右子树的前序，中序遍历结果，然后递归。

## python实现 ##
	# -*- coding:utf-8 -*-
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    # 返回构造的TreeNode根节点
	    def reConstructBinaryTree(self, pre, tin):
	        # write code here
	        if not pre:
	            return None
	        root=TreeNode(pre[0])
	        index=tin.index(pre[0])
	        root.left=self.reConstructBinaryTree(pre[1:index+1],tin[:index])
	        root.right=self.reConstructBinaryTree(pre[index+1:],tin[index+1:])
	        return root