import "./Login.css";
import {
  Box,
  Title,
  Button,
  TextInput,
  PasswordInput,
  LoadingOverlay,
  MantineProvider,
  Center,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MdError } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { login } from '../utils/auth';

const Login = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async (values) => {
    setLoading(true);
    const { error } = await login(values.username, values.password);
    if (error) {
      notifications.show({
        title: 'Error',
        message: error,
        color: 'red',
        icon: <MdError />,
      });
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return  (
    <MantineProvider  theme={{
      fontFamily: "Inter, sans-serif",
      colorScheme: 'light',
      colors: {
        'toronja': ["#FF785A", "#F3DDD9","#EEBEB3","#F29D8A", "#FEFCFC","#EB684B","#D65D42","#BE553D","#A05443","#875144","#744C44"],
      },
      defaultRadius: 10,
      primaryShade: 5,
      primaryColor: 'toronja',
    }}
    withGlobalStyles
    withNormalizeCSS >
      <div className='login'>
        <img src="/img/patternpad.svg" alt="Patron de figuras" />
        <div>
          <img src="/img/logo/itmlogo.png" alt="Logo del ITM" className="logo"/>
          <Title order={1} ta={ "center" }>Iniciar sesión</Title>
          <Box>
            <LoadingOverlay visible={loading} />
              <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput
                  label="Nombre de Usuario"
                  w={300}
                  required
                  {...form.getInputProps('username')}
                />
                <PasswordInput
                  label="Contraseña"
                  required
                  {...form.getInputProps('password')}
                />
                <Center mx={ "auto" } >
                  <Button type="submit" radius="lg" w={300} mt={ 16 } >Iniciar sesión</Button>
                </Center>
              </form>
          </Box>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Login;
