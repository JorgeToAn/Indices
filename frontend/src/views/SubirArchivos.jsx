import {
    Container,
    Button,
    Title,
    Text,
    Group,
    FileButton,
    Flex,
    Modal
} from '@mantine/core'
import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react';
import { ArrowLeft, CircleCheck, FileUpload, Upload } from "tabler-icons-react";
import ResultadosLog from '../components/resultadosLog';

function SubirArchivos ({}) {
    const [opened, setOpened] = useState(false);
    const handleModal = () => {
        console.log(opened);
        setOpened(true);
    }
    return (
        <Container>
            <Button color="naranja">
                <ArrowLeft />
            </Button>
            <Title order={3}>Subir Archivos</Title>
            <p>Aqui se suben los tres archivos que utiliza el sistema para trabajar, estos deberan ser cargados una vez por semestre.<br />Los archivos deben de seguir el siguiente formato para ser aceptados en el sistema.</p>
            <Group>
                <Dropzone accept="MS_EXCEL_MIME_TYPE" onDrop={handleModal}>
                    <Flex align="center" direction="column" position="center" gap="xl">
                        <Text fw={700} tt="capitalize">Alumnos Inscritos</Text>
                        {/* Es un icono */}
                        <FileUpload  size={72} color="#FFAA5A"/>
                        <FileButton color='naranja'>
                            {(props) => <Button color="naranja" leftIcon={<Upload />}>Subir Archivos</Button>}
                        </FileButton>
                    </Flex>

                    <Dropzone.Accept>
                        <ResultadosLog />
                        { console.log("Archivo aceptado")}
                        
                    </Dropzone.Accept>
                    {/* <Modal  opened={opened} onClose={close} title="Resultados" centered>
                        <Group position='center' align="center">
                        <Button leftIcon={<CircleCheck />} color="verde">Continuar</Button>
                        <Button color="gris">Cancelar</Button>
                        </Group>
                    </Modal> */}

                </Dropzone>
            </Group>
        </Container>
    );
};

export default SubirArchivos;