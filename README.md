# react-template-zero

to build a cli template projest from zero to one

---

# 拆分配置策略

拆分成：

- 入口文件：webpack.config.js
- 公共配置：webpack.common.js
- 开发配置：webapck.development.js
- 生产配置：webpack.production.js

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

配置项 options

## importLoaders

> 允许为 @import 样式规则、CSS 模块或者 ICSS 启用/禁用或设置在 CSS loader 之前应用的 loader 的数量，例如：@import/composes/@value value from './values.css' 等。

简单理解：

1. css-loader 的配置项
2. 然后在 css-loader 之后几个 loader 能够`@import`

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
就是 scss 和 css 一起搞的话，就得用 scss，不同于混合用 icss

不足，对 scss 和 css 的理解深度不够。

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

> TIPS：注意这个特性在 production 模式下同样会自动开启。

[好文](https://www.freesion.com/article/31111139934/#2_sideEffects_284)

## package.json 中的 sideEffects

设置`sideEffects`为 true，为 webpack 的`tree-shaking`作准备。
因为模块通过 import 引入的话，就会执行模块作用域中的逻辑， 那么这种就叫做副作用了。
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

## webpack 中的 sideEffects

### optimization 中的

> 告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。

强理：

在 webpack 中的`optimization`开启就是告诉 webpack 去检查模块的`package.json`中的`sideEffects`。

### module.rule 中的

---

# react-app-env.d 这是啥？global.d.ts 又是啥

react-app-env.d 是 cra 脚手架创建了
你搭建项目的时候，当引入 scss 的时候，会出现警告，提示找不到，通过在 d.ts 文件中 declare 一下就行了

```js
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

其他文件同理

## 怎么用 d.ts

1. 与调用的 ts 文件放在同一目录下；
2. 在声明文件 tsconfig.json 的 include/files 字段下添加声明文件的路径;

强解：
在 tsconfig 中 include 配置什么路径

```js
{
  ...
  "include": [
    "src"
  ],
  ...
}
```

那么 d.ts 放在这个路径下就没问题了。

[好文](https://www.cnblogs.com/xpengp/p/12787239.html)

---

# css module 在 ts 中怎么添加提示

安装`typescript-plugin-css-modules`

然后在 tsconfig.json 配置

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

打包大小 1.4m

## 2. 最简单的方式，直接引入就完了，毕竟 antd 自己做了按需加载了。

直接在全局的 css 中引入就行了，省去了安装插件的麻烦
但是打包大小 1.6m。。。。。

---

# webpack 中，filename 和 chunkFilename 的区别是什么？

`filename`和`chunkFilename`很关键，毕竟很多插件中的参数也是沿用了这两个变量命名，比如`MiniCssExtractPlugin`。

`filename` ：就是打包之后的文件名字。
`chunkFilename`：就是懒加载的代码的名字。

---

# tsconfig 中的 "target": "es5"

就是项目编译之后的代码是 es5 的，这样兼容性更好。
(好文)[https://segmentfault.com/a/1190000021421461]

---

# 添加 eslint

安装 eslint
新建 eslint 配置文件

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
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'no-use-before-define': 'off',
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    'no-multiple-empty-lines': ['error', { max: 1 }],
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

在 webpack 中添加 eslint 校验

---

# 移动依赖到 dev 中

```js
npm install *** -D
```

---

# 配置代理

---

# contentBase 在 webpackwebpack-dev-server 中废弃了

---

# eslint prttier husky lint-staged 配置的问题

## eslint

- 首先项目是 ts 的，那么安装`eslint`的方法如下
  ```js
  npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
  ```
- 配置
  根目录下创建`.eslintrc`

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-use-before-define": "off",
    "object-curly-spacing": ["error", "always"],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "any",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"]
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "space-in-parens": ["error", "never"],
    "space-before-function-paren": "off",
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "function-paren-newline": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_.*$",
        "varsIgnorePattern": "^_.*$"
      }
    ]
  }
}
```

## husky

> husky 是一个 `Git Hook` 工具，可以在 `git` 的周期中执行一些动作，将 `git hooks` 钩子交由`husky` 执行。

```js
npm i husky -D
npm set-script prepare "husky install"
npm run prepare
```

1. 安装 husky。
2. 在 package.json 中添加脚本。
3. 初始化 husky，会在根目录创建 `.husky` 文件夹。

### 周期：

- commit-msg
  执行`commitlint`，检验`commit`信息的正确性。

  - commitlint 安装

    ```js
    npm i commitlint @commitlint/config-conventional -D
    npx husky add .husky/commit-msg 'npx commitlint -E HUSKY_GIT_PARAMS'
    ```

    - @commitlint/config-conventional 这是一个规范配置，标识采用什么规范来执行消息校验, 这个默认是 Angular 的提交规范

      | 类型     | 描述                                                   |
      | -------- | ------------------------------------------------------ |
      | build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
      | chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
      | ci       | 持续集成修改                                           |
      | docs     | 文档修改                                               |
      | feat     | 新特性、新功能                                         |
      | fix      | 修改 bug                                               |
      | perf     | 优化相关，比如提升性能、体验                           |
      | refactor | 代码重构                                               |
      | revert   | 回滚到上一个版本                                       |
      | style    | 代码格式修改, 注意不是 css 修改                        |
      | test     | 测试用例修改                                           |

      - 配置方法，根目录下新建`commitlintrc`文件

        ```json
        {
          "extends": ["@commitlint/config-conventional"]
        }
        ```

        这样就不必修改配置，就可以直接用`config-conventional`的配置

- pre-commit

  执行 npx lint-staged

  - lint-staged 安装

    ```js
    npm install lint-staged -D
    // 在husky的pre-commit配置中注册行为
    npx husky add .husky/pre-commit "npx lint-staged"
    ```

  - 配置

    根目录创建 .lintstagedrc.json

    ```json
    {
      "src/**/*.{js,tsx,ts,jsx}": ["eslint --fix"]
    }
    ```

    - 针对指定类型的文件执行命令

### 周期：pre-push

## webpack 结合 eslint

- 安装

```js
yarn add eslint-webpack-plugin -D
```

- 在 webpack 中配置
  ```js
  new ESLintPlugin({
    // Plugin options
    extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
    formatter: require.resolve('react-dev-utils/eslintFormatter'),
    eslintPath: require.resolve('eslint'),
    failOnError: !(isEnvDevelopment && emitErrorsAsWarnings),
    context: resolveApp('src'),
    cache: true,
    cacheLocation: path.resolve(
      resolveApp('node_modules'),
      '.cache/.eslintcache'
    )
  })
  ```

## preitter 和 eslint 结合

eslint 负责检验代码是否合格的
preitter 辅助格式化的
两结合绝配
但是`preitter`本身也是可以配置检验规则的，所以会有可能和 eslint 冲突，那么就得想办法解决
-- 安装

```js
 yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

- 在`eslintrc`中配置
  ```json
    {
      ...
      "extends": [
        "plugin:prettier/recommended"
      ],
      ...
    }
  ```
  这样就会优先根据 prettier 来决定，很好的解决冲突的问题。

### vscode 保存自动化格式化，就更美了

新建`.vscode`文件夹，然后创建`settings.json`文件，然后写入以下代码

```js
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true,
    //.vue文件template格式化支持，并使用js-beautify-html插件
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    //js-beautify-html格式化配置，属性强制换行
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-aligned"
        }
    },
    //配置 ESLint 检查的文件类型
    "eslint.validate": [
        "javascript",
        "javascriptreact"
    ],
    //保存时eslint自动修复错误
    "eslint.autoFixOnSave": false,
    //保存自动格式化
    "editor.formatOnSave": false
}
```

---

# style-loader 与 mini-css-extract-plugin

## style-loader 干嘛的？

> 使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快

## mini-css-extract-plugin 干嘛的？

> 将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载

**不要同时使用 style-loader 与 mini-css-extract-plugin。**
开发模式用`style-loader`
生产模式`mini-css-extract-plugin`

---

# webpack 的优化 optimization

```js
{
  ...
  optimization: {
    // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
    minimizer: [`...`, , new CssMinimizerPlugin()]
  }
  ...
}

