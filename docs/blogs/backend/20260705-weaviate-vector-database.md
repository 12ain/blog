---
title: Weaviate 向量数据库详解
author: Rain
date: 2026-07-05
lastmod: 2026-07-05
tags:
  - Weaviate
  - 向量数据库
  - RAG
  - HNSW
  - 混合搜索
categories:
  - 后端
source: https://mp.weixin.qq.com/s/gpJGUQ_wHJG8NAR3hZfmog
---

> 摘要：你做过 RAG 吗？就是那种"把公司文档喂给 LLM，然后问它问题"的操作。听起来简单，做下来发现：向量数据库怎么选？Milvus 太重、Pinecone 太贵、Chroma 太慢。然后你发现了 Weaviate——一个 Go 写的向量数据库，16K Star，既能跑在笔记本上做原型，也能撑住生产环境的百万级文档。今天我们拆开看看它的设计。

## 一次让我重新选型的经历

2025 年底，我在一家做企业知识管理的公司负责技术架构。

产品经理提了个需求：把公司内部的技术文档、设计文档、会议纪要全部向量化，然后做一个"知识问答助手"。用户用自然语言提问，系统从文档里找答案，附上引用来源。

典型的 RAG 场景。

一开始我用的是 Chroma——Python 写的，轻量，本地跑很方便。测试环境里放了 500 份文档，查询延迟 200ms，挺满意。

然后上了生产环境。

第一周还好。第二周开始，文档数量突破 5000，查询延迟从 200ms 飙到 2 秒。第三周，10000 份文档，延迟 5 秒，用户开始投诉。

我跟运维同事排查，发现 Chroma 的单机架构撑不住了。向量检索是 CPU 密集型操作，文档一多，单核 CPU 跑满，查询排队。

同事说：要不换 Milvus？我说：Milvus 需要 etcd、MinIO、Pulsar，部署一套下来，运维成本比业务代码还重。他说：那 Pinecone？我说：托管服务，按查询次数收费，我们这种高频查询场景，一个月账单能顶一个实习生工资。

后来我试了 Weaviate。

第一印象：一个二进制， `weaviate server` 启动就能用。不需要 etcd，不需要 MinIO，不需要消息队列。文档说"single binary, zero dependencies"，还真是。

跑了一周，10000 份文档，查询延迟稳定在 150ms。同事看了监控面板，说：这数字真的假的？

## Weaviate 是什么

先看基础信息：

| 项目 | 信息 |
| --- | --- |
| GitHub | github.com/weaviate/weaviate |
| Star | 16.5K+ |
| 语言 | Go（96.3%） |
| 协议 | BSD-3-Clause |
| 最新版本 | v1.38.2 |
| 定位 | 向量数据库 + AI 原生 |
| 维护方 | Weaviate B.V.（荷兰公司） |

Weaviate 最早是一个学术项目，来自荷兰的一家研究实验室。后来商业化，成立了 Weaviate B.V. 公司，但核心代码一直保持开源。

它的定位不只是"向量数据库"，而是"AI-native database"。意思是：它不只能存向量、查向量，还内置了很多 AI 相关的功能——比如自动向量化（你扔给它一段文本，它自动调 embedding 模型转成向量）、混合搜索（向量 + 关键词）、生成式搜索（直接接 LLM 做 RAG）。

这些功能在其他系统里需要你自己搭：embedding 服务、向量数据库、关键词搜索引擎、LLM 网关。Weaviate 打包在一起了。

## 核心架构：不只是 HNSW

Weaviate 的向量检索用的是 HNSW（Hierarchical Navigable Small World）算法。

HNSW 是目前最主流的近似最近邻（ANN）算法之一。原理是构建一个多层图结构：底层包含所有数据点，上层是稀疏的"高速公路"，查询时从顶层开始，沿着图快速跳转到目标区域，然后逐层下沉到细节。

这种结构的好处是：查询时间复杂度接近 O(log N)，即使数据量很大，查询速度也不会线性下降。

但 Weaviate 没有停留在 HNSW 上。它做了几件事：

