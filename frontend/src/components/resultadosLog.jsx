import { 
    Accordion,
    Group,
    Modal,
    List,
    Button,
    ActionIcon
} from "@mantine/core";
import { useState } from "react";
import { CircleX, CircleCheck, AlertTriangle, DiscountCheck, X } from "tabler-icons-react";


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
                                    { console.log(info.errores) }
                                    { info.errores.map( error => <List.Item>{error}</List.Item>) }
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="advertencias">
                            <Accordion.Control icon={<AlertTriangle  color="#FFD25A" strokeWidth={3}/>}><b>Advertencias</b></Accordion.Control>
                            <Accordion.Panel>
                                <List>
                                { console.log(info.advertencias) }
                                { info.advertencias.map( advertencia => <List.Item >{advertencia}</List.Item>) }
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
};

export default ResultadosLog;