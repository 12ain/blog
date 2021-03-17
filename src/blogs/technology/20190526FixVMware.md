---
title: 解决VMware Workstation黑屏问题
author: Rain
tags:
  - 搞机
  - 报错
categories:
  - 工具
date: '2019-05-26 20:35'
---

<Boxx/>

## 前言

最近升级了一下笔记本的硬件,重新安装了windows 10的2019年5月最新版本的 1903系统。作为一名在校大学生，使用虚拟机完成各种各样的实验当然是必不可少的。
## 正文

但是重新安装了官网最新的VM15.0.1版本后发现以前版本安装的虚拟机都无法打开，开始以为是版本兼容性问题。但是在同学的笔记本上安装相同版本的VM以及打开相同的虚拟机都没有问题。Google发现遇到此问题的解决办法为**修复LSP。命令行窗口—输入netsh winsock reset—重启计算机。**但是尝试过后发现没有效果。忽然想到是否是因为OS的版本太高VM还没来得及适配的原因，果断改变关键字搜索。果然是这个原因。因为最新版本的Windows10内置了一个沙盒，跟VM产生了冲突。在最新的VMware Workstation15.1.0版本解决了这个问题。
### 解决方法:

**打开当前的VMware Workstation检查更新，升级到最新的15.1.0版本后即可解决**或者**[点击下载最新15.1.0版本](https://download3.vmware.com/software/wkst/file/VMware-workstation-full-15.1.0-13591040.exe
)**
#### 另外提供一些可用的激活码
```
VMware Workstation Pro 15 激活许可证

UY758-0RXEQ-M81WP-8ZM7Z-Y3HDA

VF750-4MX5Q-488DQ-9WZE9-ZY2D6

UU54R-FVD91-488PP-7NNGC-ZFAX6

YC74H-FGF92-081VZ-R5QNG-P6RY4

YC34H-6WWDK-085MQ-JYPNX-NZRA2

VMware Workstation Pro 14 激活许可证

FF31K-AHZD1-H8ETZ-8WWEZ-WUUVA

CV7T2-6WY5Q-48EWP-ZXY7X-QGUWD

VMware Workstation Pro 12 激活许可证

5A02H-AU243-TZJ49-GTC7K-3C61N

VF5XA-FNDDJ-085GZ-4NXZ9-N20E6

UC5MR-8NE16-H81WY-R7QGV-QG2D8

ZG1WH-ATY96-H80QP-X7PEX-Y30V4

AA3E0-0VDE1-0893Z-KGZ59-QGAVF

VMware Workstation Pro 10 激活许可证

1Z0G9-67285-FZG78-ZL3Q2-234JG

4C4EK-89KDL-5ZFP9-1LA5P-2A0J0

HY086-4T01N-CZ3U0-CV0QM-13DNU
```
### 升级中遇到的问题

因为之前打开黑屏的虚拟机导致了VM的残留进程**vmware-vmx.exe**无法关闭,重启也不行emmm。。。只能卸载旧版本后重新下载新版本完整包。

>文章中引用的资源均来自互联网，如有侵权行为,请联系本人删除

<Vssue :title="$title" />