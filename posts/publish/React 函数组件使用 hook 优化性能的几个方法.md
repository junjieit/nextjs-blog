---
title: React 函数组件使用 hook 优化性能的几个方法
date: 2020-04-02 22:22:43
tags: [React, 性能优化]
categories: React
---

## 概述

当函数组件使用 `hoos` 时，每次状态更改，内部函数都会被重新创建。保持组件足够小，是优化性能的一方面。除此之外，我们可以让 `React` 知道。每次更改，对应需要重新创建的部分。从而更细粒度的函数的重新创建。但必须谨慎使用，因为没有重现创建的内部函数，函数内部的字段也不会更新。

## 使用 useEffect、useLayoutEffect

`useEffect` 第二个参数为依赖的字段数组，变动才执行 `useEffect` 方法。

***`useLayoutEffect` 基本和 `useEffect`一致，只是在 DOM 变化后同步触发，可能阻止视觉更新***

```JavaScript
import React, { useState, useEffect } from 'react'

const [count, setCount] = useState(0)
const [text, updateText] = useState('')

useEffect(() => {
  console.log(count) // 仅当 count 更改时，才会执行方法
}, [count])

return (
  <div>
    <p>You clicked {count} times</p>
    <input value={text} onChange={e => updateText(e.target.value)} />
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  </div>
)
```

## 使用 useCallback、useMemo

`useCallback` 和 `useEffect` 类似。第一个参数为回调，第二个参数为依赖的字段数组。不同的是，这会返回一个函数。在需要的时候调用。


```JavaScript
import React, { useState, useCallback } from 'react'

const [count, setCount] = useState(0)
const [text, updateText] = useState('')

const handleClick = useCallback(() => {
  console.log(count) // updateText 是，并不会重新创建此方法。只有在更新 setCount 是才会
}, [count])

return (
  <div>
    <input value={count} onChange={e => setCount(e.target.value)} />
    <input value={text} onChange={e => updateText(e.target.value)} />
    <button onClick={handleClick}>
      Click me
    </button>
  </div>
)
```

### useCallback vs useMemo

> `useCallback(fn, inputs)` 等价于 `useMemo(() => fn, inputs)`

但是 `memoized` 的内容不一样。`useCallback` `memoized` 第一个回调函数，`useMemo` `memoized` 第一个回调函数执行后的值.

## 使用 React.memo

`React.memo` 类似于 `React.PureComponent`，只是用于组件。有两个参数。第一个参数为要传入的组件，第二个参数是一个回调函数。用于控制是否重新渲染。
```JavaScript
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```