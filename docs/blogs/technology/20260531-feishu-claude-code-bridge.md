---
title: feishu-claude-code-bridge - 飞书接入 Claude Code 开源桥接项目
author: Rain
date: 2026-05-31
lastmod: 2026-05-31
reprint: true
tags:
  - Claude Code
  - 飞书
  - 自动化
  - 转载
categories:
  - Claude Code
source: https://mp.weixin.qq.com/s/aCwVqBdHZczYbAh6Zx8EQQ
---

> **转载声明**：本文转载自微信公众号文章（原作者 甲木Zuiyn）[feishu-claude-code-bridge - 飞书接入 Claude Code 开源桥接项目](https://mp.weixin.qq.com/s/aCwVqBdHZczYbAh6Zx8EQQ)，著作权归原作者所有。

## feishu-claude-code-bridge

**一句话**：把本地 Claude Code 桥接到飞书 / Lark 的开源 Bridge 项目，让 Claude Code 成为飞书里的一个 Bot。

## 01 部署：一行命令

终端跑一句：

```bash
npx -y lark-channel-bridge@latest start
```

如果再配合 Lark CLI 一起用，体验会更顺手。参考：[飞书 CLI 开源了，我用 Claude Code 玩转几大企业级场景](https://mp.weixin.qq.com/s?__biz=MzkxNjY0MzM1MA==&mid=2247491446&idx=1&sn=708496f70f54dc8dde451845fcd9fe34&scene=21#wechat_redirect)

第一次跑，弹出框用飞书扫码授权。之后在 Lark 开发者控制台确认权限 scope 和事件管理权限开启。

再次 `lark-channel-bridge start`，看到 ✓ 已连接 就可以在飞书里找 bot 对话了。遇到问题直接发 `/doctor`，让 Claude Code 自己诊断。

## 02 移动端场景：合上电脑去吃饭

出门路上想到改动，掏出手机打开飞书，@ Claude Code，把想法说出来（打字 / 语音 / 截图均可）。Claude Code 在家里那台电脑上把活干完，结果直接发回飞书。

配合 Mac 上的 Amphetamine（让电脑合盖不休眠），整个事就闭环了。

## 03 会话管理：一个群 = 一个 Project

```
GROUP：一个群 = 一个项目，cwd 锁在这个项目目录
TOPIC：一个话题 = 一个 session（普通群里就是 thread）
```

直接复用飞书的群组织结构，不需要手动建群。

- `/new chat 一念江湖`：Claude Code 自动拉群，cwd 自动切好
- `/resume`：列表卡片展示最近几个会话，点一下续上

## 04 历史记录天然保留

Claude Code 原生不存完整聊天记录（jsonl 文件又深又有 compact）。

接进飞书后，所有对话（包括 brainstorm 过程中的「思考资产」）天然留在飞书里，可搜索、可合并转发。

## 05 飞书文档代替终端 Markdown

Claude Code 直接写飞书文档，写完丢链接到群里，点开即是格式正常的文档（标题层级、表格、图片全部正常渲染）。

反馈方式：直接划词评论 → Claude Code 看到评论自动修改。

```
BEFORE：AI 写 → 我读不爽 → 我手动改 → 我贴回去
AFTER：AI 写 → 我划词 → AI 改
```

## 06 交互卡片：不用打字做选择

Claude Code 让你做选择题时，直接发交互卡片，卡片上摆按钮，点哪个走哪条路径。同时支持富文本消息、表格渲染、长图查看。

## 07 补充说明

**关于计费**：2026 年 6 月 15 日起，`claude -p` 和 Agent SDK 的使用独立计费，不再占用原有对话额度，当月不滚存。这个 Bridge 走的就是 `claude -p` 模式，重度使用需提前评估用量。

**项目性质**：个人开源，自部署、自维护，遇到 bug 在 GitHub 提 issue / PR。

**Codex 替代方案**：
- kxn/codex-remote-feishu
- guyue010/public-codex-skills

## 项目地址

[zarazhangrui/feishu-claude-code-bridge](https://github.com/zarazhangrui/feishu-claude-code-bridge)（README 里有完整教程）
