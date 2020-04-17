<div class="blog-article">
    <h1><a href="p.html?p=算法/剑指offer之删除链表中重复的节点" class="title">剑指offer之删除链表中重复的节点</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-17 09:29</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 
例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
## 非递归思路 ##
因为要删除某些重复的节点，需要保存待删除的连续重复节点的前一个节点的位置，

所以我们可以设置两个指针p1和p2，p1指向前一个节点，p2为当前节点。

因为可能从第一个节点开始就是重复的，所以最后返回的头节点时不确定的，

这里可以建立一个空节点head，并指向链表的第一个节点，head.next=pHead，最后返回head的下一个节点即可。

初始 p1=head，p2=pHead

进入循环，如果p2.val=p2.next.val,就一直循环向右遍历，直到p2的下一个节点值与p2不等为止。

此时，执行删除操作，将p1指向p2的下一个节点：p1.next=p2.next，然后p2后移继续循环。

如果p2.val != p2.next.val，p1,p2分别后移一位，继续循环，直到遍历结束。

最后返回head.next
### 非递归实现  ###
	def deleteDuplication(self, pHead):
	        if not pHead:
	            return pHead
	        head=ListNode(None)
	        head.next=pHead
	        p1,p2=head,pHead
	        while p2 and p2.next:
	            if p2.val==p2.next.val:
	                while p2.next and p2.val==p2.next.val:
	                    p2=p2.next
	                p1.next=p2.next
	                p2=p1.next
	            else:
	                p1=p1.next
	                p2=p2.next
	        return head.next
## 递归思路 ##
递归方法与上面的思想差不多，递归的思想就是个逆过程，转换成子问题。

每次从当前问题链表划分成两个部分，头结点phead和后续链表，每次返回当前问题的头节点。

如果phead与下一个节点值不等，则phead.next=下一个子问题的解（deleteDuplication（phead.next））

如果相等，则一直向右遍历直到不等为止，记录位置为phead，并返回phead，即当前问题的头节点。

递归的终止条件为：当phead为空，或者phead.next为空时，就返回phead本身。
### 递归实现 ###
	def deleteDuplication(self, pHead):
	        if not pHead or not pHead.next:
	            return pHead
	        if pHead.val==pHead.next.val:
	            pHead=pHead.next
	            while pHead.next and pHead.val==pHead.next.val:
	                pHead=pHead.next
	            pHead=pHead.next
	            return self.deleteDuplication(pHead)
	        else:
	            pHead.next=self.deleteDuplication(pHead.next)
	        return  pHead