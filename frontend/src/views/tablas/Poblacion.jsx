import { Button, Checkbox, Flex, Group } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";
import { useInputState } from "@mantine/hooks";
import dropDownData from "../../mockup/dropDownData";
import { getTablasHeaders } from "../../utils/helpers/headerHelpers";
import { useState } from "react";
import { Printer } from "tabler-icons-react";
import { buildTable } from "../../utils/helpers/tablasHelpers";
import { generatePDF } from "../../utils/helpers/export/pdfHelpers";
import { generateExcel } from "../../utils/helpers/export/excelHelpers";
import { getTablasPoblacion } from "../../routes/api/controllers/tablasController";

const TablaPoblacion = () => {
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    const tabla = [
        ['Contador Público', 'CP', '14','16','25','30','27'],
        ['Ingeniería Electrica', 'ELE', '14','16','25','30','27'],
        ['Ingeniería Electronica', 'ELN', '14','16','25','30','27'],
        ['Ingeniería Mecatronica', 'MKT', '14','16','25','30','27'],
        ['Ingeniería Industrial', 'IND', '14','16','25','30','27'],
        ['Ingeniería Mecanica', 'MEC', '14','16','25','30','27'],
        ['Ingeniería en Energias Renovables','ENR', '14','16','25','30','27'],
        ['Ingeniería en Gestion Empresarial','GEM', '14','16','25','30','27'],
        ['Ingeniería en Sistemas Computacionales','SYC', '14','16','25','30','27'],
        ['Ingeniería Quimica','QUI','14','16','25','30','27'],
        ['Ingeniería en Logistica','LOG', '14','16','25','30','27']
    ];
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    const handleTable = async() => {
        const tabla =  await getTable();
        const header = getTablasHeaders(cohorte, numSemestres);
        setHeading(header);
        setData(tabla);
    };

    const getTable = async() => {
        const tabla = await getTablasPoblacion(examenYConv, trasladoYEquiv, cohorte, numSemestres);
        const table = await buildTable(tabla);
        return table;
    };

    const handlePrint = async() => {
        const tipoAlumno = (examenYConv && trasladoYEquiv) ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Poblacion', cohorte, numSemestres, heading, data, false, examenYConv, trasladoYEquiv);
        } else if (exportar === 'Excel') {
             await generateExcel(heading, tabla, 'Poblacion', cohorte, numSemestres, tipoAlumno);
        }
    };
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Tablas" title="Población" route="/tablas" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        {/* <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera} data={dropDownData.carreras} /> */}
                        <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FF785A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FF785A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv)} onClick={handlePrint} leftIcon={<Printer />} color='naranja'>Imprimir</Button>
                        <Button  disabled={!cohorte || !numSemestres || !(examenYConv || trasladoYEquiv)} onClick={handleTable} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla headers={heading} content={data} colors="tabla-toronja" />
            </Flex>
        </div>
    );
    };


export default TablaPoblacion;