**压缩技术** ：HNSW 需要把向量存在内存里，内存成本是大问题。Weaviate 支持 PQ（Product Quantization）压缩，可以把向量占用的内存减少 10-40 倍，代价是精度损失 2-5%。对于大部分场景，这个 trade-off 是值得的。

**混合搜索** ：纯向量搜索有个问题——它对精确匹配不敏感。比如你搜"Kubernetes 1.28 的新特性"，向量搜索可能返回"Kubernetes 1.27 的新特性"，因为语义很近。Weaviate 支持 BM25 关键词搜索 + 向量搜索的混合模式，既能拿到语义相似的结果，也能精确匹配关键词。

**多租户** ：企业场景下，你需要为不同的客户、不同的项目隔离数据。Weaviate 原生支持多租户，每个租户的数据物理隔离，但共享同一个集群资源。

Weaviate 能跑在生产环境，不只是本地 demo。

## 自动向量化：不用自己调 embedding API

这是 Weaviate 最让我省心的功能。

传统流程是这样的：

1. 你有一段文本
2. 你调 OpenAI 的 embedding API（或者本地跑一个 embedding 模型）
3. 拿到向量
4. 把向量和原文一起存进向量数据库

这个过程需要你自己写代码、管理 API key、处理错误、控制并发。

Weaviate 的做法是：你直接在 schema 里声明"这个字段用哪个 embedding 模型"，然后你只需要存原文，Weaviate 自动调 embedding API 转成向量，自动存储。

```
# Weaviate schema 配置
classes:
-class:Document
    vectorizer:text2vec-openai
    properties:
      -name:content
        dataType:[text]
      -name:title
        dataType:[string]
```

这个 schema 定义了一个 `Document` 类， `content` 和 `title` 字段会自动用 OpenAI 的 embedding 模型向量化。你存数据的时候只需要：

```
client.data_object.create({
    "content": "Weaviate 是一个 Go 写的向量数据库...",
    "title": "Weaviate 介绍"
}, "Document")
```

Weaviate 会自动调 OpenAI API 把 content 和 title 转成向量，存进去。你不需要写 embedding 逻辑。

声明式的方式，RAG 开发流程简化了很多。

## 混合搜索：向量 + 关键词

前面说过，纯向量搜索对精确匹配不敏感。Weaviate 的混合搜索解决了这个问题。

```
response = client.query.hybrid(
    class_name="Document",
    query="Kubernetes 1.28 新特性",
    alpha=0.5  # 0=纯关键词，1=纯向量
)
```

`alpha=0.5` 表示向量搜索和关键词搜索各占 50% 的权重。你可以根据场景调整：如果用户的问题很具体（比如版本号），可以调低 alpha，让关键词搜索权重更高；如果用户的问题是模糊的（比如"怎么优化性能"），可以调高 alpha，让向量搜索权重更高。

混合搜索的结果会合并两种搜索的排名，用 RRF（Reciprocal Rank Fusion）算法做融合。

这个功能在实际业务里效果不错。比如用户搜"Go 1.21 的 range over function"，关键词搜索能精确匹配到"Go 1.21"和"range over function"，向量搜索能找到语义相关的内容（比如"Go 1.22 的迭代器改进"）。两者结合，比单一搜索好很多。

## 生成式搜索：内置 RAG

Weaviate 还内置了生成式搜索——直接在数据库层面做 RAG。

```
response = client.query.get(
    class_name="Document",
    properties=["title", "content"]
).with_near_text({
    "concepts": ["怎么优化 Go 程序的性能"]
}).with_generate(
    single_prompt="根据以下内容回答：{content}"
)
```

这个查询会：

1. 用向量搜索找到最相关的文档
2. 把文档内容填入 prompt
3. 调 LLM 生成答案

你不需要自己写 RAG 流程，Weaviate 全包了。

这个功能对于快速原型很好用。你可以半天内搭一个 RAG 系统出来，不需要写 embedding 逻辑、不需要写检索逻辑、不需要写 LLM 调用逻辑。

但对于生产环境，我建议还是自己控制 RAG 流程。因为 Weaviate 的生成式搜索功能相对简单，不支持复杂的 prompt 工程、不支持多轮对话、不支持流式输出。这些功能需要你自己实现。

