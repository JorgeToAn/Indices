import { Accordion, Button, Checkbox, Container, List, Flex, Group, TextInput, Title, ActionIcon } from "@mantine/core";
import { ArrowLeft, DeviceFloppy, Edit } from "tabler-icons-react";
import Header from "../components/header";
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

    let wrapper_divs = document.getElementsByClassName("user-info");
    const editarUsuario = () => {
        document.getElementById("btns").style.display = "block";
        document.getElementById("btn-editar").style.display = "none";
        for (let div in wrapper_divs) {
            let input = wrapper_divs[div].children[1].children;
            input[0].removeAttribute("disabled");
            input[0].removeAttribute("data-disabled");
            console.log(input[0]);
        }


        // inputs[0].setAttribute("data-disabled", false);
        // for (let i in inputs) {
            // inputs[i].setAttribute("disabled", false)
        // }
    }

    const cancelarEdicion = () => {
        document.getElementById("btns").style.display = "none";
        document.getElementById("btn-editar").style.display = "block";

        // let wrapper_divs = document.getElementsByClassName("user-info");
        for (let div in wrapper_divs) {
            let input = wrapper_divs[div].children[1].children;
            input[0].setAttribute("disabled", true);
            input[0].setAttribute("data-disabled", true);
            console.log(input[0]);
        }
    }

    let headerProps = {
        "color": "toronja",
        "section": "Usuario",
        "title": "Perfil de Usuario",
        "route": "/principal",
    }
    return (
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header props={headerProps} />
            <Group align="flex-start" mt={20} spacing="xl" >
                <Flex direction="column">
                    <form>
                        <TextInput id="username" className="user-info" value={user().username} disabled withAsterisk label="Nombre de usuario"/>
                        <TextInput id="email" className="user-info"  value={user().email} disabled withAsterisk label="Correo electrónico"/>
                        <TextInput id="first_name" className="user-info" value={user().first_name} disabled withAsterisk label="Nombre"/>
                        <TextInput id="last_name"  className="user-info" value={user().last_name} disabled withAsterisk label="Apellido Paterno"/>
                        <TextInput  value={user().username} className="user-info" disabled  label="Apellido Materno"/>
                        <TextInput id="sex" className="user-info" value={user().username} disabled  label="Sexo"/>
                        <Button leftIcon={<Edit />}  mt={16} id="btn-editar" w="100%" onClick={editarUsuario}>Editar</Button>
                        <Flex direction="column" id="btns" wrap="wrap" justify="center" align="center" style={{display:"none"}}>
                            <Button leftIcon={<DeviceFloppy />} w="100%" id="btn-actualizar" mt={16} type="submit">Actualizar</Button>
                            <Button mt={16} color="gris" w="100%" onClick={cancelarEdicion} id="btn-cancelar">Cancelar</Button>
                        </Flex>
                    </form>
                </Flex>
                <Flex direction="column" align="center" justify="flex-start" >
                    <Permisos />
                    <Accordion variant="contained" radius="md" mt={16}>
                        <Accordion.Item value="carreras" w="300px" >
                            <Accordion.Control><b>Carreras</b></Accordion.Control>
                            <Accordion.Panel>
                                <List withPadding listStyleType="none">
                                    { carreras.map((carrera,index) =><List.Item key={index}><Checkbox label={carrera} labelPosition="right" radius="sm" /></List.Item> )}

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