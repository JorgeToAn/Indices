import "./Principal.css"
import { Button, Center, Container, Group, Title } from "@mantine/core";
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { toTitle } from '../utils/helpers';
import { Upload } from "tabler-icons-react";


const Principal = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const toSubirArchivos = () => {
        navigate('/subir-archivos');
    }
    return (
        <Container style={{
            maxWidth: '100vw'
        }}>
            <Group position="center">
                <img className="logos" src="/img/logo/Logo-TecNM.png" alt="Logo del TecNM" />
                <img  className="logos" src="/img/logo/sep_logo.png" alt="Logo de la secretaria de educacion" />
            </Group>
            <Title order={2} mb={ 16 } align="center">Bienvenido, {toTitle(user().first_name)}</Title>
            <Group position="center" align="center" style={{width: '100vw'}}>
                <div className="block">
                    <h3>Tablas</h3>
                    <img src="/img/tablas.svg" alt="Icono Tablas" />  
                </div>

                <div className="block">
                    <h3>Indices</h3>
                    <img src="/img/indices.svg" alt="Icono Indices" />  
                </div>
                
                <div className="block">
                    <h3 color="toronja">Reportes</h3>
                    <img src="/img/reportes.svg" alt="Icono Reportes" />  
                </div>

                <div className="block">
                    <h3>Cédulas</h3>
                    <img src="/img/cedulas.svg" alt="Icono Cedulas" />  
                </div>

                <div className="block">
                    <h3>Alumnos</h3>
                    <img src="/img/alumnos.svg" alt="Icono Alumnos" />  
                </div>
            </Group>
            <Center>
                <Button mt={ 32 } color="naranja" leftIcon={<Upload />} onClick={toSubirArchivos}>
                    Subir archivos
                </Button>
            </Center>
        </Container>
    )

};

export default Principal;