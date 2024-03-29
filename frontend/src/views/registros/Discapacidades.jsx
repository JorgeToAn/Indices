import { Button, Center, Flex, Group, TextInput, Textarea } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { useEffect, useState } from "react";
import { getDiscapacidades } from "../../routes/api/controllers/discapacidadController";


const RegistroDiscapacidades = () => {
    const headers = [
        'NOMBRE', 'DESCRIPCION'
    ];

    const [discapacidades, setDiscapacidades] = useState([]);
    const obtenerDiscapacidades = async() => {
        const listaDisc = await getDiscapacidades();
        let listaD = Object.entries(listaDisc);
        listaD = listaD.map((disc) => Object.entries(disc[1]));
        listaD = listaD.map((disc) => disc.filter((dato, index)=> index > 0));
        listaD = listaD.map((disc) => disc.map((c) => c.filter((dato, index) => index > 0)));
        setDiscapacidades(listaD);
    };

    useEffect(() => {
        obtenerDiscapacidades();
    }, []);
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Registro" title="Discapacidades" route="/"/>
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column" className="col-input">
                    <form>
                        <TextInput label="Nombre" withAsterisk/>
                        <Textarea withAsterisk label="Descripción" autosize/>
                        <Center>
                            <Button type="button" mt={16} leftIcon={<CirclePlus />} onClick={obtenerDiscapacidades}>Agregar Discapacidad</Button>
                        </Center>
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" w="50%" maw='40vw' >
                    <Tabla headers={headers} content={discapacidades} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroDiscapacidades;