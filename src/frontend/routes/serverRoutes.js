import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import Player from '../pages/Player'

const serverRoutes = (isLogged) => {
    return [
        {
            exact: true,
            path: '/',
            component: isLogged ? Home : Login,
        },
        {
            exact: true,
            path: '/login',
            component: Login,
        },
        {
            exact: true,
            path: '/register',
            component: Register,
        },
        {
            exact: true,
            path: '/player/:id',
            component: isLogged ? Player : Login,
        },
        {
            name: 'NotFound',
            component: NotFound,
        },
    ]
}

export default serverRoutes
