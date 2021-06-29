import React from 'react'

const Categories = ({ children, title }) => {
    return (
        <section className="categories">
            <h3 className="categories__title">{title}</h3>
            {children}
        </section>
    )
}

export default Categories
