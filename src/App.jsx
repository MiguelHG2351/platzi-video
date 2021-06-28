import { hot } from 'react-hot-loader/root'
import React from 'react'
import HelloWorld from './components/HelloWorld'

const App = () => {
    return (
        <div>
            <HelloWorld />
        </div>
    )
}

export default hot(App)
