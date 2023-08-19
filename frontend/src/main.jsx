import { MantineProvider } from "@mantine/core";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import CustomProvider from "./CustomProvider";
import indicesTheme from "./CustomProvider";
import Principal from "./views/Principal";
import SubirArchivos from "./views/SubirArchivos";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/principal',
        element: <Principal />,
      },
      {
        path: '/subir-archivos',
        element: <SubirArchivos />,
      },
    ]
  },
  {
    path: '/iniciar-sesion',
    element: <Login />,
  },
]);


const theme = {
    fontFamily: "Inter, sans-serif",
      colorScheme: 'light',
      colors: {
        'toronja': ["#FF785A", "#F3DDD9","#EEBEB3","#F29D8A", "#FEFCFC","#EB684B","#D65D42","#BE553D","#A05443","#875144","#744C44"],
      },
      defaultRadius: 10,
      primaryShade: 5,
      primaryColor: 'toronja',
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Notifications />
      <MantineProvider theme={indicesTheme} withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>
);
