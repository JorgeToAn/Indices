import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
