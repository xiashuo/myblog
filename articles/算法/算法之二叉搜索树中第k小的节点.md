<div class="blog-article">
    <h1><a href="p.html?p=算法/算法之二叉搜索树中第k小的节点" class="title">算法之二叉搜索树中第k小的节点</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-20 02:25</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
>给定一棵二叉搜索树，请找出其中的第k小的结点。例如，（5，3，7，2，4，6，8）
>中，按结点数值大小顺序第三小结点的值为4。
## 思路 ##
1. 这道题抓住关键一点就是搜索二叉树的特性，左子节点 < 父节点 < 右节点。
2. 如果中序遍历搜索二叉树，则结果正好是有序的。
3. 所以我们可以利用中序遍历，比较简单快速的办法就是直接中序遍历整颗二叉搜索树，
然后再返回结果列表的第k个元素，即为第k小的节点。但是这样做的效率不高，
没有必要遍历所有节点。
3. 可以设置两个全局变量index，res。index记录中序遍历返回的节点个数，res为最终返回
的结果。每打返回一个节点， index加1，当index等于k时就停止继续遍历，
直接返回该节点。
## python实现 ##
```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
class Solution:
    # 返回对应节点TreeNode
    def KthNode(self, pRoot, k):
        self.index = 0
        self.res = None
        def kth_node(root):
            if not root:
                return self.res
            kth_node(root.left)
            self.index +=1
            if self.index == k:
                self.res = root
                return self.res
            kth_node(root.right)
            return self.res
        return kth_node(pRoot)
```