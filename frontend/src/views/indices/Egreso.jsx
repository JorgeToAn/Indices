
import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import dropDownData from '../../mockup/dropDownData';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';
import { getIndicesHeaders } from '../../utils/helpers/headerHelpers';
import { Printer } from 'tabler-icons-react';
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { generateExcel } from '../../utils/helpers/excelHelpers';

const IndiceEgreso = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([[],[]]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');

    const handleTable = () => {
        const tabla = [];
        const headers = getIndicesHeaders(4, cohorte, carrera);
        setHeading(headers);
        setData(tabla);
    };

    const handlePrint = async() => {
        if (exportar === 'PDF') {
            generatePDF('Egreso', cohorte, numSemestres, carrera);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, `Egreso ${carrera} - ${cohorte}`);
        }
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Indices" title="Egreso por cohorte generacional" route="/indices" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FFAA5A" data={dropDownData.carreras} handleChangeFn={setCarrera} />
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" data={dropDownData.cohortes} handleChangeFn={setCohorte} />
                        <Dropdown  label="Cálculo de semestres" color="#FFAA5A" data={dropDownData.numSemestres} handleChangeFn={setNumSemestre} />
                        <Dropdown  label="Exportar" color="#FFAA5A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' color='naranja' label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' color='naranja' label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button onClick={handleTable} color='negro' disabled={!cohorte || !carrera || !numSemestres} >Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla doubleHeader colors="tabla-naranja"  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default IndiceEgreso;