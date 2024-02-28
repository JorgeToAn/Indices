import {
    Accordion,
    Group,
    Modal,
    List,
    Button
} from "@mantine/core";
import { CircleX, CircleCheck, AlertTriangle, DiscountCheck } from "tabler-icons-react";
import { PropTypes } from 'prop-types';


function ResultadosLog ({opened, close, info}) {

    return (
        <Modal.Root opened={opened} onClose={close} centered closeOnClickOutside={false}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title  fw="bold">Resultados</Modal.Title>
                    <Modal.CloseButton bg="gris" color="negro"></Modal.CloseButton>
                </Modal.Header>
                <Modal.Body>
                    <Accordion>
                        <Accordion.Item value="errores">
                            <Accordion.Control icon={<CircleX  color="#ED4333" strokeWidth={3}/>}><b>Errores</b></Accordion.Control>
                            <Accordion.Panel>
                                <List>
                                    { info.errores.map( (error, index) => <List.Item key={index}>{error}</List.Item>) }
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="advertencias">
                            <Accordion.Control icon={<AlertTriangle  color="#FFD25A" strokeWidth={3}/>}><b>Advertencias</b></Accordion.Control>
                            <Accordion.Panel>
                                <List>
                                { info.advertencias.map( (advertencia, index) => <List.Item key={index} >{advertencia}</List.Item>) }
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="guardados">
                            <Accordion.Control icon={<DiscountCheck  color="#80ED99" strokeWidth={3}/>}><b>Guardados</b></Accordion.Control>
                            <Accordion.Panel>
                                <List>

                                    <List.Item >{info.guardados}</List.Item>
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Group position='center' align="center" mt={16}>
                        <Button leftIcon={<CircleCheck />} color="verde" onClick={close}>Continuar</Button>
                        <Button color="gris" onClick={close}>Cancelar</Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
}

ResultadosLog.propTypes = {
    opened: PropTypes.bool,
    info: PropTypes.object,
    close: PropTypes.func,
};

export default ResultadosLog;