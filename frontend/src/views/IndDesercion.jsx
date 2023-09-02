import { Flex, Group } from '@mantine/core';
import Tabla from '../components/Tabla';
import Header from '../components/header';
import Dropdown from '../components/Dropdown';

const IndiceDesercion = () => {
    // Informacion de prueba, no representa el comportamiento real
    const tabla = [
        ['Semestre 1', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 2', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 4', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 5', '2015-1', '45','-','15','30','66.75'],
        ['Semestre 6', '2015-1', '45','-','15','30','66.75'],
        ['','Acumulado', '225','','75','150']
    ];

    const headers = [
        ['Indices de rendimiento escolar cohorte generacional 2015-1 ingenieria mecanica'],
        ['Semestre', 'Periodo', 'Activos', 'Egresados','Desercion', 'Matricula final','Tasa de abandono escolar'],
     ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Indices" title="Deserción por cohorte generacional" route="/" />
            <Flex direction="column">
                <Group mt={0} mb={16}>
                    <Dropdown  label="Programa educativo" color="#FFAA5A" data={[
                        ['ISIC','Sistemas computacionales'],
                        ['QUI','Quimica'],
                        ['IND','Industrial'],
                    ]} />
                    <Dropdown  label="Cohorte generacional" color="#FFAA5A" data={[
                        ['2015-1','2015-2'],
                        ['2016-1','2016-1'],
                        ['2016-2','2016-2'],
                        ['2017-1','2017-1'],
                    ]} />
                    <Dropdown  label="Cálculo de semestres" color="#FFAA5A" data={[
                        ['9','9 semestres'],
                        ['10','10 semestres'],
                        ['11','11 semestres'],
                        ['12','12 semestres'],
                        ['13','13 semestres'],
                        ['14','14 semestres'],
                        ['15','15 semestres'],
                    ]} />
                    <Dropdown  label="Exportar" color="#FFAA5A" data={[
                        ['Excel','Excel'],
                        ['PDF','PDF'],
                    ]} />
                </Group>
                <Tabla doubleHeader colors="tabla-naranja"  headers={headers} content={tabla} />
            </Flex>
        </div>
    );
};

export default IndiceDesercion;