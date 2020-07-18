## Learning Webpack Notes

1. ~~首先在根目录下创建文件`webpack.config.js`~~
1. 最后将相关配置文件收束在`/config`目录下
```javascript
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'htmlwebpackplugin'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jsp|png|svg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
```

### entry
指定打包入口文件，分为`单个入口`，`多个入口`：

**单个入口文件配置：**
```JavaScript
module.exports = {
    entry: './src/index.js',
};
```
**多个入口文件配置：**
```JavaScript
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
};
```

### output
webpack打包文件输出位置

```JavaScript
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

`filename：`打包生成的文件名，多个入口文件可以使用 `'[name].bundle.js' `区分

`path:` 打包生成的文件存放位置，需要在当前文件头部引入`path`包

### module
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，


### devServer
实时重新加载(live reloading)。修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码。需要安装插件`webpack-dev-server`，并在package.json文件的script中添加命令；

```JavaScript
package.json
{
  "scripts": {
    "start": "webpack-dev-server --open",
  },
};
```
