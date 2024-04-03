import { Button, Center, Flex, Group, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { CirclePlus } from 'tabler-icons-react';
import Header from 'src/components/header';
import Tabla from 'src/components/Tabla';
import './Registro.css';
import { getCarreras } from "src/utils/helpers/carreraHelpers";
import { useState, useEffect } from "react";


const RegistroCarreras = () => {

    const headers = [
        'CLAVE', 'NOMBRE'
    ];
    const [carreras, setCarreras] = useState([]);

    const obtenerCarreras = async() => {
        const listaCarreras = await getCarreras();
        let listaC = Object.entries(listaCarreras);
        listaC = listaC.map((carrera) => Object.entries(carrera[1]));
        listaC = listaC.map((carrera) => carrera.filter((dato, index)=> index > 0));
        listaC = listaC.map((carrera) => carrera.map((c) => c.filter((dato, index) => index > 0)));
        setCarreras(listaC);
    };

    useEffect(() => {
        obtenerCarreras();
    }, []);
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
                        <Group className="input-group">
                            <TextInput label="Clave" withAsterisk width="45%"/>
                            <Select
                                width="45%"
                                label="Plan de estudios"
                                placeholder="Seleccione un plan de estudios"
                                data={[
                                    {value: 'ISIC-2010', label: 'ISIC-2010'},
                                    {value: 'ISIC-2011', label: 'ISic-2011'}
                                ]}
                                withAsterisk
                            />
                        </Group>
                        <Center>
                            <Button type="button" mt={16} leftIcon={<CirclePlus />} onClick={obtenerCarreras}>Crear Carrera</Button>
                        </Center>
                    </form>
                    <Flex direction="column" justify="center" align="center" mt={16} p={10} style={{backgroundColor: '#EBEBEB', borderRadius: '20px'}}>
                        <img style={{width: '5vw'}} src="/img/icons/question-circle-black.svg" alt="Signo de interrogacion" />
                        ¿Necesitas crear un nuevo plan de estudios?
                        <Link to="#"style={{color: "#FF785A"}}>Da clic aquí</Link>
                    </Flex>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={carreras} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroCarreras;