import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import {  useEffect, useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import "../indices/Indices.css";
import { generatePDF } from '../../utils/helpers/pdfHelpers';
import { Printer } from 'tabler-icons-react';

const CedulaCacei = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    const [cohorte, setCohorte] = useInputState('');
    const [carrera, setCarrera] = useInputState('');
    const [exportar, setExportar] = useInputState('');

    useEffect(() => {
        const header = [
            'Cohortes equivalentes a 5 años', 'Periodo de cohorte', 'Número de estudiantes en el cohorte', 'Número de estudiantes que pertenecen al PE', 'Porcentaje de estudiantes que pertenecen al PE', 'Número de egresados del cohorte', 'Eficiencia terminal', 'Porcentaje de titulacion'
        ];
        setHeading(header);
        setData([
            []
        ]);
    }, []);

    const handlePrint = () => {
        if (exportar === 'PDF') {
            generatePDF('Cédula CACEI', cohorte, '15', carrera);
        }
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Cédulas" title="CACEI" route="/cedulas" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera}  data={dropDownData.carreras}/>
                        <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} data={dropDownData.cohortes}/>
                        <Dropdown  label="Exportar" color="#FF785A" handleChangeFn={setExportar} data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  disabled={!cohorte || !carrera || !exportar} onClick={handlePrint} leftIcon={<Printer />} color='naranja'>Imprimir</Button>
                        <Button disabled={!cohorte || !carrera} color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default CedulaCacei;