---
title: 前端面试常用手撕布局系列
author: Rain
tags:
  - 面试
  - 前端
categories:
  - 前端
date: '2020-04-18 12:30'

---

<Boxx/>

## 如何使用浮动实现两栏和三栏布局？

### 两栏布局

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    * {
      margin: 0;
      border: 0;
      padding: 0;
    }
    .left {
       float: left;
      width: 150px;
      background: red;
    }
    .middle {
      margin-left: 160px;
      background: pink;
    }
  </style>
</head>
<body>
<div class="left">1</div>
<div class="middle">2</div>
</body>
</html>
```

### 三栏布局

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    * {
      margin: 0;
      border: 0;
      padding: 0;
    }
    .left {
      float: left;
      width: 150px;
      background: red;
    }
    .middle {
      margin: 0 160px;
      background: pink;
    }
    .right {
      float: right;
      width: 150px;
      background: green;
    }
  </style>
</head>
<body>
<div class="left">1</div>
<div class="right">3</div>
<div class="middle">2</div>
</body>
</html>
```

## 使用flex布局实现经典三栏布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flex实现三栏布局</title>
    <style>
        * {
            margin: 0;
            border: 0;
        }
        main {
            display: flex;
        }
        .left {
            width: 200px;
            background: red;
        }
        .middle {
            flex-grow: 2;
            background: pink;
        }
        .right {
            width: 200px;
            background: beige;
        }
    </style>
</head>
<body>
    <main>
        <section class="left">1</section>
        <section class="middle">2</section>
        <section class="right">3</section>
    </main>
</body>
</html>
```

## 使用flex布局实现垂直水平居中效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .main {
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="main">123</div>
    </div>
</body>
</html>
```

## 使用flex布局实现三列等分效果

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        main {
            display: flex;
        }
        div {
            flex: 1;
        }
    </style>
</head>

<body>
    <main>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </main>
</body>

</html>
```

## 使用grid布局实现经典两栏布局

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap {
            display: grid;
            grid: 100px 1fr 30px / 200px 1fr;
        }
        header {
            background: red;
            grid-area: 1 /3/ 2/ 1;
        }
        aside {
            background: blue;
            grid-area: 2 /2/ 3/ 1;
        }
        main {
            background: pink;
            grid-area: 2 /3/ 3/ 2;
        }
        footer {
            background: #000;
            color: #fff;
            grid-area: 3 /3/ 4/ 1;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <header>我是头部</header>
        <aside>我是左侧</aside>
        <main>我是主体内容</main>
        <footer>我是底部</footer>
    </div>
</body>

</html>
```

<Vssue :title="$title" />