```

em ～～～，官方说了，你得用`...` 来表示你是在扩展，否则直接写，会覆盖这样就会丢失`terser-webpack-plugin`的作用，太恶了这个。

---

# CssMinimizerWebpackPlugin 和 optimize-css-assets-webpack-plugin

都是优化和压缩 CSS。

`CssMinimizerWebpackPlugin` 相比之下 `source maps` 和 `assets` 中使用查询字符串会更加准确，支持缓存和并发模式下运行

---

# souce-map

sourcemap 配置的值有： [inline-|hidden-|eval-][nosources-][cheap-[module-]] [source-map]

- eval：

  - 使用 eval 包裹模块代码, 在尾部用拼接注释 //# sourceURL=webpack-internal:///./src/index.js，不会生成 map 文件

- source-map：

  - 产生.map 文件

- cheap：

  - 不包含列信息，也不包含 loader 的 sourcemap

- module：

  - 包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）

- inline：

  - 将.map 作为 DataURI 嵌入，不单独生成.map 文件（这个配置项比较少见）

- nosources:

  - 隐藏源代码，源代码的文件名

- hidden:
  - 隐藏源代码,提示编译后的文件名

## 开发环境要考虑：速度快，调试友好

- 速度：

  - eval > inline > cheap

- 调试:

  - source-map > cheap-module-source-map > cheap-source-map

- 推荐：

  - eval-source-map/eval-cheap-module-source-map

## 生产环境，要考虑： 源码要不要隐藏，调试要不要友好

**inline 和 eval 会把 map 放进 js，所以生成环境不要使用行内**

- 代码有隐藏要求：

  - hidden-source-map / nosources-source-map

- 推荐：

  - nosources-cheap-source-map/hidden-cheap-source-map

---

# sessionStorage 和 localStorage 的共享情况

1. 不同浏览器无法共享 localStorage 和 sessionStorage 的值
2. 相同浏览器下，并且是同源窗口（协议、域名、端口一致），不同页面可以共享 localStorage 值，通过跳转的页面可以共享 sessionStorage 值
3. 关于 sessionStorage，通常说 sessionStorage 关闭页面即消失，但是通过跳转的页面可以共享 sessionStorage 值，跳转有多种方式：

   - (1) <a href="同源页面" target="_self">跳转</a> //原窗口
   - (2) <a href="同源页面" target="_blank">跳转</a> //新开窗口
   - (3) window.location.href = '同源页面' //原窗口
   - (4) window.location.replace('同源页面') //原窗口
   - (5) window.open('同源页面') //新开窗口
   - (6) this.$router.push({path: '同源页面'}) //通过路由跳转共享值
     **原窗口跳转的页面传递 sessionStorage，改变存储值会相互影响，新开窗口跳转方式传递 sessionStorage，改变存储值互不影响。**

app 端经过原生方法更换 webView 实现跳转，这种方式不能共享 sessionStorage。

---

# 这里抛出 DevTools failed to load SourceMap 警告的原因是：

- 修改浏览器配置

  - 项目引用的第三方的 JavaScript 工具是压缩后的版本，
    存在 SourceMap 的指向信息，
    浏览器启用了 JavaScript 源映射，
    但是我的项目中没有相应的 SourceMap 文件，所以抛出此异常。

    - 设置浏览器：
      在设置面板中 Preferences -> Sources -> Enable JavaScript source maps
      勾选掉 【Enable JavaScript source maps】选项，即可

      **不推荐，没意义**

# 使用 source-map-loader

- 安装

```
yarn add  source-map-loader
```

- `webpack`中配置`loader`中配置
  ```js
      {
        enforce: 'pre',
        exclude: [/@babel(?:\/|\\{1,2})runtime/, /@antv/, /inversify/],
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        loader: require.resolve('source-map-loader')
      }
  ```

---

# 每个 tsx&jsx 文件头部都得引入 react 嫌烦？

使用 webpack 自带的插件

```js
new webpack.ProvidePlugin({
      React: 'react'
    }),
```

---

# Uncaught ReferenceError: regeneratorRuntime is not defined

- 在程序中使用了 async/await ，经过@babel/preset-env 解析后会将代码转换为一个名为 regeneratorRuntime 的函数，但是转换后的代码仅仅存在这个函数的调用，并没有具体的定义体现。
- 安装@babel/plugin-transform-runtime 插件
  ```js
   yarn add @babel/plugin-transform-runtime
  ```
  - 在 babel 配置文件中配置插件
    ```js
    {
      ...
      plugins:[
        ...
        "@babel/plugin-transform-runtime"
        ...
      ]
      ...
    }
    ```

---

# 怎么优化 webpack 输出

- 安装 `friendly-errors-webpack-plugin`就能保持输出清晰了。

---

# 去掉打包后 debugger 和 concole

```js
minimizer: [
  ...
  new TerserPlugin({
    ...
    terserOptions: {
      ...
      compress: {
        ...
        drop_console: true,
        drop_debugger: true
        ...
      }
      ...
    }
    ...
  })
  ...
]
```

---

# 单元测试

安装 jest
安装 jest
