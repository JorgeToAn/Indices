import { createBrowserRouter } from 'react-router-dom';
import Inicio from '../views/Inicio';
import Login from '../views/Login';
import MiPerfil from '../views/MiPerfil';
import SubirArchivos from '../views/SubirArchivos';
// import RegistroCarreras from './../views/RegCarreras';

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
        path: '/subir-archivos',
        element: SubirArchivos,
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
