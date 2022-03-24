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

# react-app-env.d这是啥？



  
  