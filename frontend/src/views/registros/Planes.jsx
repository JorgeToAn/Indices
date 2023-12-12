import { Button, Center, Flex, Group, TextInput } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import { DateInput } from "@mantine/dates";
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { getPlanes } from "../../utils/helpers/planesHelper";
import { useEffect, useState } from "react";

const RegistroPlanes = () => {

    const headers = [
        'CLAVE', 'FECHA DE INICIO', 'FECHA DE TERMINACION'
    ];

    const [planes, setPlanes] = useState([]);

    const obtenerPlanes = async() => {
        const listaPlanes = await getPlanes();
        let listaP = Object.entries(listaPlanes);
        listaP = listaP.map((plan) => Object.entries(plan[1]));
        setPlanes(listaP.map((plan) => plan.filter((dato, index)=> index > 0 && index < 4)));
        console.log(planes);

    };

    useEffect(() => {
        obtenerPlanes();
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
                        <Center>
                            <Button type="button" mt={16} leftIcon={<CirclePlus />} onClick={obtenerPlanes} color="naranja">Crear Plan</Button>
                        </Center>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" w="50%" maw='40vw' >
                    <Tabla headers={headers} content={planes} colors="tabla-naranja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroPlanes;