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


function ModalEditarUsuario ({opened, close, info}) {

    return (
        <Modal.Root opened={opened} onClose={close} centered closeOnClickOutside={false}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold">Actualizando Usuario</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    <Flex direction="row">
                        <Flex direction="column">
                            <Text>Datos de usuario</Text>
                            <TextInput label="Id de usuario" />
                            <TextInput label="Nombre de usuario" />
                            <TextInput label="Correo electrónico" />
                        </Flex>
                        <Flex direction="column">
                            <Text>Permisos</Text>
                            <MultiSelect label="Tablas" data={['Consultar', 'Exportar']}/>
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
    info: PropTypes.object,
    close: PropTypes.func,
};

export default ModalEditarUsuario;