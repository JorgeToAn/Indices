import {
    Group,
    Modal,
    Button,
    Flex,
    Text,
    TextInput,
    Accordion,
    Checkbox,
    List
} from "@mantine/core";
import { DeviceFloppy, ShieldCheck } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "./ModalEditarUsuario.css";
import { useEffect, useState } from "react";
import dropDownData from "src/mockup/dropDownData";
import { asignarPermiso, removerTodosPermisos } from "src/routes/api/controllers/permisoController";
import { notifications } from "@mantine/notifications";


function ModalEditarUsuario ({opened, close, info}) {
    // Realizar fetch de las carreras registradas
    const [carreras, setCarreras] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const fetchCarreras = async() => {
        const c = await dropDownData.getListaCarrerasAll();
        const cA = await dropDownData.getListaCarrerasForUser(info[0][0]);
        setPermisos(cA.map((carrera) => carrera.value));
        setCarreras(c);
    };

    const updateUser = async() => {
        console.log(permisos);
        await removerTodosPermisos(info[0][0]);
        permisos.forEach(async (clave) => {
            await asignarPermiso(clave, info[0][0]);
        });
        notifications.show({
            message: `Se han cambiado los permisos del usuario "${info[1][0]}" con éxito.`,
            color: 'teal',
            icon: <ShieldCheck size={20} />,
          });
    };

    useEffect(() => {
        fetchCarreras();

    }, [info]);
    return (
        <Modal.Root opened={opened} onClose={close} centered size="xl" closeOnClickOutside={false}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold" ta="center" ml="auto">Actualizando Usuario</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    <Flex direction="row" align="flex-start" justify="center" gap={20}>
                        <Flex direction="column" className="datos" w="45%">
                            <Text fw="bold">Datos de usuario</Text>
                            <TextInput label="Id de usuario" disabled value={info[0]}/>
                            <TextInput label="Nombre de usuario" disabled value={info[1]}/>
                            <TextInput label="Correo electrónico" disabled value={info[2]}/>
                        </Flex>
                        <Flex direction="column" className="datos" w="45%">
                            <Text fw="bold">Permisos</Text>
                            <Accordion variant="contained" radius="md" mt={16} w='90%'>
                                <Accordion.Item value="carreras" w="300px" >
                                    <Accordion.Control><b>Carreras</b></Accordion.Control>
                                    <Accordion.Panel>
                                        <List withPadding listStyleType="none">
                                            { carreras.map((carrera,index) =><List.Item key={index}><Checkbox checked={permisos.filter((c) => c === carrera.value).length > 0} label={carrera.label} labelPosition="right" radius="sm" onChange={(e) => {
                                                let copyPermisos = [...permisos];
                                                if (e.target.checked) {
                                                    copyPermisos.push(carrera.value);
                                                    setPermisos(copyPermisos);
                                                } else {
                                                    copyPermisos = copyPermisos.filter((clave) => clave !== carrera.value);
                                                    setPermisos(copyPermisos);
                                                }
                                            }} /></List.Item> )}
                                        </List>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </Flex>
                    </Flex>
                    <Group position='center' align="center" mt={16}>
                        <Button leftIcon={<DeviceFloppy />} color="toronja" onClick={updateUser}>Actualizar</Button>
                        <Button color="gris" onClick={close}>Cancelar</Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}

ModalEditarUsuario.propTypes = {
    opened: PropTypes.bool,
    info: PropTypes.array,
    close: PropTypes.func,
};

export default ModalEditarUsuario;