import { Button, Center, Flex, Group, Select, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { CirclePlus } from 'tabler-icons-react';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import './Registro.css';
import { getCarreras } from "../../utils/carreraHelpers";
import { useState } from "react";


const RegistroCarreras = () => {
    let tabla = [
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2010'],
        ['ISIC', 'Sistemas Computacionales', 'ISIC-2011'],
        ['QUI', 'Quimica', 'QUI-2008']
    ];
    const headers = [
        'CLAVE', 'NOMBRE', 'PLAN DE ESTUDIO'
    ];
    const [carreras, setCarreras] = useState([]);

    const obtenerCarreras = async() => {
        const listaCarreras = await getCarreras();
        setCarreras(Object.entries(listaCarreras));
        // console.log(carreras);
        // setCarreras(carreras.map((carrera) => Object.entries(carrera[1])));
        tabla =  carreras.map((carrera) => Object.entries(carrera[1]));
        console.log(tabla[0][1][1]);
        // setCarreras(carreras.map((carrera) => Object.entries(carrera[1])));
        // console.log(carreras);
    };

    // useEffect(() => {
    //     obtenerCarreras();
    // }, []);
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
                    <Tabla headers={headers} content={tabla} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default RegistroCarreras;