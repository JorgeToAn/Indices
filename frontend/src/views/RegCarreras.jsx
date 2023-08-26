import { Button, Flex, Group, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { CirclePlus } from 'tabler-icons-react';
import Header from '../components/header';
import Tabla from "../components/Tabla";

const RegistroCarreras = () => {
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
                        <TextInput label="Nombre"/>
                        <Group>
                            <TextInput label="Clave" />
                            <Select
                                label="Plan de estudios"
                                placeholder="Seleccione un plan de estudios"
                                data={[
                                    {value: 'ISIC-2010', label: 'ISIC-2010'},
                                    {value: 'ISIC-2011', label: 'ISic-2011'}
                                ]}
                            />
                        </Group>
                        <Button type="submit" leftIcon={<CirclePlus />}>Crear Carrera</Button>
                    </form>
                    <Flex direction="column" justify="center" align="center" mt={16} p={10} style={{backgroundColor: '#EBEBEB', borderRadius: '20px'}}>
                        <img style={{width: '5vw'}} src="/img/icons/question-circle-black.svg" alt="Signo de interrogacion" />
                        ¿Necesitas crear un nuevo plan de estudios?
                        <Link to="#">Da clic aquí</Link>
                    </Flex>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={tabla} />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroCarreras;