import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from '../../components/header';
import Tabla from '../../components/Tabla';
import Dropdown from '../../components/Dropdown';
import {  useEffect, useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { Printer } from 'tabler-icons-react';
import { generateExcel } from '../../utils/helpers/excelHelpers';

const CedulaCaceca = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [exportar, setExportar] = useInputState('');
    const [examenYConv, setExamenYConv] = useState(true);
    const [trasladoYEquiv, setTrasladoYEquiv] = useState(false);

    useEffect(() => {
        const header = [
            'Generaciones', 'Ingreso', 'Deserción', 'Indice de deserción', 'Reprobación', 'Indice de reprobación', 'Egreso', 'Titulación', 'Indice de titulación', 'Eficiencia terminal'
        ];
        setHeading(header);
        setData([
            []
        ]);
    }, []);

    const handlePrint = async() => {
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Poblacion', cohorte, '15', carrera);
        } else if (exportar === 'Excel') {
             await generateExcel(heading, data, 'CACECA', cohorte, '15', tipoAlumno, carrera);
        }
    };
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Cédulas" title="CACECA" route="/cedulas" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FFAA5A" handleChangeFn={setCarrera}  data={dropDownData.carreras}/>
                        <Dropdown  label="Cohorte generacional" color="#FFAA5A" handleChangeFn={setCohorte} data={dropDownData.cohortes}/>
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
                        <Button  disabled={!cohorte || !carrera || !exportar || !(examenYConv || trasladoYEquiv)} onClick={handlePrint} leftIcon={<Printer />} color='toronja'>Imprimir</Button>
                        <Button disabled={!cohorte || !carrera || !(examenYConv || trasladoYEquiv)} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-naranja" headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default CedulaCaceca;