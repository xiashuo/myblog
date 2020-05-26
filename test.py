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
输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
'''


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    # 返回二维列表，内部每个列表表示找到的路径

    def FindPath(self, root, expectNumber):
        # write code here
        result, res = [], []
        return None if not root else self.get_path(result, res, root, expectNumber)

    def get_path(self, result, res, root, expectNumber):
        if expectNumber < root.val:
            return result
        res.append(root.val)
        if not root.left and not root.right:
            if root.val == expectNumber:
                result.append(res[:])
        if root.left:
            self.get_path(result, res, root.left, expectNumber - root.val)
        if root.right:
            self.get_path(result, res, root.right, expectNumber - root.val)
        res.pop()
        return result


node1 = TreeNode(10)
node2 = TreeNode(5)
node3 = TreeNode(12)
node4 = TreeNode(4)
node5 = TreeNode(7)
node1.left, node1.right = node2, node3
node2.left, node2.right = node4, node5
so = Solution()
print(so.FindPath(node1, 22))
