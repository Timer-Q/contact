# contact
emmmmm 练手组件

## 总结

### popup遇到问题

> appendChild，没想到我会因为这个 api debugger好几天；基础是很重要的！！！！！
> * what   
  在写 popup 的时候，mask 最多只能有一个，不然会因为重叠变黑。然后看 mint-ui 里面就各种处理，我就简化了一下，然后出现了一种情况：每次用 appendChild 添加 mask 的时候，并没有发现有移除的操作，但是多次添加，mask 只有一个。
> * why  
  在找到 appendChild 这个 ‘罪魁祸首’ 之后，查了一下才明白。[戳这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)。  
  有三点需要注意：
  >> 1. 如果被插入的节点已经存在与当前文档的文档树中，那么这个节点会先从原先的位置移除，然后再插入到新的位置。
  >> 2. 如果想让该节点保留在原位置，需要先用 `Node.cloneNode` 复制出一个节点的副本，然后插入新的位置
  >> 3. 这个方法只能将某个子节点插入到同一文档的其他位置，如果想跨文档插入，需要先调用 `document.importNode` 方法


