import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { getReportesHeaders } from '../../utils/helpers/headerHelpers';

const ReportesEgreso = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState([[], [], []]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);

    const handleTable = () => {
        const tabla = [];
        const headers = getReportesHeaders(2, cohorte, numSemestres);
        setHeading(headers);
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
                        <Button onClick={handleTable} disabled={!cohorte || !numSemestres} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" tripleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default ReportesEgreso;