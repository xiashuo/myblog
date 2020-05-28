'''
求字符串中不重复连续字串的最长长度
'''
# class Solution:
#     # def lengthOfLongestSubstring(self, s: str) -> int:
#     #     max_lenth, j = 0, 0
#     #     occ = set()
#     #     for i in range(len(s)):
#     #         while j < len(s) and s[j] not in occ:
#     #             occ.add(s[j])
#     #             j += 1
#     #         max_lenth = max(j - i, max_lenth)
#     #         occ.remove(s[i])
#     #     return max_lenth
#
#     def lengthOfLongestSubstring(self, s):
#         """
#         :type s: str
#         :rtype: int
#         """
#         st = {}
#         i, ans = 0, 0
#         for j in range(len(s)):
#             if s[j] in st:
#                 i = max(st[s[j]], i)
#             ans = max(ans, j - i + 1)
#             st[s[j]] = j + 1
#         return ans;
#
# so=Solution()
# print(so.lengthOfLongestSubstring("abcabcbb"))

'''
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，
并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
'''


class RandomListNode:
    def __init__(self, x):
        self.label = x
        self.next = None
        self.random = None


class Solution:
    # 返回 RandomListNode
    def Clone(self, pHead):
        if not pHead:
            return None
        p = pHead
        while p:
            copy_node = RandomListNode(p.label)
            copy_node.next = p.next
            p.next = copy_node
            p = copy_node.next

        p = pHead
        while p:
            p_copy = p.next
            if p.random:
                p_copy.random = p.random.next
            p=p.next.next
        p = pHead
        head=pHead.next
        while p:
            p_copy = p.next
            p.next = p_copy.next
            if p_copy.next:
                p_copy.next = p_copy.next.next
            p = p.next
        return head


node1 = RandomListNode(1)
node2 = RandomListNode(2)
node3 = RandomListNode(3)
node1.next, node1.random = node2, node3
node2.next = node3
node3.random = node2
so = Solution()
res = so.Clone(node1)
print(res.label, res.next.label, res.random.label)
