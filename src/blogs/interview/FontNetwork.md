---
title: 前端面试题网络篇
author: Rain
tags:
  - 面试
  - 前端
categories:
  - 前端
date: '2020-04-26 8:59:50'
---

<Boxx/>

## get和post类型有什么区别

**url可见性**

`get`的参数可以在`url`看见
`post`在`url`不可见

**传输数据的大小**

`get`大小限制2kb-4kb,具体由浏览器本身限制
`post`理论上无限大小，当然后台可配置大小

**安全性**

理论上两个都不安全，但是`post`的参数不在`url`，相对于`get`隐蔽性会好一点

**缓存性**

`get`可缓存
`post`不可缓存

<Vssue :title="$title" />