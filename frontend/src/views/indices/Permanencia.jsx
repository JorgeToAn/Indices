import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import datosIndicesPermanencia from '../../mockup/dataService';
import { useEffect, useState } from 'react';
import { useInputState } from '@mantine/hooks';
import { ZoomCheck } from 'tabler-icons-react';

const IndicePermanencia = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);

    const handleTable = () => {
        const tabla = [];
        const headers = [];
        let tablaCompleta = [];

        tablaCompleta = datosIndicesPermanencia(cohorte, numSemestres, carrera);
        headers.push(tablaCompleta[0]);
        headers.push(tablaCompleta[1]);
        for (let fila = 2; fila < tablaCompleta.length; fila++) {
            tabla.push(tablaCompleta[fila]);
        }
        setHeading(headers);
        setData(tabla);
    };

    useEffect(() => {
        handleTable();
    });


    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Indices" title="Permanencia por cohorte generacional" route="/" />
            <Flex direction="column">
                <Group mt={0} mb={16}>
                    <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera} data={[
                        ['Ingenieria en Sistemas computacionales','Sistemas computacionales'],
                        ['Ingenieria Quimica','Quimica'],
                        ['Ingenieria Industrial','Industrial'],
                    ]} />
                    <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} data={[
                        ['2015-2','2015-2'],
                        ['2016-1','2016-1'],
                        ['2016-2','2016-2'],
                        ['2017-1','2017-1'],
                    ]} />
                    <Dropdown  label="Cálculo de semestres" color="#FF785A" handleChangeFn={setNumSemestre} data={[
                        ['9','9 semestres'],
                        ['10','10 semestres'],
                        ['11','11 semestres'],
                        ['12','12 semestres'],
                        ['13','13 semestres'],
                        ['14','14 semestres'],
                        ['15','15 semestres'],
                    ]} />
                    <Dropdown  label="Exportar" color="#FF785A" data={[
                        ['Excel','Excel'],
                        ['PDF','PDF'],
                    ]} />
                </Group>
                <Button onClick={handleTable} color='gris' w={150} leftIcon={<ZoomCheck />}>Activar</Button>
                <Group mt={0} mb={16} >
                    <Checkbox labelPosition='left' label='Examen y Convalidación' radius='sm' />
                    <Checkbox labelPosition='left' label='Traslado y Equivalencia' radius='sm' />
                </Group>
                <Tabla colors="tabla-toronja" doubleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default IndicePermanencia;