import {
    Group,
    Modal,
    Button,
    Flex,
    Text,
    TextInput,
    MultiSelect
} from "@mantine/core";
import { DeviceFloppy } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import "./ModalEditarUsuario.css";


function ModalEditarUsuario ({opened, close, info}) {

    return (
        <Modal.Root opened={opened} onClose={close} centered size="lg" closeOnClickOutside={false}>
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
                            <MultiSelect label="Tablas" data={['Consultar', 'Exportar']} styles={(theme)=>({
                                wrapper: {
                                    pill: {
                                        backgroundColor: theme.white,
                                        color: theme.white,
                                    },
                                },
                            })}/>
                            <MultiSelect label="Indices" data={['Consultar', 'Exportar']} styles={(theme)=>({
                                wrapper: {
                                    pill: {
                                        backgroundColor: theme.white,
                                        color: theme.white,
                                    },
                                },
                            })}/>
                            <MultiSelect label="Reportes" data={['Consultar', 'Exportar']} styles={(theme)=>({
                                wrapper: {
                                    pill: {
                                        backgroundColor: theme.white,
                                        color: theme.white,
                                    },
                                },
                            })}/>
                            <MultiSelect label="Cédulas" data={['Consultar', 'Exportar']} styles={(theme)=>({
                                wrapper: {
                                    pill: {
                                        backgroundColor: theme.white,
                                        color: theme.white,
                                    },
                                },
                            })}/>
                        </Flex>
                    </Flex>
                    <Group position='center' align="center" mt={16}>
                        <Button leftIcon={<DeviceFloppy />} color="toronja" onClick={close}>Actualizar</Button>
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