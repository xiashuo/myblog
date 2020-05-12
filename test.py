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
输入一个链表，反转链表后，输出新链表的表头。
'''


class Solution:
    # 返回ListNode
    # def ReverseList(self, pHead):
    #     # write code here
    #     if not pHead:
    #         return None
    #     list_nodes=[]
    #     while pHead:
    #         list_nodes.insert(0,pHead)
    #         pHead=pHead.next
    #     for i in range(len(list_nodes)-1):
    #         list_nodes[i].next=list_nodes[i+1]
    #     list_nodes[-1].next=None
    #     return list_nodes[0]
    # def ReverseList(self, pHead):
    #     # write code here
    #     p1= None
    #     while pHead:
    #         p2 = pHead.next
    #         pHead.next = p1
    #         p1 = pHead
    #         pHead = p2
    #     return p1
    def ReverseList(self, pHead):
        # write code here
        if not pHead:
            return None
        if pHead.next:
            node=self.ReverseList(pHead.next)
            node.next=pHead
        return pHead
