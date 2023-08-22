import { Accordion, Button, Checkbox, Container, List, Flex, Group, TextInput, Title, ActionIcon } from "@mantine/core";
import { ArrowLeft, DeviceFloppy, Edit } from "tabler-icons-react";
import Permisos from "../components/permisos";
import { useAuthStore } from "../store/auth";


const MiPerfil = () => {
    const user = useAuthStore((state) => state.user);

    let carreras = [
        "Ing. Sistemas Computacionales",
        "Contador Público",
        "Ing. Química",
        "Ing. Energías Renovables",
        "Ing. Mecánica",
        "Ing. Mecatrónica",
        "Ing. Eléctrica",
        "Ing. Electrónica",
        "Ing. Logística",
        "Ing. Gestión Empresarial"
    ]

    const editarUsuario = () => {
        let inputs = document.getElementsByTagName("input");
        console.log(inputs)
        for (let i in inputs) {
            inputs[i].disabled = false;
        }
    }
    return (
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Flex direction="column">
                <ActionIcon color="toronja" radius="xl" variant="filled" mb={10} >
                    <ArrowLeft />
                </ActionIcon>
                <Title order={3} className="titulo-t"><span>Usuarios</span> Perfil de Usuario</Title>
            </Flex>
            <Group align="flex-start" mt={20} spacing="xl" >
                <Flex direction="column">
                    <form>
                        <TextInput id="username"  placeholder={user().username} disabled withAsterisk label="Nombre de usuario"/>
                        <TextInput id="email" placeholder={user().email} disabled withAsterisk label="Correo electrónico"/>
                        <TextInput id="first_name" placeholder={user().first_name} disabled withAsterisk label="Nombre"/>
                        <TextInput id="last_name" placeholder={user().last_name} disabled withAsterisk label="Apellido Paterno"/>
                        <TextInput  placeholder={user().username} disabled  label="Apellido Materno"/>
                        <TextInput id="sex" placeholder={user().username} disabled  label="Sexo"/>
                        <Button leftIcon={<Edit />}  mt={16} onClick={editarUsuario}>Editar</Button>
                        <Button leftIcon={<DeviceFloppy />} mt={16} type="submit">Actualizar</Button>
                        <Button mt={16} color="gris">Cancelar</Button>
                    </form>
                </Flex>
                <Flex direction="column" align="center" justify="flex-start" >
                    <Permisos />
                    <Accordion variant="contained" radius="md" mt={16}>
                        <Accordion.Item value="carreras" w="300px" >
                            <Accordion.Control>Carreras</Accordion.Control>
                            <Accordion.Panel>
                                <List withPadding>
                                    { carreras.map(carrera =><List.Item><Checkbox label={carrera} labelPosition="left" radius="sm" /></List.Item> )}

                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Flex>
            </Group>

        </div>
    );
};

export default MiPerfil;