<div class="blog-article">
    <h1><a href="p.html?p=\算法\算法之LRU(最近最少使用)缓存机制" class="title">算法之LRU(最近最少使用)缓存机制</a></h1>
    <span class="author">xiashuobad</span>
    <span class="time">2020-07-21 17:07</span>
    <span><a href="tags.html?t=算法" class="tag">算法</a></span>
    </div><br/>

## 算法描述
> 最近在研究redis，其中缓存机制中提到了LRU（最近最少使用）缓存机制算法，有点兴趣，
>所以网上搜了搜，用python动手实现了下。leecode上也有这个LRU算法的题目，题目描述如下：
> 
>设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。
获取数据 get(key) 
>- 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
>- 写入数据 put(key, value) - 如果关键字已经存在，则变更其数据值；
> 如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，
> 它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
>- 要求：O(1) 时间复杂度内完成这两种操作

## 算法思路
1. 因为时间复杂度限制为o(1)，首先我想到用哈希，即字典dict。因为在缓存满时，需要删除
掉最近最少使用的项，所以还需要借助一个辅助结构，这个结构能够保证最新使用的元素放到结尾，
最少使用的放在开头，用列表实现队列貌似符合这种结构，但是执行get或者put方法时，需要将
当前元素更新到尾部（最新使用了），这一过程要保证O(1)，列表貌似无法实现。

2. 这里的解决办法是用双向链表，单向链表将中间的某个节点移到尾部，复杂度也是O(n)，
而双向链表这一操作的复杂度是O(1)。

3. 算法过程大致如下：  
- 设置dict_cache={}，key值存入要保存的key，而value存的是节点node的地址。
- 每个节点node中，分别存左右指针pre和next以及key和value的值。
- 执行get操作的时候，如果key存在，则返回对应节点里的value值，否则返回-1，并且将该
节点移动到双向链表末尾，整个过程时间复杂度O(1)
- 执行put操作的时候，如果key存在，则修改对应节点里的value值，并且将该节点移动到末尾；
如果key不存在，则判断缓存是否已满，如果缓存满了，则删除第一个节点以及对应的dict_cache值
，最后将新的(key,value)值建立新节点插入到链表末尾以及dict_cache中。这个过程的时间
复杂度也O(1)

## python代码
```python
class Node:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.pre = None
        self.next = None


class LRUCache:

    def __init__(self, capacity: int):
        self.dict_cache = {}
        self.capacity = capacity
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.pre = self.head

    def get(self, key: int) -> int:
        # 如果key已存在，则返回key对应的节点的value值，并将该节点移到尾部
        if key in self.dict_cache:
            self.move_node_to_tail(key)
            return self.dict_cache[key].value
        # key不存在则返回-1
        return -1

    def put(self, key: int, value: int) -> None:
        # 如果key已存在，则修改key对应节点的value值，并将该节点移到尾部
        if key in self.dict_cache:
            self.move_node_to_tail(key)
            self.dict_cache[key].value = value
        else:
            # 如果key不存在的话，则判断缓存是否已满
            if len(self.dict_cache) == self.capacity:
                # 缓存满了，则删除第一个节点,与哈希字典中的值
                del self.dict_cache[self.head.next.key]
                self.head.next = self.head.next.next
                self.head.next.pre = self.head
            # 插入新节点到链表尾部
            node = Node(key, value)
            # 插入到尾部
            self.tail.pre.next = node
            node.pre = self.tail.pre
            node.next = self.tail
            self.tail.pre = node
            self.dict_cache[key] = node

    # 将某个节点移动到尾部
    def move_node_to_tail(self, key):
        cur_node = self.dict_cache[key]
        # 删除当前节点
        cur_node.pre.next = cur_node.next
        cur_node.next.pre = cur_node.pre
        # 将当前节点加入到尾节点前
        self.tail.pre.next = cur_node
        cur_node.pre = self.tail.pre
        cur_node.next = self.tail
        self.tail.pre = cur_node
```
