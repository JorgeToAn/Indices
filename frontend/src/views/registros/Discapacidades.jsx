import { Button, Center, Flex, Group, TextInput, Textarea } from "@mantine/core";
import { CirclePlus } from 'tabler-icons-react';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { getDiscapacidades } from "../../utils/helpers/discapacidadHelpers";
import { useEffect, useState } from "react";


const RegistroDiscapacidades = () => {
    // const tabla = [
    //     ['Discapacidad física', 'Es la secuela de una afección en cualquier órgano o sistema corporal.'],
    //     ['Discapacidad intelectual', 'Se caracteriza por limitaciones significativas tanto en funcionamiento intelectual como en conducta adaptativa.'],
    //     ['Discapacidad psicosocial', 'Restricción causada por el entorno social y centrada en una deficiencia temporal o permanente de la psique']
    // ];

    const headers = [
        'NOMBRE', 'DESCRIPCION'
    ];

    const [discapacidades, setDiscapacidades] = useState([]);
    const obtenerDiscapacidades = async() => {
        const listaPlanes = await getDiscapacidades();
        let listaP = Object.entries(listaPlanes);
        listaP = listaP.map((discapacidad) => Object.entries(discapacidad[1]));
        setDiscapacidades(listaP.map((discapacidad) => discapacidad.filter((dato, index)=> index > 0)));
        console.log(discapacidades);

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
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={discapacidades} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroDiscapacidades;