import { createBrowserRouter } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Login from '../views/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: Inicio,
    },
    {
        path: 'iniciar-sesion',
        element: Login,
    },
]);

export default router;
