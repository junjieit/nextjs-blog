---
title: React 中使用 TypeScript
date: 2020-04-02 22:22:43
tags: [React, TypeScript]
categories: TypeScript
---

### DOM 事件

#### Change 事件

```TypeScript
onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
}
onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
   const newValue = e.target.value;
}
```
[参考](https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value)

## 参考文档

[@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)