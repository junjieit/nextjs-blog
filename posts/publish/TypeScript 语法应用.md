---
title: TypeScript 语法应用
date: 2020-04-02 22:22:43
tags: TypeScript
categories: TypeScript
---

## 概述

本文仅简单记录一下语法，及使用过程的一些经验之谈。如对 `TypeScript` 基础语法不太了解，可直接阅读[中文文档](https://www.tslang.cn/docs/handbook/basic-types.html)

## 类型声明

使用冒号声明
```TypeScript
let isDone: boolean = false;
let count: number = 0;
let name: string = '';
// 数组
const list: number[] = [1, 2, 3];
const list2: Array[number] = [1, 2, 3];
const list3: [string, number] = ['hello', 10]
const list4: any[] = [1, 'hello', {a: 'b'}, [2, 3]]
// 枚举
enum ISex {
  man = 1,
  woman = 0
}
const man: number = ISex.man // 输出 1
const man2: string = ISex[1] // 输出 'man'
// 对象
const student: {} = Object.create(null); // 可以赋任意对象，只能调用 `Object` 原型链上的方法，***而不能调用赋值的属性或方法***。
const student2: Object = Object.create(null); // 可以赋任意对象，只能调用 `Object` 原型链上的方法，***而不能调用赋值的属性或方法***。
interface IStudent {
  name: string; // 必需存在的属性
  readonly sex: number: // 只读
  address?: string; // 可选存在的属性
  readonly [propName: string]: any; // 索引签名-表示一个或多个任意以字符串为属性名的属性
}

const student3: IStudent = {
  name: '张三', // 必须有 name 属性
  sex: ISex.man,
  country: '中国'
}
// 函数
interface IGoToSchool {
  (student: IStudent, isRaining: boolean): boolean;
}
const goToSchool: IGoToSchool = function(student, isRaining) {
  if (isRaining) return false
  console.log(`${student.name} go to school`}
  return true
}
const goToSchool2 = function(student: IStudent, isRaining: boolean): boolean {
  if (isRaining) return false
  console.log(`${student.name} go to school`}
  return true
}
// 其他
let a: any = {};
let u: undefined = undefined;
let n: null = null;
let unusable: void = undefined;
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```


## 数组

### 只读数组

```TypeScript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a.push(5) // 正常工作
ro.push(6) // Error: 类型“readonly number[]”上不存在属性“push”
console.log(ro) // [1, 2, 3, 4, 5]
```

## 对象

### 索引签名

`interface` 中未定义的类型，不能被赋值给变量。但是有的情况，可能不清楚属性名。可以使用 索引签名来处理

```TypeScript
interface IStudent {
  name: string;
  country?: string;
  [propName: string]: any;
}

const student: IStudent = {
  name: '刘星',
  country: '中国',
  sister: '夏雪', // 如未定义 [propName: string] ，则会报错
  brother: '夏雨'
}
```

### 会被绕开的对象赋值

```TypeScript
interface IStudent {
  name: string;
  country?: string;
}

const studentTest = {
  name: '刘星',
  country: '中国',
  sister: '夏雪',
  brother: '夏雨'
}

const student: IStudent = studentTest // 虽然不满足 IStudent，但是因为 studentTest 没有类型检查，所以不会报错
```


## 类型断言

类型断言，适用于已经确定是某种类型，不再需要特殊的数据检查和解构。有两种方式

```TypeScript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length; // 尖括号语法（不适用于 JSX）
let strLength: number = (someValue as string).length; // as 语法
```