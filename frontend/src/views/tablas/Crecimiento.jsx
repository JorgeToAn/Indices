import { Button, Checkbox, Flex, Group, Loader } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";
import dropDownData from "../../mockup/dropDownData";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import { getCrecimientoHeaders } from "../../utils/helpers/headerHelpers";
import { Download, Printer, X } from "tabler-icons-react";
import { generatePDF } from "../../utils/helpers/export/pdfHelpers";
import { generateExcel } from "../../utils/helpers/export/excelHelpers";
import { getTablasCrecimiento } from "../../routes/api/controllers/tablasController";
import { buildTablaCrecimiento } from "../../utils/helpers/tablasHelpers";
import { notifications } from "@mantine/notifications";


const TablaCrecimiento = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);

    const handleTable = async() => {
        setIsLoading(true);
        const header = getCrecimientoHeaders(cohorte, numSemestres);
        const table = await getTablasCrecimiento(examenYConv, trasladoYEquiv, cohorte, numSemestres, carrera);
        if (table.status === 200) {
            const tab = buildTablaCrecimiento(table.data);
            setData(tab);
            setHeading(header);
        } else {
            setHeading([]);
            setData([]);
            notifications.show({
                message: 'Lo sentimos, hubo un problema al obtener los datos',
                color: 'red',
                icon: <X />,
              });
        }
        setIsLoading(false);

    };
    const handlePrint = async() => {
        const tipoAlumno = (examenYConv && trasladoYEquiv) ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Poblacion', cohorte, numSemestres, heading, data, false, examenYConv, trasladoYEquiv, carrera !== 'TODAS' ? carrera : 'Población general');
        } else if (exportar === 'Excel') {
             await generateExcel(heading, data, 'Crecimiento', cohorte, numSemestres, tipoAlumno);
        }
        notifications.show({
            message: 'La descarga de tu documento ha comenzado.',
            color: 'teal',
            icon: <Download size={20} />,
          });
    };
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [numSemestres, setNumSemestre] = useInputState(0);
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Tablas" title="Crecimiento" route="/tablas" />
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
                        <Checkbox labelPosition='left' checked={examenYConv} color="naranja" onChange={(event) => setExamenYConv(event.currentTarget.checked)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' checked={trasladoYEquiv} color="naranja" onChange={(event) => setTrasladoYEquiv(event.currentTarget.checked)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv) || data.length === 0} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button  disabled={(!cohorte || !numSemestres || !(examenYConv || trasladoYEquiv)) && !isLoading} onClick={handleTable} color='negro'>{isLoading ? <Loader size='sm' color='#FFFFFF'/>  : "Filtrar"}</Button>
                    </Group>
                </fieldset>
                <Tabla headers={heading} content={data} colors="tabla-naranja" />
            </Flex>
        </div>
    );
};

export default TablaCrecimiento;