---
title: proxychains网络加速配置
author: Rain
tags:
  - 网络
  - 配置
categories:
  - 笔记
date: '2021-08-29 20:20'
---

在国内环境下，有些依赖或软件包需要依赖网络加速才能正常下载。此处记录使用proxychains工具，实现命令行按需加速配置。

## 安装教程

[proxychains源码及文档](https://github.com/haad/proxychains)

```sh
# MacOS
brew install proxychains-ng

# Manjaro Linux
sudo yay -S proxychains
```

## 具体配置

修改/etc/proxychains.conf配置最后一行，修改为本机对应的地址及端口，为便于后面使用，可以将proxychains设置为别名。

```sh
# 修改配置 MacOS
vim /usr/local/etc/proxychains.conf

# or Manjaro Linux
vim /etc/proxychains.conf

# 最后一行改为
socks5 127.0.0.1 7890

# 编辑 ~/.zshrc 便于使用
alias gfw="proxychains"
```
