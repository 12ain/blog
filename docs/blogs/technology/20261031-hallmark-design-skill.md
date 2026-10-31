---
title: Hallmark：拒绝 AI 味的网页设计 Skill
author: Rain
date: 2026-10-31
lastmod: 2026-10-31
tags:
  - Agent Skills
  - 设计
  - 前端
  - AI Slop
  - Together AI
categories:
  - 技术
source: https://github.com/nutlope/hallmark
---

Together AI 开源了一个叫 Hallmark 的 Agent Skill（MIT，v2.0.0），做的事情很窄：给编码代理写出来的网页装一道不可越过的地板。

## 一、它解决什么

让模型写落地页，十次有八次是同一个东西。标题上方一行全大写的灰色小标签，标题里有个词被染成紫色，三张圆角卡片配 emoji，一条紫蓝渐变，底部挂个订阅框。这是训练数据里最常见的网页长相，不是设计。

Hallmark 的做法是把这些能枚举的痕迹列成清单，变成禁令，再谈设计。面向 Claude Code、Codex、Cursor、OpenCode，装好后 `/hallmark <prompt>` 触发。

## 二、一道地板，三层闸门

约束分四个强度。Floor 绝不可豁免，触犯即 FAIL；Reflex 是模型容易滑入的默认套路，有真实理由可以豁免，但要留记录；Finish 是工艺细节，从不阻塞交付；Ledger 只做重复度记账。检查方式另分四类：静态层（M）、静态加渲染（M/R）、纯渲染（R）、人工判断（J）。

地板共 16 条，可以归成三类要求：

- 技术正确性：颜色字体全走 `:root` token；禁 `transition: all`，不对 `width`、`height`、`top`、`left` 做动画；`overflow-x: clip`；网格轨道写 `minmax(0, 1fr)`；可交互元素都有 `:focus-visible`；每个动画都有 `prefers-reduced-motion` 回退。
- 诚实：绝不编造指标、证言、客户 logo、案例数量。用户没给的，位置就空着。
- 反套路：不要 eyebrow，不要字距拉开的小型大写字母标签，不要紫蓝渐变、卡中卡、emoji 图标、手绘浏览器窗口。首屏在 1280 × 800 内必须看见标题、一句话和主按钮，单屏约 80 词。

豁免要写进 CSS 的 stamp，带守卫证据：

```css
/* Hallmark · waive 47b · one frame, a real terminal capture inside · the terminal is the product being sold */
```

`sloplint` 会重新推导守卫是否成立。写不出守卫的豁免，通常说明它本来就不成立。同一条款连续豁免三次，判定为项目自有风格，这时该写一份 `design.md` 固化。这套机制的作用是把「我觉得这样好看」变成一句需要举证的话。

## 三、一次构建怎么跑

七步，顺序不能乱。

1. **Pre-flight**：先读项目。`design.md` 优先级最高，其次品牌规范、现有字体调色板、产品本身，产出一段带 `file:line` 的结论并缓存。
2. **只问一次**：素材、受众、用途、调性，四个问题一封消息。prompt 已答全就不问。
3. **Shape**：列素材清单（真实的、图片的、缺席的），判断访客来做什么，从 21 种宏观结构里选版式。
4. **Direction**：脚本发三张主题牌，避开近期用过的组合。

```
node <skill-dir>/scripts/theme.mjs deal --genre <genre> --prompt "<the prompt>" [--log .hallmark/log.json]
```

5. **Picks**：把形状、主题、首屏、签名元素、素材来源一次列清，给用户一个推翻的窗口。
6. **Build**：脚手架先出 `tokens.css` 与 `base.css`，模型只写页面。首屏单独写完先渲染、由冷上下文评审，通过后才继续。模型写长页会逐渐跑偏，先锁首屏，后面才有参照。
7. **Sweep**：`sloplint --render` 跑到干净，subagent 终审，最后补素材清单，写清每个占位槽该放什么。

验证有预算：一次批量检查、一批修复、最多一轮确认，防止代理陷进无限打磨。

## 四、主题是材料，不是模板

