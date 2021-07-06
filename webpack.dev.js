const { merge } = require('webpack-merge')
const config = require('./webpack.common')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = merge(config, {
    entry: [
        'react-hot-loader/patch',
        './src/frontend/index.js',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
    ],
    mode: 'development',
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        historyApiFallback: true,
        hot: true,
        compress: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'assets/style.css',
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [['optipng', { optimizationLevel: 5 }]],
            },
        }),
    ],
})
