<div class="blog-article">
    <h1><a href="p.html?p=\算法\算法之有序数组中和为s的两个数" class="title">算法之有序数组中和为s的两个数</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-09-04 15:54</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div><br/>

## 题目描述
> 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，
如果有多对数字的和等于S，输出两个数的乘积最小的。
## 算法分析
1. 这道题最简单最容易想到的方法就是，先从左往右遍历有序数组，每轮得到一个值 $a$，
然后再查找 $sum-a$ 是否在 $a$ 后面的元素中，如果在，即为所求。时间复杂度：$O(n^2)$
2. 哈希法：上面的方法可以改进成用哈希（字典），先遍历数组，将所有元素存入字典，然后再遍历一遍
数组，在字典中去查找$sum-a$,时间复杂度：$O(n)$,空间复杂度：$O(n)$
3. 题目里要求两个数的乘积最小，从数学知识可知：当$a+b=s$时，a 和 b的差值越大，乘积
越小。这里因为数组本身是有序的，所以从左往右遍历过程中第一个满足条件的解即为乘积最小的
### 哈希法python实现
```python
class Solution:
    # 哈希法
    def FindNumbersWithSum(self, array, tsum):
        dict_val = {}
        for val in array:
            dict_val[val] = val
        for val in array:
            if dict_val.get(tsum-val,-1) != -1:
                return [val,tsum-val]
        return []
```
3. 双指针法：因为数组是有序的，所以可以用双指针，指向数组的首尾，具体步骤如下：
    1. 初始化：指针i指向数组首， 指针j指向数组尾部
    2. 如果arr[i] + arr[j] == sum , 说明是解
    3. 否则如果arr[i] + arr[j] > sum, 说明和太大，所以--j
    4. 否则如果arr[i] + arr[j] < sum, 说明和太小，所以++i

### 双指针法python实现
```python
# 双指针法
class Solution:
    def FindNumbersWithSum(self, array, tsum):
        i,j = 0,len(array)-1
        while i<j:
            s = array[i] + array[j]
            if s>tsum:
                j-=1
            elif s<tsum:
                i+=1
            else:
                return [array[i],array[j]]
        return []
```