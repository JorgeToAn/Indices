import { Button, Center, Flex, Group, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { CirclePlus } from 'tabler-icons-react';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { getCarreras } from "../../utils/helpers/carreraHelpers";
import { useState, useEffect } from "react";
import dropDownData from "../../mockup/dropDownData";


const RegistroCarreras = () => {
    const [carreras, setCarreras] = useState([]);
    const [planes, setPlanes] = useState([]);
    const fetchPlanes = async() => {
        const c = await dropDownData.getListaPlanes();
        setPlanes(c);
    };

    const headers = [
        'CLAVE', 'NOMBRE'
    ];

    const obtenerCarreras = async() => {
        const listaCarreras = await getCarreras();
        const listaC = [];
        console.log(listaCarreras);
        listaCarreras.forEach((c) => {
            listaC.push([c['clave'], c['nombre']]);
        });
        setCarreras(listaC);
    };

    useEffect(() => {
        obtenerCarreras();
        fetchPlanes();
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
                            { planes.length > 0 ? <Select width="45%" label="Plan de estudios" placeholder="Seleccione un plan de estudios" data={planes} withAsterisk/> : null }
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
                    <Tabla headers={headers} content={carreras} smallSize colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroCarreras;