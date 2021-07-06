const path = require('path')
const { loader } = require('mini-css-extract-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'src/server/public'),
        filename: 'assets/[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        assetModuleFilename: 'assets/[name][ext]',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
                test: /\.(png|jpg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(s*)css$/,
                use: [{ loader: loader }, 'css-loader', 'sass-loader'],
            },
        ],
    },
}
