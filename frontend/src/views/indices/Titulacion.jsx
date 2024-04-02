import { Button, Checkbox, Flex, Group, Loader } from '@mantine/core';
import Header from './../../components/header';
import Tabla from './../../components/Tabla';
import Dropdown from './../../components/Dropdown';
import { useState } from 'react';
import { useInputState } from '@mantine/hooks';
import dropDownData from '../../mockup/dropDownData';
import { getIndicesHeaders } from '../../utils/helpers/headerHelpers';
import { Download, Printer, X } from 'tabler-icons-react';
import { buildTablaIndices } from '../../utils/helpers/indicesHelpers';
import { getIndicesData } from './../../routes/api/controllers/indicesHelpers';
import { generatePDF } from '../../utils/helpers/export/pdfHelpers';
import { generateExcel } from '../../utils/helpers/export/excelHelpers';
import { notifications } from '@mantine/notifications';

const IndiceTitulacion = () => {
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        const tabla = await getIndicesData('titulacion', examenYConv, trasladoYEquiv, cohorte, carrera, numSemestres);
        if (tabla.status === 200) {
            const headers = getIndicesHeaders(3, cohorte, carrera);
            setHeading(headers);
            try {
                const datos = buildTablaIndices('titulacion', tabla.data, numSemestres);
                setData(datos);
            } catch (error) {
                setHeading([[],[]]);
                setData([]);
                notifications.show({
                    message: 'Lo sentimos, hubo un problema al generar la tabla',
                    color: 'red',
                    icon: <X />,
                });
            }
        } else {
            setHeading([[],[]]);
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
        const tipoAlumno = examenYConv && trasladoYEquiv ? 1 : examenYConv ? 2 : 3;
        if (exportar === 'PDF') {
            generatePDF('Titulación', cohorte, numSemestres, heading, data, false, examenYConv, trasladoYEquiv, carrera);
        } else if (exportar === 'Excel') {
            await generateExcel(heading, data, 'Indice Titulacion', cohorte, numSemestres, tipoAlumno);
        }
        notifications.show({
            message: 'La descarga de tu documento ha comenzado.',
            color: 'teal',
            icon: <Download size={20} />,
          });
    };

    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Indices" title="Titulación por cohorte generacional" route="/indices" />
            <Flex direction="column">
            <fieldset className='filtros'>
                    <legend>Filtros</legend>
                    <Group mt={0} mb={16} color='gris'>
                        <Dropdown  label="Programa educativo" color="#FF785A" data={dropDownData.carreras} handleChangeFn={setCarrera} />
                        <Dropdown  label="Cohorte generacional" color="#FF785A" data={dropDownData.cohortes} handleChangeFn={setCohorte} />
                        <Dropdown  label="Cálculo de semestres" color="#FF785A" data={dropDownData.numSemestres} handleChangeFn={setNumSemestre} />
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
                        <Button  disabled={!cohorte || !numSemestres || !exportar || !(examenYConv || trasladoYEquiv) || data.length === 0} onClick={handlePrint} leftIcon={<Printer />} color='naranja'>Imprimir</Button>
                        <Button onClick={handleTable} color='negro' disabled={(!cohorte || !carrera || !numSemestres || !(examenYConv || trasladoYEquiv)) && !isLoading} >{isLoading ? <Loader size='sm' color='#FFFFFF'/>  : "Filtrar"}</Button>
                    </Group>
                </fieldset>
                <Tabla doubleHeader colors="tabla-toronja"  headers={heading} content={data} />
            </Flex>
        </div>
    );
};

export default IndiceTitulacion;