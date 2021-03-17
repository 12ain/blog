---
title: 前端面试题基础篇
author: Rain
tags:
  - 面试
  - 前端
categories:
  - 前端
date: '2020-04-18 13:30'
---

<Boxx/>

## HTML相关
### 如何声明页面是HTML5页面?

`<!DOCTYPE html>`

### 页面乱码是如何产生的

- 编码与解码的方式不一致
- 浏览器不能自动检测网页编码
- 网页源代码是gbk，然后中文内容是utf-8，然后浏览器以utf-8解码就会乱码

### 列举你所知道的meta类型有哪些

`<meta name="keywords" content="关键字">`

利于搜索引擎爬取页面，提高排名

`<meta name="description" content="页面描述">`

搜索引擎中对页面的描述信息

`<meta name="viewport" content="width=device-width, initial-scale=1">`

声明此页面可能会在手机浏览器查看，不会导致页面变得很小,也方面开发者进行适配等

`<meta http-equiv="X-UA-Compatible" content="IE=edge">`
声明IE浏览器已最新版的模式进行文档的渲染，也就是任何 IE 版本都以当前版本所支持的最高级标准模式渲染，避免版本升级造成的影响。

### 列举你所知道的全局属性

- class
- id
- src
- style
- name
- hidden
- title
- tabindex
- data-*
- accesskey

### id与class有什么区别

- d具有唯一性，calss具有普遍性
- id是唯一的，尽量与js配合使用
- class是类属性,是可重复的，通常用于页面的样式
- id优先级高于class

### HTML语义化的作用

- 可以让开发者看起来结构清晰,方便阅读，提高可读性，方便维护与开发
- 利于SEO,搜索引擎更容易爬取对应的内容
- 利于更多设备解析。
- 提高用户体验，title,alt用于解释名词和图片信息

### a标签的target属性有哪些值

-  _blank 会打开一个新窗口来打开页面
-  _self 默认值，会在相同的框架打开
-  _parent 在父框架打开，如果没有效果和_self一样
-  _top 在指定的框架中打开

### HTML输入表单类型

- text
- password
- tel
- file
- checkbox
- date
- hidden
- image
- number
- color
- email

### 输入表单有哪些常见属性

- type
- name
- readonly
- disable
- autocomplete
- from
- value
- tabindex
- required
- autofocus
- checked

### 什么是HTML5

#### 狭义与广义

##### 狭义

HTML5表示是HTML的一种新版语言，增加了标签，绘画，并增强了行为，语义化

##### 广义

广义的HTML5,就是一般网站上所用到的新技术，简称为HTML5

#### 作用

##### 新增的标签

`section`,`header`,`footer`,`article`,`nav`,`aside`,并且具有更加丰富的表单的类型

##### 性能的提升

新增`Web Workers`多线程的支持，并且优化了`JavaScript`的引擎

##### 离线存储的支持

`localstorage`,`indexdb`,离线缓存等

##### 2d,3d绘图

```
canvas,svg
```

##### 新的通讯机制

```
WebSock,WebRTC
```

##### 硬件设备的支持

支持调用摄像头，定位，方向传感器等

##### 丰富的效果展示

边框，应用，过度，动画等

### HTML5新增了哪些标签和表单类型

- tel
- canvas
- svg
- header
- footer
- section
- article
- aside
- nav
- email
- color
- date
- number
- audio
- video

### HTML5有哪些新特性

- 离线存储的支持
- 2d,3d绘图
- 丰富的效果
- 多媒体的支持
- 硬件的支持
- 性能的提升
- 新的通讯机制
- 新增语义化标签

### 常见的块级标签有哪些？

- div
- p
- h1~h6
- li
- header
- footer
- nav
- section
- table
- ol
- td
- tt
- aside

### 块级盒子有哪些特征

- 独占一行
- 可以设置width和height
- 可以设置margin
- 可以设置padding

### 常见的行级标签有哪些？

- span
- a
- b
- stong
- em
- i
- img
- input
- br
- big
- small
- textarea
- button
- lable
- code
- select

### 行级盒子有哪些特征

- 一个挨着一个
- 不可以设置width和hright
- 可以设置水平的margin
- 可以设置水平的padding

### 盒模型有哪些属性

- content
- padding
- margin
- border

### 盒模型分为哪些类型？

#### 标准盒模型

标准盒模型的width = content

#### IE盒模型

IE和模型width = content + border + padding

## CSS相关

### link方式和@import方式引入css有什么区别？

#### link

- `link`是属于标签，js可控，灵活
- html文档是从上到下加载，`link`的方式引入是采用并行加载，性能更优

#### @import

