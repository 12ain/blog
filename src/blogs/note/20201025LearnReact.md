---
title: React学习笔记
author: Rain
tags:
  - React
categories:
  - 前端
date: '2020-10-25 23:52'
keys: 
- e10adc3949ba59abbe56e057f20f883e
publish: false
---

<Boxx/>

每天进步一点点，记录学习React的经历

#### 常用生命周期

componentDidMount 组件渲染后执行
componentDidUpdate 数据修改完成
componentWillUnmount 组件卸载前执行

#### 不常用生命周期

shouldComponentUpdate 返回 false，则不会调用 render()。

<Vssue :title="$title" />