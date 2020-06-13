<div class="blog-article">
    <h1><a href="p.html?p=\算法\30剑指offer之连续子数组的最大和" class="title">30剑指offer之连续子数组的最大和</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-06-13 23:28</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

# 题目描述
> HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。今天测试组开完会后,
>他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,
>当向量全为正数的时候,问题很好解决。但是,如果向量中包含负数,
>是否应该包含某个负数,并期望旁边的正数会弥补它呢？例如:{6,-3,-2,7,-15,1,2,2},
>连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，
>返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)

# 算法分析
1. 这道题目比较简单，由于数组中有负数，从头开始累加，如果和为负数了，则从下个
位置再重新开始累加。
2. 设置两个变量：最大和max_sum，当前累加和s，初始值都为第一个元素的值，然后从第2
元素开始遍历累加，进行第1步中的判断，然后每次将s与max_sum进行比较取较大者。

#python实现
```python
class Solution:
    def FindGreatestSumOfSubArray(self, array):
        max_sum, s = array[0], array[0]
        for i in range(1,len(array)):
            if s < 0:
                s = array[i]
            else:
                s += array[i]
            if s > max_sum:
                max_sum = s
        return max_sum
```