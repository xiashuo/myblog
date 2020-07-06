from typing import List


class Solution:
    '''
    求字符串中不重复连续字串的最长长度
    '''

    # def lengthOfLongestSubstring(self, s: str) -> int:
    #     max_lenth, j = 0, 0
    #     occ = set()
    #     for i in range(len(s)):
    #         while j < len(s) and s[j] not in occ:
    #             occ.add(s[j])
    #             j += 1
    #         max_lenth = max(j - i, max_lenth)
    #         occ.remove(s[i])
    #     return max_lenth

    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        st = {}
        i, ans = 0, 0
        for j in range(len(s)):
            if s[j] in st:
                i = max(st[s[j]], i)
            ans = max(ans, j - i + 1)
            st[s[j]] = j + 1
        return ans

    '''
    求出1-13的整数中1出现的次数,并算出100-1300的整数中1出现的次数？
    为此他特别数了一下1~13中包含1的数字有1、10、11、12、13因此共出现6次,
    >但是对于后面问题他就没辙了。 ACMer希望你们帮帮他,并把问题更加普遍化,
    >可以很快的求出任意非负整数区间中1出现的次数。
    2101：

    '''

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
                count += right * (10 ** (i - 1)) + left + 1
            else:
                count += (right + 1) * (10 ** (i - 1))
            i += 1
        return count

    '''
    输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，
    则打印出这三个数字能排成的最小数字为321323。
    '''

    def PrintMinNumber(self, numbers):
        if not numbers:
            return ""
        from functools import cmp_to_key
        str_numbers = list(map(str, numbers))
        str_numbers.sort(key=cmp_to_key(lambda a, b: 1 if a + b > b + a else -1))
        return ''.join(str_numbers)

    """
    把只包含质因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，
    但14不是，因为它包含质因子7。习惯上我们把1当做是第一个丑数。
    求按从小到大的顺序的第N个丑数。
    """

    def GetUglyNumber_Solution(self, index):
        if not index:
            return 0
        index_2, index_3, index_5 = 0, 0, 0
        ugly_numbers = [1]
        for i in range(1, index):
            value_2 = ugly_numbers[index_2] * 2
            value_3 = ugly_numbers[index_3] * 3
            value_5 = ugly_numbers[index_5] * 5
            min_value = min(value_2, value_3, value_5)
            ugly_numbers.append(min_value)
            if min_value == value_2:
                index_2 += 1
            if min_value == value_3:
                index_3 += 1
            if min_value == value_5:
                index_5 += 1
        return ugly_numbers[-1]

    '''
    在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 
    如果没有则返回 -1（需要区分大小写）.（从0开始计数）
    '''

    def FirstNotRepeatingChar(self, s):
        if not s:
            return -1
        char_count = {}
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1
        for i in range(len(s)):
            if char_count[s[i]] == 1:
                return i

    '''
    给定n个非负整数，表示直方图的方柱的高度，同时，每个方柱的宽度假定都为1，试找出直方图中最大的矩形面积
    '''

    def largestRectangleArea(self, list_height: List):
        '''
        递归，不推荐
        :param list_height:
        :return:
        '''
        # width = len(list_height)
        # if not width:
        #     return 0
        # if width == 1:
        #     return list_height[0]
        # min_height = min(list_height)
        # max_area = min_height * width
        # min_index = list_height.index(min_height)
        # left_area = self.largestRectangleArea(list_height[:min_index])
        # right_area = self.largestRectangleArea(list_height[min_index + 1:])
        # return max(left_area, right_area, max_area)
        '''
        用栈
        '''
        if not list_height:
            return 0
        stack = []
        max_area = 0
        length = len(list_height)
        for i in range(length + 1):
            now_rectangle = -1
            if i < length:
                now_rectangle = list_height[i]
            while stack and now_rectangle <= list_height[stack[-1]]:
                this_height = list_height[stack.pop()]
                this_width = i
                if stack:
                    this_width = i - stack[-1] - 1
                max_area = max(max_area, this_width * this_height)
            stack.append(i)
        return max_area


if __name__ == '__main__':
    so = Solution()
    # print(so.NumberOf1Between1AndN_Solution(13))
    # print(so.lengthOfLongestSubstring("ffffdddde"))
    # print(so.PrintMinNumber([3334, 3, 3333332]))
    # print(so.GetUglyNumber_Solution(7))
    print(so.largestRectangleArea([2, 1, 5, 6, 2, 3]))
