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
输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
'''


# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
#
#
# class Solution:
#     def HasSubtree(self, pRoot1, pRoot2):
#         # write code here
#         if not pRoot1 or not pRoot2:
#             return False
#         return self.is_same_root_sub_tree(pRoot1, pRoot2) or self.HasSubtree(pRoot1.left,
#                                                                              pRoot2) or self.HasSubtree(
#             pRoot1.right, pRoot2)
#
#     def is_same_root_sub_tree(self, root1, root2):
#         if not root2:
#             return True
#         if not root1:
#             return False
#         if root1.val == root2.val:
#             return self.is_same_root_sub_tree(root1.left, root2.left) and self.is_same_root_sub_tree(root1.right,
#                                                                                                      root2.right)
#         return False


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def HasSubtree(self, pRoot1, pRoot2):
        if not pRoot1 or not pRoot2:
            return False
        str1 = self.inorder_traveTree(pRoot1)
        str2 = self.inorder_traveTree(pRoot2)
        return True if str2 in str1 else False

    def inorder_traveTree(self, root):
        if not root:
            return ""
        res = ""
        res += str(root.val)
        res += self.inorder_traveTree(root.left)
        res += self.inorder_traveTree(root.right)
        return res


node1 = TreeNode(8)
node2 = TreeNode(8)
node3 = TreeNode(7)
node4 = TreeNode(9)
node5 = TreeNode(2)
node6 = TreeNode(4)
node7 = TreeNode(7)
node1.left = node2
node1.right = node3
node2.left = node4
node2.right = node5
node5.left = node6
node5.right = node7

node8 = TreeNode(8)
node9 = TreeNode(9)
node10 = TreeNode(2)
node8.left = node9
node8.right = node10
so = Solution()
print(so.HasSubtree(node1, node8))
