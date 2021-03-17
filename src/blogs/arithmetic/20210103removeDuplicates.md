---
title: 快慢指针实现数组去重
tags:
  - 面试
  - 前端
  - 算法
categories:
  - 算法
date: '2021-01-03 23:18'
---

<Boxx/>

## 题目要求

给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

示例 1:

给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。

示例 2:

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。

## 实现思路

首先需要创建两个指针，一快一慢，分别为i和j。遍历数组，比较指针所指的的每一项的大小，相等则跳过，不相等则将快指针指向的值赋值给慢指针位置，迭代快指针。最终返回数组长度加1；

## 实现代码

```javascript
const removeDuplicates = (nums) => {
  if (nums === null || nums.length === 0) {
    return 0;
  }
  let i = 0; // 慢指针
  for (let j = 1; j < nums.length; j += 1) {
    if (nums[j] !== nums[i]) {
      nums[i + 1] = nums[j];
      i += 1;
    }
  }
  return i + 1;
};
```

> 题目来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
> 著作权归领扣网络所有。

<Vssue :title="$title" />