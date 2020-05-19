<div class="blog-article">
    <h1><a href="p.html?p=\python\python中的类型标注" class="title">python中的类型标注</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-05-19 22:01</span>
    <span><a href="tags.html?t=python" class="tag">python</a></span>
    </div>
<br/>

# Python语言的设计理念：

- 代码简洁自由,开发效率高

- 其他语言：

  ​	int number = 100;
  ​    number = "007";  x 错误

- python:

	​	number = 100
	​	number = "007"
	
- 类型标注：
	
	​	number:int = 100

# 缺点

​        不利于开发大型项目。
​        制作
​            def 函数名(参数名称):
​                ...
​        使用
​            函数名(?)

# Typing 类型标注

> python3.5 新功能,可以为变量增加类型标注(标记注释).

## 作用

- 易于理解
- 类型检查
- 方便开发

## 语法

- 变量名:类型
- -> 返回值类型

- \# type:类型

## typing

- List[类型] 标注列表元素的类型
- Union[类型1,类型2] 标注可以选择的多种类型
- Optional[类型1,类型2] 相当于Union[类型1,类型2,None]



# 类型标注实例

```python
from typing import Union
from typing import Optional
from typing import List


# 类别  疫情信息模型                #               套餐

class EpidemicInformationModel:
    """
        疫情信息模型
    """

    def __init__(self, region, confirmed, cure, dead=0):
        """
            创建疫情信息对象
        :param region:地区
        :param confirmed:确诊人数
        :param cure:治愈人数
        :param dead:死亡人数
        """
        self.region = region  # type:str
        self.confirmed = confirmed  # 确诊人数     小吃
        self.cure = cure  # 治愈人数               冷饮
        self.dead = dead  # 死亡人数               冰激凌


# 类别  疫情信息管理器                              麦当劳

class EpidemicInformationManager:
    """
        疫情信息管理器
    """

    def __init__(self):

        # 疫情列表

        self.__list_epidemics = [] # type:List[EpidemicInformationModel]
    
    def add_epidemic_info(self, info: EpidemicInformationModel):
        self.__list_epidemics.append(info)
    

    # 在文件开头 from  typing import Union

    # def get_epidemic_by_region(self, region) -> Union[EpidemicInformationModel, None]:

    def get_epidemic_by_region(self, region) -> Optional[EpidemicInformationModel]:
        """
            根据地区获取疫情信息
        :param region:地区
        :return:疫情信息对象
        """
        for item in self.__list_epidemics:
            if item.region == region:
                return item

if __name__ == '__main__':
    manager = EpidemicInformationManager()
    manager.add_epidemic_info(EpidemicInformationModel("湖北", 66337, 28993))
    manager.add_epidemic_info(EpidemicInformationModel("四川", 538, 351, 3))
    epidemic = manager.get_epidemic_by_region("四川")
    print(epidemic.region, epidemic.confirmed, epidemic.cure, epidemic.dead)


```

