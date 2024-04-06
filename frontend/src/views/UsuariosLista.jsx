import { Button, Flex, TextInput } from '@mantine/core';
import Header from 'src/components/header';
import { Edit, Search } from 'tabler-icons-react';
import { Group } from '@mantine/core';
import Tabla from 'src/components/Tabla';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { getListaUsuarios } from 'src/routes/api/controllers/adminController';
import ModalEditarUsuario from './ModalEditarUsuario';

const UsuariosLista = () => {
    const [opened, { open, close }] = useDisclosure(false);

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
        let listaU = Object.entries(usuarios);
        listaU = listaU.map((lista) => Object.entries(lista[1]));
        listaU = listaU.map((disc) => disc.filter((u, index) => index === 0 || index === 4 || index === 12));
        listaU = listaU.map((disc) => disc.map((c) => c.filter((dato, index) => index > 0)));
        console.log(listaU);
        setLista(listaU);
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
                </Group>
                <Tabla colors="tabla-toronja" select row={seleccion} headers={heading} content={lista} />
            </Flex>
            <ModalEditarUsuario opened={opened} close={close} info={filaSelect} />
        </div>
    );
};

export default UsuariosLista;