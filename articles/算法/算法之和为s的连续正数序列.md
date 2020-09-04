<div class="blog-article">
    <h1><a href="p.html?p=算法/算法之和为s的连续正数序列" class="title">算法之和为s的连续正数序列</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-07-08 03:39</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。
但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,
他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,
你能不能也很快的找出所有和为S的连续正数序列? Good Luck!
## 数学法 ##
1. 这道题基本上是数学方法，利用连续正数的求和公式 $\frac{(a_1+a_k)*k}{2}$,
这里$a_k=a_1+k-1$，带入上面的式子得：（2*a1+k-1）*k/2，令tsum=（2*a1+k-1）*k/2,
求得： a1=（2*tsum/k -k+1）/2
2. 这里我们可以枚举k，k表示个数，k的值从2开始，k的上界需要简单的数学不等式求解。
简单分析就能知道，当a1=1时，k可以取得最大，此时（1+k）*k/2=tsum,
由上式tsum > k*k/2  ==> k<math.sqrt(2*tsum)
3. 枚举k的范围为[2,math.sqrt(2*tsum)),k为整数，根据公式求得a1,如果a1值为整数，
则满足条件，将[a1,a1+1 ... a1+k-1]添加到结果集

剩下的就是写代码了

### python实现
```python
from math import sqrt
class Solution:
    # 数学方法
    def FindContinuousSequence(self, tsum):
        result = []
        for i in range(int(sqrt(2*tsum)),1,-1):
            x = ((2*float(tsum)/i)-i+1) / 2
            if round(x)==x:
                result.append([j for j in range(int(x),int(x+i))])
        return result
```

## 滑动窗口法
1. 首先是一个窗口，既然是一个窗口，就需要用窗口的左边界i和右边界j来唯一表示一个
窗口，其次，滑动代表，窗口始终从左往右移动，这也表明左边界i和右边界j始终会往后移动，
而不会往左移动。
2. 滑动窗口的操作
    - 扩大窗口，j += 1
    - 缩小窗口，i += 1
3. 算法步骤

    1.初始化，i=1,j=1, 表示窗口大小为0  
    2.如果窗口中值的和小于目标值sum， 表示需要扩大窗口，j += 1  
    3.否则，如果狂口值和大于目标值sum，表示需要缩小窗口，i += 1  
    4.否则，等于目标值，存结果，缩小窗口，继续进行步骤2,3,4 

### python实现
```python
def FindContinuousSequence(self, tsum):
    # 初始化窗口
    l,r = 1,1
    sum = 0
    result = []
    # 因为至少要包括2个数，所以l < tsum/2
    while l < tsum/2:
        # 比目标和小，累加，增大窗口，窗口右边加1
        if sum < tsum:
            sum +=r
            r +=1
        # 比目标和大，减去最左边的数字，减小窗口，窗口左边加1
        elif sum > tsum:
            sum -=l
            l +=1
        # 相等，将窗口中的数字添加到结果，减去最左边的数字，窗口减小，窗口左边加1
        else:
            result.append([i for i in range(l,r)])
            sum -=l
            l +=1
    return result   
```