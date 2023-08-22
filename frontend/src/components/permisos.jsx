import { Accordion, Checkbox, Group, Text, List } from "@mantine/core";

const Permisos = () => {
    let permisos = {
        "Tablas": ["Población", "Crecimiento"],
        "Indices": ["Permanencia", "Egreso", "Titulación", "Deserción"],
        "Reportes": ["Nuevo Ingreso", "Egresados", "Titulados"],
        "Cedulas": ["CACEI", "CACECA"],
    }
    return (
        <Accordion variant="contained" radius="md"  >
            <Accordion.Item value="tablas" w="300px">
                <Accordion.Control>Tablas</Accordion.Control>
                <Accordion.Panel>
                    <List withPadding>
                        { permisos.Tablas.map( permiso => <List.Item><Checkbox radius="sm"  color="toronja" labelPosition="left" label={permiso} /></List.Item> )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="indices" w="300px">
                <Accordion.Control>Indices</Accordion.Control>
                <Accordion.Panel>
                <List withPadding>
                        { permisos.Indices.map( permiso => <List.Item><Checkbox radius="sm"  color="toronja" labelPosition="left" label={permiso} /></List.Item> )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="reportes" w="300px">
                <Accordion.Control>Reportes</Accordion.Control>
                <Accordion.Panel>
                <List withPadding>
                        { permisos.Reportes.map( permiso => <List.Item><Checkbox radius="sm"  color="toronja" labelPosition="left" label={permiso} /></List.Item> )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="cedulas" w="300px">
                <Accordion.Control>Cédulas</Accordion.Control>
                <Accordion.Panel>
                <List withPadding>
                        { permisos.Cedulas.map( permiso => <List.Item><Checkbox radius="sm"  color="toronja" labelPosition="left" label={permiso} /></List.Item> )}
                    </List>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
};

export default Permisos;