## 性能：单机能撑多大

Weaviate 的性能怎么样？

官方给的数据是：单节点可以支撑百万级向量，查询延迟在 100ms 以内。多节点集群可以支撑十亿级向量。

我自己的测试：

- 100 万条 768 维向量（text-embedding-ada-002），单节点，查询延迟 50-100ms
- 500 万条 768 维向量，单节点 + PQ 压缩，查询延迟 100-200ms，内存占用从 20GB 降到 4GB
- 1000 万条 768 维向量，3 节点集群，查询延迟 80-150ms

大部分 RAG 场景够用了。如果你需要更低延迟（比如 10ms 以内），可以考虑用 GPU 加速（Weaviate 支持 GPU 索引）。

跟 Milvus 比，Weaviate 的性能略低一些（Milvus 做了更多底层优化），但差距不大。跟 Chroma 比，Weaviate 快一个数量级。跟 Pinecone 比，性能差不多，但 Weaviate 可以自托管，成本可控。

## 实战用法

说几个常见的使用场景。

**本地开发环境：**

```
# 用 Docker 启动
docker run -d -p 8080:8080 -p 50051:50051 \
  cr.weaviate.io/semitechnologies/weaviate:1.38.2

# 访问控制台
open http://localhost:8080/v1/schema
```

**Python 客户端：**

```
import weaviate

client = weaviate.Client("http://localhost:8080")

# 创建 schema
schema = {
    "classes": [{
        "class": "Document",
        "vectorizer": "text2vec-openai",
        "properties": [
            {"name": "content", "dataType": ["text"]},
            {"name": "title", "dataType": ["string"]}
        ]
    }]
}
client.schema.create(schema)

# 插入数据
client.data_object.create({
    "content": "Weaviate 是一个 Go 写的向量数据库",
    "title": "Weaviate 介绍"
}, "Document")

# 查询
response = client.query.get(
    "Document", ["title", "content"]
).with_near_text({
    "concepts": ["向量数据库"]
}).do()

print(response)
```

**Go 客户端：**

```
import (
    "context"
    "github.com/weaviate/weaviate-go-client/v4/weaviate"
)

client, err := weaviate.NewClient(weaviate.Config{
    Scheme: "http",
    Host:   "localhost:8080",
})

// 查询
result, err := client.Graph().
    Get().
    WithClassName("Document").
    WithNearText(&nearTextObj).
    WithFields(field).
    Do(context.Background())
```

**多租户场景：**

```
# 创建租户
client.schema.create_tenant("Document", "tenant_a")
client.schema.create_tenant("Document", "tenant_b")

# 插入数据到指定租户
client.data_object.create(
    data_object={"content": "..."},
    class_name="Document",
    tenant="tenant_a"
)

# 查询指定租户
response = client.query.get(
    class_name="Document",
    properties=["content"]
).with_tenant("tenant_a").do()
```

## 与其他向量数据库对比

| 维度 | Weaviate | Milvus | Chroma | Pinecone |
| --- | --- | --- | --- | --- |
| 语言 | Go | Go/C++ | Python | 托管服务 |
| 部署 | 单二进制 | 分布式集群 | 单进程 | 托管 |
| 自动向量化 | 内置 | 需要自己实现 | 内置 | 内置 |
| 混合搜索 | 原生支持 | 需要配置 | 有限支持 | 支持 |
| 生成式搜索 | 内置 | 需要自己实现 | 需要自己实现 | 内置 |
| 多租户 | 原生支持 | 需要配置 | 不支持 | 原生支持 |
| 性能 | 高 | 极高 | 低 | 高 |
| 运维复杂度 | 低 | 高 | 极低 | 无 |
| 开源协议 | BSD-3 | Apache-2.0 | Apache-2.0 | 商用 |

Milvus 性能最高，但部署复杂度也最高。适合数据量大、对延迟要求极高的场景。

Chroma 最轻量，适合本地原型和小规模实验。但性能和功能都有限。

Pinecone 是托管服务，不用自己运维，但成本高，数据在别人手里。

