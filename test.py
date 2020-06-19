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

'''






