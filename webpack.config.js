const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports={
//'babel-polyfill',
    entry: ['./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        publicPath: './dist/js/',
        contentBase: './dist',
        watchContentBase: true,
        hot: true,
        compress:true,
        port:9001
    },
    plugins: [ new htmlWebpackPlugin(
                    {
                        filename: 'index.html',
                        template: './src/index.html'
                    }),
                new webpack.HotModuleReplacementPlugin()
            ],
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            }
        ]
    }

    
}