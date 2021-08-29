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
brew install proxychains

# Manjaro Linux
sudo yay -S proxychains
```

## 具体配置

修改/etc/proxychains.conf配置最后一行，修改为本机对应的地址及端口，为便于后面使用，可以将proxychains设置为别名。

```sh
vim /etc/proxychains.conf

socks5 127.0.0.1 7890

alias gfw="proxychains"
```

## 原本方案

以前使用的方式是将代理的配置写入.bashrc或.zshrc文件中，并使用别名进行环境变量设置，但有时不太便于管理，会出现很多本不应该加速的地址连接加速网络。采用此工具可实现按需使用网络加速。

```sh
alias gfw="export all_proxy=socks5://127.0.0.1:7890"
```
