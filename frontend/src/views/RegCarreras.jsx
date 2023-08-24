import { ActionIcon, Button, Flex, Group, Select, Table, TextInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { ArrowLeft, CirclePlus } from 'tabler-icons-react';


const RegistroCarreras = () => {
    const tabla = [
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2010'],
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2011'],
        ['QUI', 'Quimica', 'QUI-2008']
    ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Flex direction="column">
                <ActionIcon color='naranja' variant='filled' radius='lg' mt={16} mb={16}>
                    <ArrowLeft />
                </ActionIcon>
                <Title>Registro Carreras</Title>
            </Flex>
            <Group>
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
                <Table>
                    <thead>
                        <tr>
                            <th>CLAVE</th>
                            <th>NOMBRE</th>
                            <th>PLAN DE ESTUDIOS</th>
                        </tr>
                    </thead>
                    { tabla.map( (fila, index) => <tr key={index}>
                        <td>{fila[0]}</td>
                        <td>{fila[1]}</td>
                        <td>{fila[2]}</td>
                    </tr>)}
                </Table>
            </Group>
        </div>
    );
};

export default RegistroCarreras;