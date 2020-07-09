<div class="blog-article">
    <h1><a href="p.html?p=\算法\算法之求数组中最小的k个数" class="title">算法之求数组中最小的k个数</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-06-10 23:03</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

# 题目描述
> 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，
> 则最小的4个数字是1,2,3,4,。

# 思路
1. 这道题可以通过的方法很多，但是效率不一样。
2. 可以直接排序，然后返回前k个数。但是当n比k大很多时，就做了很多无用功。
3. 可以用冒泡排序，选择排序，外层只循环k次，得到最小的k个数就可以。复杂度为O(k*n)，
选择排序的交换次数更少一点。
4. 可以用类似插入排序，借助一个长度为k辅助列表，然后排好序，默认可以直接取前k个数。
然后从第k+1个数开始遍历（下标为k），如果当前值比辅助列表中的最大值（最后一个元素）小，
则删除辅助列表中的最后一个元素，并把当前值有序插入到辅助列表中，类似插入排序的步骤。
直到遍历结束，返回辅助列表即为结果。该方法应该比上面的方法要好。

# python实现

```python
class Solution:
    # 这里用的选择排序法，冒泡就不写了
    def GetLeastNumbers_Solution(self, tinput, k):
        if k > len(tinput):
            return []
        for i in range(k):
            min_index = i
            for j in range(i + 1, len(tinput)):
                if tinput[j] < tinput[min_index]:
                    min_index = j
            tinput[i], tinput[min_index] = tinput[min_index], tinput[i]
        return tinput[:k]
    # 类似插入排序法
    def GetLeastNumbers_Solution(self, tinput, k):
        if k > len(tinput):
            return []
        list_k = tinput[:k]
        list_k.sort()
        for i in range(k, len(tinput)):
            j = k - 1
            while j >= 0 and tinput[i] < list_k[j]:
                j -= 1
            list_k.insert(j + 1, tinput[i])
            list_k.pop()

        return list_k    
```