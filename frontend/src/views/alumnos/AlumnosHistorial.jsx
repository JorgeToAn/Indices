import { Button, Checkbox, Flex, Group, Select, TextInput } from "@mantine/core";
import Header from "../../components/header";
import { DeviceFloppy, Edit, FileExport, Search } from "tabler-icons-react";
import dropDownData from "../../mockup/dropDownData";
import Tabla from "../../components/Tabla";
import { useEffect, useState } from "react";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { ordenarRegistros } from "../../utils/helpers/historialHelpers";
import { DateInput } from "@mantine/dates";
import { getAlumnoInfo, updateAlumnoInfo } from "../../routes/api/controllers/alumnoController";
import ModalRespuesta from './../../components/modals/ModalRespuesta';

const AlumnosHistorial = () => {
    const [opened, handlers] = useDisclosure(false);
    const [response, setResponse] = useState(false);
    const [editar, setEditar] = useState(false);
    const [buscar, setBuscar] = useInputState('');
    const [alumno, setAlumno] = useState({});
    const [sexo, setSexo] = useState('H');
    const [fechaNac, setFechaNac] = useState('');
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
            const fechaNac = new Date(alumnoInfo['fecha_nacimiento']);
            alumnoInfo['fecha_nac'] = fechaNac;
            alumnoInfo['no_control'] = alumnoData['no_control'];
            alumnoInfo['estatus'] = alumnoData['estatus'];
            alumnoInfo['semestres'] = alumnoData['registros']['ingresos'].length.toString();
            alumnoInfo['carrera'] = alumnoData['plan']['carrera'];
            setLenguaInd(alumnoInfo['habla_lengua_indigena']);
            alumnoInfo['plan'] = alumnoData['plan']['clave'];
            setLiberacionIng(alumnoData['registros']['liberacion_ingles'].length > 0 ? true : false);
            setAlumno(alumnoInfo);
            setFechaNac(alumnoInfo['fecha_nac']);
            setSexo(alumnoData['curp']['genero']);
            setEditar(false);
            const reg = await ordenarRegistros(alumnoData['registros']['ingresos'], alumnoInfo['carrera']);
            setRegistros(reg);
        }
    };

    const updateAlumno = async() => {
        const alumnoForm = new FormData(document.getElementById('form-alumno'));
        alumnoForm.append('curp', alumno['curp']);
        alumnoForm.append('plan', alumno['plan']);
        const fechaN = new Date(alumnoForm.get('fecha_nacimiento'));
        const fechaNacFormatted = `${fechaN.getFullYear()}-${fechaN.getMonth()+1}-${fechaN.getDate()}`;
        alumnoForm.delete('fecha_nacimiento');
        alumnoForm.delete('habla_lengua_indigena');
        alumnoForm.append('fecha_nacimiento', fechaNacFormatted);
        alumnoForm.append('habla_lengua_indigena', lenguaInd);
        const res = await updateAlumnoInfo(alumnoForm, alumno['curp']);
        setResponse(res);
        handlers.open();
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const copyAlumno = {...alumno};
        copyAlumno[name] = value;
        setAlumno(copyAlumno);
    };
    useEffect(() => {
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
                    <form id="form-alumno">
                        <TextInput label="Buscar" value={buscar} onChange={setBuscar} onKeyUp={handleSearch}  icon={<Search width={20} />} />
                        <TextInput label="Nombre" value={alumno.nombre} name="nombre" onChange={handleInputChange} disabled={!editar} withAsterisk/>
                        <TextInput label="Apellido paterno" name="paterno" onChange={handleInputChange} value={alumno.paterno} disabled={!editar} withAsterisk/>
                        <TextInput label="Apellido materno" name="materno" onChange={handleInputChange} value={alumno.materno} disabled={!editar} withAsterisk/>
                        <TextInput label="No. de control" name="no_control" onChange={handleInputChange}  value={alumno['no_control']} disabled={!editar} withAsterisk/>
                        <Group className="input-group">
                            <Select width="45%" label="Sexo" name="genero" disabled={!editar} onChange={setSexo} placeholder="Seleccionar una opción" data={[{value:'H', label:'Hombre'},{value:'M',label:'Mujer'}]} withAsterisk value={sexo}/>
                            <DateInput label="Fecha de nacimiento" name="fecha_nacimiento" onChange={setFechaNac} disabled={!editar} valueFormat="YYYY-MM-DD" value={fechaNac}  withAsterisk width="45%"/>
                        </Group>
                        <Group className="input-group">
                            <Select
                                width="45%"
                                label="Estatus"
                                readOnly
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
                                readOnly
                                placeholder="Seleccione un semestre"
                                data={dropDownData.semestres.map((fila) => ({"value":fila[0], "label":fila[1]}))}
                                value={alumno.semestres}
                                withAsterisk
                            />
                        </Group>
                        <Checkbox labelPosition='left' color='toronja' readOnly checked={liberacionIng} disabled={!editar} mt={15} label='Liberacion de inglés' radius='sm' />
                        <Checkbox labelPosition='left' name="habla_lengua_indigena" onChange={(event) => setLenguaInd(event.currentTarget.checked)} checked={lenguaInd} color='toronja' disabled={!editar} mt={15} label='Habla lengua indígena' radius='sm' />
                        { editar ?
                            <Group className="input-group">
                                <Button type="button" mt={16} leftIcon={<DeviceFloppy />} onClick={updateAlumno}>Guardar</Button>
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
            <ModalRespuesta opened={opened} close={handlers.close} success={response}/>
        </div>
    );
};

export default AlumnosHistorial;