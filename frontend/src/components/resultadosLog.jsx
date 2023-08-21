import { 
    Accordion,
    Group,
    Modal,
    List,
    Button
} from "@mantine/core";
import { useState } from "react";
import { CircleX, CircleCheck } from "tabler-icons-react";


const ResultadosLog = () => {
    const [open, setOpen] = useState(false);
    setOpen(true);
    return (
        <Modal opened={open} onClose={() => setOpen(false)} title="Resultados" centered>
            <Accordion>
                <Accordion.Item value="errores">
                    <Accordion.Control icon={<CircleX />}>Errores</Accordion.Control>
                    <Accordion.Panel>
                        <List>
                            <List.Item><span>20490712</span> no es un número de control válido</List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Group position='center' align="center">
                <Button leftIcon={<CircleCheck />} color="verde">Continuar</Button>
                <Button color="gris">Cancelar</Button>
            </Group>
        </Modal>
    );
};

export default ResultadosLog;