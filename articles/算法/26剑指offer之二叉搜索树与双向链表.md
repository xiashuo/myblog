<div class="blog-article">
    <h1><a href="p.html?p=算法/26剑指offer之二叉搜索树与双向链表" class="title">剑指offer之二叉搜索树与双向链表</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-02 06:48</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。
## 思路1 ##
1. 将左子树构造成双链表，并返回链表头节点。
2. 定位至左子树双链表最后一个节点。
3. 如果左子树链表不为空的话，将当前root追加到左子树链表。
4. 将右子树构造成双链表，并返回链表头节点。
5. 如果右子树链表不为空的话，将该链表追加到root节点之后。
6. 根据左子树链表是否为空确定返回的节点，不为空返回头节点，否则返回root

## python实现 ##
```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
class Solution:
    def Convert(self, pRootOfTree):
        if not pRootOfTree:
            return None
        left = self.Convert(pRootOfTree.left)
        right = self.Convert(pRootOfTree.right)
        if right:
            pRootOfTree.right = right
            right.left = pRootOfTree
        if not left:
            return pRootOfTree
        p = left
        while p.right:
            p = p.right
        p.right = pRootOfTree
        pRootOfTree.left = p

        return left
```
## 思路2 ##
1. 上面的方法理解和写起来需要点时间，还有一种笨方法，理解起来容易，调起来也快，这也是我第一反应会使用的方法，考试时为了节省时间，可以用。
2. 直接中序遍历二叉搜索树，将遍历结果保存到列表nodes中
3. 然后遍历列表nodes，分别设置前后只想left，right
4. 最后返回第一个节点即可

## python实现 ##
```python
def Convert(self, pRootOfTree):
        if not pRootOfTree:
            return None
        nodes=self.Travel(pRootOfTree,[])
        nodes[0].left=None
        for i in range(len(nodes)-1):
            nodes[i].right=nodes[i+1]
            nodes[i+1].left=nodes[i]
        nodes[-1].right=None
        return nodes[0]
def Travel(self,root,res):
    if not root:
        return res
    self.Travel(root.left,res)
    res.append(root)
    self.Travel(root.right,res)
    return res
```