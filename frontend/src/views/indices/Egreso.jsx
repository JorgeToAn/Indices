
import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from 'src/components/header';
import Tabla from 'src/components/Tabla';
import Dropdown from 'src/components/Dropdown';
import dropDownData from 'src/mockup/dropDownData';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';
import { getIndicesHeaders } from 'src/utils/helpers/headerHelpers';
import { Printer } from 'tabler-icons-react';
import { buildTablaIndices } from 'src/utils/helpers/indicesHelpers';
import { getIndicesData } from 'src/routes/api/controllers/indicesHelpers';
import { generatePDF } from 'src/utils/helpers/export/pdfHelpers';
import { generateExcel } from 'src/utils/helpers/export/excelHelpers';

const IndiceEgreso = () => {
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

    const handleTable = async() => {
        const headers = getIndicesHeaders(4, cohorte, carrera);
        setHeading(headers);
        const tabla = await getIndicesData('egreso', examenYConv, trasladoYEquiv, cohorte, carrera, numSemestres);
        const datos = buildTablaIndices('egreso', tabla, numSemestres);
        setData(datos);
    };

    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Egreso', cohorte, numSemestres, heading, data, false, examenYConv, trasladoYEquiv, carrera);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Indice Egreso', cohorte, numSemestres, tipoAlumno);
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
                        <Checkbox labelPosition='left' color='naranja'  checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' color='naranja'  checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv)} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button onClick={handleTable} color='negro' disabled={!cohorte || !carrera || !numSemestres || !(examenYConv || trasladoYEquiv)} >Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla doubleHeader colors="tabla-naranja"  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default IndiceEgreso;