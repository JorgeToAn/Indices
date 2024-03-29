import { Button, Checkbox, Flex, Group, Loader } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { getReportesHeaders } from '../../utils/helpers/headerHelpers';
import { generatePDF } from '../../utils/helpers/export/pdfHelpers';
import { Printer } from 'tabler-icons-react';
import { generateExcel } from '../../utils/helpers/export/excelHelpers';
import { getReportesEgresoTitulacion } from '../../routes/api/controllers/reportesController';

const ReportesEgreso = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState([[], [], []]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [exportar, setExportar] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTable = async() => {
        setIsLoading(true);
        const tabla = await getReportesEgresoTitulacion('egreso', examenYConv, trasladoYEquiv, cohorte, numSemestres);
        console.log(tabla);
        const headers = getReportesHeaders(2, cohorte, numSemestres);
        console.log(headers);
        setHeading(headers);
        setData(tabla);
        setIsLoading(false);
    };

    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Egreso', cohorte, numSemestres, heading, data, false, examenYConv, trasladoYEquiv);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Egreso', cohorte, numSemestres, tipoAlumno);
        }
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
                        <Dropdown  label="Exportar" color="#FF785A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' color='toronja' checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' color='toronja' checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv)} onClick={handlePrint} leftIcon={<Printer />} color='naranja'>Imprimir</Button>
                        <Button onClick={handleTable} disabled={!cohorte || !numSemestres || !(examenYConv || trasladoYEquiv) && !isLoading} color='negro'>{isLoading ? <Loader size='sm'  color='#FFFFFF' /> : 'Filtrar'}</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" tripleHeader  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default ReportesEgreso;