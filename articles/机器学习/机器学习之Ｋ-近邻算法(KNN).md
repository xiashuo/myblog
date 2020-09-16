<div class="blog-article">
    <h1><a href="p.html?p=机器学习/机器学习之Ｋ-近邻算法(KNN)" class="title">机器学习之Ｋ-近邻算法(KNN)</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2017-09-18 14:36</span>
    <span><a href="tags.html?t=机器学习" class="tag">机器学习</a></span>
    </div>
<br/>

## 算法描述 ##
　　它的工作原理是：存在一个样本数据集合，也称作训练样本集，并且样本集中每个数据都存在标签，即我们知道样本集中每一数据与所属分类的对应关系。输入没有标签的新数据后，将新数据的每个特征与样本集中数据对应的特征进行比较，然后算法提取样本集中特征最相似数据（最近邻）的分类标签。一般来说，我们只选择样本数据集中前k个最相似的数据，这就是k-近邻算法中k的出处，通常k是不大于20的整数。最后，选择k个最相似数据中出现次数最多的分类，作为新数据的分类。
## 导入数据 ##
```python
 from numpy import *
 def createDataSet():
     dataSet=array([[1,1],[1,0],[3,3],[3,4]])
     labels=['A','A','B','B']
     return dataSet,labels
```

　　这里创建4组数据，每组数据有两个我们已知的属性或者特征值。dateSet矩阵每行包含一个
不同的数据。向量labels包含了每个数据点的标签信息， labels包含的元素个数等于dateSet矩阵行数。

## 实施 kNN 算法 ##
### 伪代码如下： ###
对未知类别属性的数据集中的每个点依次执行以下操作：

1. 计算已知类别数据集中的点与当前点之间的距离;
2. 按照距离递增次序排序；
3. 选取与当前点距离最小的k个点；
4. 确定前k个点所在类别的出现频率；
5. 返回前k个点出现频率最高的类别作为当前点的预测分类。

### 算法实现 ###
```python
import operator
def classify(inX, dataSet, labels, k):
    dataSetSize = dataSet.shape[0] # 数据集大小
    # 计算距离
    diffMat = tile(inX, (dataSetSize, 1)) - dataSet 
    sqDiffMat = diffMat**2
    sqDistances = sqDiffMat.sum(axis=1) #按行相加
    distances = sqDistances**0.5
    # 按距离排序
    sortedDistIndicies = distances.argsort()
    # 统计前k个点所属的类别
    classCount = {}
    for i in range(k):
        votaIlabel = labels[sortedDistIndicies[i]]
        classCount[votaIlabel] = classCount.get(votaIlabel, 0) + 1
    sortedClassCount = sorted(classCount.iteritems(), key=operator.itemgetter(1), reverse=True)
    # 返回前k个点中频率最高的类别
    return sortedClassCount[0][0]
```

　　classify()函数有4个输入参数：用于分类的输入向量是inX，输入的训练样本集为dataSet，标签向量为labels，最后的参数k表示用于选择最近邻居的数目，其中标签向量的元素数目和矩阵dataSet的行数相同。使用欧氏距离公式，计算两个向量点xA和xB之间的距离。

　　计算完所有点之间的距离后，可以对数据按照从小到大的次序排序。然后，确定前k个距离最小元素所在的主要分类 ，输入k总是正整数；最后，将classCount字典分解为元组列表，然后使用程序第二行导入运算符模块的itemgetter方法，按照第二个元素的次序对元组进行排序 。此处的排序为逆序，即按照从最大到最小次序排序，最后返回发生频率最高的元素标签。

### 运行结果 ###
```python
if __name__=="__main__":
    data_set,labels=createDataSet()
    input=array([2,2])
    output_label=knn_classify(input,data_set,labels,3)
    print("标签为：",output_label)
```

输出结果应该是Ａ，大家也可以改变输入[２, ２]为其他值，测试程序的运行结果

