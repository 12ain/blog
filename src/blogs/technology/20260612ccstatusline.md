---
title: ccstatusline-zh - Claude Code 汉化状态栏的配置实践
author: Rain
tags:
  - Claude Code
  - ccstatusline
  - 状态栏
  - 汉化
  - 配置
categories:
  - 技术文章
date: 2026-06-12 01:04
---

Claude Code 自带的状态栏只有最基础的几行信息，社区的 [ccstatusline](https://github.com/sirmalloc/ccstatusline) 把它扩展成了一个可拼装的组件系统：模型、Git、Token、上下文、会话费用都可以拖进状态栏。问题是上游的交互 TUI 全英文，组件名、分类、提示信息混在一起时找起来比较费眼。

[ccstatusline-zh](https://github.com/huangguang1999/ccstatusline-zh) 是上游的汉化 fork，把所有用户可见的界面文本翻成了中文，内部 ID 保留英文，配置文件和上游 100% 互通。这篇记录我目前的接入方式和配置拆解。

## 插件定位

- **完整跟随上游**：版本号与 ccstatusline 同步，当前 v2.2.19，功能没有删减
- **仅汉化界面**：组件名、分类、菜单、提示信息走中文，内部 `type` 字段（如 `model`、`git-branch`）保持英文，所以同一份 `settings.json` 在原版和汉化版之间可以无缝迁移
- **70+ 组件**：覆盖核心、Git、Token、上下文、会话、自定义、布局七类
- **支持 Powerline 主题**：可自定义分隔符与颜色延续，也支持极简模式（不显示标签只显示数值）

适用场景：习惯中文环境、需要频繁通过 `setup` TUI 调整组件顺序、或者想把这套配置分享给同事但同事英文阅读速度不快。

## 安装

全局安装：

```bash
npm install -g ccstatusline-zh
# 或
bun install -g ccstatusline-zh
```

我用的是 pinned 模式（锁定版本，不让它自动升级），这样升级节奏掌握在自己手里，避免某次 `npm update` 把状态栏组件结构改了之后还要回头排查。

## 接入 Claude Code

在 `~/.claude/settings.json` 里挂三处：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Skill",
        "hooks": [
          { "type": "command", "command": "ccstatusline-zh --hook" }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          { "type": "command", "command": "ccstatusline-zh --hook" }
        ]
      }
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "ccstatusline-zh",
    "padding": 0,
    "refreshInterval": 10
  }
}
```

三处的分工：

- `statusLine`：每次 Claude Code 刷新状态栏时调用 `ccstatusline-zh`，输出渲染好的多行字符串
- `UserPromptSubmit` 钩子：用户提交 prompt 时触发 `--hook`，让插件刷新内部缓存（例如重置 Token / 会话相关的统计）
- `PreToolUse` 钩子（`matcher: Skill`）：触发 Skill 调用前再刷新一次，状态栏里的 `skills` 组件依赖这次回调来显示当前激活的 Skill

`refreshInterval: 10` 是 Claude Code 控制状态栏刷新频率的参数，单位秒。配 10 秒在 git 状态、内存占用这类高频变化的组件上观感比较顺，太短会增加 git 调用次数。

## 配置文件拆解

插件自己的配置在 `~/.config/ccstatusline/settings.json`，可以手写也可以用 `ccstatusline-zh setup` 起 TUI 改。我现在三行布局长这样：

```json
{
  "version": 3,
  "lines": [
    [
      {
        "type": "current-working-dir",
        "metadata": { "abbreviateHome": "true" },
        "color": "brightYellow"
      }
    ],
    [
      { "type": "model", "color": "cyan" },
      { "type": "context-length", "color": "brightBlack" },
      {
        "type": "context-percentage-usable",
        "color": "brightBlack",
        "metadata": { "inverse": "true" }
      },
      { "type": "tokens-total", "merge": true },
      { "type": "skills" },
      { "type": "thinking-effort" },
      { "type": "free-memory" }
    ],
    [
      { "type": "git-branch" },
      { "type": "git-ahead-behind" },
      { "type": "git-status" }
    ]
  ],
  "flexMode": "full-minus-40",
  "compactThreshold": 60,
  "colorLevel": 3,
  "gitCacheTtlSeconds": 5,
  "minimalistMode": false,
  "powerline": { "enabled": false },
  "installation": {
    "method": "pinned",
    "installedVersion": "2.2.19"
  }
}
```

三行的分工：

**第一行 - 路径定位**

只放一个 `current-working-dir`，`abbreviateHome` 会把家目录缩写成 `~`，配 `brightYellow` 颜色，一眼能看出当前工作的目录。单独一行是为了不被后面的高频信息挤掉。

**第二行 - 当前会话核心信息**

按“从静到动”的顺序排：

- `model`：当前模型（青色高亮）
- `context-length`：已用上下文长度
- `context-percentage-usable`：可用上下文百分比，`inverse: true` 让显示反相（突出“剩多少”而不是“用了多少”）
- `tokens-total`：本次会话累计 token，`merge: true` 让它和前一个组件共用分隔符，视觉上贴近
- `skills`：当前激活的 Skill（依赖前面 `PreToolUse` 钩子刷新）
- `thinking-effort`：思考强度档位
- `free-memory`：系统空闲内存，判断本机是否还能再开重活

**第三行 - Git 状态**

`git-branch` + `git-ahead-behind` + `git-status` 三件套，覆盖“在哪个分支、和远端差多少、工作区脏不脏”。`gitCacheTtlSeconds: 5` 把 git 命令的结果缓存 5 秒，避免状态栏每次刷新都跑一遍 `git status`。

**全局参数**

- `flexMode: full-minus-40`：弹性布局模式，预留 40 字符给可能的 Claude Code 内置输出，避免状态栏被挤出终端
- `compactThreshold: 60`：终端宽度小于 60 时切到紧凑显示
- `colorLevel: 3`：开 24-bit 真彩色
- `minimalistMode: false`：保留组件标签，需要图标化的可以打开

## 一些小经验

**版本锁定优先**

`installation.method` 选 `pinned` 而不是 `latest`，能避开“今天打开发现状态栏变了”的尴尬。要升级时手动 `npm install -g ccstatusline-zh@<version>` 即可。

**先 TUI 后手写**

第一次配置走 `ccstatusline-zh setup` TUI 比较直观，里面带实时预览；定下来之后改单项参数（比如颜色、`metadata`）直接编辑 JSON 更快。

**和上游配置可互换**

如果团队里有人坚持用英文版，可以共用同一份 `settings.json`：因为内部 `type` 都是英文，只是显示文本不同。需要切回原版时，卸载汉化版换装上游、把 `~/.claude/settings.json` 里的 `ccstatusline-zh` 改成 `ccstatusline` 就行。

**钩子不是必须**

如果不用 `skills` 组件，可以把 `PreToolUse` 钩子整段删掉；如果不关心会话累计 Token，`UserPromptSubmit` 钩子也可以省。钩子只是为了让对应组件的数据更及时。

## 参考

- 项目地址：https://github.com/huangguang1999/ccstatusline-zh
- 上游项目：https://github.com/sirmalloc/ccstatusline
