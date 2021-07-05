const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src/frontend/components'),
            containers: path.resolve(__dirname, 'src/frontend/containers'),
            pages: path.resolve(__dirname, 'src/frontend/pages'),
            routes: path.resolve(__dirname, 'src/frontend/routes'),
            assets: path.resolve(__dirname, 'src/frontend/assets'),
            hooks: path.resolve(__dirname, 'src/frontend/hooks'),
            actions: path.resolve(__dirname, 'src/frontend/actions'),
            reducers: path.resolve(__dirname, 'src/frontend/reducers'),
            utils: path.resolve(__dirname, 'src/frontend/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: [
                    { loader: MiniCSSExtractPlugin.loader },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
}
