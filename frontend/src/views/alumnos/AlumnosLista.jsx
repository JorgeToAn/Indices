import "../indices/Indices.css";
import { Button, Checkbox, Flex, Group, Loader, Pagination } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";
import dropDownData from '../../mockup/dropDownData';
import { useInputState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { getListaAlumnosHeaders } from "../../utils/helpers/headerHelpers";

import { Printer } from "tabler-icons-react";
import { getAllAlumnosHistorial, getFullHistorial } from "../../routes/api/controllers/alumnoController";
import { generatePDF } from "../../utils/helpers/export/pdfHelpers";
import { generateExcel } from "../../utils/helpers/export/excelHelpers";
import { buildListaAlumnos } from "../../utils/helpers/alumnoHelpers";


const AlumnosLista = () => {
    const mounted = useRef(false);
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([[], []]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState('');
    const [fullTable, setFullTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tableCount, setTableCount] = useState(0);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    const handleTable = async() => {
        setIsLoading(true);
        const res = await getAllAlumnosHistorial(examenYConv, trasladoYEquiv,cohorte, numSemestres, carrera, page, nextPage !== '' ? nextPage: '/alumnos/historial');
        setNextPage(res['next']);
        const headers = getListaAlumnosHeaders(cohorte, numSemestres);
        setTableCount(res['count']);
        setHeading(headers);
        const tabla = buildListaAlumnos(res['results'],numSemestres, cohorte);
        setData(tabla);
        setIsLoading(false);
        getFullTable();
    };

    const getFullTable = async() => {
        const res = await getFullHistorial(examenYConv, trasladoYEquiv,cohorte, numSemestres, carrera);
        setFullTable(res);
    };

    useEffect(() => {
        if (mounted.current) {
            if (fullTable.length < 1){
                if (page > 1)
                    handleTable();
            } else {
                setData(fullTable[page-1]);
            }
        } else {
            mounted.current = true;
        }
    }, [page]);

    const handlePrint = async() => {
        if (exportar === 'PDF') {
            generatePDF('Lista de Alumnos', cohorte, numSemestres, heading, data, true, examenYConv, trasladoYEquiv, carrera);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Lista de Alumnos', cohorte, numSemestres, 0, carrera);
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
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' color='naranja'  checked={examenYConv} onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' color='naranja'  checked={trasladoYEquiv} onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end"}} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button onClick={handleTable} disabled={!cohorte || !carrera || !numSemestres || isLoading} color="negro">{isLoading ? <Loader size="sm" color="#FFFFFF" /> : "Filtrar"}</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-naranja" doubleHeader headers={heading} content={data} />
                <p>{tableCount > 0 ? `Mostrando ${page !== 1 ? ((page-1)*30)+1 : 1} - ${(page)*30} de ${tableCount}`: null}</p>
                <Pagination color="naranja" mt={20} value={page} onChange={setPage} total={(tableCount/30)+1}/>
            </Flex>
        </div>
    );

};
export default AlumnosLista;