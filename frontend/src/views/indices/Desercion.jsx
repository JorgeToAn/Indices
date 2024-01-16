import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import { getIndicesHeaders } from '../../utils/helpers/headerHelpers';
import { Printer } from 'tabler-icons-react';
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { generateExcel } from '../../utils/helpers/excelHelpers';

const IndiceDesercion = () => {
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
        const headers = getIndicesHeaders(2, cohorte, carrera);
        setHeading(headers);
        setData(tabla);
    };

    const handlePrint = async() => {
        if (exportar === 'PDF') {
            generatePDF('Deserción', cohorte, numSemestres);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, `Desercion ${carrera} - ${cohorte}`);
        }
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Indices" title="Deserción por cohorte generacional" route="/indices" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FFAA5A" handleChangeFn={setCarrera} data={dropDownData.carreras} />
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FFAA5A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
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

export default IndiceDesercion;