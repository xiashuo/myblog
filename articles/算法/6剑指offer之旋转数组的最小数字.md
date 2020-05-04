<div class="blog-article">
    <h1><a href="p.html?p=算法/6剑指offer之旋转数组的最小数字" class="title">剑指offer之旋转数组的最小数字</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-21 14:14</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 
>输入一个非递减排序的数组的一个旋转， 输出旋转数组的最小元素。 
>例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转， >该数组的最小值为1。
> NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
## 思路 ##
1. 最简单的也是最笨的方法，直接从头开始遍历，出现第一个后面的元素比当前
元素小的，则当前元素的下一个元素即为所求。这个方法可以过牛客网，但是这并
不是出题人想要的解法，面试时估计就凉了。
2. 二分法：由于所给数组array可以分成前后两个部分，且前后分别都是非递减排
列的,最关键的是，前面部分的值是大于等于后面部分的，可以设置两个下标：low和
high，初始化low=0,high=length-1. mid=int( (low+high)/2),
如果array[mid]<array[high]，说明mid属于后面部分，
则最小值应该在mid左边（包括mid），设置high=mid. 继续查找下去。
如果array[mid]>array[high]，则与上面相反，low=mid。
还有需要考虑的一种情况是，array[mid]=array[high]时，因为题目并没有说元素
不重复，看了网上大家的代码，基本上都是当二者相等时，就从头到尾遍历。
自己琢磨了下，想出了一种做法，此时只需要将high的值减1，然后继续循环即可。
解释：因为最小值应该在high的左边（包括high），二者相等的话，即high左边出
现了和high相同的值，则此时high就可以排除了，所以high--。

## python实现 ##
```python
# -*- coding:utf-8 -*-
class Solution:
    #最笨的方法，从头开始遍历
    def minNumberInRotateArray(self, rotateArray):
        if len(rotateArray)==0:
            return 0
        for i in range(len(rotateArray)-1):
            if rotateArray[i]>rotateArray[i+1]:
                return rotateArray[i+1]
        return rotateArray[0]
    #二分法
    def minNumberInRotateArray2(self, rotateArray):
        if len(rotateArray)==0:
            return 0
        if len(rotateArray)==1:
            return rotateArray[0]
        low,high=0,len(rotateArray)-1
        while rotateArray[low]>=rotateArray[high]:
            if high-low==1:
                return rotateArray[high]
            mid=int((low+high)/2)
            if rotateArray[mid]>rotateArray[high]:
                low=mid
            elif rotateArray[mid] < rotateArray[high]:
                high=mid
            else:
                high -=1
```