import { Button, Center, Flex, Group, Select, TextInput } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import { DateInput } from "@mantine/dates";
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { getPlanes } from "../../utils/helpers/planesHelper";
import { useEffect, useState } from "react";
import dropDownData from "../../mockup/dropDownData";

const RegistroPlanes = () => {
    const [carreras, setCarreras] = useState([]);
    const [planes, setPlanes] = useState([]);
    const fetchCarreras = async() => {
        const c = await dropDownData.getListaCarreras();
        setCarreras(c);
    };

    const headers = [
        'CLAVE', 'FECHA DE INICIO', 'FECHA DE TERMINACION', 'CARRERA'
    ];
    const obtenerPlanes = async() => {
        const listaPlanes = await getPlanes();
        const listaP = [];
        listaPlanes.forEach((p) => {
            listaP.push([p.clave, p['fecha_inicio'], p['fecha_final'], p['carrera']['nombre']]);
        });
        setPlanes(listaP);
    };

    useEffect(() => {
        obtenerPlanes();
        fetchCarreras();
    }, []);
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Registro" title="Planes de Estudio" route="/"/>
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column" >
                    <form>
                        <TextInput label="Nombre" withAsterisk/>
                        <Group className="input-group">
                            <DateInput label="Fecha de inicio" width="45%" withAsterisk/>
                            <DateInput label="Fecha de terminación" width="45%" />
                        </Group>
                        { carreras.length > 0 ? <Select width="100%" label="Carrera" placeholder="Seleccione una carrera" data={carreras} withAsterisk/> : null }
                        <Center>
                            <Button type="button" mt={16} leftIcon={<CirclePlus />} onClick={obtenerPlanes} color="naranja">Crear Plan</Button>
                        </Center>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" w="50%" maw='40vw' >
                    <Tabla headers={headers} smallSize content={planes} colors="tabla-naranja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroPlanes;