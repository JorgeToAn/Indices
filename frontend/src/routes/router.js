import { createBrowserRouter } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import Principal from '../views/Principal';

const router = createBrowserRouter([
    {
        path: '/',
        element: Inicio,
    },
    {
        path: 'iniciar-sesion',
        element: Login,
    },
    {
        path: '/principal',
        element: Principal,
    },
]);

export default router;
