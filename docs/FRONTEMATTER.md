# Frontmatter 速查表

在文章头部（`---` 之间）配置，控制文章行为。

## 基础配置

```yaml
---
title: 文章标题          # 首页显示的标题
description: 文章描述     # 首页卡片显示的描述
cover: /images/cover.jpg # 首页封面图
author: Rain             # 作者名（覆盖全局）
date: 2024-01-01         # 发布日期
---
```

## 分类与标签

```yaml
---
tag: [Vue, 前端]         # 标签
tags: [JavaScript]       # 同 tag，二选一
categories: [技术]       # 分类
---
```

## 首页展示控制

```yaml
---
sticky: 1               # 精选文章（值越大越靠前）
top: 1                   # 首页置顶（值越小越靠前）
hidden: true             # 隐藏此文章
recommend: false         # 不在推荐列表显示
publish: false           # 不发布（等同 hidden + recommend: false）
---
```

## 封面控制

```yaml
---
cover: /images/cover.jpg  # 自定义封面
hiddenCover: true          # 隐藏文章页封面（保留首页卡片封面）
cover: false               # 不显示封面
---
```

## 推荐关联

```yaml
---
# 关键词关联
recommend: Vue

# 多关键词关联
recommend: [Vue, JavaScript, CSS]

# 关键词 + 指定顺序（数字越大越靠前）
recommend: [Vue, CSS, 1]
---
```

## 文章底部按钮

```yaml
---
buttonAfterArticle:
  openTitle: 赞赏
  closeTitle: 下次一定
  content: '<img src="qrcode.png">'
  icon: aliPay          # aliPay / wechatPay / 自定义SVG
---
```

## 评论控制

```yaml
---
comment: false          # 关闭此文章评论
---
```

## 阅读时间

```yaml
---
readingTime: false      # 关闭此文章阅读时间显示
---
```

## 常用组合示例

### 精选文章

```yaml
---
title: 我的最佳实践
sticky: 1
cover: /images/best.jpg
tag: [精选]
---
```

### 草稿（不发布）

```yaml
---
title: 草稿文章
publish: false
---
```

### 完整示例

```yaml
---
title: Vue3 组合式 API 详解
description: 深入理解 Vue3 Composition API
cover: /images/vue3.jpg
author: Rain
date: 2024-01-15
tag: [Vue, 前端]
categories: [技术]
sticky: 1
top: 1
---
```
