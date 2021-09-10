---
title: MacOS快捷键及常用脚本
author: Rain
tags:
  - 效率
categories:
  - 笔记
date: '2021-9-10 20:38:06'

---

## brew

清除brew缓存 `brew cleanup --prune 0`

## Finder

command+shift+. 显示隐藏文件

command + i 显示简介

Command + shift + h 显示剪贴板历史

## zsh

| 操作 | 快捷键 |
|:--|:-:|
| 清除当前行         | ctrl + u     |
| 行首               | ctrl + a     |
| 行尾               | ctrl + e     |
| 前进、后退         | ctrl + f / b |
| 上一条命令         | ctrl+p       |
| 搜索命令历史       | ctrl + r     |
| 删除当前光标的字符 | ctrl + d     |
| 删除光标前字符     | ctrl + h     |
| 删除光标之前的单词 | ctrl + k     |
| 交换光标文本       | ctrl + t     |
| 清屏       | command+r / ctrl + l    |

## docker

- `docker image prune --force --all`或者`docker image prune -f -a` : 删除所有不使用的镜像
- `docker container prune -f`: 删除所有停止的容器
