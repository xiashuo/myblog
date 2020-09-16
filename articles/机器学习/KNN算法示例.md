<div class="blog-article">
    <h1><a href="p.html?p=机器学习/KNN算法示例" class="title">KNN算法示例</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2018-01-10 05:19</span>
    <span><a href="tags.html?t=机器学习" class="tag">机器学习</a></span>
    </div>
<br/>

## 示例1：使用 k-近邻算法改进约会网站的配对效果
这里只是一个小小的例子，并没有标题看起来那么牛逼。简单描述下，就是通过查看一个约会对象的某几个特征值，做出判断，将其分类为3类：

- 不喜欢的人
- 魅力一般的人
- 极具魅力的人

样本数据中主要包含一下3种特征：

- 每年获得的飞行常客里程数
- 玩视频游戏所耗时间百分比
- 每周消费的冰淇淋公升数

### 准备数据：从文本文件中解析数据
数据存放在文本文件datingTestSet.txt中，每个样本数据占据一行，总共有1000行，每一行有4个值，前3个为特征值，最后1个值为分类标签值，1，2，3分别对应上面说的3类。

在将上述特征数据输入到分类器之前，必须将待处理数据的格式改变为分类器可以接受的格式。创建名为load_data 的函数，以此来处理输入格式问题。该函数的输入为文件名字符串，输出为训练样本矩阵和类标签向量。

```python
def load_data(filename):
fr=open(filename)
arrayLines=fr.readlines()
nums=len(arrayLines)
dataMat=np.zeros([nums,3])
labels=np.zeros(nums)
index=0
for line in arrayLines:
    line_list=line.strip()
    line_list=line_list.split('\t')
    dataMat[index]=line_list[0:3]
    labels[index]=line_list[-1]
    index+=1
return dataMat,labels
```
执行 load_data 函数，创建样本矩阵和类标签向量。

```python
dataMat,labels=load_data('datingTestSet.txt')
print(dataMat)
print(labels[:20])
```
结果：

	[[  4.09200000e+04   8.32697600e+00   9.53952000e-01]
	 [  1.44880000e+04   7.15346900e+00   1.67390400e+00]
	 [  2.60520000e+04   1.44187100e+00   8.05124000e-01]
	 ..., 
	 [  2.65750000e+04   1.06501020e+01   8.66627000e-01]
	 [  4.81110000e+04   9.13452800e+00   7.28045000e-01]
	 [  4.37570000e+04   7.88260100e+00   1.33244600e+00]]
	[ 3.  2.  1.  1.  1.  1.  3.  3.  1.  3.  1.  1.  2.  1.  1.  1.  1.  1. 2.  3.]
### 分析数据：使用 Matplotlib 创建散点图
```python
import matplotlib.pyplot as plt
fig=plt.figure()
ax=fig.add_subplot(111)
ax.scatter(dataMat[:,0],dataMat[:,1],15.0*labels,15.0*labels)
plt.show()
```
输出效果如图所示。散点图使用 dataMat 矩阵的第1列、第2列数据，分别表示特征值“每年获取的飞行常客里程数”和“玩视频游戏所耗时间百分比”。图中清晰地标识了三个不同的样本分类区域，具有不同爱好的人其类别区域也不同。 

![](assets/images/2018/01/piauas17dujr1q222p2p21vgv3.png)
### 准备数据：归一化数值
计算不同样本直接的距离时，需要先对各个特征的数值进行归一化处理，因为有的特征数值很大，如‘每年飞行常客里程数’，这对距离的计算结果影响很大，因为在我们看来，这三种特征是同等重要的，所以权重应该相同，通过下面的公式将各个特征数值转换到0-1之间。
$$xNormed = \frac{x - min}{max - min}$$  
min表示最小值，max表示最大值，分别对数据矩阵的每一列即每个特征做上述处理，在python中的实现如下：

```python
def autoNorm(dataSet):
    minVals=dataSet.min(0)
    maxVals=dataSet.max(0)
    m=len(dataSet)
    data_norm=np.zeros(np.shape(dataSet))
    data_norm=dataSet-np.tile(minVals,(m,1))
    data_norm=data_norm/np.tile(maxVals-minVals,(m,1))
    return data_norm
```
执行 autoNorm 函数对原始数据进行归一化处理

```python
dataSet=autoNorm(dataMat)
print(dataSet)
```
结果：

	[[ 0.44832535  0.39805139  0.56233353]
	 [ 0.15873259  0.34195467  0.98724416]
	 [ 0.28542943  0.06892523  0.47449629]
	 ..., 
	 [ 0.29115949  0.50910294  0.51079493]
	 [ 0.52711097  0.43665451  0.4290048 ]
	 [ 0.47940793  0.3768091   0.78571804]]

### 测试算法：作为完整程序验证分类器
之前已经写了KNN算法的实现，这里直接给出：

