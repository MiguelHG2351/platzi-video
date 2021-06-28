import React from 'react'
import headerImage from 'assets/images/logo-platzi-video-BW2.png'
import perfilLogo from 'assets/images/user-icon.png'
import 'assets/styles/components/Header.scss'

const Header = () => {
    return (
        <header className="header">
            <img className="header__img" src={headerImage} alt="Platzi Video" />
            <div className="header__menu">
                <div className="header__menu--profile">
                    <img src={perfilLogo} alt="" />
                    <p>Perfil</p>
                </div>
                <ul>
                    <li>
                        <a href="/">Cuenta</a>
                    </li>
                    <li>
                        <a href="/">Cerrar Sesión</a>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
