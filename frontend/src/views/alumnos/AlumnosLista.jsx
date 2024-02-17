import "../indices/Indices.css";
import { Button, Flex, Group, Pagination } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";
import dropDownData from '../../mockup/dropDownData';
import { useInputState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { getListaAlumnosHeaders } from "../../utils/helpers/headerHelpers";

import { Printer } from "tabler-icons-react";
import { getAllAlumnosHistorial } from "../../routes/api/controllers/alumnoController";
import { generatePDF } from "../../utils/helpers/export/pdfHelpers";
import { generateExcel } from "../../utils/helpers/export/excelHelpers";


const AlumnosLista = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([[], []]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [fullTable, setFullTable] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');

    const handleTable = async() => {
        const tabla = await getAllAlumnosHistorial(numSemestres, cohorte);
        console.log(tabla);
        const headers = getListaAlumnosHeaders(cohorte, numSemestres);
        setHeading(headers);
        setFullTable(tabla);
        setData(tabla[page-1]);
    };
    const reorderHeading = () => {
        const header = [...heading];
        const firstRow = ['', ...header[0]];
        header[0] = firstRow;
        return header;
    };

    useEffect(() => {
        let items = [];
        if (fullTable.length !== 0){
            items = fullTable[page-1];
        }
        setData(items);
    }, [page]);

    const handlePrint = async() => {
        if (exportar === 'PDF') {
            generatePDF('Lista de Alumnos', cohorte, numSemestres, carrera);
        } else if (exportar === 'Excel') {
            await generateExcel(reorderHeading(), data, 'Lista de Alumnos', cohorte, numSemestres, 0, carrera);
        }
    };
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Alumnos" title="Lista" route="/alumnos" />
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
                    <Group style={{ justifyContent: "flex-end"}} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button onClick={handleTable} disabled={!cohorte || !carrera || !numSemestres} color="negro">Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-naranja" doubleHeader headers={heading} content={data} />
                <Pagination color="naranja" mt={20} value={page} onChange={setPage} total={fullTable.length}/>
            </Flex>
        </div>
    );

};
export default AlumnosLista;