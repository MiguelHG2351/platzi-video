import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import App from 'routes/App'
import './assets/styles/App.scss'
import reducer from 'reducers/'

const history = createBrowserHistory()
const preloadState = window.__PRELOADED_STATE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, preloadState, composeEnhancers())

delete window.__PRELOADED_STATE__
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)
