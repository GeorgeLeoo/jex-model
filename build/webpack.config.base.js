const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const utils = require('./utils')

const webpackConfig = {
    target: 'node',
    entry: {
        server: path.join(utils.APP_PATH, './Model')
    },
    output: {
        filename: 'index.js',
        path: utils.LIB_PATH
    },
    module: {
        rules: [
            {
                test: '/\.(js|jsx)$/',
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(utils.APP_PATH, './node_modules')]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: (process.env.NODE_ENV === 'production' ||
                process.env.NODE_ENV === 'prod') ? "'production'" : "'development'"
            }
        })
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true,
    }
}

module.exports = webpackConfig
