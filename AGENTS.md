# AGENTS.md - Rain's Space 博客项目指南

## 项目概述

这是一个基于 VitePress + @sugarat/theme 的个人技术博客，部署在 Vercel 上。

- **网站地址**: https://blog.abplan.top
- **作者**: Rain
- **GitHub**: https://github.com/12ain/blog

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [VitePress](https://vitepress.dev/) v1.6.4 |
| 主题 | [@sugarat/theme](https://theme.sugarat.top/) v0.5.23 |
| UI | Vue 3.5.38 |
| 包管理 | pnpm 11.5.3 |
| Node | >= 20.0.0 |
| 部署 | Vercel |
| 搜索 | Pagefind |

## 项目结构

```
blog/
├── docs/                          # 文档源目录
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.ts             # 主配置文件
│   │   ├── theme/                # 自定义主题
│   │   │   ├── index.ts          # 主题入口
│   │   │   ├── style.css         # 自定义样式
│   │   │   ├── ArchivesPage.vue  # 归档页面组件
│   │   │   └── CategoriesPage.vue # 分类页面组件
│   │   ├── dist/                 # 构建输出
│   │   └── cache/                # 缓存
│   ├── blogs/                    # 博客文章目录
│   │   ├── arithmetic/           # 算法
│   │   ├── backend/              # 后端
│   │   ├── interview/            # 面试
│   │   ├── network/              # 网络
│   │   ├── note/                 # 笔记
│   │   ├── technology/           # 技术
│   │   └── web/                  # 前端
│   ├── archives/                 # 归档页面
│   ├── public/                   # 静态资源
│   ├── index.md                  # 首页
│   ├── about.md                  # 关于页面
│   └── FRONTEMATTER.md           # Frontmatter 速查表
├── package.json
├── vercel.json                   # Vercel 部署配置
└── Dockerfile                    # Docker 配置
```

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器 (http://localhost:5173)

# 构建
pnpm build            # 构建生产版本

# 预览
pnpm preview          # 预览构建结果

# 部署
pnpm deploy           # 执行部署脚本
```

## 写文章指南

### Frontmatter 配置

每篇文章头部需要配置 frontmatter：

```yaml
---
title: 文章标题
date: 2024-01-01
author: Rain
categories: [分类名]
tags: [标签1, 标签2]
cover: /images/cover.jpg    # 可选
description: 文章描述       # 可选
---
```

### 常用 Frontmatter 选项

| 属性 | 说明 | 示例 |
|------|------|------|
| `title` | 文章标题 | `title: Vue3 教程` |
| `date` | 发布日期 | `date: 2024-01-01` |
| `author` | 作者 | `author: Rain` |
| `categories` | 分类 | `categories: [前端]` |
| `tags` | 标签 | `tags: [Vue, 教程]` |
| `cover` | 封面图 | `cover: /images/cover.jpg` |
| `hidden` | 隐藏文章 | `hidden: true` |
| `sticky` | 精选置顶 | `sticky: 1` |
| `top` | 首页置顶 | `top: 1` |
| `publish` | 是否发布 | `publish: false` |

### 文章目录

文章存放在 `docs/blogs/` 目录下，按分类创建子目录：

```
docs/blogs/
├── web/              # 前端相关
├── backend/          # 后端相关
├── technology/       # 技术分享
├── interview/        # 面试相关
├── note/             # 学习笔记
├── arithmetic/       # 算法
└── network/          # 网络相关
```

## 主题配置

### 主要配置文件

`docs/.vitepress/config.ts` 是主配置文件，包含：

- RSS 配置
- 主题色配置
- 搜索配置
- 导航配置
- 页脚配置

### 已启用的功能

| 功能 | 配置项 | 说明 |
|------|--------|------|
| RSS | `RSS` | RSS 订阅 |
| Sitemap | `sitemap` | 站点地图 |
| 主题色 | `themeColor: 'vp-green'` | 绿色主题 |
| 标签云 | `homeTags` | 首页标签 |
| 图片预览 | `imagePreview` | 点击放大 |
| 时间轴 | `timeline` | Markdown 语法 |
| 标签页 | `tabs` | 内容切换 |
| 代码图标 | `groupIcon` | 代码块图标 |
| 日期格式 | `formatShowDate` | 中文日期 |

### Markdown 语法扩展

#### 时间轴

```markdown
::: timeline 2024-01-01
- 事件 1
- 事件 2
:::
```

#### 标签页

```markdown
:::tabs
== Tab A
内容 A
== Tab B
内容 B
:::
```

#### 任务列表

```markdown
* [ ] 待办事项
* [x] 已完成
```

## 部署

### Vercel 部署

项目配置了 Vercel 自动部署：

- **构建命令**: `pnpm build`
- **输出目录**: `docs/.vitepress/dist`
- **Node 版本**: 20+

### 环境变量

评论系统需要配置环境变量：

```
COMMENT_APPID=your_valine_appid
COMMENT_SECRET=your_valine_secret
```

## 自定义组件

### ArchivesPage.vue

归档页面组件，按年份展示所有文章。

### CategoriesPage.vue

分类页面组件，包含：
- 标签云
- 分类列表
- 文章列表

### style.css

自定义样式，移除了默认背景图。

## 注意事项

1. **文章发布**: 设置 `publish: false` 可隐藏文章
2. **图片路径**: 使用绝对路径 `/images/xxx.jpg`
3. **分类和标签**: 在 frontmatter 中配置
4. **构建**: 修改配置后需要重新构建
5. **搜索**: 搜索功能在构建后生效

## 相关资源

- [VitePress 文档](https://vitepress.dev/)
- [@sugarat/theme 文档](https://theme.sugarat.top/)
- [Pagefind](https://pagefind.app/)
- [Valine 评论系统](https://valine.js.org/)
