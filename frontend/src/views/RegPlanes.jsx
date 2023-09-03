import { Button, Center, Flex, Group, TextInput } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import Header from '../components/header';
import Tabla from "../components/Tabla";
import { DateInput } from "@mantine/dates";
import './Registro.css';


const RegistroPlanes = () => {
    const tabla = [
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2010'],
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2011'],
        ['QUI', 'Quimica', 'QUI-2008']
    ];

    const headers = [
        'CLAVE', 'NOMBRE', 'PLAN DE ESTUDIO'
    ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Registro" title="Planes de Estudio" route="/"/>
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column" className="col-input">
                    <form>
                        <TextInput label="Nombre" withAsterisk/>
                        <Group className="input-group">
                            <DateInput label="Fecha de inicio" width="45%" withAsterisk/>
                            <DateInput label="Fecha de terminación" width="45%" />
                        </Group>
                        <Center>
                            <Button type="submit" mt={16} leftIcon={<CirclePlus />} color="naranja">Crear Plan</Button>
                        </Center>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={tabla} colors="tabla-naranja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroPlanes;