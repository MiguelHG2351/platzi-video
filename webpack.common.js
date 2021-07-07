const { loader } = require('mini-css-extract-plugin')

module.exports = {
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
