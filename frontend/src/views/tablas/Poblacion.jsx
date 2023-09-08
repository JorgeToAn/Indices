import { Flex, Group } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";

const TablaPoblacion = () => {
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Indices" title="Egreso por cohorte generacional" route="/" />
            <Flex direction="column">
                <Group mt={0} mb={16}>
                    <Dropdown label="Población" color="#FFAA5A" data={[
                        ['Nuevo ingreso','Nuevo ingreso'],
                        ['Por carrera','Por carrera'],
                        ['Egresados','Egresados'],
                        ['Titulados','Titulados']
                        ]}/>
                    <Dropdown label="Semestres" color="#FFAA5A" data={[
                        ['Todos los semestres','Nuevo ingreso'],
                        ['Semestres impares','Semestres impares'],
                        ['Semestres pares','Semestres pares']
                        ]}/>git
                </Group>
            </Flex>
        </div>
    );
};

export default TablaPoblacion;