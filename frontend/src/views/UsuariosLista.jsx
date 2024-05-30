import { Button, Flex, TextInput } from '@mantine/core';
import Header from 'src/components/header';
import { CirclePlus, Edit, Search } from 'tabler-icons-react';
import { Group } from '@mantine/core';
import Tabla from 'src/components/Tabla';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { getListaUsuarios } from 'src/routes/api/controllers/adminController';
import ModalEditarUsuario from './ModalEditarUsuario';
import { Link } from 'react-router-dom';

const UsuariosLista = () => {
    const [opened, { open, close }] = useDisclosure(false);
    // eslint-disable-next-line no-unused-vars
    const [onEdit, setOnEdit] = useState(false);

    const heading = [
        'Id de usuario', 'Nombre de usuario', 'Correo electrónico', 'Permisos'
    ];

    const [lista, setLista] = useState([]);
    const [filaSelect, setFilaSelect] = useState([]);
    const seleccion = (data) => {
        setFilaSelect(data);
    };

    const handleTable = async() => {
        const usuarios = await getListaUsuarios();
        const tb = [];
        usuarios.forEach((u) => {
            tb.push([u.id, u.username, u.email, u['career_permissions']]);
        });
        setLista(tb);
    };

    useEffect(() => {
        handleTable();
    }, []);
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Usuarios" title="Lista de usuarios" route="/" />
            <Flex direction="column">
                <Group w="50%" mb={15}>
                    <TextInput label="Buscar"  icon={<Search width={20} />} />
                    <Button type="button" onClick={open} disabled={!(filaSelect.length >= 3)} mt={16} leftIcon={<Edit />} >Editar</Button>
                    <Link to='/usuarios/crear'>
                        <Button color='naranja' mt={17} leftIcon={<CirclePlus />}>Crear</Button>
                    </Link>

                </Group>
                <Tabla colors="tabla-toronja" select row={seleccion} headers={heading} content={lista} />
            </Flex>
            <ModalEditarUsuario opened={opened} close={close} onEdit={onEdit} info={filaSelect} />
        </div>
    );
};

export default UsuariosLista;