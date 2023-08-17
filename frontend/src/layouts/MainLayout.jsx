import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { setUser } from '../utils/auth';
import { Navigate, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = async () => {
      setLoading(true);
      await setUser();
      setLoading(false);
    };
    handler();
  }, []);

  if (!isLoggedIn()) {
    return <Navigate replace to="/iniciar-sesion" />
  }

  return (
    <MantineProvider  theme={{
      fontFamily: "Inter, sans-serif",
      colorScheme: 'light',
      colors: {
        'toronja': ["#FEFCFC","#F3DDD9","#EEBEB3","#F29D8A","#FF785A","#EB684B","#D65D42","#BE553D","#A05443","#875144","#744C44"],
      },
      primaryColor: 'toronja',
    }}
    withGlobalStyles
    withNormalizeCSS >
      <LoadingOverlay visible={loading} />
      <Outlet />
    </MantineProvider>
  );
};

export default MainLayout;
