import { Button, Group, Modal } from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { PropTypes } from 'prop-types';


const ModalLogout = ({opened, close}) => {
    return (
        <Modal.Root opened={opened} close={close}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    ¿Estas seguro de que deseas cerrar sesión? Todos los cambios no guardados serán descartados.
                    <Group>
                        <Button leftIcon={<Logout />} color="toronja">Cerrar Sesión</Button>
                        <Button>Cancelar</Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

ModalLogout.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func
};
export default ModalLogout;