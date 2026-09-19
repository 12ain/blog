---
title: CCX Desktop - 解决 Codex wire_api 被重置问题的本地网关方案
author: Rain
date: 2026-06-14
lastmod: 2026-06-14
reprint: true
tags:
  - Claude Code
  - Codex
  - 网关
  - 转载
categories:
  - Claude Code
source: https://github.com/BenedictKing/ccx/blob/main/docs/guide/desktop/index.md
---

> **转载声明**：本文转载自 [CCX Desktop - 解决 Codex wire_api 被重置问题的本地网关方案](https://github.com/BenedictKing/ccx/blob/main/docs/guide/desktop/index.md)，著作权归原作者所有。

## 起因：Codex 重启后协议字段被重置

国内中转站大多只提供 **Chat Completions** 协议（`/v1/chat/completions`），并不提供 OpenAI 官方那套较新的 **Responses API**（`/v1/responses`）。但 Codex CLI 默认按 Responses 协议发请求，于是大家普遍走 Codex++ 这类增强客户端，在配置里把上游协议手动改成 Chat Completions。

问题是这个改动留不住。Codex++ 社区里反复有人反馈：明明已经选了 Chat Completions，重启之后 `config.toml` 里的 `wire_api` 字段又被改回 `responses`，请求路径仍是 `/v1/responses`，上游直接 502 Bad Gateway。

> 相关 issue：[CodexPlusPlus #738 - 502 Bad Gateway，配置 Chat Completions 上游协议后本地代理仍请求 /v1/responses](https://github.com/BigPizzaV3/CodexPlusPlus/issues/738)

这类客户端层的配置 bug 修起来要等上游版本，不修又不能用。换个思路：与其指望客户端把协议字段写对，不如在客户端和上游中间再加一层，由这一层负责协议适配和路由——这正是 **CCX Desktop** 的定位。

## CCX Desktop 是什么

CCX Desktop 是一个本地运行的 API 网关客户端，开源、跨平台。本质上它在本机起一个反向代理服务（默认 `3688` 端口），把 Claude Code、Codex、OpenCode 这些客户端的请求拦下来，按预先配置好的渠道转发给真正的上游。

> 项目地址：https://github.com/BenedictKing/ccx

它对协议层做了抽象，把请求入口拆成三种类型：

| 入口协议 | 路径 | 服务对象 |
| -------- | ---- | -------- |
| Messages | `/v1/messages` | Claude Code |
| Responses | `/v1/responses` | Codex CLI / Codex App |
| Chat | `/v1/chat/completions` | OpenCode 及其他通用客户端 |

每个入口都可以挂多个渠道，渠道里单独配置上游 Base URL、API Key、模型映射。这样一来 Codex 的 `wire_api` 是 `responses` 也没关系——请求先打到 CCX 本地的 `/v1/responses`，再由 CCX 按渠道配置以 Chat Completions 格式转发出去，协议转换发生在网关侧，客户端配置不用动。

顺带的好处是多渠道调度和故障转移：同一个入口下挂几家供应商，其中一家挂了可以自动切到下一家，不用每次手动改 Base URL。

## 和 CC Switch 的差异：切换器 vs 网关

之前写过 [CC Switch 那篇](CC%20Switch%20-%20用国内大模型驱动%20Claude%20Code%20和%20Codex.md)，乍一看 CC Switch 和 CCX Desktop 都是「桌面工具 + 接国内模型」，但两者解决问题的方式完全不在一个层面：

| 维度 | CC Switch | CCX Desktop |
| ---- | --------- | ----------- |
| 工作原理 | 改写客户端配置文件（JSON / TOML / .env） | 本地起反向代理网关（默认 3688 端口） |
| 请求走向 | 客户端 → 上游 | 客户端 → 本地网关 → 上游 |
| 协议适配 | 由客户端负责（受客户端实现限制） | 由网关负责（与客户端解耦） |
| 多上游 | 切换式，一次只用一个 | 并存式，同一入口挂多家、可故障转移 |
| 上游 Key 存放 | 写进客户端配置文件 | 集中存在网关渠道配置里 |
| 适合场景 | 单人单机、偶尔切换模型供应商 | 多供应商混用、需要协议转换、需要稳定回退 |

回到 #738 这类问题：CC Switch 解决不了，因为它本质还是把请求交给客户端发，客户端的 `wire_api` 字段被重置它管不到。CCX Desktop 才能根治，因为请求路径在网关侧二次决定，客户端写错的字段已经不参与最终路由。

换个角度说：CC Switch 是「让一个客户端用上多家供应商」，CCX Desktop 是「让所有客户端共用一套网关基础设施」。前者轻量、上手快；后者重一点，但能解决前者天生处理不了的客户端 bug 和多渠道编排问题。

## 推荐使用路径

整体流程：**安装 → 配置密钥 → 启动服务 → Agent 配置 → 添加渠道 → 验证请求**。

## 安装

macOS 推荐 Homebrew：

```bash
brew tap BenedictKing/ccx
brew install --cask ccx-desktop
```

Windows 推荐在 Microsoft Store 搜索 **CCX Desktop**，由 Store 负责签名和自动更新。

也可以直接到 [GitHub Releases](https://github.com/BenedictKing/ccx/releases) 下载对应平台的安装包：

| 平台 | 文件名格式 |
|------|-----------|
| macOS (Apple Silicon) | `CCX-Desktop-{version}-darwin-arm64.dmg` |
| macOS (Intel) | `CCX-Desktop-{version}-darwin-amd64.dmg` |
| Windows | `CCX-Desktop-{version}-windows-{arch}-setup.exe` |
| Linux | `CCX-Desktop-{version}-linux-amd64.AppImage` |

Release 页面附带 `.sha256` 校验文件，下载完可以验证完整性：

```bash
shasum -a 256 -c CCX-Desktop-*.sha256
```

macOS 首次打开时若提示「无法验证开发者」，前往 **系统设置 → 隐私与安全性** 点击「仍要打开」即可；Windows 的 SmartScreen 警告同理，点「更多信息 → 仍要运行」放行。

## 配置密钥：三种 Key 的角色

首次启动会有引导向导，自动生成并写入 `PROXY_ACCESS_KEY`。



CCX 里一共有三种密钥，刚上手很容易混，记住下面这张表就不会填错：

| 密钥类型 | 填在哪里 | 说明 |
|---------|---------|------|
| `PROXY_ACCESS_KEY` | 客户端的 API Key 位置 | 客户端访问 CCX 本地网关用的密钥 |
| `ADMIN_ACCESS_KEY` | CCX Web UI 登录 | 管理后台密钥 |
| 上游 API Key | CCX 的渠道配置里 | 真正给上游服务商的密钥，**不要填到客户端** |

后面 Agent Config 一键写入时，CCX 会自动把 `PROXY_ACCESS_KEY` 填进客户端配置；手动配置时记得别把上游真 Key 直接写到 Codex / Claude Code 里。

## 启动服务

进入 **Gateway Monitor**，点 **启动服务**。



启动后确认状态指示灯变绿、显示监听端口和运行时长、Log Viewer 无报错。这个面板同时支持停止 / 重启 / 查看实时日志 / 复制 Web UI 地址。

如果首次启动提示「二进制文件未找到」，需要先在源码目录构建后端：

```bash
cd backend-go && make build
```

## Agent 配置：一键写入

进入 **Agent Config**，CCX 内置了三种主流客户端的配置写入：



- **Claude Code**
- **Codex**
- **OpenCode**

点一下对应按钮，CCX 会自动改写客户端的配置文件：

- 把 Base URL 指向本地 `http://localhost:3688`
- 把 API Key 填成当前 `PROXY_ACCESS_KEY`
- 写入模型或 provider 配置

写完之后**重启对应客户端**让配置生效。这一步是和 issue #738 切割的关键——Codex 自己的 `wire_api` 字段被重置无所谓，因为请求被打到 CCX 本地，CCX 才是真正决定用哪个协议转发到上游的那一层。

## 添加渠道：协议转换的真正发生地

进入 **Channel Center** 添加渠道：



按入口分三类：

- **Messages 渠道**：对应 Claude Code
- **Responses 渠道**：对应 Codex
- **Chat 渠道**：对应 OpenCode

CCX 自带了一批供应商预设模板，选好之后填这几项：

- 上游 API Key
- Base URL
- 模型名 / 模型映射
- 协议兼容选项

**回到 Codex 的协议问题**：在 Responses 入口下挂一个 Chat Completions 协议的上游渠道，把 Base URL 填成中转站的 `https://xxx/v1`，CCX 会把进来的 Responses 请求转成 Chat Completions 格式发出去。客户端不用关心 `wire_api` 写成什么——这部分由 CCX 全权负责。

> 提示：上游 API Key 只填在渠道里，客户端那边只用 `PROXY_ACCESS_KEY`，两者不要混。

## 验证请求

跑通整条链路前先用 `curl` 看一下网关是否能正确返回模型列表：

```bash
curl http://localhost:3688/v1/models \
  -H "Authorization: Bearer your-ccx-proxy-key"
```

返回模型列表说明本地网关 + 上游渠道都通了。然后看协议入口是否对得上：

- Claude Code → `/v1/messages`
- Codex → `/v1/responses`
- OpenCode → `/v1/chat/completions`

最后在客户端里发一条 `你好`，去 CCX 的 Log Viewer 或 Web UI 看请求是不是落到了预期的渠道上。

## 环境变量

如果想精细控制端口、日志级别这些，进 **Environment Params** 直接改 `.env`：



| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | 3688 | 网关端口 |
| `PROXY_ACCESS_KEY` | - | 客户端访问代理密钥 |
| `ADMIN_ACCESS_KEY` | - | 管理后台密钥 |
| `LOG_LEVEL` | info | 日志级别 |

改完 `.env` 需要重启服务才生效。

## Web UI 与系统托盘

关掉主窗口后 CCX 会缩进系统托盘后台运行。



托盘菜单常用功能：

- 查看运行状态、端口和 PID
- 启动 / 停止 / 重启服务
- 打开 Web UI
- 复制 Web UI 地址和 `PROXY_ACCESS_KEY`
- 开机自启开关
- 检查更新

## 自动更新

GitHub 安装包版自带自动更新：

- 启动 5 秒后检查一次
- 之后每 30 分钟轮询一次
- 也可在侧边栏底部点版本号手动触发检查

升级流程是发现新版本 → 弹对话框 → 下载安装包 → SHA256 校验 → 各平台按对应方式替换（macOS 打开 DMG 手动替换，Windows 自动跑 setup，Linux AppImage 自动替换重启）。

Microsoft Store 版不走 GitHub Releases，更新由 Store 负责，侧边栏会提示。

## 首次成功 Checklist

跑通这一遍，整个链路就算稳了：

- [ ] `PROXY_ACCESS_KEY` 已生成并复制
- [ ] 网关已启动，Gateway Monitor 状态正常
- [ ] 至少一个目标渠道已添加并启用
- [ ] Agent 已写入配置并重启
- [ ] 客户端发送请求后，CCX Desktop Log Viewer 里能看到对应日志

## 小结

CCX Desktop 的核心价值在于「把协议适配和路由从客户端搬到本地网关」。Codex 的 `wire_api` 字段被重置这类客户端 bug 之所以让人头疼，是因为客户端既负责选协议、又负责发请求，一旦写错就直接 502。把这两件事分开——客户端只管发请求、网关全权决定协议和路由——同类问题就被根治了。

顺带的好处是把上游 Key 集中放在网关里，再叠加多渠道调度和故障转移，对国内中转用户来说体验明显比裸用 Codex / Claude Code 稳。
