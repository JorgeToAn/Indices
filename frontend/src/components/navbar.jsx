import "./NavBar.css";
import { ChevronDown, Home, Search, UserCircle } from "tabler-icons-react";
import ModalLogout from './ModalLogout';
import {
    Header,
    Menu,
    Button,
    Group,
    TextInput,
    ActionIcon
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const NavBar = () => {
    const [opened, {open, close}] = useDisclosure(false);

    return (
        <Header bg="negro" height={40}>
            <div className="nav">
                <Group>
                    <Button color="negro" leftIcon={<Home />} uppercase={true}>
                        Inicio
                    </Button>
                    <TextInput placeholder="BUSCAR" icon={<Search />} size="xs"/>
                </Group>

                <Group>
                    {/* Menu de tablas */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Button color="negro" uppercase={true}>
                                Tablas
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>POBLACION</Menu.Item>
                            <Menu.Item >CRECIMIENTO</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de indices */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Button color="negro">
                                INDICES
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>PERMANENCIA</Menu.Item>
                            <Menu.Item >EGRESO</Menu.Item>
                            <Menu.Item >TITULACION</Menu.Item>
                            <Menu.Item >DESERCION</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de reportes */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Button color="negro">
                                REPORTES
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>NUEVO INGRESO</Menu.Item>
                            <Menu.Item >EGRESADOS</Menu.Item>
                            <Menu.Item >TITULADOS</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de cedulas */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Button color="negro">
                                CEDULAS
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>CACECA</Menu.Item>
                            <Menu.Item >CACEI</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de alumnos */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                            <Button color="negro">
                                ALUMNOS
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>HISTORIAL POR ALUMNO</Menu.Item>
                            <Menu.Item >LISTA DE ALUMNOS</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    <Button color="negro">SUBIR ARCHIVOS</Button>
                </Group>


                {/* Menu de usuario */}
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                        {/* <Button color="negro" leftIcon={<UserCircle />}>
                        </Button> */}
                        <ActionIcon variant="filled" color="negro" mr={10}>
                            <UserCircle />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item onClick={handleMiPerfil}>MI PERFIL</Menu.Item>
                        <Menu.Item >CAMBIO DE CONTRASEÑA</Menu.Item>
                        <Menu.Item onClick={open} >CERRAR SESION</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <ModalLogout opened={opened} close={close} />
        </Header>
    );
};

export default NavBar;