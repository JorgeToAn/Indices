import {
    Container,
    Button,
    Title,
    Text,
    Group,
    FileButton,
    Flex,
    ActionIcon,
    Center
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { ArrowLeft, Download, FileUpload, Upload } from "tabler-icons-react";
import { useDisclosure } from '@mantine/hooks';
import ResultadosLog from '../components/modals/resultadosLog';
import { Link } from 'react-router-dom';
import './SubirArchivos.css';

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
                <div>
                    {/* Alumnos inscritos en el semestre */}
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
                    <Link to="/documents/plantillas/excel/Plantilla_Lista_Alumnos.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>

                <div>
                    {/* Alumnos egresados */}
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
                    <Link to="/documents/plantillas/excel/Plantilla_Lista_Egresados.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>

                <div>
                    {/* Alumnos titulados */}
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
                    <Link to="/documents/plantillas/excel/Plantilla_Lista_Titulados.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>

                <div>
                    {/* Liberación de ingles */}
                    <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={open}>
                        <Flex align="center" direction="column" position="center" gap="xl">
                            <Text fw={700} tt="capitalize">Liberación de ingles</Text>
                            {/* Es un icono */}
                            <FileUpload  size={72} color="#FFAA5A"/>
                            <FileButton color='naranja'>
                                {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                            </FileButton>
                        </Flex>
                    </Dropzone>
                    <Link style={{ textDecoration: 'none'}} to="/documents/plantillas/excel/Plantilla_Lista_LiberacionIngles.xlsx" target="_blank" download >
                        <Button rightIcon={<Download />} styles="textDecoration: none;" variant='light' color='gris' fullWidth mt="10px">Descargar Plantilla</Button>
                    </Link>
                </div>
                <ResultadosLog opened={opened} close={close} info={info}/>
            </Group>
            <Center mt="sm">
                <Link style={{ textDecoration: 'none'}} to="/documents/plantillas/pdf/Manual.pdf" target="_blank" download >
                    <Button rightIcon={<Download />}  variant='filled' color='negro'  mt="10px">Descargar Manual</Button>
                </Link>
            </Center>
        </Container>
    );
};

export default SubirArchivos;