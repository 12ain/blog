title: vue安装iview失败报错
author: 惬意的小时光
tags:
  - 前端
  - vue
  - 报错
categories:
  - 报错解决
date: 2019-08-27 23:54:00
---
# vue安装iview失败报错

事件起因: 使用 > npm install --save iview 安装iview发生很多warning.

![1.png](https://i.loli.net/2019/08/27/tXNYEMCTqywUibd.png)

![2.png](https://i.loli.net/2019/08/27/Ea3dbPZNKf98Jz6.png)

![3.png](https://i.loli.net/2019/08/27/hFopj4caeYMEVd3.png)

然后就出现了error

![4.png](https://i.loli.net/2019/08/27/hyvHVi2xkftW4sG.png)

果断想到了webpack-dev-server的版本问题.安装老版本也就是2.9.2版本后不报错了.
![5.png](https://i.loli.net/2019/08/27/eY3nQk7SNqW5jiP.png)
提示缺失node-sass插件,再装一下这个插件。OK,问题解决
![6.png](https://i.loli.net/2019/08/27/z6xDSqy41vI8KGZ.png)