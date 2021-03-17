---
title: Centos mongodb 允许外网访问
author: Rain
tags:
  - CentOS
  - Linux
categories:
  - 服务器
date: '2019-11-19 09:25'
---

<Boxx/>

在Centos上安装完mongodb后用软件连接是连不上的,原因是安全配置的问题，因为mongodb默认是没有设置密码的。
所以如果需要允许外网访问就需要修改一下配置:

```shell
将bindIp：127.0.0.1 修改为 0.0.0.0
```

除此之外，如果还是无法连接,还需要将防火墙及安全组配置放行27017端口

另外,最新版的Navicat已经支持了MongoDB的连接,强烈推荐一波。

<Vssue :title="$title" />