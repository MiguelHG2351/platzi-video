import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from 'actions/index'
import googleIcon from 'assets/icons/google-icon.png'
import twitterIcon from 'assets/icons/twitter-icon.png'
import 'assets/styles/pages/Login.scss'

const Login = ({ loginUser, history }) => {
    const [form, setForm] = useState({
        email: '',
    })

    function handleInput(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        loginUser(form, '/')
    }

    return (
        <section className="login">
            <section className="login__container">
                <h2>Inicia sesión</h2>
                <form
                    className="login__container--form"
                    onSubmit={handleSubmit}
                >
                    <input
                        name="email"
                        className="input"
                        type="text"
                        placeholder="Correo"
                        onChange={handleInput}
                    />
                    <input
                        name="password"
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        onChange={handleInput}
                    />
                    <button className="button" type="submit">
                        Iniciar sesión
                    </button>
                    <div className="login__container--remember-me">
                        <label>
                            <input
                                type="checkbox"
                                id="cbox1"
                                value="first_checkbox"
                            />
                            Recuérdame
                        </label>
                        <a href="/">Olvidé mi contraseña</a>
                    </div>
                </form>
                <section className="login__container--social-media">
                    <div>
                        <img src={googleIcon} /> Inicia sesión con Google
                    </div>
                    <div>
                        <img src={twitterIcon} /> Inicia sesión con Twitter
                    </div>
                </section>
                <p className="login__container--register">
                    No tienes ninguna cuenta{' '}
                    <Link to="register">Regístrate</Link>
                </p>
            </section>
        </section>
    )
}

const mapDispathToProps = {
    loginUser,
}

export default connect(null, mapDispathToProps)(Login)
