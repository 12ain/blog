---
title: Vue-CLI4配置Vant UI及移动端适配
author: Rain
tags:
  - 前端
  - Vue
  - 配置
categories:
  - 前端
date: '2019-11-25 11:32'
---

<Boxx/>

## Vue-CLI4 配置 Vant UI 及 移动端适配（px转vw）（postcss-px-to-viewport配置）

## 创建Vue-CLI4项目

新版的Vue cli提供了优秀的UI界面,可以在可视化界面创建项目以及安装相关依赖

启动方式
```
vue ui
```

根据自己的需求创建项目,下面贴出个人的配置可供参考

![1.png](https://i.loli.net/2019/11/25/AY8nfeIB3NZ95Kz.png)
![2.png](https://i.loli.net/2019/11/25/UIeRp85aW7OBxzd.png)
![3.png](https://i.loli.net/2019/11/25/u8gVGWysZI7QhmH.png)
![4.png](https://i.loli.net/2019/11/25/Y3Gj6KaqunmVEHL.png)
![5.png](https://i.loli.net/2019/11/25/QAi8MSqYRc4Vh1B.png)
![6.png](https://i.loli.net/2019/11/25/9AFIDixChqJMnpo.png)

## 安装相关依赖

参考:
[vant-ui文档](https://youzan.github.io/vant/#/zh-CN/intro)

安装 vant

```bash
npm i vant -S
```

此处我们采用官方推荐的自动按需引入组件方式进行配置

```javascript

# 安装插件

npm i babel-plugin-import -D


// 在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```

![1.png](https://i.loli.net/2019/11/25/vxSkGQ19O2ADlyc.png)

配置完成后,就可以实现自动按需引入了

## 移动端的适配问题

vant 官方文档介绍了rem的使用配置,此处不再过多介绍

这里我选择postcss-px-to-viewport将px转为vw的方式进行移动端的适配。

```javascript
安装
npm install postcss-px-to-viewport



根目录新建postcss.config.js文件

//postcss.config.js文件

module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', //需要转换的单位，默认为"px"
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 1334,//视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
      unitPrecision: 13, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', //字体使用的视口单位
      selectorBlackList: ['.ignore-', '.hairlines'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      replace: true, //是否直接更换属性值，而不添加备用属性
      exclude: [
        /RightBar/,
        /gotop.vue/,
      ], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      landscape: false, //是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', //横屏时使用的单位
      landscapeWidth: 1134 //横屏时使用的视口宽度
    }
  }
}

```

至此,vue-cli4配置vant ui及移动端适配配置到此结束.

最终效果:

![11.png](https://i.loli.net/2019/11/26/m3PBtkpXh8q6SOY.png)

自动转换为相应的vw

![12.png](https://i.loli.net/2019/11/26/kiAGRsMTIZ7Ka8W.png)

参考链接: 

[移动端适配（px转vw）（postcss-px-to-viewport配置）](https://juejin.im/post/5d415603e51d4561d044cc51)

[Vant 官方文档](https://youzan.github.io/vant/#/zh-CN/intro)

<Vssue :title="$title" />