import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from 'actions/index'
import 'assets/styles/pages/Register.scss'

const Register = (props) => {
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
    })

    const handleInput = (event) => {
        console.log(`${event.target.name} | ${event.target.value}`)
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.registerUser(form, '/login')
    }

    return (
        <section className="register">
            <section className="register__container">
                <h2>Regístrate</h2>
                <form
                    onSubmit={handleSubmit}
                    className="register__container--form"
                >
                    <input
                        name="name"
                        onChange={handleInput}
                        className="input"
                        type="text"
                        placeholder="Nombre"
                    />
                    <input
                        name="email"
                        onChange={handleInput}
                        className="input"
                        type="email"
                        placeholder="Correo"
                    />
                    <input
                        name="password"
                        onChange={handleInput}
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                    />
                    <button className="button" type="submit">
                        Registrarme
                    </button>
                </form>
                <Link to="/login">Iniciar sesión</Link>
            </section>
        </section>
    )
}

const mapDispatchToProps = {
    registerUser,
}

export default connect(null, mapDispatchToProps)(Register)
