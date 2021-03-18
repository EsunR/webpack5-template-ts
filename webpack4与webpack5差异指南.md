# 1. 资源模块

> https://webpack.docschina.org/guides/asset-modules/

webpack5 之前，通常使用：

*   [`raw-loader`](https://webpack.docschina.org/loaders/raw-loader/) 将文件导入为字符串
*   [`url-loader`](https://webpack.docschina.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
*   [`file-loader`](https://webpack.docschina.org/loaders/file-loader/) 将文件发送到输出目录

但是在 webpack5 中，你可以卸载掉这些 loader，通过资源模块（asset module）来加载静态资源了。

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

*   `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
*   `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
*   `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
*   `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

在 webpack4 中：

```js
module.exports = {
  // ... ...
  module: {
    rules: [
      // ... ...
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts"
            }
          }
        ]
      }
    ]
  }
}
```

在 webpack5 中：

```js
module.exports = {
  // ... ...
  module: {
    rules: [
      // ... ...
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ]
  }
}
```

# 2. html-loader 的变更

> https://webpack.docschina.org/loaders/html-loader/

首先，html-loader 在更新之后，`options` 的配置项发生了改变。在旧版本中，如果要配置规则，则是通过 `options.attributes` 来进行变更，然而在新版本中则是通过 `options.sources` 来变更。

在 webpack4 中：

```js
module.exports = {
  // ... ...
  module: {
    rules: [
      // ... ...
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src"
              },
              {
                tag: "link",
                attribute: "href",
                type: "src"
              }
            ]
          }
        }
      },
    ]
  }
}
```

在 webpack5 中：

```js
module.exports = {
  // ... ...
  module: {
    rules: [
      // ... ...
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "link",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },
    ]
  }
}
```

同时，新版的 html-loader 默认通过 webpack5 的资源模块来进行路径转换，如果你仍使用 file-loader 等文件 loader 进行资源加载，html-loader 转化的资源路径会与经 file-loader 转化的资源路径不一致。因此推荐不再使用 file-loader 进行资源导入。

# 3. webpack-merge 的变更

使用 webpack-merge 可以合并 webpack 配置，在最新版本的 webpack-merge 中，如果提醒了 `merge is not a function`，需要改变 `merge` 方法的引入方式。

webpack4 中：

```js
const merge = require("webpack-merge")
```

webpack5 中：

```js
const { merge } = require("webpack-merge")
```