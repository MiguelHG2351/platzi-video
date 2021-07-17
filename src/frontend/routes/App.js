import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from 'containers/Layout'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NotFound from 'pages/NotFound'
import Player from 'pages/Player'

const App = ({ isLogged }) => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={isLogged ? Home : Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact
                        path="/player/:id"
                        component={isLogged ? Player : Login}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
