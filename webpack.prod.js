const { merge } = require('webpack-merge')
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const config = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CompressioWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = merge(config, {
    entry: './src/frontend/index.js',
    output: {
        path: path.resolve(__dirname, 'src/server/public'),
        filename: 'assets/[name]-[fullhash].bundle.js',
        chunkFilename: '[name].bundle.js',
        assetModuleFilename: 'assets/[name][ext]',
        publicPath: '/',
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new CSSMinimizerWebpackPlugin(), new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    chunks: 'all',
                    name: 'commons',
                    filename: 'assets/common.[chunkhash].js',
                    reuseExistingChunk: true,
                    enforce: true,
                    priority: 20,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendors',
                    filename: 'assets/vendor.[chunkhash].js',
                    reuseExistingChunk: true,
                    enforce: true,
                    priority: 10,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'assets/style-[fullhash].css',
        }),
        new WebpackManifestPlugin(),
        new CompressioWebpackPlugin({
            test: /\.js$|\.css$/,
            filename: '[path][base].gz',
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [['optipng', { optimizationLevel: 5 }]],
            },
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: './node_modules/',
        }),
    ],
})
