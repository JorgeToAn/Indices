import { MantineProvider } from "@mantine/core";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './views/Login';
import indicesTheme from "./CustomProvider";
import Inicio from './views/Inicio';
import MiPerfil from "./views/MiPerfil";
import SubirArchivos from "./views/SubirArchivos";
import RegistroCarreras from "./views/RegCarreras";
import RegistroPlanes from "./views/RegPlanes";
import RegistroDiscapacidades from "./views/RegDiscapacidades";
import IndicePermanencia from './views/IndPermanencia';
import IndiceEgreso from "./views/IndEgreso";
import IndiceDesercion from "./views/IndDesercion";
import IndiceTitulacion from "./views/IndTitulacion";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/mi-perfil',
        element: <MiPerfil />,
      },
      {
        path: '/subir-archivos',
        element: <SubirArchivos />,
      },
      {
        path: '/registro/carrera',
        element: <RegistroCarreras />
      },
      {
        path: '/registro/planes',
        element: <RegistroPlanes />
      },
      {
        path: '/registro/discapacidades',
        element: <RegistroDiscapacidades />
      },
      {
        path: '/indices/permanencia',
        element: <IndicePermanencia />,
      },
      {
        path: '/indices/egreso',
        element: <IndiceEgreso />,
      },
      {
        path: '/indices/desercion',
        element: <IndiceDesercion />,
      },
      {
        path: '/indices/titulacion',
        element: <IndiceTitulacion />,
      },
    ]
  },
  {
    path: '/iniciar-sesion',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Notifications />
      <MantineProvider theme={indicesTheme} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);
