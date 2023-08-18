import "./Principal.css"
import { Container, Group, Title } from "@mantine/core";
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { toTitle } from '../utils/helpers';


const Principal = () => {
    const user = useAuthStore((state) => state.user);
    return (
        <Container>
            <Group>
                <img src="" alt="" />
                <img src="" alt="" />
            </Group>
            <Title>Bienvenido, {toTitle(user().first_name)}</Title>
            <Group>
                <div className="block">
                    <h3>Tablas</h3>
                    <img src="/img/tablas.svg" alt="" />  
                </div>
            </Group>
        </Container>
    )

};

export default Principal;