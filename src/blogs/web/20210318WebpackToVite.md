---
title: Webpack 迁移到 Vite 笔记
author: Rain
tags:
  - Vue
  - Webpack
  - Vite
  - 配置
categories:
  - 前端
date: "2021-03-16 11:06"
---

::: tip
项目环境: vue-cli 创建的基于 webpack 的 vue3 项目
:::

记录从 webpack 迁移到 vite 踩过的坑

主要完成

- 配置 Vue3 官方插件
- 添加兼容 CMD 规范及传统浏览器的 vite 官方插件
- 添加支持 Vue3 TSX 的官方插件
- 配置项目目录别名
- 配置组件库的按需加载
- 配置组件库的样式覆盖

## 第一步

将 public 文件夹下的 index.html 移动到根目录下并添加如下代码片段

```html
<script type="module" src="/src/main.ts"></script>
```

## 第二步

删除已经不再需要的 vue-cli 相关插件和 vue.config.js 文件

- "@vue/cli-plugin-babel": "~5.0.0-alpha.2",
- "@vue/cli-plugin-eslint": "~5.0.0-alpha.2",
- "@vue/cli-plugin-router": "~5.0.0-alpha.2",
- "@vue/cli-plugin-typescript": "~5.0.0-alpha.2",
- "@vue/cli-plugin-vuex": "~5.0.0-alpha.2",
- "@vue/cli-service": "~5.0.0-alpha.2",

安装如下插件并添加 vite.config.ts 文件

- "@vitejs/plugin-legacy": "^1.3.1", // 兼容 CMD 规范及传统浏览器，类似于 babel
- "@vitejs/plugin-vue": "^1.1.5", // Vue3 官方插件
- "@vitejs/plugin-vue-jsx": "^1.1.2", // 支持 Vue3 TSX 的官方插件

## 第三步

配置 vite.config.js

```JavaScript
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vitePluginImp from "vite-plugin-imp";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  resolve: {
    alias: [
      { find: "~", replacement: resolve(__dirname, "./") }, // 配置别名
      { find: "@", replacement: resolve(__dirname, "./src") },
    ],
  },
  // css加载器相关配置
  css: {
    preprocessorOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 通过hack方式覆盖组件库样式
            hack: `true; @import "./src/assets/style.less"`,
          },
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // 利用vitePluginImp配置组件库的按需加载。参考组件库官网
    vitePluginImp({
      libList: [
        {
          libName: "vant",
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false;
            }
            return `vant/es/${name}/index.css`;
          },
        },
      ],
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
});

```
