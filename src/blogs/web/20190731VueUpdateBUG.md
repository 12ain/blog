---
title: Vue升级采坑历程
author: Rain
tags:
  - Vue
  - 报错
categories:
  - 前端
date: '2019-07-31 15:30'
---

<Boxx/>

## 前言

闲来无事打算将自己的本机的npm版本更新，其实之前在学长的Github上看到了一句开发时不要随意的更新，除非你很了解新版本的特性。但是还是忍不住试了一下。

## 经历

因为之前项目上传到Github上以后出现了安全警告和漏洞，有版本的bug和漏洞问题，也有配置文件的问题，索性尝试利用Github的自动解决。解决了一部分的问题。然后再将项目拉回本地。

![1.png](https://i.loli.net/2019/08/17/aSTiG6RMEj3Zch8.png)

可以看到还是有很多的变化。重新下载一下依赖。升级了npm版本和插件版本.结果发生报错。
![2.png](https://i.loli.net/2019/08/17/3AuI1aFkPf6pmW5.png)

最后发现webpack与当前机器的Vue版本不匹配，查询当前的Vue版本。装上对应的webpack的版本，项目调试开发回归正常。

<Vssue :title="$title" />