/* eslint-disable */
import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import helmet from 'helmet'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers/index'
import initialState from '../frontend/initialState'
import getManifest from './getManifest'

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
} else {
    app.use((req, res, next) => {
        if (!req.hashManifest) {
            req.hashManifest = getManifest()
            next()
        }
    })
    app.use(express.static(`${__dirname}/public`))
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    )
    app.use(helmet.permittedCrossDomainPolicies())
    app.disable('x-powered-by')
}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest['main.css'] : 'assets/style.css'
    const mainBuild = manifest ? manifest['main.js'] : 'assets/main.js'
    const vendor = manifest ? manifest['vendors.js'] : ''
    const common = manifest ? manifest['commons.js'] : ''

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Platzi Video</title>
                <link rel="icon" href="./logo-platzi-video.png" />
                <link rel="stylesheet" type="text/css" href="${mainStyles}" />
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(
                        preloadedState
                    ).replace(/</g, '\\u003c')}
                </script>
                <script type="module" src="${mainBuild}"></script>
                <script type="module" src="${vendor}"></script>
                <script type="module" src="${common}"></script>
            </body>
        </html>
    `
}

const renderApp = (req, res) => {
    const store = createStore(reducer, initialState)
    const preloadedState = store.getState()
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    )

    res.send(setResponse(html, preloadedState, req.hashManifest))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`Server on port ${PORT}`)
})
