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
数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，
超过数组长度的一半，因此输出2。如果不存在则输出0。
'''


class Solution:
    def GetLeastNumbers_Solution(self, tinput, k):
        if k > len(tinput):
            return []
        tinput.sort()
        return tinput[:k]

    def GetLeastNumbers_Solution2(self, tinput, k):
        if k > len(tinput):
            return []
        for i in range(k):
            min_index = i
            for j in range(i + 1, len(tinput)):
                if tinput[j] < tinput[min_index]:
                    min_index = j
            tinput[i], tinput[min_index] = tinput[min_index], tinput[i]
        return tinput[:k]


so = Solution()
res = so.GetLeastNumbers_Solution2([4, 5, 1, 6, 2, 7, 3, 8], 4)
print(res)
