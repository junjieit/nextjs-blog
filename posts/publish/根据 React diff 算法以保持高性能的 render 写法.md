---
title: 根据 React diff 算法以保持高性能的 render 写法
date: 2020-04-02 22:22:43
tags: [react, diff]
categories: React
---

## 尽量不改变元素类型

> 无论什么时候，当根元素类型不同时，React 将会销毁原先的树并重写构建新的树。从 `a` 到 `img` ，或者从 `Article` 到 `Comment` ，从 `Button` 到 `div` – 这些都将导致全部重新构建

## 循环渲染中的 key 应和数据有对应关系

当改变循环渲染的 `data` 时。如果没有 `key`，将会重新渲染循环列表中的所有子节点。有 `key` 的情况，会根据 `key` 来重新渲染。所以 `key` 如果是随意生成的随机数，也不能很好的比对渲染。最好是和 数组其他数据有关联的 `id` 之类数据。

## 参考文档

[一致性比较](http://react.html.cn/docs/reconciliation.html)
