<div class="blog-article">
    <h1><a href="p.html?p=算法/算法之二叉搜索树中第k小的节点" class="title">算法之二叉搜索树中第k小的节点</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-20 02:25</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
给定一棵二叉搜索树，请找出其中的第k小的结点。例如， （5，3，7，2，4，6，8）    中，按结点数值大小顺序第三小结点的值为4。
## 思路 ##
这道题抓住关键一点就是搜索二叉树的特性，左子节点 < 父节点 < 右节点。

如果中序遍历搜索二叉树，则结果正好是有序的。

所以我们可以利用中序遍历，比较简单快速的办法就是直接中序遍历整颗二叉搜索树，然后再返回结果列表的第k个元素，即为第k小的节点。但是这样做的效率不高，没有必要遍历所有节点。

可以设置一个全局变量count，记录中序遍历返回的节点个数，每打返回一个节点，count加1，当count等于k时就停止继续遍历，直接返回该节点。
## python实现 ##
	class Solution:
	    # 返回对应节点TreeNode
	    count=0
	    def KthNode(self, pRoot, k):
	        if not pRoot:
	            return None
	        res=self.KthNode(pRoot.left,k)
	        if res:
	            return res
	        self.count +=1
	        if self.count==k:
	            return pRoot
	        res=self.KthNode(pRoot.right,k)
	        return res