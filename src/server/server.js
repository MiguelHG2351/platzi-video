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
import Layout from '../frontend/containers/Layout'

import serverRoutes from '../frontend/routes/serverRoutes'
import reducer from '../frontend/reducers/index'
// import initialState from '../frontend/initialState'
import getManifest from './getManifest'

import cookieParser from 'cookie-parser'
import axios from 'axios'
import passport from 'passport'
import boom from '@hapi/boom'

dotenv.config()
const { ENV, PORT } = process.env
const isDev = ENV === 'development'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

require('./utils/auth/strategies/basic')

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
    const mainBuild = manifest ? manifest['main.js'] : '/assets/main.bundle.js'
    const mainStyles = manifest ? manifest['main.css'] : '/assets/style.css'
    const vendor = manifest ? manifest['vendors.js'] : ''
    const common = manifest ? manifest['commons.js'] : ''
    let scripts = `
    <script type="module" src="${mainBuild}"></script>
    `

    if (!isDev) {
        scripts += `
        <script type="module" src="${vendor}"></script>
        <script type="module" src="${common}"></script>
        `
    }

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
                ${scripts}
            </body>
        </html>
    `
}

const renderApp = async (req, res) => {
    let initialState
    const { email, name, id, token } = req.cookies

    try {
        let movieList = await axios({
            url: `${process.env.API_URL}/api/movies`,
            headers: {
                Authorization: `Bearer ${token}`,
                method: 'get',
            },
        })

        movieList = movieList.data.data

        initialState = {
            user: {
                id,
                email,
                name,
            },

            myList: [],
            trends: movieList.filter(
                (movie) => movie.contentRaiting === 'PG' && movie._id
            ),
            originals: movieList.filter(
                (movie) => movie.contentRaiting === 'G' && movie._id
            ),
        }
    } catch (err) {
        initialState = {
            user: {},
            myList: [],
            trends: [],
            originals: [],
        }
    }

    const store = createStore(reducer, initialState)
    const preloadedState = store.getState()
    const isLogged = initialState.user.id
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
            </StaticRouter>
        </Provider>
    )

    res.send(setResponse(html, preloadedState, req.hashManifest))
}

app.post('/auth/sign-in', (req, res, next) => {
    const THIRTY_DAYS_IN_SEC = 259200000
    const TWO_HOURS_IN_SEC = 7200000
    const { rememberMe } = req.body

    passport.authenticate('basic', function (err, data) {
        try {
            if (err) {
                return next(boom.unauthorized())
            }

            const { token, user } = data

            req.login(data, { session: false }, async function (err) {
                if (err) {
                    return next(err)
                }
                res.cookie('token', token, {
                    httpOnly: !(ENV === 'development'),
                    secure: !(ENV === 'development'),
                    maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
                })

                res.status(200).json({ token, user })
            })
        } catch (err) {
            next(err)
        }
    })(req, res, next)
})

app.post('/auth/sign-up', async (req, res, next) => {
    const { body: user } = req

    try {
        const userData = await axios({
            url: `${process.env.API_URL}/api/auth/sign-up`,
            method: 'post',
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
            },
        })

        res.status(201).json({
            name: req.body.name,
            email: req.body.email,
            id: userData.data.id,
        })
    } catch (err) {
        next(err)
    }
})

app.get('*', renderApp)

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`Server on port ${PORT}`)
})
