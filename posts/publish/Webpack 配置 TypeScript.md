---
title: Webpack 配置 TypeScript
date: 2020-04-02 22:22:43
tags: [Webpack, TypeScript]
categories: TypeScript
---

## loader 编译
### 使用 awesome-typescript-loader 编译

[官网](https://github.com/s-panferov/awesome-typescript-loader)
版本：5.2.1

基础配置，默认实现了 tsx => js 的功能
```JavaScript
// webpack.config.js

module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
    }
}
```
修改配置(`tsconfig.json`)，配置参数参考官网
```JSON
{
    "useBabel": true,
    "babelOptions": {
        "babelrc": false, /* Important line */
        "presets": [
            ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }]
        ]
    },
    "babelCore": "@babel/core", // needed for Babel v7
}
```

扩展配置
```JavaScript
// webpack.config.js
const styledComponentsTransformer = require('typescript-plugin-styled-components').default;
const keysTransformer = require('ts-transformer-keys/transformer').default

module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      options: {
        // ... other loader's options
        getCustomTransformers: program => ({
            before: [
                styledComponentsTransformer(),
                keysTransformer(program)
            ]
        })
      }
    }
}
```

### 使用 @babel/preset-typescript 编译
[官网](https://www.babeljs.cn/docs/babel-preset-typescript)

基础配置
```JavaScript
// webpack.config.js

module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
}
```
```JSON
// .babelrc.json

{
  "presets": [
    ["@babel/preset-env", {
        "modules": false
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["babel-plugin-styled-components"]
  ]
}
```
#### 代码检查
[官网](https://ts.xcatliu.com/engineering/lint)
因为 `@babel/preset-typescript` 只是编译，不提供代码检查。所以需要安装专门的代码检查

安装
```Bash
yarn add eslint -D
# react
yarn add eslint-plugin-react -D
# eslint 配置
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy -D
```

配置 `.eslintrc.js` 规则
```JavaScript
module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'array-callback-return': 'off',
    'no-param-reassign': 'off'
  }
};
```

配置 `.eslintignore` 文件忽略
```
build/**
```

配置 `webpack` 的配置文件
```JavaScript
module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' }
        ]
      }
    ]
  },
```

配置 Vscode
安装 `ESLint` 插件，配置 `settings.json`
```JSON
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.organizeImports": true
},
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "html",
  "vue",
  "tsx"
],
"typescript.tsdk": "node_modules/typescript/lib",
"eslint.format.enable": true
```
