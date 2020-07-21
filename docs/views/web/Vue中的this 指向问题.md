---
title: Vue中的this指向问题
author: 惬意的小时光
date: 2020-05-18 12:20:00
sidebar: 'auto'
categories:
 - 前端
tags:
 - vue
 - ES6
---

<Boxx/>

# Vue中的this指向问题

## 问题产生

在methods中定义方法时，使用箭头函数，导致了this指向全局window对象而不是vue实例。

### 问题代码：

```JavaScript
get: () => {
  axios
    .get('../package.json', {
      params: {
        userId: '999',
      },
      headers: {
        token: 'jack',
      },
      before: () => {
        console.log('before init.');
      },
    })
    .then((res) => {
      console.log(res.data);
      this.msg = res.data.name;
    })
    .catch((error) => {
      console.log('error init');
    });
},
```

### 解决后代码:

```JavaScript
get() {
  axios
    .get('../package.json', {
      params: {
        userId: '999',
      },
      headers: {
        token: 'jack',
      },
      before: () => {
        console.log('before init.');
      },
    })
    .then((res) => {
      console.log(res.data);
      this.msg = res.data.name;
    })
    .catch((error) => {
      console.log('error init');
    });
},
```



## 问题原因

ES6中的 箭头函数 “=>” 内部的this是词法作用域，由上下文确定（也就是由外层调用者vue来确定）。



<Vssue :title="$title" />
