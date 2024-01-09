import { Container, Group, Title } from "@mantine/core";
import { PropTypes } from 'prop-types';


const PlantillaReportePDF = ({titulo, cohorte, carrera = ""}) => {
    return (
        <Container style={{
            'max-width': '100vw',
            'padding': '0'
        }}>
            <Group position="center">
                <img className="logos" src="/img/logo/Logo-TecNM.png" alt="Logo del TecNM" />
                <img  className="logos" src="/img/logo/sep_logo.png" alt="Logo de la secretaria de educacion" />
            </Group>
            <Title order={2} ta="center">Instituto Tecnológico de Mexicali</Title>
            <hr style={{'width': '80%'}}/>
            <Title order={3}>{ titulo }</Title>
            <Title order={3}>{ carrera }</Title>
            <Title order={3}>{ cohorte }</Title>
        </Container>
    );
};

PlantillaReportePDF.propTypes = {
    titulo: PropTypes.string,
    cohorte: PropTypes.string,
    carrera: PropTypes.string,
};
export default PlantillaReportePDF;