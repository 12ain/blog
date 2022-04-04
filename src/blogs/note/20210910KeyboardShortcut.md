---
title: 快捷键及常用脚本
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

Command + Shift + . 显示隐藏文件

Command + I 显示简介

Command + Shift + H 显示剪贴板历史

Command + Option + ESC 强制退出应用

Command + Shift + D 访达打开桌面

## vim

全部复制：按ESC后，ggyG

全部删除：按ESC后，dG

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
- `docker system prune -af` : 释放docker占用缓存资源,包括容器,镜像及网络

## gpg key 相关命令

```bash
# 生成gpgkey
gpg --full-generate-key
# 查看gpgkey列表
gpg --list-secret-keys --keyid-format LONG <email>
# 查看gpgkey
gpg --armor --export <keyid>

git config --global commit.gpgsign true
```
