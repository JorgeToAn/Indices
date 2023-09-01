import { Button, Center, Flex, Group, TextInput, Textarea } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import Header from '../components/header';
import Tabla from "../components/Tabla";

const RegistroDiscapacidades = () => {
    const tabla = [
        ['Discapacidad física', 'Es la secuela de una afección en cualquier órgano o sistema corporal.'],
        ['Discapacidad intelectual', 'Se caracteriza por limitaciones significativas tanto en funcionamiento intelectual como en conducta adaptativa.'],
        ['Discapacidad psicosocial', 'Restricción causada por el entorno social y centrada en una deficiencia temporal o permanente de la psique']
    ];

    const headers = [
        'NOMBRE', 'DESCRIPCION'
    ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Registro" title="Discapacidades" route="/"/>
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column">
                    <form>
                        <TextInput label="Nombre" withAsterisk/>
                        <Textarea withAsterisk label="Descripción" autosize/>
                        <Center>
                            <Button type="submit" mt={16} leftIcon={<CirclePlus />}>Agregar Discapacidad</Button>
                        </Center>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={tabla} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroDiscapacidades;