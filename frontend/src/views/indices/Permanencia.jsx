import { Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';

const IndicePermanencia = () => {
    // Informacion de prueba, no representa el comportamiento real
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
            <Header color="toronja" section="Indices" title="Permanencia por cohorte generacional" route="/" />
            <Flex direction="column">
                <Group mt={0} mb={16}>
                    <Dropdown  label="Programa educativo" color="#FF785A" data={[
                        ['ISIC','Sistemas computacionales'],
                        ['QUI','Quimica'],
                        ['IND','Industrial'],
                    ]} />
                    <Dropdown  label="Cohorte generacional" color="#FF785A" data={[
                        ['2015-1','2015-2'],
                        ['2016-1','2016-1'],
                        ['2016-2','2016-2'],
                        ['2017-1','2017-1'],
                    ]} />
                    <Dropdown  label="Cálculo de semestres" color="#FF785A" data={[
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
                <Tabla doubleHeader colors="tabla-toronja"  headers={headers} content={tabla} />
            </Flex>
        </div>
    );
};

export default IndicePermanencia;