```python
import operator
def KNN(intX,dataSet,labels,k=3):
    m=len(dataSet)
    distances=dataSet-np.tile(intX,[m,1])
    distances=np.square(distances)
    distances=np.sqrt(distances.sum(1))
    index_sorted=np.argsort(distances)
    result_list={}
    for i in range(k):
        vote_label=labels[index_sorted[i]]
        result_list[vote_label]=result_list.get(vote_label,0)+1
    result_list=sorted(result_list.items(),key=operator.itemgetter(1),reverse=True)
    predict=result_list[0][0]
    return predict
```
执行下面的代码，对数据进行测试 ：

```python
dev_rate=0.1
m=dataSet.shape[0]
test_num=int(dev_rate*m)
error_count=0.0
for i in range(test_num):
    predict=KNN(dataSet[i],dataSet[test_num:],labels[test_num:])
    if (predict!=labels[i]):
        error_count+=1
    print("predict %d: %d, true label: %d"%(i,predict,labels[i]))
error_rate=error_count/test_num
print("error rate is ",error_rate)
```
需要说明的是，这里用了10%的样本用作测试分类器，其余的用于训练。正常情况下，测试数据应该随机选取，但是这里的数据本身就没有按照特定目的来排序，所以这里直接选取的前10%的样本作为测试不会对随机性产生影响。这里用的是分类错误率来检测分类器的性能，最终100个测试样本分类结果错误率为 5%，结果还可以。
## 示例2：手写数字识别系统
这里使用的手写数字数据是纯文本格式的，数字从0到9，宽高为32*32，有效数字部分的数值为1，其余部分数值为0。例如下面这种形式就表是 0。

00000000000111110000000000000000
00000000001111111000000000000000
00000000011111111100000000000000
00000000111111111110000000000000
00000001111111111111000000000000
00000011111110111111100000000000
00000011111100011111110000000000
00000011111100001111110000000000
00000111111100000111111000000000
00000111111100000011111000000000
00000011111100000001111110000000
00000111111100000000111111000000
00000111111000000000011111000000
00000111111000000000011111100000
00000111111000000000011111100000
00000111111000000000001111100000
00000111111000000000001111100000
00000111111000000000001111100000
00000111111000000000001111100000
00000111111000000000001111100000
00000011111000000000001111100000
00000011111100000000011111100000
00000011111100000000111111000000
00000001111110000000111111100000
00000000111110000001111111000000
00000000111110000011111110000000
00000000111111000111111100000000
00000000111111111111111000000000
00000000111111111111110000000000
00000000011111111111100000000000
00000000001111111111000000000000
00000000000111111110000000000000
### 准备数据：将图像转换为测试向量 
为了测试前面例子的分类器，需要先将上述格式的文件转换成1 * 1024的向量。先写一个读取数据，并转化为向量的函数如下：

```python
def img_vector(filename):
    return_vector=np.zeros([1,1024])
    fr=open(filename)
    for i in range(32):
        line_vals=fr.readline()
        for j in range(32):
            return_vector[0,32*i+j]=line_vals[j]
    return return_vector
```
该函数是读取单个文件的前32行，并将每行的前32个字符值存储在numpy数组中，返回的数组shape为（1，1024）。上面的函数只是针对单个文件的读取与处理，下面需要读取所有的训练和测试数据，并转换成向量形式，在load_data 函数中实现。

```python
from os import listdir
def load_data(filepath):
    filenames=listdir(filepath)
    m=len(filenames)
    returnMat=np.zeros([m,1024])
    labels=[]
    for i in range(m):
        filename=filenames[i]
        label=filename.split('.')[0]
        label=label.split('_')[0]
        returnMat[i]=img_vector(filepath+'/'+filename)
        labels.append(label)
    return returnMat,labels    
```
这里的listdir可以列出给定目录的所有文件名，所有文件均以0_0,0_1这种形式命名，第一个0表示标签为0，第二个表示标签0的第一张和第二张。所以根据文件名分别读取所有样本，并获取每个样本对应的标签，转换成向量形式返回。执行上面的函数，获得训练和测试的数据，代码如下：

```python
training_data,training_labels=load_data('digits/trainingDigits')
test_data,test_labels=load_data('digits/testDigits')
```
### 测试算法：使用 k-近邻算法识别手写数字 
下面通过前面的分类器来测试上面获取的数据，代码如下：

```python
test_num=test_data.shape[0]
true_count=0.0
for i in range(test_num):
    predict=KNN(test_data[i],training_data,training_labels)
    if (predict==test_labels[i]):
        true_count+=1
#     print("predict %d: %s, true label: %s"%(i,predict,test_labels[i]))
accurate=true_count/test_num
print("accurate is ",accurate)
```
这里使用的正确率来评价分类器的效果，即测试集中分类正确的样本除以总测试样本数，最终识别正确率大约为98.9%。