import "./NavBar.css";
import { ChevronDown, Home, Search, UserCircle } from "tabler-icons-react";
import ModalLogout from './ModalLogout';
import {
    Header,
    Menu,
    Button,
    Group,
    TextInput,
    ActionIcon,
    Burger,
    createStyles
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    burger: {
        [theme.fn.largerThan('sm')]: {
          display: 'none',
        },
      },

    menus: {
    [theme.fn.smallerThan('sm')]: {
        display: 'none',
    },
    },
}));
const NavBar = () => {
    const { classes } = useStyles();

    const [opened, {open, close}] = useDisclosure(false);
    const navigate = useNavigate();
    const handleMiPerfil = () => {
      navigate('mi-perfil');
    };

    const [opend, { toggle }] = useDisclosure(false);
    return (
        <Header bg="negro" height={40}>
            <div className="nav">

                <Group>
                    <Button color="negro" leftIcon={<Home />} uppercase={true} onClick={()=> {
                        navigate('/');
                    }}>
                        Inicio
                    </Button>
                    <TextInput placeholder="BUSCAR" icon={<Search />} size="xs"/>
                </Group>

                <Group>
                    {/* Menu de tablas */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target className={classes.menus}>
                            <Button color="negro" uppercase={true}>
                                Tablas
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={() => {
                                navigate('/tablas/poblacion');
                            }}>POBLACION</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/tablas/crecimiento');
                            }}>CRECIMIENTO</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de indices */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target className={classes.menus}>
                            <Button color="negro">
                                INDICES
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={() => {
                                navigate('/indices/permanencia');
                            }}>PERMANENCIA</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/indices/egreso');
                            }}>EGRESO</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/indices/titulacion');
                            }}>TITULACION</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/indices/desercion');
                            }}>DESERCION</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>

                    {/* Menu de reportes */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target className={classes.menus}>
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
                        <Menu.Target className={classes.menus}>
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
                        <Menu.Target className={classes.menus}>
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

                    <Button color="negro" className={classes.menus}>SUBIR ARCHIVOS</Button>

                    {/* Menu de registros */}
                    <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target className={classes.menus}>
                            <Button color="negro">
                                REGISTROS
                                <ChevronDown size={16} strokeWidth={2} color={'white'} />
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown className={classes.menus}>
                            <Menu.Item onClick={()=>{
                                navigate('/registro/carrera');
                                }}>CARRERAS</Menu.Item>
                            <Menu.Item onClick={()=>{
                                navigate('/registro/planes');
                                }}>PLANES DE ESTUDIO</Menu.Item>
                            <Menu.Item onClick={()=>{
                                navigate('/registro/discapacidades');
                                }}>DISCAPACIDADES</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target className={classes.menus}>
                            <Burger
                                opened={opend}
                                onClick={toggle}
                                className={classes.burger}
                                size="sm"
                                color="#fff"
                            />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={() => {
                                navigate('/tablas/poblacion');
                            }}>POBLACION</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/tablas/crecimiento');
                            }}>CRECIMIENTO</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                <Burger
                    opened={opend}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    color="#fff"
                />

                {/* Menu de usuario */}
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
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