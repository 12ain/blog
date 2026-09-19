---
title: 两个 Skill 仓库解析：anthropics/skills 与 ui-ux-pro-max-skill
author: Rain
date: 2026-09-19
lastmod: 2026-09-19
tags:
  - Agent Skills
  - Claude
  - UI UX
  - 设计系统
  - 技能开发
categories:
  - 技术
source: https://github.com/anthropics/skills, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
---

> 本文记录两个与 Agent Skills 相关的 GitHub 仓库。一个是 Anthropic 官方的「示范集」，一个是把单一领域做深的「垂直型」商业 skill。前者更像教材和范例库，后者更像一把专精的设计瑞士军刀。

## 一、背景：什么是 Agent Skill

Skill 是 Anthropic 提出的一种让 Claude（以及众多兼容代理）动态加载、按需增强能力的机制。它本质上是一个文件夹，里面存放指令、脚本和资源，Claude 在需要时被动态加载，从而以可复现的方式完成特定任务，比如按公司品牌规范产出文档、用组织内部流程分析数据，或者自动化个人任务。

它的核心只有一个文件：`SKILL.md`，包含 YAML frontmatter 和正文指令。frontmatter 最少只需两个字段：

- `name`：技能唯一标识（小写、空格用连字符）
- `description`：清晰说明「这个 skill 做什么、何时该用」

整个生态由 `agentskills.io` 上的 Agent Skills 规范（specification）统一定义。下面两个仓库都遵循这套约定，只是规模、目标和定位不同。

## 二、两个仓库概览对比

| 维度 | anthropics/skills | ui-ux-pro-max-skill |
| --- | --- | --- |
| 定位 | 官方「示范集」，展示 Skill 系统的可能性 | 单一垂直领域的「设计智能」skill（开源基础版 + 闭源 Premium） |
| 规模 | 仓库内含 18+ 个彼此独立的技能 | 一个技能，但内置海量设计数据 |
| 许可证 | 多数 Apache 2.0；文档类（docx/pdf/pptx/xlsx）为 source-available | MIT |
| 数据形态 | 以指令和参考文档为主 | 内置 CSV 数据库（风格/配色/字体/图表），离线 BM25 搜索 |
| 适用人群 | 想学「怎么做 skill」、找灵感的人 | 想直接用 AI 产出专业 UI/UX 的人 |

这两个仓库的差别，本质上是「通用范例」和「垂直领域引擎」的差别。

## 三、anthropics/skills：官方示范集

这个仓库是 Anthropic 对自己 Skills 系统的实现演示，包含三大块：

- `skills/`：技能范例，覆盖创意设计、技术开发、企业沟通、文档处理四大类
- `spec/`：Agent Skills 规范本身
- `template/`：技能模板（`template-skill`），官方推荐以此为起点创建自己的 skill

### 1. 完整技能清单（节选）

仓库里的技能大致可分为几类：

- 文档处理（Document Skills）：其中 `docx`、`pdf`、`pptx`、`xlsx` 这四个直接驱动了 Claude 的文档能力，属于 source-available 而非开源，是复杂 skill 的生产级参考。
- 创意与设计：`algorithmic-art`（算法艺术）、`brand-guidelines`（品牌规范）、`canvas-design`、`theme-factory`、`slack-gif-creator`、`frontend-design`（前端设计）。
- 技术开发：`mcp-builder`（MCP 服务生成）、`webapp-testing`（Web 应用测试）、`web-artifacts-builder`、`claude-api`。
- 企业与沟通：`internal-comms`、`doc-coauthoring`、`academy-guide`。
- 元技能与增强：`skill-creator`（教你造 skill）、`discernment-nudge`（在给出可行动答案后追加追问，帮用户核查事实与假设）。

### 2. 安装方式

- Claude Code：`/plugin marketplace add anthropics/skills`，再选 `document-skills` 或 `example-skills` 安装。
- Claude.ai：付费计划已内置这些示例技能，也可上传自定义 skill。
- Claude API：通过 Skills API 使用预置或上传的 skill。

### 3. 几个值得注意的细节

- 保留字限制：skill 名称不能包含 `claude` 或 `anthropic`（规范保留词）。仓库里 `academy-guide` 就是从 `claude-academy-guide` 改名而来，原因正是上传校验不允许这两个词。
- description 长度限制：`SKILL.md` frontmatter 的 `description` 上限为 1024 字符，上传校验会卡。
- 名称长度：最大 64 字符（早期为 40，后放宽）。
- 免责声明：仓库明确标注这些 skill「仅用于演示和教育目的」，行为可能与线上 Claude 实际表现不同，使用前需自行充分测试。

## 四、ui-ux-pro-max-skill：把 UI/UX 做成知识引擎

与官方「散装范例」相反，这个仓库把一个领域做到了极致：用 AI 为跨平台、跨框架的 UI/UX 提供设计智能。基础版开源（MIT），另有闭源付费的 Premium。

