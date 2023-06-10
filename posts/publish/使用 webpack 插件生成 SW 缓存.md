---
title: 使用 webpack 插件生成 SW 缓存
date: 2020-04-02 22:22:43
tags: [渲染, 浏览器, PerformanceTiming]
categories: 渲染优化
---

## 概述

现在大多浏览器都支持 Service Worke 缓存，但是原生配置相对麻烦。所以谷歌推出了 `Workbox` 插件方便配置。以及推出了对应的 `Webpack` 的插件。本文简单介绍一下这款插件的用法。

## 配置 workbox-webpack-plugin 插件

插件有 `GenerateSW` 和 `InjectManifest` 两个对象，可以选择其中一个配置。

### GenerateSW 配置

、`webpack.config.js` 配置（[GenerateSW 参数API](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW)）。

```JavaScript
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      // options...
    })
  ]
};
```

### InjectManifest 配置

、`webpack.config.js` 配置（[InjectManifest 参数API](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest#InjectManifest)）。


```JavaScript
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    或者使用 InjectManifest
    new InjectManifest({
      // options...
    })
  ]
};
```

## 参考文档

[workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)