import React from 'react'
import { useLocation } from 'react-router-dom'
import className from 'utils/classname'
import 'assets/styles/components/Search.scss'

const Search = () => {
    const inputClass = className('input', {
        currentRoute: useLocation().pathname,
        classnames: {
            isHome: '/',
        },
    })

    return (
        <section className="main">
            <h2 className="main__title">¿Qué quieres ver hoy?</h2>
            <input type="text" className={inputClass} placeholder="Buscar..." />
        </section>
    )
}

export default Search
