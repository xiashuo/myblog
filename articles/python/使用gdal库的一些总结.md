<div class="blog-article">
    <h1><a href="p.html?p=\python\使用gdal库的一些总结" class="title">使用gdal库的一些总结</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2021-01-14 17:34</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div><br/>

## 前言
> 最近项目中涉及到栅格数据与矢量数据（shapefile）的转换，要用到gdal库，关于gdal库的官方文档对python好像也不是很友好，网上的相关教程也相对较少，只能慢慢摸索与折腾，算是对gdal这个库有了一定的认识吧，这里把项目中用到的相关函数做个总结说明。

## gdal库介绍
> GDAL(Geospatial Data Abstraction Library)是一个用于栅格和矢量地理空间数据格式的转换程序库，它利用抽象数据模型来表达所支持的各种文件格式。OGR(OpenGIS Simple Features Reference Implementation)是GDAL项目的一个子项目， 提供对矢量数据的支持。 一般把这两个库合称为GDAL/OGR，或者简称为GDAL。

###  GDAL
GDAL提供对多种栅格数据的支持，包括Arc/Info ASCII Grid(asc)，GeoTiff (tiff)，Erdas Imagine Images(img)，ASCII DEM(dem) 等格式。  

GDAL使用抽象数据模型(abstract data model)来解析它所支持的数据格式，抽象数据模型包括数据集(dataset)， 坐标系统，仿射地理坐标转换(Affine Geo Transform)， 大地控制点(GCPs)， 元数据(Metadata)，栅格波段(Raster Band)，颜色表(Color Table)， 子数据集域(Subdatasets Domain)，图像结构域(Image_Structure Domain)，XML域(XML:Domains)。

GDAL包括如下几个部分：

- GDALMajorObject类：带有元数据的对象。
- GDALDdataset类：通常是从一个栅格文件中提取的相关联的栅格波段集合和这些波段的元数据；GDALDdataset也负责所有栅格波段的地理坐标转换(georeferencing transform)和坐标系定义。
- GDALDriver类：文件格式驱动类，GDAL会为每一个所支持的文件格式创建一个该类的实体，来管理该文件格式。
- GDALDriverManager类：文件格式驱动管理类，用来管理GDALDriver类。

### OGR

OGR提供对矢量数据格式的读写支持，它所支持的文件格式包括：ESRI Shapefiles， S-57， SDTS， PostGIS，Oracle Spatial， Mapinfo mid/mif ， Mapinfo TAB。

OGR包括如下几部分：

- Geometry：类Geometry (包括OGRGeometry等类)封装了OpenGIS的矢量数据模型，并提供了一些几何操作，WKB(Well Knows Binary)和WKT(Well Known Text)格式之间的相互转换，以及空间参考系统(投影)。
- Spatial Reference：类OGRSpatialReference封装了投影和基准面的定义。
- Feature：类OGRFeature封装了一个完整feature的定义，一个完整的feature包括一个geometry和geometry的一系列属性。
- Feature Definition：类OGRFeatureDefn里面封装了feature的属性，类型、名称及其默认的空间参考系统等。一个OGRFeatureDefn对象通常与一个层(layer)对应。
- Layer：类OGRLayer是一个抽象基类，表示数据源类OGRDataSource里面的一层要素(feature)。
- Data Source：类OGRDataSource是一个抽象基类，表示含有OGRLayer对象的一个文件或一个数据库。
- Drivers：类OGRSFDriver对应于每一个所支持的矢量文件格式。类OGRSFDriver由类OGRSFDriverRegistrar来注册和管理。

## 使用gdal读取图片（读取栅格数据）

GDAL原生支持超过100种栅格数据类型，涵盖所有主流GIS与RS数据格式，包括

- ArcInfo grids, ArcSDE raster, Imagine, Idrisi, ENVI, GRASS, GeoTIFF
- HDF4, HDF5
- USGS DOQ, USGS DEM
- ECW, MrSID
- TIFF, JPEG, JPEG2000, PNG, GIF, BMP

