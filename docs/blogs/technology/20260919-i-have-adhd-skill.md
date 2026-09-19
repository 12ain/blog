---
title: i-have-adhd：一个为 ADHD 读者重塑输出形态的 Skill
author: Rain
date: 2026-09-19
lastmod: 2026-09-19
tags:
  - Agent Skills
  - ADHD
  - 输出风格
  - 生产力
  - 技能开发
categories:
  - 技术
source: https://github.com/ayghri/i-have-adhd
---

> 本文介绍开源 Agent Skill `i-have-adhd`（GitHub：ayghri/i-have-adhd，MIT 许可证，当前版本 0.3.0）。它不改变模型的能力，重点放在输出的形状上，让有注意力缺陷的读者能直接照着做。

## 一、这个 skill 做什么

`i-have-adhd` 是一条输出风格类技能，口号是 "stops your coding agent from burying the answer. Action first. Steps numbered. No 'Hope this helps!'"。读者通过 `/i-have-adhd` 开启后，它会在本次会话后续的所有回复里生效，直到对方说 "stop adhd mode" 或 "normal mode" 才关闭。

它的目标不是更简短，而是让输出能被 ADHD 大脑直接执行：先给动作、分步编号、跨轮复述状态、收敛旁支、给出具体时间估算、把已完成显式亮出来。它和普通的"请简洁一点"不一样：简洁只是少说话，而这个 skill 针对工作记忆小、启动难、时间感模糊、需要即时正反馈这些具体的认知特点。

skill 的灵感来自《The Adult ADHD Tool Kit》（J. Russell Ramsay 与 Anthony L. Rostain 著），但做了改写，面向"LLM 该如何回应"，而不是"人类该如何安排自己的一天"。

## 二、规则背后的五条事实

skill 里的规则都从这五条关于 ADHD 阅读的事实推导出来：

1. 工作记忆很小。屏幕上没写下的东西会被忘掉，所以不要让读者"记着 X"。
2. 知道答案不等于做完。从"懂了"到"做完"之间的阻力，是工作流失的地方。
3. 开始是最难的一步。第一步必须明显、微小、现在就能做。
4. 时间估算在感受上是均匀的。"一点活"和"几小时"听起来差不多，模糊的估算会失效。
5. 多巴胺稀缺。可见的进展才算数，被埋没的进展不会被注意到。

## 三、十条输出规则

基于上面五条，skill 给出十条具体规则：

1. 先给下一步动作。第一行就是读者能做的事，不是背景也不是计划。如果是命令、路径或代码片段，直接放最前面，解释放后面。
2. 多步任务编号。超过一步就写成编号列表，每步是一个有边界的动作，不在一个步骤里塞两个"然后"。尽量用最少的步骤，把琐碎步骤并入上一步。
3. 结尾给一个两分钟内能做的动作。只要还有没收尾的事，就点名一件两分钟内能开始的事，哪怕只是"打开文件"。
4. 收敛旁支。发现第二个问题，先把第一个做完，再把第二个作为单独的问题抛出来。
5. 每轮复述状态。读者记不住"我们在第 3 / 5 步"，所以要复述。如果用了任务或计划工具，让清单去承担复述，不必再用散文念一遍计划。
6. 给具体时间估算。用具体单位估，比如"如果测试已覆盖，大约 15 分钟；没有的话要一个下午"。
7. 让已完成可见。用具体的话说明现在什么能跑，别把成果埋在总结里。
8. 报错用平实语气。不说"哎呀""似乎出问题了"，直接说原因和修法。
9. 列表最多 5 项。长列表分组、按相关度排序，每组可见项控制在 5 个以内；其余内部保留，等用户问或轮到再展示。这条只约束呈现，不限制分析、检索、工具结果或候选生成。
10. 无开场、无总结、无客套。禁止 "Great question"、"让我…" 这类开场，禁止做完后的复述式总结，禁止 "还需要什么吗"、"希望有帮助" 这类收尾。

## 四、持续生效与关闭

这些规则对会话剩余的所有回复生效，不会因为过了几轮或换了话题就失效。如果不确定还是否生效，答案是生效。只有对方说 "stop adhd mode" 或 "normal mode" 时才关，关的时候用一行确认即可。

## 五、何时可以破例

skill 列出了该打破默认的几类情况：

1. 用户要求"解释"或"详细讲"时可以展开，仍需去掉开场和收尾，但正文按需拉长并加标题方便回看。
2. 前方有破坏性操作（rm -rf、force push、删表、改 schema）要先确认，安全优先于简洁。
3. 连续三轮回圈调试时停下，点出可能错的假设，提一个诊断性问题。
4. 需求真有歧义时用一句简短追问代替猜测。
5. 规则与任务冲突时以任务为准。例如"我有哪些选项"应给 2 到 4 个带一行权衡的排序选项、先给推荐，而不是只给一条路径，因为选项本身就是答案。
6. 规则与运行环境冲突时以环境为准。在 agent 类运行环境里，系统提示的优先级高于本 skill：环境要求宣布工具调用时就宣布，该直接干活就别问"要不要我"，时间估算指向实际执行者。约束赢了，形状照旧。

## 六、发送前自检

每条回复发出前，skill 要求删掉这些内容：宣布"我要做什么"的首句、问"还有别的吗"或复述刚发生之事的尾句、任何"顺便说"的旁支、没有信息量的犹豫副词（perhaps、might、could possibly，但保留承载真实不确定性的犹豫），以及 "circle back"、"get the ball rolling" 这类比喻，换成字面动作。删完再校验：如果读者只读首行和尾行，能否知道下一步做什么、刚刚发生了什么。能，才发出。

## 七、安装方式

仓库提供多种接入路径，核心是让编码助手加载 `skills/i-have-adhd/SKILL.md`：

- 最简：把安装提示粘贴进 CLI，"Install the i-have-adhd skill/plugin from https://github.com/ayghri/i-have-adhd"，再按仓库 AGENTS.md / INSTALL.md 操作。
- Claude 插件：通过 marketplace 添加并安装 `i-have-adhd`，之后用 `/i-have-adhd` 命令开启。
- 想自定义：fork 后改 `skills/i-have-adhd/SKILL.md`，再换上自己的副本（uninstall 上游版、marketplace remove、add 自己的、install）。
- 它附带针对 Cursor、OpenCode、Gemini CLI、Kimi 等客户端的适配与"常开"扩展。

## 八、一个 before / after 例子

仓库 README 用一段 auth 流改造直观对比了效果。改造前，助手先寒暄、铺背景、夹带"顺便说你依赖也旧了"、最后以"希望有帮助"收尾；改造后直接给命令，再列三步编号清单，结尾点名"如果测试失败就贴出第一行报错"。差距不在信息量，而在信息是否被埋没。

## 九、小结

`i-have-adhd` 把"ADHD 友好的输出"固化成一套可复用、可关闭、可 fork 的规则集，以 MIT 许可证开源在 ayghri/i-have-adhd。它不要求模型更聪明，只要求输出更可执行：动作先行、状态可见、旁支收敛、时间具体。对经常和 AI 协作、却又常被长文淹没的人来说，这类输出风格 skill 比反复叮嘱"简短点"要可靠。

---

参考资料

- 仓库主页：https://github.com/ayghri/i-have-adhd
- 完整规则 SKILL.md：https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md
- 早期版本解读视频（Kacper Rutkiewicz | AI Made Simple）：https://youtu.be/NEl8kPWZP_Y
- 灵感来源：《The Adult ADHD Tool Kit》（J. Russell Ramsay, Anthony L. Rostain）
