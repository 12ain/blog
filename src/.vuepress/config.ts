import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";

export default defineUserConfig({
  title: "Rain的心情杂货铺",
  description: "You can't see the moon due to the rainy day.",
  bundler: viteBundler(),
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "Rain",
    authorAvatar: "/avatar.png",
    docsRepo: "https://github.com/12ain/blog",
    docsBranch: "vue-press",
    docsDir: "src/blogs",
    // 自动设置分类
    autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    autoAddCategoryToNavbar: {
      location: 1, // 默认 0
      categoryText: "分类", // 默认 categories
      tagText: "标签", // 默认 tags
    },
    navbar: [
      {
        text: "首页",
        link: "/",
        icon: 'Compass'
      }
    ],
    commentConfig: {
      type: 'valine',
      options: {
        appId: process.env.COMMENT_APPID,
        appKey: process.env.COMMENT_SECRET,
      }
    },
  })
});
