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
输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
'''


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    # 返回合并后列表
    def Merge(self, pHead1, pHead2):
        # write code here
        p = pHead1 if pHead1.val < pHead2.val else pHead2
        if not pHead1:
            return pHead2
        if not pHead2:
            return pHead1
        if pHead1.val < pHead2.val:
            p.next = self.Merge(pHead1.next, pHead2)
        else:
            p.next = self.Merge(pHead1, pHead2.next)
        return p

        # head = ListNode(None)
        # p = head
        # while pHead1 and pHead2:
        #     if pHead1.val < pHead2.val:
        #         p.next = pHead1
        #         pHead1 = pHead1.next
        #         p = p.next
        #     else:
        #         p.next = pHead2
        #         pHead2 = pHead2.next
        #         p = p.next
        # if not pHead1:
        #     p.next=pHead2
        # elif not pHead2:
        #     p.next=pHead1
        # return head.next

        # list_nodes = []
        # while pHead1 and pHead2:
        #     if pHead1.val < pHead2.val:
        #         list_nodes.append(pHead1.val)
        #         pHead1 = pHead1.next
        #     else:
        #         list_nodes.append(pHead2.val)
        #         pHead2 = pHead2.next
        # if not pHead1:
        #     while pHead2:
        #         list_nodes.append(pHead2.val)
        #         pHead2 = pHead2.next
        # elif not pHead2:
        #     while pHead1:
        #         list_nodes.append(pHead1.val)
        #         pHead1 = pHead1.next
        #
        # for i in range(len(list_nodes)-1):
        #     list_nodes[i].next=list_nodes[i+1]
        # list_nodes[-1].next=None
        # return list_nodes[0]
