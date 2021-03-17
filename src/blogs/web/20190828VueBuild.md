---
title: Vue打包Cannot read property 'compilation' of undefined
author: Rain
tags:
  - 报错
  - Vue
categories:
  - 前端
date: '2019-08-28 00:06'
---

<Boxx/>

最近在做一个学习的项目,准备先测试一下打包看看效果,果然，在经历了乱七八糟环境的折腾下,它又报错了。

![1.png](https://i.loli.net/2019/08/28/UYAtG6RwDEkpZzQ.png)

强大的搜索引擎帮我找到了答案。

[解决方法](http://m.hangge.com/news/cache/detail_2468.html"解决方法")

```shell
npm i optimize-css-assets-webpack-plugin@3.2.0
```

<Vssue :title="$title" />

