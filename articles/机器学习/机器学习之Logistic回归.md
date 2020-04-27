<div class="blog-article">
    <h1><a href="p.html?p=机器学习/机器学习之Logistic回归" class="title">机器学习之Logistic回归</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2017-09-28 10:14</span>
    <span><a href="tags.html?t=机器学习" class="tag">机器学习</a></span>
    </div>
<br/>

　　假设现在有一些数据点，我们用一条直线对这些点进行拟合（该线称为最佳拟合直线），这个拟合过程就称作**回归**。利用Logistic回归进行分类的主要思想是：根据现有数据对分类边界线建立回归公式，以此进行分类。
## Sigmoid 函数 ##
　　我们想要的函数应该是，能接受所有的输入然后预测出类别。例如，在两个类的情况下，上述函数输出0或1。所以这里就用到了Sigmoid函数，Sigmoid函数具体的计算公式如下：

$$\sigma(z)= \frac {1}{1+e^{-z}}$$

　　下图给出了Sigmoid函数在不同坐标尺度下的两条曲线图。当x为0时， Sigmoid
函数值为0.5。随着x的增大，对应的Sigmoid值将逼近于1；而随着x的减小，Sigmoid
值将逼近于0。

　　因此，为了实现Logistic回归分类器，我们可以在每个特征上都乘以一个回归系数，
然后把所有的结果值相加，将这个总和代入Sigmoid函数中，进而得到一个范围在0~1之
间的数值。任何大于0.5的数据被分入1类，小于0.5即被归入0类。所以， Logistic
回归也可以被看成是一种概率估计。

![](assets/images/2017/09/qcv6r2k6pqgnppuvrb705miquk.png)

## 基于最优化方法的最佳回归系数确定 ##
Sigmoid函数的输入记为z，由下面公式得出：

$$ z=w_{0}x_{0}+w_{1}x_{1}+...+w_{k}x_{k} $$

　　如果采用向量的写法，上述公式可以写成 $z = w^Tx$，它表示将这两个数值向量对应元素相乘然后全部加起来即得到z值。其中的向量x是分类器的输入数据，向量w也就是我们要找到的最佳参数（系数），从而使得分类器尽可能地精确。为了寻找该最佳参数，需要用到最优化理论的一些知识。
### 梯度上升法 ###
　这里用的最优化方法是梯度上升法。梯度上升法基于的思想是：要找到某函数的最大值，最好的方法是沿着该函数的梯度方向探寻。梯度算子总是指向函数值增长最快的方向。这里所说的是移动方向，而未提到移动量的大小。该量值称为步长，记做α。用向量来表示的话，梯度上升算法的迭代公式如下：

$$w:=w+\alpha\triangledown wf(w)$$

　　该公式将一直被迭代执行，直至达到某个停止条件为止，比如迭代次数达到某个指定值或算法达到某个可以允许的误差范围。
### 训练算法：使用梯度上升找到最佳参数 ###
**Logistic 回归梯度上升优化算法**

	#便利函数，主要功能是打开文本文件testSet.txt并逐行读取。
	def loadDataSet():
	    dataMat = []; labelMat = [] #数据集和标签集
	    fr = open('testSet.txt') #该文件每行前两个值分别是X1和X2，第三个值是数据对应的类别标签。
	    for line in fr.readlines():
	        lineArr = line.strip().split()
	        dataMat.append([1.0, float(lineArr[0]), float(lineArr[1])]) #为了方便计算，这里将X0的值设为1.0。
	        labelMat.append(int(lineArr[2]))
	    return dataMat,labelMat
	
	def sigmoid(inX):
	    return 1.0/(1+exp(-inX))
	
	def gradAscent(dataMatIn, classLabels):
	    dataMatrix = mat(dataMatIn)             #转换成numpy矩阵
	    labelMat = mat(classLabels).transpose() #转换成numpy矩阵，并转置
	    m,n = shape(dataMatrix)   #获取行值m和列的值n
	    alpha = 0.001            #变量alpha是向目标移动的步长
	    maxCycles = 500          #maxCycles是迭代次数
	    weights = ones((n,1))   #初始化weights，n行，1列，全为1
	    for k in range(maxCycles):              #迭代
	        h = sigmoid(dataMatrix*weights) #h是m行，1列的矩阵
	        # print(h)
	        error = (labelMat - h)              #计算真实类别与预测类别的差值
	        # print(error)
	        weights = weights + alpha * dataMatrix.transpose()* error #按照该差值的方向调整回归系数
	        # print(weights)
	    return weights     #返回训练好的回归系数
**输入下面代码测试：**

	dataArr,labelMat=loadDataSet()
    print(gradAscent(dataArr,labelMat))
**结果：**

	[[ 4.12414349]
	 [ 0.48007329]
	 [-0.6168482 ]]
