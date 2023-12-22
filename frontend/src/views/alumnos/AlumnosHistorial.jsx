import { Button, Checkbox, Flex, Group, Select, TextInput } from "@mantine/core";
import Header from "../../components/header";
import { DeviceFloppy, Edit, FileExport, Search } from "tabler-icons-react";
import dropDownData from "../../mockup/dropDownData";
import Tabla from "../../components/Tabla";
import { useEffect, useState } from "react";

const AlumnosHistorial = () => {
    const [editar, setEditar] = useState('');
    const headers = [
        'Semestre', 'Periodo', 'Estatus'
    ];
    const content = [
        ['Semestre 1', '2018-1', 'QUI']
    ];

    const handleEdit = () => {
        editar ? setEditar(false) : setEditar(true);
    };
    useEffect(() => {
        handleEdit();
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
                        <TextInput label="Buscar"  icon={<Search width={20} />} />
                        <TextInput label="Nombre" disabled={!editar} withAsterisk/>
                        <TextInput label="No. de control" disabled={!editar} withAsterisk/>
                        <Group className="input-group">
                            <TextInput label="Sexo" disabled={!editar} withAsterisk width="45%"/>
                            <TextInput label="Edad" disabled={!editar} withAsterisk width="45%"/>
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
                                withAsterisk
                            />
                            <Select
                                width="45%"
                                label="Semestre"
                                disabled={!editar}
                                placeholder="Seleccione un semestre"
                                data={dropDownData.semestres.map((fila) => ({"value":fila[0], "label":fila[1]}))}
                                withAsterisk
                            />
                        </Group>
                        <Checkbox labelPosition='left' color='toronja' disabled={!editar} mt={15} label='Liberacion de inglés (2018-1)' radius='sm' />
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
                    <Tabla headers={headers} content={content} colors="tabla-toronja" />
                </Flex>
            </Group>
        </div>
    );
};

export default AlumnosHistorial;