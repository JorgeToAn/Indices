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
        'CLAVE', 'FECHA DE INICIO', 'FECHA DE TERMINACION', 'CARRERA'
    ];
    // const prueba = [{"id":1,"clave":"SYC-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":1,"clave":"SYC","nombre":"INGENIERIA EN SISTEMAS COMPUTACIONALES"}},{"id":2,"clave":"QUI-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":2,"clave":"QUI","nombre":"INGENIERIA QUIMICA"}},{"id":3,"clave":"MKT-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":3,"clave":"MKT","nombre":"INGENIERIA MECATRONICA"}},{"id":4,"clave":"MEC-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":4,"clave":"MEC","nombre":"INGENIERIA MECANICA"}},{"id":5,"clave":"MAT-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":5,"clave":"MAT","nombre":"INGENIERIA EN MATERIALES"}},{"id":6,"clave":"LOG-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":6,"clave":"LOG","nombre":"INGENIERIA EN LOGISTICA"}},{"id":7,"clave":"IND-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":7,"clave":"IND","nombre":"INGENIERIA INDUSTRIAL"}},{"id":8,"clave":"GEM-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":8,"clave":"GEM","nombre":"INGENIERIA EN GESTION EMPRESARIAL"}},{"id":9,"clave":"ENR-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":9,"clave":"ENR","nombre":"INGENIERIA EN ENERGIAS RENOVABLES"}},{"id":10,"clave":"ELN-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":10,"clave":"ELN","nombre":"INGENIERIA ELECTRONICA"}},{"id":11,"clave":"ELE-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":11,"clave":"ELE","nombre":"INGENIERIA ELECTRICA"}},{"id":12,"clave":"CP-2014","fecha_inicio":"2014-01-01","fecha_final":null,"carrera":{"id":12,"clave":"CP","nombre":"CONTADOR PUBLICO"}}];
    const [planes, setPlanes] = useState([]);

    const obtenerPlanes = async() => {
        const listaPlanes = await getPlanes();
        let listaP = Object.entries(listaPlanes);
        listaP = listaP.map((plan) => Object.entries(plan[1]));
        listaP = listaP.map((plan) => plan.filter((dato, index)=> index > 0 ));
        listaP = listaP.map((plan) => plan.map((p, index) => index > 2 ? Object.entries(p[1]): p));
        listaP = listaP.map((plan) => plan.map((c) => c.filter((dato, index) => index > 0)));
        listaP = listaP.map((plan) => plan.map((c, index) => index > 2 ? c.map((p) => p.filter((dato, i) => i > 0)) : c));
        listaP = listaP.map((plan) => plan.map((c, index) => index > 2 ? c.filter((p, i) => i > 0) : c));
        setPlanes(listaP);
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