### 分析数据：画出决策边界 ###
**画出数据集和Logistic回归最佳拟合直线的函数**

	def plotBestFit(weights):
	    dataMat,labelMat=loadDataSet()
	    dataArr = array(dataMat)
	    n = shape(dataArr)[0]
	    xcord1 = []; ycord1 = [] #分类为1的点
	    xcord2 = []; ycord2 = [] #分类为0的点
	    for i in range(n):
	        if int(labelMat[i])== 1:
	            xcord1.append(dataArr[i,1]); ycord1.append(dataArr[i,2])
	        else:
	            xcord2.append(dataArr[i,1]); ycord2.append(dataArr[i,2])
	    fig = plt.figure()
	    ax = fig.add_subplot(111)
	    ax.scatter(xcord1, ycord1, s=30, c='red', marker='s')
	    ax.scatter(xcord2, ycord2, s=30, c='green')
	    x = arange(-3.0, 3.0, 0.1) #从-3.0到3.0，间隔为0.1，即[-3.0,-2.9,-2.8,...2.9,3.0]
	    y = (-weights[0]-weights[1]*x)/weights[2] #这里就是W[0]*1+W[1]*X+W[2]*Y=0的变形，等于0就是sigmoid函数为0，0为分界点。
	    ax.plot(x, y)
	    plt.xlabel('X1'); plt.ylabel('X2');
	    plt.show()
**输入下面的代码测试：**

	dataArr,labelMat=loadDataSet()
    weights=gradAscent(dataArr,labelMat)
    plotBestFit(weights.getA())　#需要将weight转换成numpy.array形式。
**结果：**

![](assets/images/2017/09/ogscvhdkveg13ogilfol60atqc.png)

　　这个分类结果相当不错，从图上看只错分了两到四个点。但是，尽管例子简单且数据集很小，这个方法却需要大量的计算（300次乘法）。下面将对该算法稍作改进，从而使它可以用在真实数据集上。
### 训练算法：随机梯度上升 ###
　　梯度上升算法在每次更新回归系数时都需要遍历整个数据集，该方法在处理100个左右的数据集时尚可，但如果有数十亿样本和成千上万的特征，那么该方法的计算复杂度就太高了。一种改进方法是一次仅用一个样本点来更新回归系数，该方法称为**随机梯度上升算法**。由于可以在新样本到来时对分类器进行增量式更新，因而随机梯度上升算法是一个**在线学习算法**。与“**在线学习**”相对应，一次处理所有数据被称作是“**批处理**”。

**随机梯度上升算法**

	def stocGradAscent1(dataMatrix, classLabels, numIter=200):#第三个参数是迭代次数，默认200次
	    m,n = shape(dataMatrix)
	    weights = ones(n)   #initialize to all ones
	    for j in range(numIter): #迭代
	        dataIndex = list(range(m))#返回的是[0,1,2,...m-1,m]
	        for i in range(m):
	            alpha = 4/(1.0+j+i)+0.0001    #alpha在每次迭代的时候都会调整
	            randIndex = int(random.uniform(0,len(dataIndex)))#这里通过随机选取样本来更新回归系数。
	            h = sigmoid(sum(dataMatrix[randIndex]*weights))
	            error = classLabels[randIndex] - h
	            weights = weights + alpha * error * dataMatrix[randIndex]
	            del(dataIndex[randIndex])
	    return weights
**测试代码：**

	dataArr,labelMat=loadDataSet()
	weights=stocGradAscent１(array(dataArr),labelMat) #这里需要将dataArr转换成numpy.array形式
	plotBestFit(weights)
**结果：**

![](assets/images/2017/09/tgctfahpsiil6rph0sc5dueuhh.png)

　　改进后的随机梯度上升法，分类效果和之前差不多，但是所使用的计算量更少。
## 示例：从疝气病症预测病马的死亡率 ##
　　下面将使用Logistic回归来预测患有疝病的马的存活问题。这里的数据包含368个样本和28个特征。疝病是描述马胃肠痛的术语。然而，这种病不一定源自马的胃肠问题，其他问题也可能引发马疝病。该数据集中包含了医院检测马疝病的一些指标，有的指标比较主观，有的指标难以测量，例如马的疼痛级别。

　　另外需要说明的是，除了部分指标主观和难以测量外，该数据还存在一个问题，数据集中有30%的值是缺失的。下面将首先介绍如何处理数据集中的数据缺失问题，然后再利用Logistic回归和随机梯度上升算法来预测病马的生死。
### 准备数据：处理数据中的缺失值 ###
　　数据中的缺失值是个非常棘手的问题，有很多文献都致力于解决这个问题。那么，数据缺失究竟带来了什么问题？假设有100个样本和20个特征，这些数据都是机器收集回来的。若机器上的某个传感器损坏导致一个特征无效时该怎么办？此时是否要扔掉整个数据？这种情况下，另外19个特征怎么办？它们是否还可用？答案是肯定的。因为有时候数据相当昂贵，扔掉和重新获取都是不可取的，所以必须采用一些方法来解决这个问题。

　　下面给出了一些可选的做法：

- 使用可用特征的均值来填补缺失值；
- 使用特殊值来填补缺失值，如1；
- 忽略有缺失值的样本；
- 使用相似样本的均值添补缺失值；
- 使用另外的机器学习算法预测缺失值。

