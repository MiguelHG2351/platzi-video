/* eslint-disable */
import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router'
import serverRoutes from '../frontend/routes/serverRoutes'
import initialState from '../frontend/initialState'
import reducer from '../frontend/reducers/'

dotenv.config()
const { ENV, PORT } = process.env
const isDev = ENV === 'development'
const app = express()

if (isDev) {
    console.log('Development config')
    const webpackConfig = isDev
        ? require('../../webpack.dev')
        : require('../../webpack.prod')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(webpackConfig)
    const serverConfig = {
        port: PORT,
        hot: true,
        serverSideRender: true,
    }

    app.use(webpackDevMiddleware(compiler, serverConfig))
    app.use(webpackHotMiddleware(compiler))
}

const setResponse = (html) => {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Platzi Video</title>
        <link rel="icon" href="./logo-platzi-video.png" />
        <link rel="stylesheet" href="assets/style.css" />
    </head>
    <body>
        <div id="app">${html}</div>
        <script type="module" src="assets/main.bundle.js"></script>
    </body>
</html>
    `
}

const renderApp = (req, res) => {
    const store = createStore(reducer, initialState)
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    )

    res.send(setResponse(html))
}

app.get('*', (req, res) => renderApp)

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`Server on port ${PORT}`)
})
