import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import Player from '../pages/Player'

const routes = [
    {
        exact: true,
        path: '/',
        component: Home,
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
        component: Player,
    },
    {
        name: 'NotFound',
        component: NotFound,
    },
]

export default routes