Weaviate 的定位在中间：性能够用，部署简单，功能全面。大部分 RAG 场景，Weaviate 是个平衡的选择。

## Go 代码赏析

几个核心包：

- `entities/` ：核心数据类型定义（Schema、Class、Property 等）
- `adapters/` ：各种适配器（HTTP、gRPC、向量索引、embedding 模型）
- `usecases/` ：业务逻辑层（CRUD、查询、向量化）
- `infrastructure/` ：基础设施（HNSW 索引、压缩算法、存储引擎）

Weaviate 的代码结构是标准的分层架构。 `entities` 定义数据模型， `usecases` 实现业务逻辑， `adapters` 对接外部系统（HTTP API、gRPC、向量数据库、embedding 模型）。

分层的好处是扩展性好。比如你想换 embedding 模型，只需要在 `adapters` 里加一个新的 adapter，业务逻辑不需要改。

另一个值得看的是 HNSW 索引的实现。在 `infrastructure/vector/hnsw/` 包里，你可以看到 HNSW 算法的完整实现——图的构建、查询、压缩、持久化。代码量不小，但逻辑清晰，是学习 HNSW 的好材料。

## 局限性和注意事项

Weaviate 也有局限。几个需要注意的点：

**内存占用** 。HNSW 需要把向量存在内存里。如果你有大量向量（百万级以上），内存成本会很高。虽然 Weaviate 支持 PQ 压缩，但压缩后精度会下降。

**写入性能** 。Weaviate 的写入性能不如 Milvus。如果你需要高频写入（比如每秒几千条），Weaviate 可能会成为瓶颈。Milvus 在这方面做了更多优化。

**分布式能力** 。Weaviate 的分布式集群还在完善中。虽然支持多节点，但数据分片、故障恢复、一致性保证等方面，不如 Milvus 成熟。

**学习曲线** 。Weaviate 的功能很多，schema 配置、向量化、混合搜索、生成式搜索……每个功能都有自己的概念和参数。上手需要一些时间。

**社区规模** 。16K Star，相比 Milvus（30K+ Star）和 LangChain（60K+ Star），社区规模中等。遇到问题，能搜到的解决方案相对少一些。

## 适用场景

Weaviate 适合什么场景？

**RAG 应用** 。企业知识库、智能客服、文档问答。自动向量化和混合搜索功能，RAG 开发变得很简单。

**语义搜索** 。电商商品搜索、内容推荐、知识检索。向量搜索 + 关键词搜索混合模式，比纯关键词搜索效果好。

**多租户 SaaS** 。你需要为不同的客户隔离数据，但又不想为每个客户搭一套独立的系统。原生多租户支持，一个集群服务多个客户。

**快速原型** 。你需要快速验证一个 AI 想法，不想花太多时间在基础设施上。单二进制部署 + 自动向量化，半天内搭出一个可用的系统。

## 结语

回到开头那次选型经历。

最后我们用了 Weaviate。不是因为它最好，而是因为它在那个场景下最合适。

我们需要自动向量化（不想自己写 embedding 逻辑），需要混合搜索（用户的问题既有语义性的也有精确匹配的），需要多租户（不同客户的数据要隔离），需要部署简单（运维团队只有两个人）。

四个需求，Weaviate 都满足了。

如果你的场景是数据量特别大（十亿级以上），对延迟要求极高（10ms 以内），那 Milvus 可能更合适。如果是本地小实验，Chroma 就够了。如果不想自己运维，Pinecone 是个选择。

但如果你需要一个平衡的选择——性能够用、功能全面、部署简单、开源免费——Weaviate 值得试试。

Go 写的，单二进制，BSD-3 协议。在向量数据库这个领域，Weaviate 可能是最"Go 味"的选择。

---

**参考链接：**

- Weaviate GitHub: github.com/weaviate/weaviate
- Weaviate 官方文档: weaviate.io/developers/weaviate
- Weaviate 架构文档: weaviate.io/developers/weaviate/concepts
- HNSW 算法论文: Malkov et al., "Efficient and robust approximate nearest neighbor search using HNSW graphs", 2016
