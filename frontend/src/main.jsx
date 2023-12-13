import { MantineProvider } from "@mantine/core";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import indicesTheme from "./CustomProvider";

import Login from './views/Login';
import Inicio from './views/Inicio';
import MiPerfil from "./views/MiPerfil";

import SubirArchivos from "./views/SubirArchivos";

import RegistroCarreras from './views/registros/Carreras';
import RegistroPlanes from './views/registros/Planes';
import RegistroDiscapacidades from './views/registros/Discapacidades';
import IndicePermanencia from './views/indices/Permanencia';
import IndiceEgreso from './views/indices/Egreso';
import IndiceDesercion from './views/indices/Desercion';
import IndiceTitulacion from './views/indices/Titulacion';
import TablaPoblacion from "./views/tablas/Poblacion";
import TablaCrecimiento from './views/tablas/Crecimiento';
import SeleccionIndices from "./views/indices/Seleccion";
import SeleccionTablas from './views/tablas/Seleccion';
import SeleccionRegistros from "./views/registros/Seleccion";
import CedulaCacei from "./views/cedulas/Cacei";
import AlumnosLista from "./views/alumnos/AlumnosLista";
import CedulaCaceca from "./views/cedulas/Caceca";

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
        path: '/registro',
        element: <SeleccionRegistros />,
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
        path: '/indices',
        element: <SeleccionIndices />,
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
      {
        path: '/tablas',
        element: <SeleccionTablas />,
      },
      {
        path: '/tablas/poblacion',
        element: <TablaPoblacion />,
      },
      {
        path: '/tablas/crecimiento',
        element: <TablaCrecimiento />,
      },
      {
        path: '/alumnos/lista',
        element: <AlumnosLista />,
      },
      {
        path: '/cedulas/cacei',
        element: <CedulaCacei />,
      },
      {
        path: '/cedulas/caceca',
        element: <CedulaCaceca />,
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
