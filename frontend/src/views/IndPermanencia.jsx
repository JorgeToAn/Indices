import { Flex, Group } from '@mantine/core';
import { Select } from '@mantine/core';
import Selector from '../components/Selector';
import Tabla from '../components/Tabla';
import Header from './../components/header';

const IndicePermanencia = () => {
    const tabla = [
        ['Semestre 1', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 2', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 4', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 5', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 6', '2015-1', '45','-','15','30','66.75'],
        ['','Acumulado', '','14','31']
    ];

    const headers = [
        ['Indices de rendimiento escolar cohorte generacional 2015-1 ingenieria mecanica'],
        ['Semestre', 'Periodo', 'Activos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion'],
     ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Indices" title="Permanencia por cohorte generacional" route="indices/permanencia" />
            <Flex direction="column">
                <Group>
                    <Selector  label="Programa educativo" color="toronja" data={[
                        ['Sistemas computacionales','Sistemas computacionales'],
                        ['Quimica','Quimica'],
                        ['Industrial','Industrial'],
                    ]} />
                    <Select label="Programa educativo" variant="filled" placeholder='' data={[
                        {value: 'Sistemas computacionales', label:"Sistemas computacionales"},
                        {value: 'Quimica', label:"Quimica"},
                        {value: 'Industrial', label:"Industrial"},
                    ]} />
                </Group>
                <Tabla doubleHeader colors="tabla-toronja"  headers={headers} content={tabla} />
            </Flex>
        </div>
    );
};

export default IndicePermanencia;