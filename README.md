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

## 2. 最简单的方式，直接引入就完了，毕竟 antd 自己做了按需加载了。

直接在全局的 css 中引入就行了，省去了安装插件的麻烦

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
- 首先项目是ts的，那么安装`eslint`的方法如下
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
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "any",
        "prev": [
          "const",
          "let",
          "var"
        ],
        "next": [
          "const",
          "let",
          "var"
        ]
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
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
 - 在webpack中配置
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

## preitter 和 eslint结合
eslint负责检验代码是否合格的
preitter辅助格式化的
两结合绝配
但是`preitter`本身也是可以配置检验规则的，所以会有可能和eslint冲突，那么就得想办法解决
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
    这样就会优先根据prettier来决定，很好的解决冲突的问题。

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

