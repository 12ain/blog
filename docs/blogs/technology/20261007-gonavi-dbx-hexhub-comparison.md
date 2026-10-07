---
title: GoNavi、DBX、HexHub 三个新生代数据库客户端横评
author: Rain
date: 2026-10-07
lastmod: 2026-10-07
tags:
  - 数据库
  - 数据库客户端
  - GoNavi
  - DBX
  - HexHub
  - 效率工具
categories:
  - 技术
---

> 版本与 star 数截至 2026-10-07。

Navicat 年年涨价，DBeaver 打开要等 Java 虚拟机，TablePlus 免费版限制标签页数量。这几年数据库客户端这个老赛道冒出来一批新面孔，我最近把其中三个都装上用了一段时间：GoNavi、DBX、HexHub。

三个工具的相似度高得可疑：都是国内开发者做的，安装包都在 30MB 以内，都内置 AI，都支持国产数据库，GoNavi 和 DBX 甚至在同一天（10 月 6 日）各发了一个新版本。但仔细用下来，它们其实是三种不同的产品。这篇把各自的底细和适用场景捋一遍。

## 三个工具分别是什么来头

### GoNavi：数据源类型最全的"万金油"

[GoNavi](https://gonavi.org/zh/)（[GitHub](https://github.com/Syngnat/GoNavi)）2026 年 1 月创建，Apache-2.0 开源，目前 2000 出头 star，最新版 v1.1.1。技术栈是 Go + Wails，界面靠系统 WebView 渲染，不打包 Chromium，安装包 17 到 28MB。

它的卖点是数据源覆盖面。官方把支持的数据库分成 8 类，加起来 50 多种：

| 类别 | 数量 | 代表 |
| --- | --- | --- |
| 关系型 | 12 | MySQL、PostgreSQL、Oracle、SQL Server、SQLite、DuckDB |
| 国产数据库 | 12 | 达梦、人大金仓、OceanBase、openGauss、GaussDB、GoldenDB、GBase 全家桶、崖山 |
| 分析 / 联邦查询 | 5 | ClickHouse、Doris、StarRocks、Trino、Presto |
| 时序 | 7 | TDengine、InfluxDB、TimescaleDB、IoTDB、QuestDB |
| 搜索 | 5 | Elasticsearch、OpenSearch、Meilisearch、Typesense |
| 向量 | 4 | Milvus、Qdrant、Chroma、Weaviate |
| 消息队列 | 4 | Kafka、RocketMQ、RabbitMQ、MQTT |
| NoSQL / 协调 | 5 | Redis、MongoDB、etcd、ZooKeeper、Nacos |

向量库、搜索引擎、时序库都能塞进同一个客户端，这个宽度我在同类工具里还没见过第二家。做信创项目的人看到国产库那一列会明白它的价值：GBase 8a/8c/8s、瀚高、Vastbase 这些名字，别的工具很难凑齐。

细节功能不少。SQL 编辑器基于 Monaco，能补全库名表名字段名；结果表格虚拟滚动，单元格直接改数据，改动可以按事务提交或回滚；执行记录带耗时；审计中心默认脱敏，能设保留时长，也能导出；连接配置导出成 JSON，换电脑直接导入；SSH 隧道、代理、自定义 Driver + DSN 接入都有。它还有个实验性的 Web Server 版，Docker、K8s、Helm、Podman 都能部署，另外附赠一个无界面的 CLI，和桌面版共用连接配置。

内存方面官网自己给了实测：Linux 上空工作台约 429MB，加上 WebKit 子进程约 765MB。官方也老实承认 Windows 和 macOS 上测会有出入。不算惊艳，但比动辄上 GB 的 Electron 客户端轻了一个量级。

### DBX：迭代最猛，冲着 AI 工作流去的

[DBX](https://github.com/t8y2/dbx) 2026 年 4 月底创建，同样 Apache-2.0，五个多月 star 冲到 2.5 万，最新版 v0.6.35。Rust 后端 + Tauri 2 + Vue 3，安装包 25MB 左右，界面用 CodeMirror 6。

支持 100+ 数据库，常规的 MySQL、PostgreSQL、Redis、MongoDB 不用说，国产库同样齐全（达梦、人大金仓、OceanBase、openGauss、GaussDB 都有），还有 Cloudflare D1、DuckDB 这类新物种。H2、Snowflake、Hive、DB2 这些通过 agent-based profiles 扩展接入。

论功能密度，DBX 是三个里最高的：ER 图、跨连接 schema diff、可视化执行计划、字段级血缘分析、数据对比、跨库数据迁移、CSV/Excel 导入，拖一个 Parquet 文件进去能直接预览（靠 DuckDB）。还能从 DBeaver 或 Navicat 导入现成的连接配置，迁移成本想得很周到。消息队列和中间件也有一等公民待遇：Kafka、RocketMQ、RabbitMQ、Pulsar、MQTT 都有控制台，Nacos、Consul、ZooKeeper、etcd 也能看。

插件系统是它独有的。内置商店里有 S3、Kubernetes、LDAP 这些插件，每个包都带签名验证，UI 跑在沙箱 sidecar 进程里。官方提供 Go 和 TypeScript SDK，`npx @dbx-app/plugin-cli` 一行命令脚手架出自己的插件，发布到 [dbx-store](https://github.com/t8y2/dbx-store)。

AI 这块它走得最远，分三层。第一层是内置 SQL 助手，Claude、OpenAI、Ollama 本地模型都行，AI 生成的 SQL 先过一遍安全检查再执行。第二层是独立分发的 MCP server，`npx @dbx-app/mcp-server` 就能跑，Claude Code、Cursor、Windsurf 这些 coding agent 直接用它查你配好的数据库，权限分 read_only、safe_write、high_risk_write 三档。第三层是 CLI（`brew install dbx-cli`），`dbx agent setup` 会往 `~/.agents/skills/dbx` 装一个官方 Agent Skill，让终端里的 AI 知道怎么安全地用它。

从这三层设计能看出来，DBX 想让你的数据库成为所有 AI 工具都能安全访问的资源，GUI 只是入口之一。5 个月 2.5 万 star，大概也是踩中了这波 AI 编程的热度。

### HexHub：数据库只是它的一部分

[HexHub](https://www.hexhub.cn/) 和前两位不一样，它是商业软件：免费下载，九成以上核心功能免费，专业版、增强版按订阅收费（分别支持 3 台、6 台设备同时登录），企业可以谈私有化部署。GitHub 上能搜到一个早期的开源仓库，2023 年年中之后就没再更新，和现在的产品不是一回事。

它把自己定位成一站式开发运维客户端，数据库管理、SSH 终端、SFTP、Docker 容器管理、AI 工作流全在一个应用里。数据库部分覆盖 MySQL、PostgreSQL、Redis、MongoDB 等主流库，国产库支持达梦、人大金仓、openGauss、OceanBase，有 SQL 编辑器、数据表格直接改、表结构同步、导入导出。

真正让它和前两位拉开差距的是另外几块能力：

终端。多标签、多终端并排视图、命令广播（一条命令同时打到多台服务器）、SFTP 和 lrzsz 传输、SSH 隧道、X11 转发，该有的运维刚需都在。

容器。容器状态、资源占用、端口、日志、终端、容器文件管理，还能借本地网络给服务器加速拉镜像。

AI。BYOK 用自己的 API Key，三种 Agent 模式独立使用：对话式通用 Agent、终端增强 Agent、SQL Agent。官网演示里说一句"帮我在服务器上装个 Redis"，它真的连上去执行、验证，然后把结果摆给你。MCP 把整个能力对外开放，别的 AI 工具可以调它的服务器、容器、数据库接口。

还有一个独特的点：六端通用。macOS、Windows、Linux 之外，它有 iPhone、iPad 和 Android 客户端。半夜被告警叫醒，摸出手机看一眼慢查询再处理掉，这个场景目前只有它做得到。

数据安全方面，资产配置默认存在本地不上传，官方云端同步用登录密码派生密钥做端到端加密，服务器侧拿不到明文；也可以选择同步到自己的 WebDAV、S3 或 Git 仓库。

## 放在一起看

| | GoNavi | DBX | HexHub |
| --- | --- | --- | --- |
| 开源 / 商业 | Apache-2.0 开源 | Apache-2.0 开源 | 闭源，免费 + 订阅 |
| 技术栈 | Go + Wails + 系统 WebView | Rust + Tauri 2 + Vue 3 | 未公开 |
| 安装包 | 17–28 MB | 约 25 MB | 以官网为准 |
| 数据库支持 | 50+ 种，按 8 大类划分 | 100+ 种 | 主流库 + 部分国产库 |
| 国产数据库 | 12 个 | 15 个以上 | 达梦、金仓、openGauss、OceanBase |
| 向量 / 时序 / 搜索 | 三类都支持 | 部分支持 | 未提及 |
| 消息队列 | 4 种 | 5 种，外加中间件控制台 | 无 |
| ER 图 / Schema Diff / 血缘 | 无 | 都有 | 表结构同步 |
| 插件系统 | 无 | 有，签名 + 沙箱 | 无 |
| Web / Docker 版 | 实验性 | 有，官方镜像 | 企业私有化 |
| 移动端 | 无 | 无 | iOS / iPadOS / Android |
| AI 与 MCP | 内置助手 + MCP Server 可独立部署 | 内置助手 + 独立 MCP + CLI + Agent Skill | 三种 Agent，BYOK，MCP 对外开放自身能力 |
| GitHub star | 约 2,000 | 约 25,000 | — |
| 最新版本 | v1.1.1 | v0.6.35 | 见官网版本信息 |

关于技术路线多说两句。GoNavi 和 DBX 选了同一条路：不打包 Chromium，用系统 WebView。GoNavi 用 Wails，DBX 用 Tauri，收益是安装包和内存都小一个量级，代价是各家 WebView 行为有差异，GoNavi 甚至要为 Linux 上的 WebKitGTK 4.0 和 4.1 各发一个包。老牌的 Navicat、DBeaver 都不是这个路线，新生代里这两家算是把"轻"做成了卖点。HexHub 官网没写技术栈，就不猜了。

AI 和 MCP 三家的姿势差别很大，值得单独说。GoNavi 把重心放在安全上：远程 agent 默认只能查表结构，要执行 SQL 必须显式开启，并且和内置助手共用一套安全设置，配合默认脱敏的审计中心，像是给"让 AI 碰生产库"这件事上保险。DBX 是把 MCP 做成独立进程配三档权限，再配上 CLI 和 Agent Skill，目标用户非常明确：天天开 Claude Code 的开发者。HexHub 反过来，把 MCP 当出口，让别的 AI 工具来调它自己的能力，产品重心放在它内置的 Agent 上。

## 按场景选

#### 信创或国产化项目：GoNavi

12 个国产数据库全覆盖，GBase 三个版本、崖山、瀚高、Vastbase 在别处很难凑齐。DBX 的国产库列表也不短，两家都够用，但 GoNavi 把审计脱敏做成了一等公民，过合规检查的时候省心。

#### 日常开发的数据库主力：DBX

功能密度最高，ER 图、执行计划、数据对比、Navicat 连接导入，该有的都有。更关键的是它和 AI 编程工具的集成最深，写代码时让 Claude Code 直接查库验证，这个工作流一旦跑顺了很难回去。迭代速度也夸张，几乎天天有新版本。

#### 一个人管一堆服务器和容器：HexHub

它的竞争对手其实是 XShell + Navicat + Docker Desktop 的组合拳，而不是另外两家。命令广播、多终端并排、手机客户端，全是运维视角的刚需。前提是接受闭源和订阅制。

#### 要让 AI 碰生产库

先看合规要求。GoNavi 的审计中心默认脱敏、远程 MCP 默认只读，DBX 的 MCP 权限分三档可配，两家的安全模型都能过审，看你们的等保和审计口径更贴哪边。

## 最后

三个工具更新都很勤，这个赛道目前的局面是：老牌工具涨价，新生代拿轻量和 AI 换市场。真要挑一个当主力，我投 DBX，ER 图、数据对比、MCP 这套组合对开发者的日常最实用；时序、向量、搜索这些杂食需求交给 GoNavi；手里服务器比数据库多的人，直接上 HexHub。

三家里唯一让我犹豫的是 HexHub 的闭源：数据在我的服务器上，工具却不在我手里。这个顾虑见仁见智，但下单前值得想清楚。
