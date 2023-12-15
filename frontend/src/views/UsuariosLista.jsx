import { Button, Flex, TextInput } from '@mantine/core';
import Header from '../components/header';
import { Edit, Search } from 'tabler-icons-react';
import { Group } from '@mantine/core';
import Tabla from '../components/Tabla';
import { getListaUsuarios } from '../utils/helpers/adminHelpers';
import { useEffect, useState } from 'react';

const UsuariosLista = () => {
    const heading = [
        'Id de usuario', 'Nombre de usuario', 'Correo electrónico', 'Permisos'
    ];
    const [lista, setLista] = useState([]);

    const handleTable = async() => {
        const usuarios = await getListaUsuarios();
        let listaU = Object.entries(usuarios);
        listaU = listaU.map((lista) => Object.entries(lista[1]));
        listaU = listaU.map((disc) => disc.filter((u, index) => index === 0 || index === 4 || index === 12));
        listaU = listaU.map((disc) => disc.map((c) => c.filter((dato, index) => index > 0)));
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
            <Header color="naranja" section="Usuarios" title="Lista de usuarios" route="/" />
            <Flex direction="column">
                <Group w="50%" mb={15}>
                    <TextInput label="Buscar"  icon={<Search width={20} />} />
                    <Button type="button" mt={16} leftIcon={<Edit />}>Editar</Button>
                </Group>
                <Tabla colors="tabla-toronja" headers={heading} content={lista} />
            </Flex>
        </div>
    );
};

export default UsuariosLista;