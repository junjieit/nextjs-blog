---
title: 使用 webpack 压缩分离代码
date: 2020-04-02 22:22:43
tags: [渲染, webpack, 压缩]
categories: 渲染优化
---

## 概述

随着项目越来越庞大，打包后的包体积也变的臃肿。所以需要合理的配置，来优化打包方式。
本文主要从两方面着手：
  - 合理打包第三方插件
  - 合理分配项目文件的打包

## 分析工具
[官网](https://www.webpackjs.com/guides/code-splitting/#bundle-%E5%88%86%E6%9E%90-bundle-analysis-)
> 在优化之前，需要先分析着手点。合理的使用工具，可以让我们更准确的优化

### webpack 分析
官方自带了一个初始的分析工具，可以生成 json，再用其他工具分析

```
npx webpack --config build/webpack.config.prod.js --profile --json > stats.json 
```

### 使用 webpack-bundle-analyzer 分析

[官网](https://github.com/webpack-contrib/webpack-bundle-analyzer)

#### 安装
```Bash
yarn add webpack-bundle-analyzer -D

npm install webpack-bundle-analyzer -D
```

#### 配置

```JavaScript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 代码分离，按需加载
[官网](https://www.webpackjs.com/guides/code-splitting/)

### 分离方式

按需加载，应该先理清怎样才符合项目的需求。本文从以下几个方面来考虑需要加载哪些包：

  - 用户体验
    - 用户第一眼看到的页面
    - 第一次可以交互
    - 延迟需要的页面、交互不常改变的包，合并打包
  - 浏览器缓存
    - 不常改动的包，合并打包
  - http 并行下载

### 使用方式
```Javascript
import (/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  // Do something
})
```

### 问题

1. Typescript 模块设置
  ```Bash
  TS1323: Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'esnext', 'commonjs', 'amd', 'system', or 'umd'.
  ```
解决方法：配置 `tsconfig.json`
```JSON
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node"
  }
}
```

## 代码压缩
[官网](https://webpack.js.org/configuration/optimization/#root)

webpack 4 在生产模式下默认会压缩，但是可以自定义一些配置

#### 压缩 JS

[官网](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/)

***不能压缩 es6***

```JavaScript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
        // 压缩JS
        new UglifyJsPlugin({
            // 有很多可以配置
            cache: true,
            parallel: true, // 并行
            sourceMap: true,
            uglifyOptions: {
                 // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                output: {
                    // 删除所有的注释
                    comments: false,
                    // 最紧凑的输出
                    beautify: false
                },
                compress: {
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
    ]
  }
}
```

#### 压缩 JS 2（ES6 代码）

配置基本和 `uglifyjs-webpack-plugin` 一致
```JavaScript
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};
```

#### 压缩 CSS
[官网](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
```JavaScript
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssertsPlugin({})
    ]
  }
}
```

#### 压缩 styled-components
[官网](https://styled-components.com/docs/tooling#minification)
[官网2-github](https://github.com/styled-components/babel-plugin-styled-components)
配置在 babel 文件中
```JSON
{
  "plugins": ["babel-plugin-styled-components"]
}
```

## 拓展阅读

[Webpack 生成预压缩 gzip、brotli 文件](/article/rttude2b1)
