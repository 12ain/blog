---
title: 服务器实现ssh免密登录
author: Rain
tags:
  - Linux
  - CentOS
categories:
  - 服务器
date: '2020-11-07 15:39'
---

<Boxx/>

## 第一步：生成公钥

本地生成ssh 公钥及私钥

(如果本地已有公钥则可以忽略此步骤)

```bash
# 默认
ssh-keygen -t rsa
# 自定义
ssh-keygen -t rsa -C "youremail@email.com"
```

## 第二步：写入服务器

将本地生成的id_rsa.pub 的内容写入服务器的 <用户名>/.ssh/authorized_keys文件中，没有可以新建此文件,或者采用命令行

```bash
ssh-copy-id -i .ssh/id_rsa.pub <部署服务器用户名>@<部署服务器地址>

# 默认使用 22 端口，如需要指定端口号则使用以下命令
ssh-copy-id -i .ssh/id_rsa.pub <部署服务器用户名>@<部署服务器地址> -p <部署服务器ssh端口>
```
## 第三步：安全策略

为了安全起见，可以将服务器.ssh/文件夹权限改为700，authorized_keys文件权限改为600（or 644）

<Vssue :title="$title" />