<div class="blog-article">
    <h1><a href="p.html?p=\算法\N皇后问题" class="title">N皇后问题</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-09-21 09:16</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div><br/>
## 问题描述

> 这个问题很经典了，简单解释下：给你1个 N×N 的棋盘，让你放置 N 个
皇后，使得它们不能互相攻击。
PS：皇后可以攻击同行、同列、左上左下右上右下四个方向的任意单
位。
这个问题本质上跟全排列问题差不多，决策树的每层表示棋盘上的每
行；每个节点可以做出的选择是，在该行的任意一列放置1个皇后。



## 算法分析

1. 这个问题本质上跟全排列问题差不多，决策树的每一层表示棋盘上的每一行；每个节点可以做出的选择是，在该行的任意某列放置1个皇后。
2. 不同的是每次在选择某一行的某列位置时，需要进行'该位置是否可用'的判断。
3. 判断过程就是：
   1. 判断同列是否已有皇后
   2. 判断左上方向是否有皇后
   3. 判断右上方向是否存在皇后
   4. 同行不需要判断
4. 如果该位置可用，就继续递归到下一层，即下一行。
5. 直到递归到最后的一行的下一行，就记录一个结果到结果集。

## python实现

```python
from copy import deepcopy
def solveNQueens(n):
    board = [['.'] * n for i in range(n)] 
    res = []
    backtrack(board,0,res)
    return res
def backtrack(board, row, res):
    if row == len(board):
        res.append(deepcopy(board))
        return 
    n = len(board[row])
    for col in range(n):
        if not is_valid(board,row,col):
            continue
        board[row][col] = 'Q'
        backtrack(board,row+1,res)
        board[row][col] = '.'

def is_valid(board,row,col):
    for r in range(row):
        if board[r][col] == 'Q':
            return False
    
    r,c = row-1,col-1
    while r>=0 and c>=0:
        if board[r][c] == 'Q':
            return False
        r -=1
        c -=1
    r,c = row-1,col+1
    while r>=0 and c<len(board[row]):
        if board[r][c] == 'Q':
            return False
        r -=1
        c +=1
    return True
```

