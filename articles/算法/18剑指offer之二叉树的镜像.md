<div class="blog-article">
    <h1><a href="p.html?p=算法/18剑指offer之二叉树的镜像" class="title">剑指offer之二叉树的镜像</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-27 09:21</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 操作给定的二叉树，将其变换为源二叉树的镜像。
## 思路 ##
1. 这道题思路很简单，从根节点开始前序遍历每个节点，然后将每个节点的左右节点交换即可。
2. 可以递归实现，递归代码很简单，几行就搞定。
3. 也可以非递归方法，需要利用一个辅助结构，栈或者队列都可以，将每个节点按层的顺序放入list中。
4. 同时将每个节点的左右节点交换

## python实现 ##
```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
class Solution:
    # 返回镜像树的根节点
    #递归方法
    def Mirror(self, root):
        if not root:
            return None
        root.left,root.right=self.Mirror(root.right),self.Mirror(root.left)
        return root
    #非递归
    def Mirror(self, root):
        if not root:
            return None
        stack=[]
        stack.append(root)
        while stack:
            cur_node=stack.pop()
            cur_node.left,cur_node.right=cur_node.right,cur_node.left
            if cur_node.left:
                stack.append(cur_node.left)
            if cur_node.right:
                stack.append(cur_node.right)
        return root
```