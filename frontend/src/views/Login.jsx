
import {
  Box,
  Title,
  Button,
  TextInput,
  PasswordInput,
  LoadingOverlay,
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
    <>
      <Title order={1}>Iniciar sesión</Title>
      <Box>
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            label="Nombre de Usuario"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Contraseña"
            required
            {...form.getInputProps('password')}
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
