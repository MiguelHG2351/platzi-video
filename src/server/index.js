const path = require('path')
require('ignore-styles')
require('@babel/polyfill')
require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    components: path.resolve(
                        __dirname,
                        '../frontend/components/'
                    ),
                    assets: path.resolve(__dirname, '../frontend/assets/'),
                    utils: path.resolve(__dirname, '../frontend/utils/'),
                    actions: path.resolve(__dirname, '../frontend/actions/'),
                    reducers: path.resolve(__dirname, '../frontend/reducers/'),
                },
            },
        ],
    ],
})

require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif'],
    name: '/assets/[name].[ext]',
})

require('./server')
