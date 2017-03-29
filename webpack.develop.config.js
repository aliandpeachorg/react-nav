/**
 * webpack的开发环境配置
 */
var path = require('path')
var webpack = require('webpack')
// 自动打开浏览器插件
// var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    // 指定spa应用的入口文件
    entry: path.resolve(__dirname, 'src/js/app.js'),
    // 指定项目构建的输出位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options:{
                    configFile:'.eslintrc.js'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // 处理在js中引用css文件,多个加载器的执行顺序是从右往左执行
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 处理图片引用的
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    // 需要自己单独配置服务器
    devServer: {
        // 指定启动服务的更目录
        contentBase: __dirname + '/src',
        port: 3000,
        host: 'localhost',
        hot: true,// 是否启用热更新
        inline: true, // 默认是true
        historyApiFallback: true,
        noInfo: false,
        // stats: 'minimal',
        // publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new OpenBrowserPlugin({url: 'http://localhost:8080/', browser: 'chrome'})
    ]
}
