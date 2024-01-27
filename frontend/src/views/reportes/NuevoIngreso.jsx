import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { getNuevoIngresoHeaders } from '../../utils/helpers/headerHelpers';
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { Printer } from 'tabler-icons-react';
import { generateExcel } from '../../utils/helpers/excelHelpers';
// import { getReportesHeaders } from '../../utils/helpers/headerHelpers';

const ReportesNuevoIngreso = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState([[], [], []]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    const handleTable = () => {
        const tabla = [];
        const header = getNuevoIngresoHeaders(cohorte, numSemestres);
        setHeading(header);
        // const headers = getReportesHeaders(2, cohorte, numSemestres);
        // setHeading(headers);
        setData(tabla);
    };

    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Nuevo Ingreso', cohorte, numSemestres);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Nuevo Ingreso', cohorte, numSemestres, tipoAlumno);
        }
    };
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Reportes" title="Nuevo Ingreso" route="/reportes" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FFAA5A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FFAA5A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox color='naranja' labelPosition='left' checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox color='naranja'  labelPosition='left' checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv)} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button onClick={handleTable} disabled={!cohorte || !numSemestres || !(examenYConv || trasladoYEquiv)} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-naranja" doubleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default ReportesNuevoIngreso;