### 1. v2.0 旗舰能力：设计系统生成器

它的核心是推理引擎：你提出需求（例如「为一家美容养生 SPA 设计一个落地页」），引擎并行做 5 路搜索（192 个品类、79 种风格、192 套配色、34 种落地页模式、74 组字体配对），再用 BM25 排序加决策规则，秒级输出一份完整的定制设计系统，包含模式、风格、配色、字体、效果、反模式、交付前检查清单。

### 2. 数据规模（离线可用）

| 类别 | 数量 |
| --- | --- |
| 可搜索 UI 风格 | 79（50 活跃 / 29 补充 / 9 弃用） |
| 行业配色方案 | 192（与 192 个产品类型 1:1 对齐） |
| 字体配对 | 74（含 Google Fonts 导入） |
| 图表类型 | 25 |
| 技术栈指南 | 22（React、Next.js、Astro、Vue、SwiftUI、Flutter…） |
| UX 指南 | 119（含弹性文本、紧凑 UI、无障碍） |
| 推理规则 | 192（覆盖 Tech & SaaS、Finance、Healthcare、E-commerce、Services、Creative、Lifestyle、Emerging Tech 八大行业） |
| 获批 Google Fonts 元数据 | 1,934 |
| Phosphor 图标上游清单 | 1,512 |

### 3. 架构与工程

- 搜索引擎：`scripts/search.py`，纯 Python 标准库实现，无网络调用，本地 BM25 排序，保证离线可用。
- 风格分类法：用 Active / Supplemental / Deprecated 三态管理 79 种风格，弃用项自动从正常排序排除、旧名重定向。
- 弹性文本与紧凑 UI 指南：专门应对生产故障，例如标题换行平衡、窄屏不裁剪重排、Chip/Tag 包裹或 `+n` 折叠、Badge 不依赖颜色表意、动画取消后语义状态仍正确等反模式。
- 持久化设计系统：`--persist -p "MyApp"` 会生成 `design-system/myapp/MASTER.md` 及 `pages/` 覆盖文件，支持跨会话层级检索。

### 4. 安装与使用

- CLI（推荐）：`npm install -g ui-ux-pro-max-cli` → `uipro init --ai claude|cursor|windsurf|...|all`，支持 20+ AI 助手。
- 技能模式：日常对话「Build a landing page for my SaaS product」自动激活。
- 工作流模式：斜杠命令 `/ui-ux-pro-max ...`（Kiro、Copilot、Roo Code 等）。
- 高级生成：`python3 .../search.py "fintech" --design-system -p "MyApp"`，可指定域（`style|typography|chart|ux|icons`）与技术栈。

兼容代理包括 Claude Code、Cursor、Windsurf、GitHub Copilot、Codex、Gemini、Trae、CodeBuddy 等 20+ 工具。

## 五、对比与启示：如何借鉴来打造自己的 Skill

把两个仓库放在一起看，有几点对「自己造 skill」很有启发：

1. 标准化示范 vs 垂直深耕：Anthropic 的仓库证明 skill 可以「小而专、各管一摊」；ui-ux-pro-max 证明一个 skill 也能靠内置数据成为「领域引擎」。造 skill 时先想清楚是「通用积木」还是「垂直专家」。
2. 数据下沉为本地资源：ui-ux-pro-max 把风格/配色/字体做成 CSV，用脚本离线检索，既快又稳。如果你的 skill 需要「知识库」，优先用本地文件加轻量检索，而不是每次都让模型现编或联网。
3. SKILL.md 的 description 是入口：两库都强依赖 `description` 来做自动激活与匹配。写得精准、带上「何时用」，skill 才会被用对。注意 1024 字符上限与保留字限制。
4. 跨代理兼容是趋势：两个项目都明确支持 20+ 代理（Claude Code / Cursor / Copilot / Codex / 国产 CodeBuddy 等）。写 skill 时尽量用纯文本加标准脚本（Python/Node），避免绑定单一平台的私有能力，可移植性会高很多。
5. 许可证要讲清楚：文档类 skill 用 source-available 而非开源，ui-ux-pro-max 用 MIT 但分免费/付费档。开源不等于无边界，分层授权是社区 skill 的常见做法。

## 六、小结

`anthropics/skills` 是「如何正确地做 skill」的官方范本库，适合学习和找灵感；`ui-ux-pro-max-skill` 展示了「把一个领域做深」能做到什么程度：海量本地数据、推理引擎加跨代理 CLI。Skill 是一个能被加载、复用和工程化的能力包，而不只是几行 prompt。无论你是想照搬模板起步，还是像后者一样沉淀自有知识库，这两个仓库都值得参考。

---

参考资料

- Anthropic Skills 官方仓库：https://github.com/anthropics/skills
- UI UX Pro Max Skill：https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Agent Skills 规范：https://agentskills.io
