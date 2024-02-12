import { Button, Checkbox, Flex, Group, Select, TextInput } from "@mantine/core";
import Header from "../../components/header";
import { DeviceFloppy, Edit, FileExport, Search } from "tabler-icons-react";
import dropDownData from "../../mockup/dropDownData";
import Tabla from "../../components/Tabla";
import { useEffect, useState } from "react";
import { useInputState } from "@mantine/hooks";
import { getAlumnoInfo } from "../../utils/helpers/alumnoHelpers";
import { ordenarRegistros } from "../../utils/helpers/historialHelpers";

const AlumnosHistorial = () => {
    const [editar, setEditar] = useState(false);
    const [buscar, setBuscar] = useInputState('');
    const [alumno, setAlumno] = useState({});
    const [lenguaInd, setLenguaInd] = useState(false);
    const [liberacionIng, setLiberacionIng] = useState(false);
    const [registros, setRegistros] = useState([]);
    const headers = [
        'Semestre', 'Periodo', 'Estatus'
    ];

    const handleEdit = () => {
        editar ? setEditar(false) : setEditar(true);
    };

    const handleSearch = async(event) => {
        if(event.key === 'Enter') {
            const alumnoData = await getAlumnoInfo(buscar);
            const alumnoInfo = {...alumnoData['curp']};
            alumnoInfo['edad'] = alumnoData['edad'];
            alumnoInfo['control'] = alumnoData['no_control'];
            alumnoInfo['estatus'] = alumnoData['estatus'];
            alumnoInfo['semestres'] = alumnoData['registros']['ingresos'].length.toString();
            alumnoInfo['carrera'] = alumnoData['plan']['carrera'];
            console.log(alumnoData);
            setLenguaInd(alumnoInfo['habla_lengua_indigena']);
            setLiberacionIng(alumnoData['registros']['liberacion_ingles'].length > 0 ? true : false);
            setAlumno(alumnoInfo);
            setEditar(false);
            const reg = await ordenarRegistros(alumnoData['registros']['ingresos'], alumnoInfo['carrera']);
            setRegistros(reg);
        }
    };
    useEffect(() => {
        // handleEdit();
        const alumnoInicial = {
            'nombre': '',
            'paterno': '',
            'materno': '',
            'control': '',
            'genero': '',
            'semestres': '1',
            'carrera': '',
        };
        setAlumno(alumnoInicial);
        setRegistros([]);
    },[]);
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Alumnos" title="Historial" route="/alumnos" />
            <Group align="flex-start" spacing="3vw">
                <Flex direction="column">
                    <form>
                        <TextInput label="Buscar" value={buscar} onChange={setBuscar} onKeyUp={handleSearch}  icon={<Search width={20} />} />
                        <TextInput label="Nombre" value={`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`} disabled={!editar} withAsterisk/>
                        <TextInput label="No. de control" value={alumno.control} disabled={!editar} withAsterisk/>
                        <Group className="input-group">
                            <TextInput label="Sexo" value={alumno.genero} disabled={!editar} withAsterisk width="45%"/>
                            <TextInput label="Edad" value={alumno.edad} disabled={!editar} withAsterisk width="45%"/>
                        </Group>
                        <Group className="input-group">
                            <Select
                                width="45%"
                                label="Estatus"
                                disabled={!editar}
                                placeholder="Seleccionar un estatus"
                                data={[
                                    {value: 'Inscrito', label: 'Inscrito'},
                                    {value: 'Baja', label: 'Baja'},
                                    {value: 'Egresado', label: 'Egresado'},
                                    {value: 'Titulado', label: 'Titulado'},
                                ]}
                                value={alumno.estatus}
                                withAsterisk
                            />
                            <Select
                                width="45%"
                                label="Semestre"
                                disabled={!editar}
                                placeholder="Seleccione un semestre"
                                data={dropDownData.semestres.map((fila) => ({"value":fila[0], "label":fila[1]}))}
                                value={alumno.semestres}
                                withAsterisk
                            />
                        </Group>
                        <Checkbox labelPosition='left' color='toronja' onChange={setLiberacionIng} checked={liberacionIng} disabled={!editar} mt={15} label='Liberacion de inglés' radius='sm' />
                        <Checkbox labelPosition='left' onChange={setLenguaInd} checked={lenguaInd} color='toronja' disabled={!editar} mt={15} label='Habla lengua indígena' radius='sm' />
                        { editar ?
                            <Group className="input-group">
                                <Button type="button" mt={16} leftIcon={<DeviceFloppy />} >Guardar</Button>
                                <Button type="button" mt={16} color="gris" onClick={handleEdit} >Cancelar</Button>
                                <Button type="button" mt={16} color="naranja" leftIcon={<FileExport />} >Exportar</Button>
                            </Group>
                        :
                            <Group className="input-group">
                                <Button type="button" mt={16} leftIcon={<Edit />} onClick={handleEdit}>Editar</Button>
                                <Button type="button" mt={16} color="naranja" leftIcon={<FileExport />} >Exportar</Button>
                            </Group>
                        }
                    </form>
                </Flex>
                <Flex direction="column" align="flex-start" justify="flex-start" >
                    <Tabla headers={headers} content={registros} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default AlumnosHistorial;