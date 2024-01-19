import { Button, Checkbox, Flex, Group } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";
import dropDownData from "../../mockup/dropDownData";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import { getTablasHeaders } from "../../utils/helpers/headerHelpers";
import { Printer } from "tabler-icons-react";
import { generatePDF } from "../../utils/helpers/pdfHelpers";
import { generateExcel } from "../../utils/helpers/excelHelpers";

const TablaCrecimiento = () => {
    const [heading, setHeading] = useState([]);
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

    const handleTable = () => {
        const header = getTablasHeaders(cohorte, numSemestres);
        setHeading(header);
    };
    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Poblacion', cohorte, numSemestres);
        } else if (exportar === 'Excel') {
             await generateExcel(heading, tabla, 'Crecimiento', cohorte, numSemestres, tipoAlumno);
        }
    };
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');
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
                        {/* <Dropdown  label="Programa educativo" color="#FFAA5A" handleChangeFn={setCarrera} data={dropDownData.carreras} /> */}
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" handleChangeFn={setCohorte} data={dropDownData.cohortes} />
                        <Dropdown  label="Cálculo de semestres" color="#FFAA5A" handleChangeFn={setNumSemestre} data={dropDownData.numSemestres} />
                        <Dropdown  label="Exportar" color="#FFAA5A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' checked={examenYConv} color="naranja" onChange={(event) => setExamenYConv(event.currentTarget.examenYConv)} label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' checked={trasladoYEquiv} color="naranja" onChange={(event) => setTrasladoYEquiv(event.currentTarget.trasladoYEquiv)} label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !numSemestres || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button  disabled={!cohorte || !numSemestres} onClick={handleTable} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla headers={heading} content={tabla} colors="tabla-naranja" />
            </Flex>
        </div>
    );
};

export default TablaCrecimiento;