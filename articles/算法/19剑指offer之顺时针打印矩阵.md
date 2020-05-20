<div class="blog-article">
    <h1><a href="p.html?p=算法/19剑指offer之顺时针打印矩阵" class="title">剑指offer之顺时针打印矩阵</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-28 06:54</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下矩阵： 
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
## 思路1 ##
1. 先输出矩阵matrix的第一行，然后删除这一行。
2. 然后将矩阵逆时针旋转90度，继续第1步，知道matrix为空
3. 举个例子来说，matrix为[[1,2,3],[4,5,6],[7,8,9]],先打印第一行[1,2,3]，然后剩余为[[4,5,6],[7,8,9]],此时将矩阵旋转，变为[[6,9],[5,8],[4,7]],接着打印第一行[4,7],...
4. 至于矩阵逆时针旋转，也很容易实现，从最后一列，从上到下开始遍历，每一列转变成行即可

## python实现 ##
```python
# -*- coding:utf-8 -*-
class Solution:
    # matrix类型为二维列表，需要返回列表
    def printMatrix(self, matrix):
        res_list = []
        while matrix:
            res_list += matrix.pop(0)
            # 矩阵逆时针旋转
            if matrix:
                matrix = [[matrix[i][j] for i in range(len(matrix))] for j in range(len(matrix[0]) - 1, -1, -1)]
        return res_list
```
## 思路2 ##
1. 我们可以按照矩阵的层数来一层一层的打印
2. 首先求得矩阵matrix的层数(layer=（min（row,col）-1）/2+1
3. 每一层即一个圈包括四个部分，按顺时针分别打印上，右，下，左，设i为当前的层数
4. 第一部分，打印第i行，i到col-2-i列
5. 第二部分，打印第i到row-2-i行，col-1-i列
6. 第三部分，打印第row-1-i行，col-1-i到i列
7. 第四部分，打印第row-1-i到i行，i列
8. 需要注意的是，如果出现某一层只有一列或者一行的情况，则会出现重复打印。
9. 解决办法就是在第二部分和第三部分之前分别判断，如果该部分只有一个值的时候，直接打印，然后退出循环，程序结束。

## python实现 ##
```python
# -*- coding:utf-8 -*-
class Solution:
    # matrix类型为二维列表，需要返回列表
    def printMatrix(self, matrix):
        row=len(matrix)
        col=len(matrix[0])
        layer=(min(row,col)-1)/2+1
        res=[]
        for i in range(layer):
            for j in range(i,col-1-i):
                res.append(matrix[i][j])
            if i==row-1-i:
                res.append(matrix[i][col-1-i])
                break
            for k in range(i,row-1-i):
                res.append(matrix[k][col-1-i])
            if col-1-i==i:
                res.append(matrix[row-1-i][i])
                break
            for l in range(col-1-i,i,-1):
                res.append(matrix[row-1-i][l])
            for m in range(row-1-i,i,-1):
                res.append(matrix[m][i])
        return res
```