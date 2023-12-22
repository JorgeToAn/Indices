import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dataService from '../../mockup/dataService';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";

const ReportesEgreso = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    // const [heading, setHeading] = useState([]);
    const heading = [
        ['Carrera', 'Nuevo Ingreso', 'Año de egreso', '', '', '', '', 'Eficiencia de egreso', 'Año de egreso', '', '', 'Eficiencia de egreso'],
        ['', '','2019-1','2019-2','2020-1', '2020-2', 'Total', '', '2021-1', '2021-2', 'Total', ''],
        ['', '', '9', '10', '11', '12', '', '', '13', '14', '', '']
    ];
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);

    const handleTable = () => {
        const tabla = [];
        const headers = [];
        let tablaCompleta = [];

        tablaCompleta = dataService.datosIndicesPermanencia(cohorte, numSemestres, carrera);
        headers.push(tablaCompleta[0]);
        headers.push(tablaCompleta[1]);
        for (let fila = 2; fila < tablaCompleta.length; fila++) {
            tabla.push(tablaCompleta[fila]);
        }
        // setHeading(headers);
        setData(tabla);
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Reportes" title="Egreso" route="/reportes" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera} data={dropDownData.carreras} />
                        <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FF785A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FF785A" data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button onClick={handleTable} disabled={!cohorte || !carrera || !numSemestres} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" tripleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default ReportesEgreso;