import { MantineProvider } from "@mantine/core";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import indicesTheme from "./CustomProvider";

import Login from './views/Login';
import Inicio from './views/Inicio';
import MiPerfil from "./views/usuario/MiPerfil";

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
import AlumnosHistorial from "./views/alumnos/AlumnosHistorial";
import CedulaCaceca from "./views/cedulas/Caceca";

import UsuariosLista from "./views/UsuariosLista";

import CambioContrasena from "./views/usuario/CambioContrasena";
import SeleccionAlumnos from "./views/alumnos/Seleccion";
import SeleccionCedulas from "./views/cedulas/Seleccion";
import Error404 from "./views/errores/Error404";
import Error500 from "./views/errores/Error500";
import SeleccionReportes from "./views/reportes/Seleccion";
import ReportesTitulacion from "./views/reportes/Titulacion";
import ReportesEgreso from "./views/reportes/Egreso";
import ReportesNuevoIngreso from "./views/reportes/NuevoIngreso";
import RestablecerContrasena from "./views/usuario/RestablecerContrasena";
import EmailRestablecer from "./views/usuario/EmailRestablecer";

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
        path: '/cambio-contrasena',
        element: <CambioContrasena />,
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
        path: '/alumnos',
        element: <SeleccionAlumnos />,
      },
      {
        path: '/alumnos/lista',
        element: <AlumnosLista />,
      },
      {
        path: '/alumnos/historial',
        element: <AlumnosHistorial />,
      },
      {
        path: '/cedulas',
        element: <SeleccionCedulas />,
      },
      {
        path: '/cedulas/cacei',
        element: <CedulaCacei />,
      },
      {
        path: '/cedulas/caceca',
        element: <CedulaCaceca />,
      },
      {
        path: '/reportes',
        element: <SeleccionReportes />,
      },
      {
        path: '/reportes/titulacion',
        element: <ReportesTitulacion />,
      },
      {
        path: '/reportes/egreso',
        element: <ReportesEgreso />,
      },
      {
        path: '/reportes/nuevo-ingreso',
        element: <ReportesNuevoIngreso />,
      },
      {
        path: '/usuarios/lista',
        element: <UsuariosLista />,
      },
      {
        path: '/500',
        element: <Error500 />,
      },
      {
        path: '*',
        element: <Error404 />,
      }
    ]
  },
  {
    path: '/iniciar-sesion',
    element: <Login />,
  },
  {
    path: '/restablecer-contrasena/:t',
    element: <RestablecerContrasena />,
  },
  {
    path: '/restablecer-contrasena/email',
    element: <EmailRestablecer />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Notifications />
      <MantineProvider theme={indicesTheme} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);
