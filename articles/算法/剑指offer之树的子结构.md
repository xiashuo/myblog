<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之树的子结构" class="title">剑指offer之树的子结构</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-27 08:52</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
## 思路1 ##
1. 这道题我第一反应能想到一种笨方法，虽然笨，但是理解起来比较容易，所以还是记录下。
2. 首先将两颗二叉树都遍历一遍，任何一种遍历都行，我这里用前序遍历。
3. 将两颗二叉树的前序遍历结果存在两个列表list1和list2中
4. 此时，问题就转换成了求两个数组之间的子结构问题。
5. 用一般的模式匹配方法就能解决上述问题，过程很简单，不描述了，看代码就能明白。

## python代码 ##
	# -*- coding:utf-8 -*-
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    def HasSubtree(self, pRoot1, pRoot2):
	        if not pRoot1 or not pRoot2:
	            return False
	        list1=self.traveTree(pRoot1)
	        list2=self.traveTree(pRoot2)
	        i,j=0,0
	        while i<len(list1) and j<len(list2):
	            if list1[i].val==list2[j].val:
	                j+=1
	            i+=1
	        if j==len(list2):
	            return True
	        return False
	    def traveTree(self,root):
	        if not root:
	            return [] 
	        res=[]
	        res.append(root)
	        res.extend(self.traveTree(root.left))
	        res.extend(self.traveTree(root.right))
	        return res
## 思路2 ##
1. 看了大家的答案，基本上很一致的都是一种思想，只是写法不同，当然这种方法理解起来更难，反正我自己是想不到。
2. 需要借助一个辅助函数isSametree（root1,root2）,这个函数的作用是判断两棵树的结构是否一样。
3. 函数的过程如下：利用递归，如果root1的值和root2的值相等，则继续看他们的左子树和右子树的根节点是否相等，必须同时相等才返回true
4. 如果不相等，则返回false
4. 递归终止条件有两个：如果root2为空，则说明已经匹配成功了，返回true；如果root2不为空，root1为空，返回false
5. 在主函数HasSubtree（proot1，proot2）中，有三种情况，proot1和proot2两颗树是否相同，proot1的左子树是否包含proot2，proot1的右子树是否包含proot2，这三种情况只要有一种情况为真即可，所以是或的关系。
6. 还有就是要注意题设所说，空树不是任何树的子树

## python实现 ##
	# -*- coding:utf-8 -*-
	class TreeNode:
	    def __init__(self, x):
	        self.val = x
	        self.left = None
	        self.right = None
	class Solution:
	    def HasSubtree(self, pRoot1, pRoot2):
	        if not pRoot1 or not pRoot2:
	            return False
	        return self.isSametree(pRoot1,pRoot2) or self.HasSubtree(pRoot1.left,pRoot2) or\
	               self.HasSubtree(pRoot1.right, pRoot2)
	    def isSametree(self,root1,root2):
	        if not root2:
	            return True
	        if not root1:
	            return False
	        if root1.val==root2.val:
	            return self.isSametree(root1.left,root2.left) and self.isSametree(root1.right,root2.right)
	        return False