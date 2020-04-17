<div class="blog-article">
    <h1><a href="p.html?p=深度学习/tensorflow中的批标准化" class="title">tensorflow中的批标准化</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2017-10-25 14:53</span>
    <span><a href="tags.html?t=深度学习" class="tag">深度学习</a></span>
    </div>
<br/>

　　批标准化（batch normalization,BN）是为了克服神经网络层数加深导致难以训练而诞生的。我们知道，深度神经网络随着深度加深，收敛速度变慢，常常会有梯度消失问题。
## 方法
　　批标准化一般用在非线性映射（激活函数）之前，对x=W*u+b做规范化，使结果（输出信号各个维度）的均值为0，方差为1.让每一层的输入有一个稳定的分布会有利于网络的训练。
## 优点
　　批标准化通过规范化让激活函数分布在线性区间，结果是增大了梯度，让模型更加大胆的梯度下降，于是有以下优点：
- 加大探索的步长，加快收敛速度；
- 更容易跳出局部最小值；
- 破坏原来的数据分布，一定程度上缓解过拟合。

## 示例
　　对每层的Wx_plus_b进行批标准化，这个步骤放在激活函数之前：

	＃计算Wx_plus_b的均值和方差
	fc_mean,fc_var=tf.nn.moments(Wx_plus_b,axes=0) #按列求均值和方差
	scale=tf.Variable(tf.ones([out_size]))
	offset=tf.Variable(tf.zeros([out_size]))
	epsilon=0.001
	Wx_plus_b=tf.nn.batch_normalization(Wx_plus_b,fc_mean,fc_var,offset,	scale,epsilon)
	#其实也就是在做：
	#Wx_plus_b=(Wx_plus_b-fc_mean)/tf.sqrt(fc_var+epsilon)
	#Wx_plus_b=Wx_plus_b * scale+offset
详细的关于批标准化的理论可以查看经典论文[《Batch Normalization:Accelerating Deep Network Training by Reducing Internal Covariate Shift》](http://noahsnail.com/2017/09/04/2017-9-4-Batch%20Normalization%E8%AE%BA%E6%96%87%E7%BF%BB%E8%AF%91%E2%80%94%E2%80%94%E4%B8%AD%E6%96%87%E7%89%88/)