完整的支持列表可以参考： [http://www.gdal.org/formats_list.html](http://www.gdal.org/formats_list.html)

### gdal.Open()

```python
from osgeo import gdal

ds = gdal.Open('test.tif')
if not ds:
    print('读取错误')
print(data_set)
```

`<osgeo.gdal.Dataset; proxy of <Swig Object of type 'GDALDatasetShadow *' at 0x00000227A589E600> >`

使用gdal.Open()函数读取一个图片，返回的是一个Dataset对象，该函数内部加入了异常机制，读取错误图片或者路径也不会报错，只会返回一个None。

### 读取栅格数据集的x方向像素数，y方向像素数，和波段数

```python
cols = ds.RasterXSize # 列
rows = ds.RasterYSize # 行
bands = ds.RasterCount # 波段
print(cols,rows,bands) 
```

`2503 1758 3`

### 读取地理坐标参考信息

```python
geo_transform = ds.GetGeoTransform()
print(geo_transform)
```

`(115.4218883553212, 5.364418029785156e-06, 0.0, 29.90889690785206, 0.0, -5.364418029785156e-06)`

返回的geo_transform是一个长度为6的元组（tuble），存储着栅格数据集的地理坐标信息

- geo_transform[0]: 左上角x坐标
- geo_transform[1]: 东西方向上的像素分辨率/像素宽度
- geo_transform[2]:  行旋转（通常为零）
- geo_transform[3]:  左上角y坐标
- geo_transform[4]:  列旋转（通常为零）
- geo_transform[5]:  南北方向上的像素分辨率/像素高度（北上图像为负值）

### 将栅格数据转换成数组

```python
img_array = ds.ReadAsArray(0,0,cols,rows)
print(f'img_array类型：{type(img_array)}')
print(f'shape：{img_array.shape}')
```

`img_array类型：<class 'numpy.ndarray'>
shape：(3, 1758, 2503)`

`ReadAsArray(xoff, yoff, xsize, ysize)`函数有4个参数，表示读取从(xoff,yoff)开始，大小为(xsize,ysize)的矩阵。所以要读取整张图片，就是使用参数(0,0,cols,rows)。

**注意不要搞反了。数学中的矩阵是[row,col]，而这里恰恰相反！这里面row对应y轴，col对应x轴。并且这里返回的图片数组波段数在第一个维度，这也是与其他图片库不一样的地方。**

## 用OGR读写矢量数据

> OGR矢量库：简单的矢量数据读写，是GDAL的一部分
>
> GDAL地理空间数据抽象库： a) 读写栅格数据 b) ArcGIS也是基于GDAL开发的 c) C++库，但是可以用python调用

### 载入数据驱动

要读取某种类型的数据，必须要先载入数据驱动，也就是初始化一个对象，让它“知道”某种数据结构。

```python
import ogr
driver = ogr.GetDriverByName(‘ESRI Shapefile’)
```

### 打开shape文件

数据驱动driver的open()方法返回一个数据源对象

```python
open(<filename>, <update>)
```

其中update为0是只读，为1是可写

```python
from osgeo import ogr

driver = ogr.GetDriverByName('ESRI Shapefile') # 这里驱动名字不区分大小写
datasource = driver.Open('test2.shape/test2.shp',0)
if not datasource:
    print('无法读取')
print(datasource)
```

`<osgeo.ogr.DataSource; proxy of <Swig Object of type 'OGRDataSourceShadow *' at 0x00000227ABC49A20> >`

### 读取数据层

通过了解可以知道，矢量数据的基本结构一般是：一个layer数据层，下面是由多个feature组成的features，每个级别下都有一些属性值。一般情况下只有一个layer层。

```python
layer = datasource.GetLayer(0) # 这里参数是层的索引，表示第0个数据层，不填默认值也是0
print(layer)
```

`<osgeo.ogr.Layer; proxy of <Swig Object of type 'OGRLayerShadow *' at 0x00000227ABC49B10> >`

**获取feature个数**

```python
n = layer.GetFeatureCount()
print(n)
```

`1700`

**读出上下左右边界**

```python
extent = layer.GetExtent()
print('extent:', extent)
```

`extent: (0.0, 2503.0, 0.0, 1758.0)`

**读取某一要素feature**

```python
feat = layer.GetFeature(41) # 获取第41个要素
print(feat.GetField('class')) # 获取‘class’属性的值，这里也可以用索引
print(feat.GetField(0)) # 获取第一个属性的值，这里只有一个属性'class'
```

**遍历所有要素feature**

```python
feat = layer.GetNextFeature() # 读取下一个
while feat:
    feat = layer.GetNextFeature()
    ...
layer.ResetReading() # 复位
```

layer其实也是一个可迭代对象，可以直接用for循环遍历

```python
for feat in layer:
    ...
```

### 释放内存

```python
feature.Destroy()
dataSource.Destroy()
```

### 写入shape文件

**创建新文件**

```python
driver.CreateDataSource(<filename>)
```

**但是这个文件不能已经存在了，否则会出错，可以如下处理就不会报错了：**

```python
if os.path.exists(<filename>):
    driver.DeleteDataSource(<filename>)
driver.CreateDataSource(<filename>)
```

这里的filename其实最终是生成一个文件夹，文件夹名是filename

**添加字段**

```python
fieldDefn1 = ogr.FieldDefn('id', ogr.OFTInteger) # 添加id字段
layer.CreateField(fieldDefn1)
fieldDefn2 = ogr.FieldDefn('class', ogr.OFTString) # 添加class字段
layer.CreateField(fieldDefn2)
```

添加字段只能在layer里面加，需要是ogr.FieldDefn类型，字段的数据类型可以有多种，这里只用了整形和字符串2种

**添加feature**

```python
featureDefn = layer.GetLayerDefn() # layer中读取相应的feature类型
feature = ogr.Feature(featureDefn) # 创建feature
feature.SetGeometry(point) # 设定几何形状
feature.SetField('id', 0) 
feature.SetField('class', 'background')
layer.CreateFeature(feature) # 将feature写入layer
```

添加一个新的feature，首先得完成上一步，把字段field都添加齐了

然后从layer中读取相应的feature类型，并创建feature

然后设定几何形状，设定某字段的数值

最后将feature写入layer



