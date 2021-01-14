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

## 使用gdal读取图片





