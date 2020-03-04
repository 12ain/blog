---
title: HelloWorld？！——hexo入门及常用命令
tags:
  - hexo
categories:
  - 前端
date: 2019-01-30 19:50:00
---

第一次使用 [Hexo](https://hexo.io/)来搭建博客，总的来说前前后后还是踩了不少的坑，其实2018年12月底就在研究这个东西了，但是后来种种原因搁置了这个项目。这都过去一个月了，也是突然想起来还有这么个小项目，花了一天时间也算是大概完成了。记录一下基本的操作及命令！

## 快速入门HEXO
&nbsp;&nbsp;&nbsp;&nbsp;hexo是基于node的一个静态博客程序，可以轻松的将Markdown文件渲染成博客页面，对于大部分喜爱折腾但又喜欢简单写点东西的人还是挺友好的。至于MarkDown也不作过多的介绍。总之，了解Markdown的语法确实为写作可以提供不少的便利。
<br>
###### 具体的MarkDown语法可以参考这几个
[献给写作者的 Markdown 新手指南](https://www.jianshu.com/p/q81RER)<br>
[一位学长总结的Markdown语法](https://blog.rebright.top/2019/01/05/markdown%E8%AF%AD%E6%B3%95/)
### 创建一篇新文章

``` bash
$ hexo new "文章标题"
```
可简写为
``` bash
$ hexo n "文章标题"
```
更多请看这里: [Writing](https://hexo.io/docs/writing.html)

### 在本地服务器上运行HEXO

``` bash
$ hexo server
```
可简写为
``` bash
$ hexo s
```
更多请看这里: [Server](https://hexo.io/docs/server.html)

### 静态生成hexo页面

``` bash
$ hexo generate
```
可简写为
``` bash
$ hexo g
```

更多请看这里: [Generating](https://hexo.io/docs/generating.html)

### 部署到远程站点

``` bash
$ hexo deploy
```
可简写为
``` bash
$ hexo d
```

更多请看这里: [Deployment](https://hexo.io/docs/deployment.html)
<br>
