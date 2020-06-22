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
求出1-13的整数中1出现的次数,并算出100-1300的整数中1出现的次数？
为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,
>但是对于后面问题他就没辙了。 ACMer希望你们帮帮他,并把问题更加普遍化,
>可以很快的求出任意非负整数区间中1出现的次数。
2101：

'''


class Solution:
    def NumberOf1Between1AndN_Solution(self, n):
        # i表示从右边起的第i位（个：1，百：2 。。。）
        # cur表示当前位的数字
        # left表示当前位左边的所有数字，right表示当前位右边的所有数字。
        # 例如：2593，如果当前计算十位的1的个数，即i=2，cur=9，left=25,right=3
        i, left, right, cur, temp = 1, 0, n, 0, 0
        count = 0
        while right:
            temp = n % (10 ** i)
            right = n // (10 ** i)
            cur = temp // (10 ** (i - 1))
            left = temp % (10 ** (i - 1))
            if cur < 1:
                count += right * (10 ** (i - 1))
            elif cur == 1:
                count += right *(10 ** (i - 1)) + left + 1
            else:
                count += (right + 1) * (10 ** (i - 1))
            i += 1
        return count


if __name__ == '__main__':
    so = Solution()
    print(so.NumberOf1Between1AndN_Solution(13))
