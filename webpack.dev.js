const { merge } = require('webpack-merge');
const config = require('./webpack.common');

module.exports = merge(config, {
    entry: ['react-hot-loader/patch', './src/index.js'],
    mode: 'development',
    devServer: {
        host: '192.168.1.10',
        port: 3000,
        historyApiFallback: true,
        hot: true,
        compress: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
});
