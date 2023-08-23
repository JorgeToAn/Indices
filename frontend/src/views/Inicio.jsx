import { Badge, Button, Title } from '@mantine/core';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { toTitle } from '../utils/helpers';

const Inicio = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/iniciar-sesion');
  };

  const handlePrincipal = () => {
    navigate('/principal');
  };

  return (
    <>
      <Title oder={1}>Bienvenido {toTitle(user().first_name)}</Title>
      {user().is_superuser && <Badge>Super Usuario</Badge>}
      {user().is_staff && <Badge>Admin</Badge>}
      <Button onClick={handleLogout}>
        Cerrar sesión
      </Button>
      <Button onClick={handlePrincipal}>
        Principal
      </Button>
    </>
  );
};

export default Inicio;