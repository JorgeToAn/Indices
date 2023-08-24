import { createBrowserRouter } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import MiPerfil from '../views/MiPerfil';
import Principal from '../views/Principal';
import SubirArchivos from '../views/SubirArchivos';

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
    {
        path: '/subir-archivos',
        element: SubirArchivos,
    },
]);

export default router;
