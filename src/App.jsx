import { hot } from 'react-hot-loader/root'
import React from 'react'
import HelloWorld from './components/HelloWorld'
import Header from 'components/Header'

const App = () => {
    return (
        <div>
            <Header />
            <HelloWorld />
        </div>
    )
}

export default hot(App)
