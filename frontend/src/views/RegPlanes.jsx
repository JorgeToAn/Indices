import { Button, Flex, Group, TextInput } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import Header from '../components/header';
import Tabla from "../components/Tabla";
import { DateInput } from "@mantine/dates";

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
            <Header color="toronja" section="Registro" title="Carreras" route="/"/>
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column">
                    <form>
                        <TextInput label="Nombre" withAsterisk/>
                        <Group>
                            <DateInput label="Fecha de inicio" width="45%" withAsterisk/>
                            <DateInput label="Fecha de terminación" width="45%" />
                        </Group>
                        <Button type="submit" leftIcon={<CirclePlus />}>Crear Carrera</Button>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={tabla} />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroPlanes;