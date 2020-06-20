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
        # 简单除暴法
        # count = 0
        # for i in range(1, n + 1):
        #     count += str(i).count("1")
        # return count
        # i, low, high, cur, temp = 1, 0, n, 0, 0
        # count = 0
        # while high:
        #     temp = n % (10 ** i)
        #     high = n // (10 ** i)
        #     cur = temp // (10 ** (i - 1))
        #     low = temp % (10 ** (i - 1))
        #     if cur < 1:
        #         count += high * (10 ** (i - 1))
        #     elif low == 1:
        #         count += high *(10 ** (i - 1)) + low + 1
        #     else:
        #         count += (high + 1) * (10 ** (i - 1))
        #     i += 1
        # return count
        i, high, low, cur, tmp = 1, n, 0, 0, 0
        count = 0
        while high:
            high = n / (10 ** i)
            tmp = n % (10 ** i)
            cur = tmp / (10 ** (i - 1))
            low = tmp % (10 ** (i - 1))
            if cur == 1:
                count += high * (10 ** (i - 1)) + low + 1
            elif cur > 1:
                count += (high + 1) * (10 ** (i - 1))
            else:
                count += high * (10 ** (i - 1))
            i += 1
            return count


if __name__ == '__main__':
    so = Solution()
    print(so.NumberOf1Between1AndN_Solution(13))