　　在预处理阶段需要做两件事：第一，所有的缺失值必须用一个实数值来替换，因为我们使用的NumPy数据类型不允许包含缺失值。这里选择实数0来替换所有缺失值，恰好能适用于Logistic回归。这样做的直觉在于，我们需要的是一个在更新时不会影响系数的值。回归系数的更新公式如下：

　　$$weights = weights + alpha * error * dataMatrix[randIndex]$$

　　如果dataMatrix的某特征对应值为0，那么该特征的系数将不做更新，即：

　　$$weights = weights$$

　　另外，由于sigmoid(0)=0.5，即它对结果的预测不具有任何倾向性，因此上述做法也不会对误差项造成任何影响。基于上述原因，将缺失值用0代替既可以保留现有数据，也不需要对优化算法进行修改。此外，该数据集中的特征取值一般不为0，因此在某种意义上说它也满足“特殊值”这个要求。<br>
　　预处理中做的第二件事是，如果在测试数据集中发现了一条数据的类别标签已经缺失，那么我们的简单做法是将该条数据丢弃。这是因为类别标签与特征不同，很难确定采用某个合适的值来替换。采用Logistic回归进行分类时这种做法是合理的，而如果采用类似kNN的方法就可能不太可行。<br>
　　原始的数据集经过预处理之后保存成两个文件： horseColicTest.txt和horseColicTraining.txt。如果想对原始数据和预处理后的数据做个比较，可以在http://archive.ics.uci.edu/ml/datasets/Horse+Colic浏览这些数据。
### 测试算法：用 Logistic 回归进行分类 ###
　　使用Logistic回归方法进行分类并不需要做很多工作，所需做的只是把测试集上每个特征向量乘以最优化方法得来的回归系数，再将该乘积结果求和，最后输入到Sigmoid函数中即可。如果对应的Sigmoid值大于0.5就预测类别标签为1，否则为0。

**Logistic回归分类函数**

	def classifyVector(inX, weights):
	    prob = sigmoid(sum(inX*weights))
	    if prob > 0.5: return 1.0
	    else: return 0.0

	def colicTest():
	    frTrain = open('horseColicTraining.txt')
	    frTest = open('horseColicTest.txt')
	    trainingSet = []; trainingLabels = []
	    for line in frTrain.readlines():
	        currLine = line.strip().split('\t')
	        lineArr =[]
	        for i in range(21): #将每个样本的前20个特征和最后一个标签分开存储到相应矩阵
	            lineArr.append(float(currLine[i]))
	        trainingSet.append(lineArr)
	        trainingLabels.append(float(currLine[21]))
	    trainWeights = stocGradAscent1(array(trainingSet), trainingLabels, 500) #利用随机梯度上升函数计算回归系数向量，迭代500次
	    errorCount = 0; numTestVec = 0.0 #错误次数和测试样本数量
	    for line in frTest.readlines():
	        numTestVec += 1.0
	        currLine = line.strip().split('\t')
	        lineArr =[]
	        for i in range(21):
	            lineArr.append(float(currLine[i]))
	        if int(classifyVector(array(lineArr), trainWeights))!= int(currLine[21]):
	            errorCount += 1
	    errorRate = (float(errorCount)/numTestVec)
	    print("the error rate of this test is: %f" % errorRate)
	    return errorRate

	#调用函数colicTest()10次并求结果的平均值。
	def multiTest():
	    numTests = 10; errorSum=0.0
	    for k in range(numTests):
	        errorSum += colicTest()
	    print ("after %d iterations the average error rate is: %f" % (numTests, errorSum/float(numTests)))
**测试：**

	multiTest()
**结果：**

	the error rate of this test is: 0.298507
	the error rate of this test is: 0.343284
	the error rate of this test is: 0.298507
	the error rate of this test is: 0.268657
	the error rate of this test is: 0.343284
	the error rate of this test is: 0.402985
	the error rate of this test is: 0.313433
	the error rate of this test is: 0.343284
	the error rate of this test is: 0.388060
	the error rate of this test is: 0.223881
	after 10 iterations the average error rate is: 0.322388
　　从上面的结果可以看到， 10次迭代之后的平均错误率为32.2388%。事实上，这个结果并不差，因
为有30%的数据缺失。
## 小结 ##
　　机器学习的一个重要问题就是如何处理缺失数据。这个问题没有标准答案，取决于实际应用中的需求。现有一些解决方案，每种方案都各有优缺点。<br>
　　Logistic回归的目的是寻找一个非线性函数Sigmoid的最佳拟合参数，求解过程可以由最优化算法来完成。在最优化算法中，最常用的就是梯度上升算法，而梯度上升算法又可以简化为随机梯度上升算法。<br>
　　随机梯度上升算法与梯度上升算法的效果相当，但占用更少的计算资源。此外，随机梯度上升是一个在线算法，它可以在新数据到来时就完成参数更新，而不需要重新读取整个数据集来进行批处理运算。