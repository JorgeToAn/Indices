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
import { ArrowLeft, FileUpload, Upload } from "tabler-icons-react";
import { useDisclosure } from '@mantine/hooks';
import ResultadosLog from '../components/modals/resultadosLog';
import { subirIngresosExcel } from '../routes/api/controllers/archivosController';
import { useState } from 'react';

const SubirArchivos = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [ingresos, setIngresos] = useState(null);
    const info = {
        "errores": ["Z20490712 no es un numero de control valido", "87907 no es un numero de control de valido"],
        "advertencias": ["Ya existe un registro de titulacion para el numero de control 20490213", "Ya existe un registro de titulacion para el numero de control 18490658"],
        "guardados": "Se guardaron 845 registros correctamente"
    };
    const subirIngresos = async () => {
        const formData = new FormData();
        formData.append('file', ingresos[0], ingresos[0].name);
        console.log(ingresos);
        const res = await subirIngresosExcel(formData);
        console.log(res);
    };
    return (
        <Container>
            <ActionIcon color='naranja' variant='filled' radius='lg' mt={16} mb={16}>
                <ArrowLeft />
            </ActionIcon>
            <Title order={3}>Subir Archivos</Title>
            <p>Aqui se suben los tres archivos que utiliza el sistema para trabajar, estos deberan ser cargados una vez por semestre.<br />Los archivos deben de seguir el siguiente formato para ser aceptados en el sistema.</p>
            <Group position='center'>
                {/* Alumnos inscritos en el semestre */}
                <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={(file) => {
                    setIngresos(file);
                    subirIngresos();
                }
                }>
                    <Flex align="center" direction="column" position="center" gap="xl">
                        <Text fw={700} tt="capitalize">Alumnos Inscritos</Text>
                        {/* Es un icono */}
                        <FileUpload  size={72} color="#FFAA5A"/>
                        <FileButton color='naranja'>
                            {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                        </FileButton>
                    </Flex>

                </Dropzone>

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
                <ResultadosLog opened={opened} close={close} info={info}/>
            </Group>
        </Container>
    );
};

export default SubirArchivos;