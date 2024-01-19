import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
// import dataService from '../../mockup/dataService';
import dropDownData from '../../mockup/dropDownData';
import "./Indices.css";
import { getIndicesHeaders } from '../../utils/helpers/headerHelpers';
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { Printer } from 'tabler-icons-react';
import { generateExcel } from '../../utils/helpers/excelHelpers';

const IndicePermanencia = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([[],[]]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    const handleTable = () => {
        const tabla = [];
        const headers = getIndicesHeaders(1, cohorte, carrera);
        setHeading(headers);
        setData(tabla);
    };

    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Permanencia', cohorte, numSemestres);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Indice Permanencia', cohorte, numSemestres, tipoAlumno);
        }
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Indices" title="Permanencia por cohorte generacional" route="/indices" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera} data={dropDownData.carreras} />
                        <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FF785A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FF785A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.examenYConv)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.trasladoYEquiv)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='naranja'>Imprimir</Button>
                        <Button onClick={handleTable} disabled={!cohorte || !carrera || !numSemestres} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" doubleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default IndicePermanencia;