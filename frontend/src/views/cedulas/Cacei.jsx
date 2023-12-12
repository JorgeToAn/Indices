import { Button, Checkbox, Flex, Group } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import {  useEffect, useState } from 'react';
// import { useInputState } from '@mantine/hooks';
// import dropDownData from '../../mockup/dropDownData';
// import "./Indices.css";

const CedulaCacei = () => {
    // Heading y data almacenan la informacion de los encabezados y el contenido de la tabla, respectivamente
    const [heading, setHeading] = useState([]);
    const [data, setData] = useState([]);
    // Cohorte, carrera y numSemestres son los datos de los Select
    // const [cohorte, setCohorte] = useInputState('');
    // const [carrera, setCarrera] = useInputState('');

    // const handleTable = () => {
    //     const tabla = [];
    //     const headers = [];
    //     let tablaCompleta = [];

    //     tablaCompleta = dataService.datosIndicesPermanencia(cohorte, numSemestres, carrera);
    //     headers.push(tablaCompleta[0]);
    //     headers.push(tablaCompleta[1]);
    //     for (let fila = 2; fila < tablaCompleta.length; fila++) {
    //         tabla.push(tablaCompleta[fila]);
    //     }
    //     setHeading(headers);
    //     setData(tabla);
    // };

    // const checkFilters = () => {
    //     if (cohorte === "" || carrera === "") {
    //         return true;
    //     }
    //     return false;
    // };

    useEffect(() => {
        const header = [
            'Cohortes equivalentes a 5 años', 'Periodo de cohorte', 'Número de estudiantes en el cohorte', 'Número de estudiantes que pertenecen al PE', 'Porcentaje de estudiantes que pertenecen al PE', 'Número de egresados del cohorte', 'Eficiencia terminal', 'Porcentaje de titulacion'
        ];
        setHeading(header);
        setData([
            []
        ]);
    }, []);

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Cedulas" title="CACEI" route="/" />
            <Flex direction="column">
                <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        {/* <Dropdown  label="Programa educativo" color="#FF785A" handleChangeFn={setCarrera}  />
                        <Dropdown  label="Cohorte generacional" color="#FF785A" handleChangeFn={setCohorte} /> */}
                        <Dropdown  label="Exportar" color="#FF785A" data={[
                            ['Excel','Excel'],
                            ['PDF','PDF'],
                        ]} />
                    </Group>
                    <Group mt={0} mb={16} >
                        <Checkbox labelPosition='left' label='Examen y Convalidación' radius='sm' />
                        <Checkbox labelPosition='left' label='Traslado y Equivalencia' radius='sm' />
                    </Group>
                    <Group style={{ justifyContent: "flex-end" }} >
                        <Button  color='negro'>Filtrar</Button>
                    </Group>
                </fieldset>
                <Tabla colors="tabla-toronja" headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default CedulaCacei;