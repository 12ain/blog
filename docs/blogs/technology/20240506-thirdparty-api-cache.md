---
title: 第三方API缓存设置.md
author: Rain
date: 2024-05-06
lastmod: 2024-05-06
tags:
  - Claude Code
  - API
  - 配置
categories:
  - Claude Code
---

第三方API接入新版本有缓存的问题，解决方法：加入环境变量（如使用cc-switch则加入env部分）
```
"CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
```
