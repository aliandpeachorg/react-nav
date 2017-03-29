
/**
 * 部署时候的配置文件
 */
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 指定spa应用的入口文件
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        vendors: ['react','react-router','react-dom']
    },
    // 指定项目构建的输出位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // 处理js和jsx语法到es5
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // use属性的值可以是字符串也可以是数组
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            // 处理在js中引用css文件,多个加载器的执行顺序是从右往左执行
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },
            // 处理在js中引用scss文件
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!less-loader"
                })
            },
            // 处理图片操作   1b=8bit  1kb=1024b  25000bit ~3kb
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=25000&name=images/[name].[ext]'
            },
            // 处理字体文件
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=100000&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        // 删除文件夹的
        new CleanPlugin(['dist']),
        // 分离第三方应用的插件
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        new ExtractTextPlugin("app.css"),
        // 自动生成html插件
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css":["app.css"],
                    "js": ["vendors.js", "bundle.js"]
                }
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        // 压缩混淆js代码插件
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        // 定义node的生产环境在构建的过程中删除警告
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        })
    ]
}