- `@import`是不属于标签，js不可控，灵活性差
- @import`的方式引入是采用串行加载，性能更差

### 伪类选择器

```html
:last-child 获取最后一个子元素
:first-child 获取第一个子元素
:first-of-type 选择当前类型在父级是第一个
:last-of-type 选择当前类型在父级的最后
:nth-of-type 选择当地类型在父级的第x个
:nth-child(odd) 选择当前为奇数的元素
:nth-child(even) 选择当前为偶数的元素
:link未 访问的链接
:visiteed 已访问的链接
:hover 鼠标悬停在上面触发
:active 鼠标点击后的链接
:focus 元素聚焦后触发
:root 选择根节点
:target 当前锚点活动的样式
:checked 选择选中的样式
:disabled 选择被禁用的
```

### 伪元素

- ::after 在当前元素后面插入新的内容

- ::before 在当前元素前面插入新的内容

- ::first-letter 向文本的第一个字母添加特殊样式

- :first-line 向文本的首行添加特殊样式

### 选择器优先级

#### 权重的等级

`!important` > 内联 > 设置 > 默认 > 继承

#### 权重的计算

- 内联千位
- id百位
- class、属性、伪类十位
- 伪元素、标签个位

#### 权重的比较

> 在权重的比较重会遇到很多种情况,下面会对每一种情况说明

- 权重相同的情况下下面的覆盖上面的
- 两个都拥有`!important`，比较选择器的权重

### 属性值inherit、initial、unset的作用

- `inherit` 继承父级的样式
- `initial` 保持最初的样式
- `unset` 如果父级有可继承样式，就继承过来，没有初始的样式

### 继承属性有哪些？

- color
- font-size
- font-weight
- font-family

### 块级盒子居中

margin: 0 auto

### 设置inline-block的元素有什么特性

- 变成行内样式
- 可以设置width和height
- 可以设置margin和padding
- 会存在空白字符缝隙

### inline-block产生缝隙的原因是什么？如何解决

因为行内元素在一行会存在、换行/空白字符
在父级设置`font-size: 0`

### 聊一聊外边距合并的场景

#### 相邻元素

```html
<div style="margin-bottom: 30px;">这个段落的下外边距被合并...</div>
<div style="margin-top: 20px;">...这个段落的上外边距被合并。</div>
```

> 相邻的两个兄弟的外边距，会取最大的值作为两个的外边距

#### 父子元素

> 如果在父元素与其第一个子元素之间不存在边框、内边距、行内内容，也没有创建块格式化上下文、或者清除浮动将两者的 `margin-top` 分开，就会产生外边距合并。

即内部标签与外部标签之间没有内边距，行内内容，并且外部标签没有边框，中间也没有元素

#### 空元素

如果一个块级元素中不包含任何内容，并且在其垂直方向的 `margin` 之间没有边框、内边距、行内内容、`height`、`min-height` 将两者分开，则该元素的上下外边距会折叠。

### div内部图片底部出现缝隙原因是什么？有什么解决方案

#### 原因

> 是因为我们在编辑器里写代码的时候，同级别的标签不写在同一 行以保持代码的整齐可读性，即inline-block布局的元素在编辑器里不在同一行，即存在换行符，因此这就是著名的inline-block“换行 符/空格间隙问题”。

#### 解决方案

- img 变成block
- 父级div设置font-size: 0
- 父级设置line-height: 0
- img 设置vertical-align: middle/bottom/top

### 浮动元素有哪些特性？浮动带来的问题

#### 特性

- 一个挨着一个

- 盖不住文本

#### 问题

- 引起父元素高度塌陷

### 如何清除浮动

- 父元素设置clear: both
- 父元素添加overflow:hidden

### 给元素添加clear: left的确切含义是什么

要求该盒子，位于上边缘已有的左浮动盒子的下方

### 什么是层叠上下文？如何形成叠上下文？层叠顺序是怎样的？

#### 什么是层叠上下文？

层叠上下文，英文称作”stacking context”. 是HTML中的一个三维的概念。如果一个元素含有层叠上下文，我们可以理解为这个元素在z轴上就“高人一等”。

#### 如何形成叠上下文？

- opactity小于1
- 根元素
- transform不为none
- z-index不为auto的绝对定位和相对定位元素
- 固定定位元素和sticky定位元素

#### 层叠顺序是怎样的？

- 当具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域中比较，层叠水平值大的那一个覆盖小的那一个。通俗讲就是官大的压死官小的。
- 当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。

### 什么是BFC？如何形成BFC？BFC有什么使用场景

#### 什么是BFC？

简称**块级格式化上下文**,英文block fromatting context，BFC是一块独立渲染的区域，外界无法干扰，里面的元素也无法干扰外界

#### 如何形成BFC？

- 根元素
- float的值不为none
- position的值不为relative和static
- overflow的值不为visible (推荐使用此方法)
- display 的值为 table-cell、table-caption 和 inline-block 中的任何一个

#### BFC有什么使用场景

- 阻住外边距合并
- 清除浮动
- 自适应两栏布局

## JavaScript相关

### async与defer有什么异同？

#### async

`async`异步加载js，不保证html,css是否加载完毕后加载，所以使用`async`获取dom，可能会报错

#### defer

`defer`也是异步加载，会在html加载完后加载

### a+++a 与a+a++的区别

对于如下代码，结果是多少？

```javascript
let a = 1
console.log( a+++a )
```

对于下面的代码，结果又是多少？

```javascript
let a = 1
console.log( a+a++ )
```

**问题来了， a+++a等同于(a++)+a，而 a+a++等同于a+(a++)，二者结果为什么不一样？**

#### 解答

> 我们先理清楚，前置++和后置++的区别

##### 前置++

> 先自身++，然后在参与其他的运算

##### 后置++

> 先参与运算，然后在自身++

#### 编译器的处理过程：

```HTML
push(a++), 即push(1)，之后 a自增变成2
push(a)，即push(2)
result = pop()+pop(), 出栈两个操作数(1,2)相加，得到3
```

### 当new一个构造函数时内部发生了什么

- 创建一个新的对象，这个对象的类型是` object`
- 设置这个新的对象的内部、可访问性和`prototype`属性为构造函数（指`prototype.construtor`所指向的构造函数）中设置的；
- 执行构造函数，当`this`关键字被提及的时候，使用新创建的对象的属性； 返回新创建的对象（除非构造方法中返回的是‘无原型’）。
- 在创建新对象成功之后，如果调用一个新对象没有的属性的时候，`JavaScript` 会延原型链向止逐层查找对应的内容。这类似于传统的‘类继承’。

## 原型链

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 **proto** ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( **proto** ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

## 闭包

### 变量的作用域

- 全局变量
- 局部变量

### 闭包的作用

> 可以让其他函数或作用域链，可以读取其内部的变量



<Vssue :title="$title" />