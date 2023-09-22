import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import datosIndicesPermanencia from '../../mockup/dataService';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';
import { ZoomCheck } from 'tabler-icons-react';

const IndicePermanencia = () => {
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    // const [params, setParams] = useState({});
    // Informacion de prueba, no representa el comportamiento real
    // const tabla = [
    //     ['Semestre 1', '2015-1', '41','0','10','31','75.61'],
    //     ['Semestre 2', '2015-2', '31','0','5','26','63.41'],
    //     ['Semestre 4', '2016-1', '26','0','3','23','56.10'],
    //     ['Semestre 5', '2016-2', '23','0','2','21','51.22'],
    //     ['Semestre 6', '2017-1', '21','0','0','21','51.22'],
    //     ['Semestre 7', '2017-2', '18','0','0','18','43.90'],
    //     ['Semestre 8', '2018-1', '16','0','0','16','39.02'],
    //     ['Semestre 9', '2018-2', '16','0','0','16','39.02'],
    //     ['Semestre 10', '2019-1', '16','1','2','16','39.02'],
    //     ['Semestre 11', '2019-2', '13','5','0','8','19.51'],
    //     ['Semestre 12', '2020-1', '8','2','0','6','14.63'],
    //     ['Semestre 13', '2020-2', '6','2','2','2','4.88'],
    //     ['Semestre 14', '2021-1', '2','2','0','0','4.88'],
    //     ['Semestre 15', '2021-2', '2','2','0','0','4.88'],
    // ];

    // const headers = [
    //     ['Indices de rendimiento escolar cohorte generacional 2015-1 ingenieria mecanica'],
    //     ['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion'],
    //  ];
    const tabla = [];
    const headers = [];
    let tablaCompleta = [];
    const handleTable = () => {
        // console.log(numSemestres);
        // tablaCompleta = datosIndicesPermanencia(params['Cohorte generacional'], params['Cálculo de semestres'], params['Programa educativo']);
        tablaCompleta = datosIndicesPermanencia(cohorte, numSemestres, carrera);
        headers.push(tablaCompleta[0]);
        headers.push(tablaCompleta[1]);
        for (let fila = 2; fila < tablaCompleta.length; fila++) {
            tabla.push(tablaCompleta[fila]);
        }
        setHeading(headers);
        setData(tabla);
        // console.log(tablaCompleta);
    };

    // const handleDrop = (e) => {
    //     const label = e.target.name;
    //     const data = e.target.value;
    //     const parameters = {...data};
    //     console.log(parameters);
    //     parameters[label] = data;
    //     setParams(parameters);
    //     handleTable();
    // };


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