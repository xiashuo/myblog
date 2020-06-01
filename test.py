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
输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针random指向一个随机节点），请对此链表进行深拷贝，
并返回拷贝后的头结点。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
'''


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def Convert(self, pRootOfTree):
        if not pRootOfTree:
            return None
        left = self.Convert(pRootOfTree.left)
        right = self.Convert(pRootOfTree.right)
        if right:
            pRootOfTree.right = right
            right.left = pRootOfTree
        if not left:
            return pRootOfTree
        p = left
        while p.right:
            p = p.right
        p.right = pRootOfTree
        pRootOfTree.left = p

        return left


# {10,6,14,4,8,12,16}
node1 = TreeNode(10)
node2 = TreeNode(6)
node3 = TreeNode(14)
node4 = TreeNode(4)
node5 = TreeNode(8)
node6 = TreeNode(12)
node7 = TreeNode(16)
node1.left, node1.right = node2, node3
node2.left, node2.right = node4, node5
node3.left, node3.right = node6, node7

so = Solution()
head = so.Convert(node1)
p = head
while p:
    print(p.val, end=" ")
    if not p.right:
        break
    p = p.right

while p:
    print(p.val, end=" ")
    p = p.left
