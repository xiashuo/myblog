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
输入一个字符串,按字典序打印出该字符串中字符的所有排列。
例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串
abc,acb,bac,bca,cab和cba。
'''


class Solution:
    def Permutation(self, ss):
        return self.all_order(list(ss), 0, len(ss), [])

    def all_order(self, list_ss, k, n, res):
        if k == n-1:
            res.append(''.join(list_ss))
        for i in range(k, n):
            if list_ss[i] in list_ss[k:i]:
                continue
            list_ss[i], list_ss[k], = list_ss[k], list_ss[i]
            self.all_order(list_ss, k + 1, n, res)
            list_ss[k], list_ss[i], = list_ss[i], list_ss[k]
        return res


so = Solution()
print(so.Permutation("abbc"))
