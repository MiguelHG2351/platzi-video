const { merge } = require('webpack-merge');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.common');

module.exports = merge(config, {
    entry: './src/index.js',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new CSSMinimizerWebpackPlugin(),
            new TerserPlugin(),
        ],
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
});
