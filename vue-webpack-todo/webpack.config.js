const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
// 生产环境，将 css 部分单独打包成静态资源文件
const ExtractPlugin = require("extract-text-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpg|gif|png|jpeg|svg)$/,
                use: [{
                    // url-loader 封装了 file-loader(将文件读取出来，换一个存放位置，换一个名字)
                    loader: 'url-loader', // 可以将图片转换成 base64 代码，直接写在 js 代码中，不用生产新的图片
                    options: { // 配置选项
                        limit: 1024, // 把小于 1kb 的图片转换成 base64
                        name: '[name]-abc.[ext]' // 输出文件名字，ext文件扩展名
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"devalopment"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
} 

if (isDev) {
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-moudle-eval-soucre-map'
    config.devServer = {
        port: 8001,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
        // open: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            })
        }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 将 webpack 相关单独打包打一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config