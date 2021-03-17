---
title: 浅拷贝与深拷贝
author: Rain
date: '2020-12-16 00:20:05'
categories:
 - 前端
tags:
 - 面试
 - JavaScript
---

<Boxx/>

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，**新旧对象还是共享同一块内存**。但深拷贝会另外创造一个一模一样的对象，**新对象跟原对象不共享内存**，修改新对象不会改到原对象。

## 浅拷贝的实现方式

#### 1.Object.assign()

Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

```javascript
let obj1 = { person: {name: "xiaoming", age: 18}, sports:'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "xiaohua";
obj2.sports = 'football'
console.log(obj1); 
// { person: { name: 'xiaohua', age: 18 }, sports: 'basketball' }
```

#### 2.展开运算符...

展开运算符是一个 es6 / es2015特性，它提供了一种非常方便的方式来执行浅拷贝，这与 Object.assign ()的功能相同。

```javascript
let obj1 = { name: 'xiaoming', address:{x:100, y:100}}
let obj2= {... obj1}
obj1.address.x = 200;
obj1.name = 'xiaohua'
console.log('obj2',obj2) // obj2 { name: 'xiaoming', address: { x: 200, y: 100 } }
```

#### 3.Array.prototype.concat()

```javascript
let arr = [1, 3, {
    username: 'xiaoming'
    }];
let arr2 = arr.concat();    
arr2[2].username = 'xiaohua';
console.log(arr); 
//[ 1, 3, { username: 'xiaohua' } ]
```

#### 4.Array.prototype.slice()

```javascript
let arr = [1, 3, {
    username: ' xiaoming'
    }];
let arr3 = arr.slice();
arr3[2].username = 'xiaohua'
console.log(arr); 
// [ 1, 3, { username: 'xiaohua' } ]
```

## 深拷贝的实现方式

#### 1.JSON.parse(JSON.stringify())

```javascript
let arr = [1, 3, {
    username: ' xiaoming'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'xiaohua'; 
console.log(arr, arr4)
```

这也是利用JSON.stringify将对象转成JSON字符串，再用JSON.parse把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

> 注意：不能处理函数和正则，因为处理后得到的正则变为空对象，得到的函数变为null

#### 2.递归方法

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") 
    return obj; 
    // null或undefined不进行拷贝操作
  if (obj instanceof Date) 
    return new Date(obj);
  if (obj instanceof RegExp) 
    return new RegExp(obj);
  let result;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
```

## 参考文章

- [如何写出一个惊艳面试官的深拷贝?](https://segmentfault.com/a/1190000020255831)
- [JavaScript浅拷贝和深拷贝](https://www.kancloud.cn/ljw789478944/interview/397319)
- [js 深拷贝 vs 浅拷贝](https://juejin.im/post/59ac1c4ef265da248e75892b)
- [深拷贝的终极探索（99%的人都不知道)](https://segmentfault.com/a/1190000016672263)
- [How to deep clone a JavaScript object](https://flaviocopes.com/how-to-clone-javascript-object/)
- [深拷贝与浅拷贝](https://github.com/ljianshu/Blog/issues/5)

<Vssue :title="$title" />