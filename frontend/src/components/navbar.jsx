import "./NavBar.css";
import { ChevronDown, Home, Search, UserCircle } from "tabler-icons-react";
import {
    Header,
    Menu,
    Button,
    Group,
<<<<<<< HEAD

=======
>>>>>>> 40984d55401268cb06f2a19f5fcf973eb5874a08
    TextInput
} from "@mantine/core";


const NavBar = () => {
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
                </Group>


                {/* Menu de usuario */}
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                        <Button color="negro" leftIcon={<UserCircle />}>
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item>MI PERFIL</Menu.Item>
                        <Menu.Item >CAMBIO DE CONTRASEÑA</Menu.Item>
                        <Menu.Item >CERRAR SESION</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </Header>
    );
};

export default NavBar;