# react-template-zero
to build a cli template projest from zero to one

---

# 拆分配置策略

拆分成：
  * 入口文件：webpack.config.js
  * 公共配置：webpack.common.js
  * 开发配置：webapck.development.js
  * 生产配置：webpack.production.js

---

# React.StrictMode

StrictMode 目前有助于：

  1、识别不安全的生命周期
  2、关于使用过时字符串 ref API 的警告
  3、关于使用废弃的 findDOMNode 方法的警告
  4、检测意外的副作用
  5、检测过时的 context API

---

# css-loader 
配置项options
## importLoaders
> 允许为 @import 样式规则、CSS 模块或者 ICSS 启用/禁用或设置在 CSS loader 之前应用的 loader 的数量，例如：@import/composes/@value value from './values.css' 等。

简单理解：
1. css-loader的配置项
2. 然后在css-loader之后几个loader能够`@import`

## modules
类型：Boolean|String|Object 默认值：undefined
```js
options: {
  modules: true,
}
options: {
  modules: "global",
}
options: {
  mode: "icss",
}
```
### mode
类型：String|Function 默认：'local'
可选值 - local、global、pure 和 icss。

> local、global 和 pure 处理 class 和 id 域以及 @value 值。 icss 只会编译底层的 Interoperable CSS 格式，用于声明 CSS 和其他语言之间的 :import 和 :export 依赖关系。

> ICSS 提供 CSS Module 支持，并且为其他工具提供了一个底层语法，以实现它们自己的 css-module 变体。

强解：
就是scss和css一起搞的话，就得用scss，不同于混合用icss

不足，对scss和css的理解深度不够。



---

# sideEffects

```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  optimization: {
    sideEffects: true
  }
}
```

> Webpack 4 中新增了一个 sideEffects 特性，它允许我们通过配置标识我们的代码是否有副作用，从而提供更大的压缩空间。

>TIPS：注意这个特性在 production 模式下同样会自动开启。

[好文](https://www.freesion.com/article/31111139934/#2_sideEffects_284)

## package.json中的 sideEffects
设置`sideEffects`为true，为webpack的`tree-shaking`作准备。
因为模块通过import引入的话，就会执行模块作用域中的逻辑， 那么这种就叫做副作用了。
副作用又分两种情况：
有些可以忽略的：
`console.log`这种不会影响逻辑引发错误的。
有些忽略不了的
比如一些通过原型扩展一些函数的，影响全局的，如果不打包的会就会出现问题

怎么解决：
```js
 "sideEffects": [
    "./src/extend.js",
    "*.css"
  ]
```

## webpack中的sideEffects
### optimization中的
> 告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。

强理：

在webpack中的`optimization`开启就是告诉webpack去检查模块的`package.json`中的`sideEffects`。

### module.rule中的

---

# react-app-env.d这是啥？global.d.ts又是啥
react-app-env.d是cra脚手架创建了
你搭建项目的时候，当引入scss的时候，会出现警告，提示找不到，通过在d.ts文件中declare一下就行了
```js
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```
其他文件同理

## 怎么用d.ts
1. 与调用的ts文件放在同一目录下；
2. 在声明文件tsconfig.json的include/files字段下添加声明文件的路径;

强解：
在tsconfig中include配置什么路径
```js
{
  ...
  "include": [
    "src"
  ],
  ...
}
```
那么d.ts放在这个路径下就没问题了。

[好文](https://www.cnblogs.com/xpengp/p/12787239.html)

---

# css module 在ts中怎么添加提示
安装`typescript-plugin-css-modules`

然后在tsconfig.json配置

```json
{
  ...
  "compilerOptions":{
     "plugins": [{ "name": "typescript-plugin-css-modules" }]
  }
  ...
}

```
这样就可以提示，并且实现了跳转

--- 

# antd 引入

样式按需引入

## 1. babel
```js
"plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ]
```

## 2. 最简单的方式，直接引入就完了，毕竟antd自己做了按需加载了。
直接在全局的css中引入就行了，省去了安装插件的麻烦

---

# webpack 中，filename 和 chunkFilename 的区别是什么？

`filename`和`chunkFilename`很关键，毕竟很多插件中的参数也是沿用了这两个变量命名，比如`MiniCssExtractPlugin`。

`filename` ：就是打包之后的文件名字。
`chunkFilename`：就是懒加载的代码的名字。

---

# tsconfig 中的 "target": "es5"
就是项目编译之后的代码是es5的，这样兼容性更好。
(好文)[https://segmentfault.com/a/1190000021421461]

---

# 添加eslint
安装 eslint
新建eslint配置文件
```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-use-before-define': 'off',
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': 'off',
    'keyword-spacing': ['error', { before: true, after: true }],
    'function-paren-newline': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_.*$',
        varsIgnorePattern: '^_.*$'
      }
    ]
  }
}

```
然后在`package.json`中添加脚本
```json
 "lint": "eslint src/**/*.ts",
```
在webpack中添加eslint校验

---
# 移动依赖到dev中
```js
npm install *** -D 
```

---
# 配置代理



