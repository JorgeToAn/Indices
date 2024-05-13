import {
    Accordion,
    Button,
    Checkbox,
    List,
    Flex,
    Group,
    TextInput
} from "@mantine/core";
import { DeviceFloppy, Edit, ShieldCheck } from "tabler-icons-react";
import Header from "src/components/header.jsx";
import { useAuthStore } from "src/store/auth";
import { useEffect, useState } from "react";
import dropDownData from "src/mockup/dropDownData";
import { asignarPermiso, removerTodosPermisos } from "src/routes/api/controllers/permisoController";
import { notifications } from "@mantine/notifications";


const MiPerfil = () => {
    const user = useAuthStore((state) => state.user);
    const [onEdit, setOnEdit] = useState(false);
    const [carreras, setCarreras] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const fetchCarreras = async() => {
        const c = await dropDownData.getListaCarrerasAll();
        const cA = await dropDownData.getListaCarrerasForUser(user().user_id);
        setPermisos(cA.map((carrera) => carrera.value));
        setCarreras(c);
    };

    const updateUser = async() => {
        console.log(permisos);
        await removerTodosPermisos(user().user_id);
        permisos.forEach(async (clave) => {
            await asignarPermiso(clave, user().user_id);
        });
        notifications.show({
            message: `Se han cambiado los permisos del usuario "${user().username}" con éxito.`,
            color: 'teal',
            icon: <ShieldCheck size={20} />,
          });
    };

    useEffect(() => {
        fetchCarreras();

    }, []);

    // const wrapper_divs = document.getElementsByClassName("user-info");
    const editarUsuario = () => {
        setOnEdit(true);
        document.getElementById("btns").style.display = "block";
        document.getElementById("btn-editar").style.display = "none";
        // for (const div in wrapper_divs) {
        //     const input = wrapper_divs[div].children[1].children;
        //     input[0].removeAttribute("disabled");
        //     input[0].removeAttribute("data-disabled");
        // }
    };

    const cancelarEdicion = () => {
        document.getElementById("btns").style.display = "none";
        document.getElementById("btn-editar").style.display = "block";
        setOnEdit(false);
        // for (const div in wrapper_divs) {
        //     const input = wrapper_divs[div].children[1].children;
        //     input[0].setAttribute("disabled", true);
        //     input[0].setAttribute("data-disabled", true);
        // }
    };

    return (
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header color="toronja" route="/" section="Usuario" title="Perfil de Usuario" />
            <Group align="flex-start" mt={20} spacing="xl" >
                <Flex direction="column">
                    <form>
                        <TextInput disabled={!onEdit} id="username" className="user-info" value={user().username} withAsterisk label="Nombre de usuario"/>
                        <TextInput id="email" className="user-info"  value={user().email} disabled={!onEdit} withAsterisk label="Correo electrónico"/>
                        <TextInput id="first_name" className="user-info" value={user().first_name} disabled={!onEdit} withAsterisk label="Nombre"/>
                        <TextInput id="paternal_surname" className="user-info" value={user().paternal_surname} disabled={!onEdit} withAsterisk label="Apellido Paterno"/>
                        <TextInput id="maternal_surname" className="user-info" value={user().maternal_surname} disabled={!onEdit}  label="Apellido Materno"/>
                        <TextInput id="gender" className="user-info" value={user().gender} disabled={!onEdit}  label="Sexo"/>
                        <Button leftIcon={<Edit />}  mt={16} id="btn-editar" w="100%" onClick={editarUsuario}>Editar</Button>
                        <Flex direction="column" id="btns" wrap="wrap" justify="center" align="center" style={{display:"none"}}>
                            <Button leftIcon={<DeviceFloppy />} w="100%" id="btn-actualizar" mt={16} onClick={updateUser}>Actualizar</Button>
                            <Button mt={16} color="gris" w="100%" onClick={cancelarEdicion} id="btn-cancelar">Cancelar</Button>
                        </Flex>
                    </form>
                </Flex>
                <Flex direction="column" align="center" justify="flex-start" >
                    <Accordion variant="contained" radius="md" mt={16}>
                        <Accordion.Item value="carreras" w="300px" >
                            <Accordion.Control><b>Carreras</b></Accordion.Control>
                            <Accordion.Panel>
                                <List withPadding listStyleType="none">
                                    { carreras.map((carrera,index) =><List.Item key={index}><Checkbox disabled={!onEdit} checked={permisos.filter((c) => c === carrera.value).length > 0} label={carrera.label} labelPosition="right" radius="sm" onChange={(e) => {
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
            </Group>

        </div>
    );
};

export default MiPerfil;