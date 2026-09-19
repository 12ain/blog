---
title: Claude Code 已安装 Skills 说明
author: Rain
date: 2026-05-23
lastmod: 2026-05-23
tags:
  - Claude Code
  - Skills
  - 使用指南
categories:
  - Claude Code
---

> 更新日期：2026-05-23

Skills 是安装在 `~/.claude/skills/` 目录下的指令集，通过 `/skill-name` 命令触发，或由 Claude 自动识别场景后调用。

---

## 开发流程类

### `brainstorming` — 头脑风暴与设计
**触发时机：** 进行任何创意工作之前——创建功能、构建组件、添加行为。

在动手写代码前，先通过对话探索用户意图、梳理需求、完成设计。设计方案获得用户认可后才能进入实现阶段。这是一个强制门禁：无论任务多简单，都要先过设计关。

---

### `writing-plans` — 编写实施计划
**触发时机：** 拿到需求规格后、动代码之前。

将需求转化为结构化的多步骤实施计划，明确每一步的目标、文件变更范围和验证方式，供后续 `executing-plans` 执行。

---

### `executing-plans` — 执行实施计划
**触发时机：** 已有书面实施计划，需要在独立会话中带检查点地执行。

按计划逐步实施，每个阶段完成后设置 review 检查点，确保实施过程可控、可回溯。

---

### `subagent-driven-development` — 子 Agent 并行开发
**触发时机：** 在当前会话中执行含有独立任务的实施计划。

将计划中互不依赖的任务分配给多个子 Agent 并行处理，加速开发节奏。

---

### `dispatching-parallel-agents` — 分发并行 Agent
**触发时机：** 面对 2 个或以上互相独立、无共享状态的任务。

识别可并行的任务边界，将任务分发给多个 Agent 同时执行，避免串行等待。

---

### `using-git-worktrees` — Git Worktree 隔离工作区
**触发时机：** 开始需要隔离的功能开发，或执行实施计划之前。

通过 git worktree 创建独立工作副本，避免功能开发污染当前工作区。优先使用原生工具，git worktree 作为兜底方案。

---

### `finishing-a-development-branch` — 完成开发分支
**触发时机：** 实现完毕、所有测试通过，需要决定如何集成工作成果。

提供结构化选项：合并、创建 PR 或清理，引导完成开发分支的收尾工作。

---

## 代码质量类

### `karpathy-guidelines` — Karpathy 编码准则
**触发时机：** 编写、审查或重构代码时。

一套减少 LLM 常见编码错误的行为准则：避免过度设计、做外科手术式修改、暴露假设前提、定义可验证的成功标准。

---

### `systematic-debugging` — 系统化调试
**触发时机：** 遇到任何 bug、测试失败或意外行为时，在提出修复方案之前。

强制先系统分析问题根因，而不是凭直觉猜测后直接改代码。

---

### `verification-before-completion` — 完成前验证
**触发时机：** 即将声称工作完成、已修复或通过测试，以及提交/创建 PR 之前。

必须先运行验证命令并确认输出，才能做出"已完成"的断言。证据先于结论。

---

### `requesting-code-review` — 请求代码审查
**触发时机：** 完成任务、实现重要功能，或合并之前。

整理变更摘要，帮助确认工作是否符合需求，准备好接受 review。

---

### `receiving-code-review` — 接收代码审查反馈
**触发时机：** 收到代码审查反馈后、实施建议之前，尤其是反馈不明确或技术上存疑时。

要求技术严谨地评估审查意见，而不是表演性地认同或盲目执行。

---

### `simplify` — 简化代码
**触发时机：** 代码变更后，检查是否有可复用、可优化之处。

审查已改动的代码，寻找重用机会、提升质量和效率，并修复发现的问题。

---

## AI 工具类

### `codeagent` — 多后端 AI 代码 Agent
**触发时机：** 需要调用多后端 AI 执行代码任务时。

支持 Codex、Claude、Gemini、OpenCode 等后端，提供 Agent 预设、Skill 注入、`@文件引用`语法、Worktree 隔离、并行执行和结构化输出。

---

### `using-superpowers` — 超级能力入口
**触发时机：** 每次对话开始时（自动触发）。

建立如何发现和使用 Skills 的机制。要求在任何响应（包括澄清问题）之前，先通过 Skill 工具进行调用。

---

### `find-skills` — 查找可安装的 Skills
**触发时机：** 用户询问"如何做 X"、"有没有能做 X 的 skill"，或表达出想扩展能力的意图。

帮助用户发现并安装合适的 agent skill，扩展 Claude Code 的能力边界。

---

### `writing-skills` — 编写新 Skills
**触发时机：** 创建新 skill、编辑现有 skill，或在部署前验证 skill 是否正常工作。

提供 skill 开发的规范流程和验证机制。

---

## Git 工作流类

### `git-commit` — 智能 Git 提交
**触发时机：** 用户要求提交变更、创建 git commit，或输入 `/commit`。

自动检测变更类型和范围，生成符合 Conventional Commits 规范的提交消息，支持交互式覆盖类型/范围/描述，并智能暂存文件以实现逻辑分组。

---

### `my-pull-requests` — 查看我的 PR
**触发时机：** 需要列出当前仓库中自己的 Pull Request。

快速汇总当前仓库中本人创建的所有 PR 状态。

---

## 工程文化类

### `pua` — AI 反摆烂督促
**触发时机：** (1) 任务失败 2+ 次或反复微调同一思路；(2) 即将说"我无法解决"、建议用户手动操作、未验证就归因环境；(3) 被动等待不搜索不读源码；(4) 用户表达不满（"try harder"、"换个方法"等）。

用大厂 PUA 话术逼 AI 穷尽一切方案，杜绝摆烂。首次失败或已知修复正在执行时不触发。

---

## 前端设计类

### `frontend-design` — 前端界面设计
**触发时机：** 构建网页组件、页面、海报或应用时（网站、落地页、Dashboard、React 组件、HTML/CSS 布局，或为任何 Web UI 增加样式）。

生成富有创意、生产级别的前端代码和 UI 设计，刻意避免千篇一律的 AI 审美风格。

---

## 其他

### `gstack` — Gstack 工具
本地安装的自定义工具，详情参见 `~/.claude/skills/gstack/llms.txt`。

---

## 快速触发参考

| Skill | 典型触发词 / 场景 |
|---|---|
| `brainstorming` | 做新功能之前 |
| `writing-plans` | 有需求，准备动代码 |
| `executing-plans` | 有计划，开始执行 |
| `git-commit` | `/commit`、"帮我提交" |
| `systematic-debugging` | 遇到 bug |
| `verification-before-completion` | 准备说"完成了" |
| `frontend-design` | 做页面/组件/海报 |
| `pua` | AI 反复失败或摆烂 |
| `find-skills` | "有没有能做 X 的 skill？" |
