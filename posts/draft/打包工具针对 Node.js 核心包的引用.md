---
title: 打包工具针对 Node.js 核心包的引用
date: 2023-06-15
tags: []
categories: 构建工具
---

由于浏览器不支持 `Node.js` 的核心模块，打包工具（如 `Webpack` 、`Vite` 等）也相继不再默认自动填充。所以当项目中依赖相关环境时，会出现类似 `Uncaught ReferenceError: global is not defined` 、`Uncaught ReferenceError: buffer is not defined` 之类的错误。

此时可以导入 `polyfills` 来解决此问题。

### Webpack 导入 Node.js Core 模块

```javascript
// webpack.common.js

module.exports = {
  //...
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
}
```

### Vite 导入 Node.js Core 模块

安装 polyfills 依赖

```bash
yarn add vite-plugin-node-polyfills -D
```

配置

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
      },
    }),
  ],
})
```

相关文档

[Webpack fallback 配置](https://webpack.js.org/configuration/resolve/#resolvefallback)

[vite-plugin-node-polyfills 仓库](https://github.com/davidmyersdev/vite-plugin-node-polyfills)
