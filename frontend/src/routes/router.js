import { createBrowserRouter } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import MiPerfil from '../views/MiPerfil';
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
    {
        path: '/mi-perfil',
        element: MiPerfil,
    },
]);

export default router;
