import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logoutRequest } from 'actions/index'
import gravatar from 'utils/gravatar'
import { connect } from 'react-redux'
import className from 'utils/className'
import headerImage from 'assets/images/logo-platzi-video-BW2.png'
import perfilLogo from 'assets/icons/user-icon.png'
import 'assets/styles/components/Header.scss'

const Header = (props) => {
    const { user } = props
    const hasUser =
        typeof user === 'undefined' ? false : Object.keys(user).length > 0

    const backgroundHeader = className('header', {
        currentRoute: useLocation().pathname,
        classnames: {
            isLogin: '/login',
            isRegister: '/register',
        },
    })
    console.log(backgroundHeader)

    function handleLogout() {
        props.logoutRequest({})
    }

    return (
        <header className={backgroundHeader}>
            <Link to="/">
                <img
                    className="header__img"
                    src={headerImage}
                    alt="Platzi Video"
                />
            </Link>
            <div className="header__menu">
                <div className="header__menu--profile">
                    {hasUser ? (
                        <img src={gravatar(user.email)} alt="mi perfil" />
                    ) : (
                        <img src={perfilLogo} alt="mi perfil" />
                    )}
                    <p>Perfil</p>
                </div>
                <ul>
                    {hasUser ? (
                        <>
                            <li>
                                <Link to="/">Cuenta</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={handleLogout}>
                                    Cerrar Sesión
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Iniciar Sesión</Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user,
    }
}

const matchDispatchToProps = {
    logoutRequest,
}

export default connect(mapStateToProps, matchDispatchToProps)(Header)