50 个主题，每个不超过 8 KB，规定纸张、字体、颜色配额、表面、纹理和组件语言。它从不规定页面包含什么、以什么顺序呈现，所以同一主题下两个 prompt 会得到两个不同的页面。每个主题配一张成品截图，选牌前先看图。

题材（genre）在发牌前定调性：editorial 是默认，管作品集、杂志、品牌故事；modern-minimal 管 SaaS、API、开发者工具；atmospheric 管 AI 生成类、音乐、视频；playful 管游戏、儿童、社区。

发牌不是为了随机，是冲着收敛去的。同一模型连做十页会往同一个审美重心塌缩，发牌把形状、首屏姿态、导航、页脚、首屏后第一区块、行动点位置从模型手里拿走，交给带日志的脚本，日志的 V 轴比对最近三次的差异。

## 五、sloplint

仓库里工程量最大的部分。静态层读 CSS 与 HTML，查 token 使用、字面量颜色、`transition: all`、变量命名；渲染层要 `puppeteer-core` 与 Chrome，在 8 个宽度下截图，查首屏装不装得下、手机是否破版、对比度、横向滚动。

闸门表按颜色与表面、字体、结构布局、外框与文案、动效与交互、资源与可访问性六组排列，编号闸门 88 条，另有 `F1` 到 `F26` 的 Finish 检查。几个典型条款：

- 紫到蓝、紫到粉、深色底加青色渐变，含 `background-clip: text`。Floor，直接 FAIL。
- 标题单词上色或正文渐变。Reflex，单色相渐变可豁免，色相差 40° 内且都是 token。
- 卡中卡、emoji 当图标、假浏览器窗口。Floor。
- 字距拉开的小型大写字母标签。Floor，Hallmark 在这里比行业实践更严。

另外三个工程能力：`--before` / `--kept` 在重设计前后比对链接、字段、事件处理器、标题，丢一个就 FAIL；`install-hook.mjs` 在 Claude Code 里挂编辑时钩子；`refcheck.mjs` / `theme.test.mjs` 做主题完整性校验。

## 六、安装与调用

```
npx skills add nutlope/hallmark -g
```

需要 Node 18 以上。浏览器检查另装 `puppeteer-core` 与 Chrome，没有它们静态检查照样跑。Claude Code 落在 `~/.claude/skills/hallmark`，Codex 在 `~/.agents/skills/hallmark`，Cursor 与 OpenCode 自动发现这两份。

对已有设计默认不动，要改必须先点名：

```
/hallmark redesign ./src/app
/hallmark audit ./index.html
```

`redesign` 保留内容与接线，只换系统与版式；`audit` 只出报告。

## 七、边界

素材必须由人提供。它能自己截产品图，也能从 755 张开放许可照片里选图并署名，但不编造数字与证言。没有素材就带空槽交付，附清单告诉你要填什么。

它约束形式，不管内容策略。页面该讲什么、转化路径成不成立，仍取决于你给的 prompt 和素材。

运行成本不低。一次完整构建要读六七份参考文件，跑两次渲染评审，再起一个 subagent 终审。随便糊个页面的话，这套流程是负担，`--fast` 可以走快车道，地板与静态检查仍然生效。

50 个主题本身也可能变成新的同质化来源。用的人多了，`cobalt` 配 `dusk` 会变成新的「一眼 AI」。应对办法是 `custom`：主题与版式文件全部作废，只剩地板、闸门和一份 `direction.md`。

## 八、小结

它最有价值的部分不是那 50 个主题，是 `gates.md`。哪怕不用这个 skill，把这份清单当自查表也有收益：知道 eyebrow、tracked caps、卡中卡、假数据、动 `width` 的过渡、首屏装不下按钮为什么让人反感，比笼统地说「设计要有品味」有用。

同类工具里，`ui-ux-pro-max` 走查表路线，Hallmark 走约束路线。前者容易查出一堆相似的页面，后者只保证下限，上限仍看模型自己。

要不要装：经常让代理从零写落地页、并且在意页面不像模板，值得装；只是偶尔改改已有页面，单独把 `sloplint` 当 lint 用更划算。
