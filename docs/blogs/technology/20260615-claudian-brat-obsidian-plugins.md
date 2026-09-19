---
title: Claudian 和 BRAT - 两个提升 Obsidian 生产力的插件
author: Rain
date: 2026-06-15
lastmod: 2026-06-15
tags:
  - Claude Code
  - Obsidian
  - 插件
categories:
  - Claude Code
---

## 前言

Obsidian 作为一款强大的知识管理工具，通过插件系统可以实现各种强大功能。今天介绍两个实用的插件：**Claudian** 和 **BRAT**，它们可以帮助我们将 AI 能力无缝集成到知识管理流程中。

## Claudian：将 Claude Code 嵌入 Obsidian

[Claudian](https://github.com/YishenTu/claudian) 是一个将 Claude Code/Codex 嵌入到 Obsidian vault 中作为 AI 协作者的插件，目前在 GitHub 上已获得 **12.8k stars**。

### 核心功能

- **Inline Edit**：选中文本或使用快捷键，直接在笔记中进行编辑，支持 word-level diff 预览
- **Slash Commands & Skills**：输入 `/` 或 `$` 调用可复用的提示词模板
- **@mention**：输入 `@` 提及 vault 文件、子代理、MCP 服务器或外部目录
- **Plan Mode**：通过 `Shift+Tab` 切换，让代理先探索和设计，再实施
- **Instruction Mode（`#`）**：从聊天输入框添加自定义指令
- **MCP Servers**：通过 Model Context Protocol 连接外部工具
- **Multi-Tab & Conversations**：支持多个聊天标签页、对话历史、分支、恢复和压缩

### 支持的 AI 提供商

- **Claude Code**（主要支持）
- **Codex**（OpenAI）
- **Opencode**
- **Pi**

### 安装要求

- Obsidian v1.7.2+
- 仅支持桌面版（macOS、Linux、Windows）
- 需要安装 Claude Code CLI（推荐原生安装）

### 安装方式

#### 方法一：通过 Obsidian 社区插件（推荐）

1. 打开 Obsidian → 设置 → 社区插件 → 浏览
2. 搜索 "Claudian" 并点击安装
3. 启用插件

#### 方法二：通过 BRAT 安装（Beta 版本）

如果需要安装 Beta 版本，可以使用 BRAT 插件：

1. 安装 BRAT 插件
2. 在 BRAT 中添加 GitHub 仓库路径：`https://github.com/YishenTu/claudian`
3. 选择版本为 "latest"
4. 完成添加

## BRAT：Beta 插件自动更新工具

[BRAT](https://github.com/TfTHacker/obsidian42-brat)（Beta Reviewers Auto-update Tester）是一个帮助开发者和 beta 测试者测试插件和主题的 Obsidian 插件，目前在 GitHub 上已获得 **1.5k stars**。

### 核心功能

- **自动更新**：添加 GitHub 仓库路径后，自动检查并下载更新
- **无需手动操作**：不再需要创建文件夹、下载文件、复制到正确位置
- **Beta 版本测试**：方便测试尚未发布到社区插件市场的插件
- **主题测试**：同样适用于测试 Beta 版本的主题

### 安装方式

1. 打开 Obsidian → 设置 → 社区插件 → 浏览
2. 搜索 "BRAT" 并点击安装
3. 启用插件

### 使用方式

1. 打开 BRAT 设置界面
2. 点击 "Add beta plugin"
3. 输入 GitHub 仓库路径（如 `https://github.com/YishenTu/claudian`）
4. 选择版本（通常选择 "latest"）
5. 点击 "Add plugin"

### BRAT 的价值

- **测试新功能**：在插件正式发布前体验新功能
- **帮助开发者**：为插件开发者提供反馈
- **保持更新**：自动获取最新版本，无需手动下载

## 两个插件的关系

BRAT 和 Claudian 是互补的工具：

- **BRAT** 是一个通用的 Beta 插件管理工具，可以用来安装和测试任何 Beta 版本的插件
- **Claudian** 是一个具体的 AI 集成插件，可以通过 BRAT 安装 Beta 版本

在实际使用中，BRAT 常被用来安装 Claudian 的 Beta 版本，以便在正式发布前体验新功能。

## 注意事项

### Claudian 注意事项

- 需要 Claude Code CLI 已安装
- API 费用由用户提供（Claude 订阅/API 或兼容提供商）
- 会发送输入内容、附加文件、图片和工具调用输出到 API
- 本地存储设置和会话元数据

### BRAT 注意事项

- Beta 版本插件可能存在不稳定性
- 建议定期检查更新
- 遇到问题可以提交 GitHub issue

## 总结

Claudian 和 BRAT 这两个插件组合使用，可以大幅提升 Obsidian 的生产力：

- **BRAT** 帮助安装和测试 Beta 版本插件
- **Claudian** 将 AI 能力无缝集成到知识管理中

通过这套工具，我们可以更高效地管理和利用知识，让 AI 成为我们的知识管理助手。

---

**相关链接**

- Claudian GitHub: https://github.com/YishenTu/claudian
- BRAT GitHub: https://github.com/TfTHacker/obsidian42-brat
- Obsidian 官网: https://obsidian.md/
