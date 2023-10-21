import {
    Container,
    Button,
    Title,
    Text,
    Group,
    FileButton,
    Flex,
    ActionIcon
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { ArrowLeft, Download, FileUpload, Upload } from "tabler-icons-react";
import ResultadosLog from '../components/resultadosLog';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

const SubirArchivos = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const info = {
        "errores": ["Z20490712 no es un numero de control valido", "87907 no es un numero de control de valido"],
        "advertencias": ["Ya existe un registro de titulacion para el numero de control 20490213", "Ya existe un registro de titulacion para el numero de control 18490658"],
        "guardados": "Se guardaron 845 registros correctamente"
    };
    return (
        <Container>
            <ActionIcon color='naranja' variant='filled' radius='lg' mt={16} mb={16}>
                <ArrowLeft />
            </ActionIcon>
            {/* <Button color="naranja">
                <ArrowLeft />
            </Button> */}
            <Title order={3}>Subir Archivos</Title>
            <p>Aqui se suben los tres archivos que utiliza el sistema para trabajar, estos deberan ser cargados una vez por semestre.<br />Los archivos deben de seguir el siguiente formato para ser aceptados en el sistema.</p>
            <Group position='center'>
                {/* Alumnos inscritos en el semestre */}
                <div>
                    <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={open}>
                        <Flex align="center" direction="column" position="center" gap="xl">
                            <Text fw={700} tt="capitalize">Alumnos Inscritos</Text>
                            {/* Es un icono */}
                            <FileUpload  size={72} color="#FFAA5A"/>
                            <FileButton color='naranja'>
                                {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                            </FileButton>
                        </Flex>
                    </Dropzone>
                    <Link to="/documents/Plantilla_Lista_Alumnos.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>

                {/* Alumnos egresados */}
                <div>
                    <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={open}>
                        <Flex align="center" direction="column" position="center" gap="xl">
                            <Text fw={700} tt="capitalize">Egresados</Text>
                            {/* Es un icono */}
                            <FileUpload  size={72} color="#FFAA5A"/>
                            <FileButton color='naranja'>
                                {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                            </FileButton>
                        </Flex>
                    </Dropzone>
                    <Link to="/documents/Plantilla_Lista_Egresados.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>

                {/* Alumnos titulados */}
                <div>
                    <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={open}>
                        <Flex align="center" direction="column" position="center" gap="xl">
                            <Text fw={700} tt="capitalize">Titulados</Text>
                            {/* Es un icono */}
                            <FileUpload  size={72} color="#FFAA5A"/>
                            <FileButton color='naranja'>
                                {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                            </FileButton>
                        </Flex>
                    </Dropzone>
                    <Link to="/documents/Plantilla_Lista_Titulados.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>
                <ResultadosLog opened={opened} close={close} info={info}/>
            </Group>
            <Group align='center' justify='center' size='md' >
                <Text>Si tiene dudas sobre como usar el sistema, descargue el manual de usuario dando clic en el boton de abajo.</Text>
                <Link to="" target='_blank' download>
                    <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris'>Descargar Manual de Usuario</Button>
                </Link>
            </Group>
        </Container>
    );
};

export default SubirArchivos;