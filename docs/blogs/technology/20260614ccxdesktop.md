---
title: CCX Desktop - 本地 AI 网关管理工具上手指南
author: Rain
tags:
  - CCX
  - AI
  - 网关
  - 代理
  - Claude Code
  - Codex
categories:
  - 技术文章
date: 2026-06-14 10:30
---

## 背景

用 Codex 接第三方 API 时遇到一个很烦的问题：在 `config.toml` 里把 `wire_api` 设成 `chat_completions`，明确告诉它用 Chat Completions 协议跟上游通信。结果 Codex 一重启，这个字段又被覆盖回 `responses`，请求照样打到 `/v1/responses`——上游根本不支持这个端点，直接返回 502 Bad Gateway。

这个问题在 [CodexPlusPlus #738](https://github.com/BigPizzaV3/CodexPlusPlus/issues/738) 里也有反馈：配置了 Chat Completions 上游协议后，本地代理仍请求 `/v1/responses`，导致 502。

根本原因在于 Codex 的启动流程会重新写入默认配置，手动改的 `wire_api` 字段保不住。反复改配置重启不是办法，需要一个中间层来兜底协议转换。

CCX Desktop 就是干这个的——在 Agent 和上游之间插一层本地网关，不管 Agent 发什么格式的请求，网关负责翻译成上游能识别的协议。Codex 发 `/v1/responses` 过来，CCX 可以转成 `/v1/chat/completions` 再转发，上游再也不用担心 502。同时它还能统一管理多个 Agent 的密钥和渠道，不用每个客户端单独配。

## 它做了什么

CCX Desktop 是一个本地 API 网关的管理壳，背后跑着 Go 写的服务，核心能力：

- **协议转换**：Agent 发什么格式都行，网关负责转成上游能识别的协议。Codex 发 `/v1/responses` 过来，CCX 可以转成 `/v1/chat/completions` 再转发，不再受 `wire_api` 重置的困扰
- **统一代理**：Claude Code 走 `/v1/messages`，Codex 走 `/v1/responses`，OpenCode 走 `/v1/chat/completions`，全部收敛到一个本地端口
- **多渠道调度**：同一个入口可以配多个上游，自动故障转移
- **密钥隔离**：客户端只拿一个 `PROXY_ACCESS_KEY`，上游真实密钥只存在渠道配置里

对使用者来说，配一次就完事，后面换模型加渠道都在 GUI 里操作。

## 安装

三个平台都有对应方案：

**macOS（Homebrew）**

```bash
brew tap BenedictKing/ccx
brew install --cask ccx-desktop
```

**Windows**

Microsoft Store 搜索 **CCX Desktop**，Store 负责签名和自动更新。

**Linux**

从 [GitHub Releases](https://github.com/BenedictKing/ccx/releases) 下载 AppImage：

```bash
chmod +x CCX-Desktop-*.AppImage
./CCX-Desktop-*.AppImage
```

也可以用 Release 页面的 `.sha256` 校验文件验证下载完整性：

```bash
shasum -a 256 -c CCX-Desktop-*.sha256
```

macOS 首次打开如果提示"无法验证开发者"，去 **系统设置 → 隐私与安全性** 点"仍要打开"就行。Windows 如果触发 SmartScreen 警告，点 **更多信息 → 仍要运行**。

## 配置流程

整体路径很清晰：

**安装 → 配置密钥 → 启动服务 → Agent 配置 → 添加渠道 → 验证请求**

### 密钥配置

首次启动向导会自动生成 `PROXY_ACCESS_KEY`，这个密钥是客户端访问网关的凭证。需要区分三种密钥：

| 密钥 | 用途 |
|------|------|
| `PROXY_ACCESS_KEY` | 客户端访问 CCX 网关 |
| `ADMIN_ACCESS_KEY` | Web UI 登录和管理接口 |
| 上游 API Key | 填在渠道配置里，不暴露给客户端 |

核心原则：**客户端的 API Key 永远填 `PROXY_ACCESS_KEY`，真实密钥只在渠道里**。

### 启动服务

在 **Gateway Monitor** 里点启动，确认状态灯变绿、端口和运行时长正常显示就行。如果提示"二进制文件未找到"，需要先构建后端：

```bash
cd backend-go && make build
```

### Agent 配置

进入 **Agent Config**，可以一键把本地配置写入 Claude Code、Codex 或 OpenCode。写入的内容包括网关地址、`PROXY_ACCESS_KEY` 和模型配置。配完之后重启对应客户端生效。

### 添加渠道

在 **Channel Center** 里添加渠道，不同 Agent 对应不同渠道类型：

- Messages 渠道 → Claude Code
- Responses 渠道 → Codex
- Chat 渠道 → OpenCode

每个渠道需要填上游 API Key、Base URL、模型名，也可以用预设模板快速创建。

### 验证

最简单的验证方式——启动服务后，在终端里跑：

```bash
curl http://localhost:3688/v1/models \
  -H "Authorization: Bearer your-ccx-proxy-key"
```

有返回就说明网关通了。再在客户端发一条测试消息，看 Log Viewer 里有没有对应日志即可。

## 环境变量

常用的几个：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 3688 | 网关端口 |
| `PROXY_ACCESS_KEY` | - | 代理密钥 |
| `ADMIN_ACCESS_KEY` | - | 管理密钥 |
| `LOG_LEVEL` | info | 日志级别 |

改 `.env` 后需要重启服务。

## 一些值得注意的点

**系统托盘常驻**：关闭窗口后最小化到托盘，托盘菜单可以启停服务、查看状态、复制密钥，还有开机自启开关。

**自动更新**：GitHub 版内置自动更新，启动 5 秒后检查一次，之后每 30 分钟检查。Store 版走 Store 自己的更新通道。

**Web UI**：Gateway Monitor 里可以直接打开，管理渠道、看日志、验证状态都在里面。

## 首次成功检查清单

跑通之后确认这几项就说明基本可用：

- `PROXY_ACCESS_KEY` 已生成
- 网关启动且状态正常
- 至少一个渠道已添加并启用
- Agent 配置已写入并重启
- 客户端发请求后有对应日志

## 参考

- 项目地址：https://github.com/BenedictKing/ccx
- 完整文档：https://github.com/BenedictKing/ccx/tree/main/docs
- 相关 Issue：[CodexPlusPlus #738 - 配置 Chat Completions 上游协议后仍请求 /v1/responses](https://github.com/BigPizzaV3/CodexPlusPlus/issues/738)
