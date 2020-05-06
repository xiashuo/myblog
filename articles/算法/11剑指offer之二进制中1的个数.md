<div class="blog-article">
    <h1><a href="p.html?p=算法/11剑指offer之二进制中1的个数" class="title">剑指offer之二进制中1的个数</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-06-23 09:18</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div>
<br/>

## 题目描述 ##
> 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。
## 思路 ##
1. 看到这个题目，正常想法就是，从最低位到最高位逐个判断，n&1的值表示最低位，
若为1则count++，然后n右移一位，继续循环，直到n为0为止。
2. 通过实施发现上面的方法是有问题的，因为当n为负数时，会陷入死循环。
原因是，负数是补码的形式，最高位为1，每次n右移一位后，最高位又会自动变成1，
这就会导致有无数个1，陷入死循环。
3. 一种解决办法是，令flag=1，然后每次将flag左移，而不是右移n ，c代码如下：

```
class Solution {
public:
     int  NumberOf1(int n) {
         int count=0;
         int flag=1;
         while (flag){
             if (n&flag){ //因为这个地方的n&flag并不一定为1，所以不能写成count+=n&flag这种形式
                 count++;
             }
             flag=flag<<1;
         }
         return count;
     }
};
```
4. 还有一种解决办法是，先将负数的补码形式直接转换成正数（n&0x7FFFFFFF,
整数是4个字节，一共32位），然后就不会出现死循环了，需要注意的是，
转换成正数后，最高位始终为0，所以少算了1个1，要加上，c代码如下：

```
class Solution {
public:
     int  NumberOf1(int n) {
         int count=0;
         if (n<0){
             n=n&0x7FFFFFFF;
             count++;
         }
         while (n){
             count +=n&1;
             n=n>>1;
         }
         return count;
     }
};
```
5. 还有一种很巧妙的方法，也是最优解，不会出现上面的那种死循环的情况。
思路如下：首先，一个数n如果不为0，则说明n的二进制表示中一定存在1，
这是循环的条件。n-1的二进制表示，实际上代表的是将n最右边的第一个1，
以及它右边的数全部取反，例如n=1100（即n=10）,n-1=1011。我们将n&（n-1）
可得1000,这实际上是将n的最右边第一个1变成了0.那么方法来了，n中一共有多少个1，
则就可以执行多少次n&（n-1）。

```
class Solution {
public:
     int  NumberOf1(int n) {
         int count=0;
         while (n){
             count ++;
             n=n&(n-1);
         }
         return count;
     }
};
```
6. 最后说说用python做这道题，这道题的题设整数是用32位表示的，最高位为符号位，
负数是补码形式，而在python中，与c，java是不一样的，整数并不是32位表示的，
貌似可以表示无穷位，者也是python牛逼的地方，所以这里是个最大的坑，
解决办法上面也提到过，就是将负数转换成32位的正整数，即n&0x7FFFFFFF,
然后记得count要加1。代码如下：

```python
# -*- coding:utf-8 -*-
class Solution:
    def NumberOf1(self, n):
        count=0
        if n<0:
            n=n&0x7FFFFFFF
            count +=1
        while n:
            # count += 1
            # n = n & (n - 1)
            count += n & 1
            n = n >> 1
        return count
```