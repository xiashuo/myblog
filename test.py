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
    def MoreThanHalfNum_Solution1(self, numbers):
        dict_number = {}
        half_lenth = len(numbers) / 2
        for val in numbers:
            dict_number[val] = dict_number.get(val, 0) + 1
            if dict_number[val] > half_lenth:
                return val
        return 0

    def MoreThanHalfNum_Solution2(self, numbers):
        count, val = 1, numbers[0]
        for i in range(1, len(numbers)):
            if numbers[i] == val:
                count += 1
            else:
                count -= 1
            if count == 0:
                count = 1
                val = numbers[i]
        return val if numbers.count(val) > len(numbers) / 2 else 0
