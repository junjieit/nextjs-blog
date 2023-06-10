---
title: React 类组件优化性能的几个方法
date: 2020-04-02 22:22:43
tags: [React, 性能优化]
categories: React
---

## 继承 React.PureComponent

`React` 类组件需要继承 `React.PureComponent` 或 `React.Component`。`React.PureComponent` 只会进行浅比较来判断组件是否更新。
```JavaScript
import React { PureComponent } from 'react';
class Foo extends PureComponent {
  //...
}
```

## 使用 shouldComponentUpdate 判断是否更新
```JavaScript
import React from 'react';
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```