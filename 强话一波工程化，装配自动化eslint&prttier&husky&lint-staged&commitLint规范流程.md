<describe>
  title: 强话一波工程化，装配自动化eslint&prttier&husky&lint-staged&commitLint规范流程
  cover: natur.png
  subhead: 规范工作流程，是一个好的习惯。
  date: 2022/4/3
</describe>

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
