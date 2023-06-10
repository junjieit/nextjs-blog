---
title: Webpack 生成预压缩 gzip、brotli 文件
date: 2020-04-02 22:22:43
tags: [Webpack, 渲染优化]
categories: 渲染优化
---

## 概述

代理服务器配置压缩模式之后，每次请求网页都会在服务器压缩。消耗服务器资源，及增加了压缩时间。本文介绍使用 `Webpack` 插件预压缩文件，提升网页响应速度。

## `compression-webpack-plugin` 插件配置

**_`node` 版本需大于等于 `8.9.0` 才能使用此插件。大于等于 `11.7.0` 才支持 `Brotli`。_**

#### 安装

```Bash
yarn add compression-webpack-plugin -D
```

#### 配置

`webpack.config.js` 配置文件

```JavaScript
module.exports = {
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
```

## Nginx 配置

`Nginx` 需先配置对应的压缩模式，可参考 [配置 web 响应压缩](/article/6ALMAsdyR)

**_必须开启静态压缩，否则不生效，还是会在服务器在线生成_**

```Nginx
http {
  gzip on;
  gzip_static on;
  # ...

  brotli on;
  brotli_static on;
  # ...
}
```

## 验证是否生效

查看响应首部 `Etag` 是否以 `W/` 开头：

- 是：服务器在线生成
- 否：读取的预压缩文件

## 参考文档

[CompressionWebpackPlugin](https://webpack.js.org/plugins/compression-webpack-plugin/)
