<div class="blog-article">
    <h1><a href="p.html?p=\算法\20剑指offer之包含min函数的栈" class="title">20剑指offer之包含min函数的栈</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-05-20 23:44</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

# 题目描述
> 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
注意：保证测试中不会当栈为空的时候，对栈调用pop()或者min()或者top()方法。

# 解题思路
1. 既然是定义栈，首先肯定是需要一个stack列表来实现栈。stack=[]
2. 栈的pop(),top(),push()都比较容易，主要是这里的min()函数要求时间复杂度
为O(1)，而栈是无序的，所以不能通过遍历来找最小值。
3. 这里考虑借助一个辅助栈,min_stack=[],min_stack中只存入当前最小的元素。
即stack栈每次push()时，判断当前要入栈的元素是否比min_stack栈顶元素小，是就
压入到min_stack栈中，否则不压入。每次min()时返回min_stack栈顶元素，及
min_stack[-1]为最小元素。
4. 当stack栈pop()操作的时候，需要判断一下，stack栈顶与min_stack栈顶元素是否相同，
如果相同，则min_stack栈也需要pop()。此时表示stack栈中最小元素已经出栈，而
min_stack也同样出栈了，所以此时min_stack栈顶元素依然为当前最小元素。

# python代码
```python
class Solution:
    stack = []
    min_stack = []

    def push(self, node):
        self.stack.append(node)
        if not self.min_stack or node < self.min_stack[-1]:
            self.min_stack.append(node)

    def pop(self):
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def min(self):
        return self.min_stack[-1]
```