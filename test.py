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
大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0，第1项是1）。
n<=39
'''

# class Solution:
#     # def Fibonacci(self, n):
#     #     # write code here
#     #     if n == 0 or n == 1:
#     #         return n
#     #     return self.Fibonacci(n - 1) + self.Fibonacci(n - 2)
#     def Fibonacci(self, n):
#         if n == 0 or n == 1:
#             return n
#         a, b = 0, 1
#         for i in range(2, n + 1):
#             a, b = b, a + b
#         return b
#
# so = Solution()
# print(so.Fibonacci(4))

'''
一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
'''


class Solution:
    def jumpFloorII(self, number):
        # write code here
        # if number == 1:
        #     return number
        # a,b=1,1
        # for i in range(2, number + 1):
        #     a,b=a+b,a+b
        # return b
        return 2 ** (number - 1)
