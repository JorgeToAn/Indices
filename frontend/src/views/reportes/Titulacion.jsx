import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { getReportesHeaders } from '../../utils/helpers/headerHelpers';

const ReportesTitulacion = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState([[], [], []]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);

    const handleTable = () => {
        const tabla = [];
        const headers = getReportesHeaders(1, cohorte, numSemestres);
        setHeading(headers);
        setData(tabla);
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Reportes" title="Titulación" route="/reportes" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        {/* <Dropdown  label="Programa educativo" color="#FFAA5A" handleChangeFn={setCarrera} data={dropDownData.carreras} /> */}
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FFAA5A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FFAA5A" data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button onClick={handleTable} disabled={!cohorte || !numSemestres} color='negro' >Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-naranja" tripleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default ReportesTitulacion;