## 相关函数学习 ##
### shape函数 读取矩阵的维度

		In [1]: from numpy import *
		
		In [2]: shape([2])
		Out[2]: (1,)
		In [3]: shape([[1,2]])
		Out[3]: (1, 2)
		In [5]: shape([[1],[2]])
		Out[5]: (2, 1)
		In [6]: e=eye(3)
		In [7]: e
		Out[7]:
		array([[ 1.,  0.,  0.],
		       [ 0.,  1.,  0.],
		       [ 0.,  0.,  1.]])
		In [8]: shape(e)
		Out[8]: (3, 3)
		In [9]: e.shape
		Out[9]: (3, 3)
		In [10]: e.shape[0]
		Out[10]: 3

### tile函数 将数组重复n次构成新的数组

		In [11]: a=[1,2,3]
		
		In [12]: b=tile(a,2)
		
		In [13]: b
		Out[13]: array([1, 2, 3, 1, 2, 3])
		
		In [14]: b=tile(a,[2,1])
		
		In [15]: b
		Out[15]:
		array([[1, 2, 3],
		       [1, 2, 3]])
		
		In [16]: b=tile(a,[1,2])
		
		In [17]: b
		Out[17]: array([[1, 2, 3, 1, 2, 3]])
		
		In [18]: b=tile(a,[2,2])
		
		In [19]: b
		Out[19]:
		array([[1, 2, 3, 1, 2, 3],
		       [1, 2, 3, 1, 2, 3]])

### sum函数 求和

		In [20]: sum([1,2])
		Out[20]: 3
		In [22]: sum([[1,2],[3,4]])
		Out[22]: 10
		
		In [23]: sum([[1,2],[3,4]],axis=0) #按列求和
		Out[23]: array([4, 6])
		
		In [24]: sum([[1,2],[3,4]],axis=1) #按行就和
		Out[24]: array([3, 7])

### Argsort函数 返回数组值从小到大的索引值

		In [25]: x=[1,2,3]
		
		In [26]: argsort(x)
		Out[26]: array([0, 1, 2], dtype=int64)
		
		In [27]: x=[[1,2],[0,3]]
		
		In [28]: argsort(x) #默认是按行排序
		Out[28]:
		array([[0, 1],
		       [0, 1]], dtype=int64)
		
		In [29]: argsort(x,axis=0) #按列排序
		Out[29]:
		array([[1, 0],
		       [0, 1]], dtype=int64)
		
		In [30]: argsort(x,axis=1) #按行排序
		Out[30]:
		array([[0, 1],
		       [0, 1]], dtype=int64)

### 字典访问的几种方式 Iteritems 函数

		In [1]: dict = {'Name': 'Zara','Age':27,'sex':'男'}
		   ...: for key in dict:
		   ...:     print (key ,dict[key])
		   ...:     print (key + str(dict[key]))
		   ...:
	
		Age 27
		Age27
		Name Zara
		NameZara
		sex 男
		sex男
这里可以看出dict是无序的

		In [14]: for (k,v) in dict.items():
		    ...:     print ("dict[%s]="%k,v)
		    ...:
		dict[Age]= 27
		dict[Name]= Zara
		dict[Sex]= 男
		In [18]: for i in dict.items():
		    ...:     print (i)
		    ...:
		('Age', 27)
		('Name', 'Zara')
		('Sex', '男')

### operator.itemgetter函数

		In [33]: import operator
		
		In [34]: a=[[1,2],[3,4],'gg']
		
		In [35]: b=operator.itemgetter(2,0) #获取对象索引为2和索引为0的值
		
		In [36]: b(a)
		Out[36]: ('gg', [1, 2])

### Sorted函数 sorted(iterable,key, reverse)

		In [37]: students = [('john', 'A', 15), ('jane', 'B', 12), ('dave', 'B', 10)] 
		
		In [38]: sorted(students, key=operator.itemgetter(2)) #根据第3个域进行排序
		Out[38]: [('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
		
		In [39]: sorted(students, key=operator.itemgetter(1,2))
		Out[39]: [('john', 'A', 15), ('dave', 'B', 10), ('jane', 'B', 12)]  #优先根据第2个域排序，再根据第3个域排序。
key为函数，指定取待排序元素的哪一项进行排序

reverse参数，是一个bool变量，默认为false升序排列，True降序排列