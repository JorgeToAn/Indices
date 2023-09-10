import { Flex, Group } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";

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
                        ]}/>
                    <Dropdown  label="Programa educativo" color="#FF785A" data={[
                        ['ISIC','Sistemas computacionales'],
                        ['QUI','Quimica'],
                        ['IND','Industrial'],
                    ]} />
                    <Dropdown label="Periodo de inicio" color="#FFAA5A" data={[
                        ['2023-2','2023-2'],
                        ['2023-1','2023-1'],
                        ['2022-2','2022-2'],
                        ['2022-1','2022-1'],
                        ['2021-2','2021-2'],
                        ['2021-1','2021-1'],
                        ['2020-2','2020-2'],
                        ['2020-1','2020-1'],
                        ['2019-2','2019-2'],
                        ]}/>
                    <Dropdown label="Periodo de finalización" color="#FFAA5A" data={[
                        ['2023-2','2023-2'],
                        ['2023-1','2023-1'],
                        ['2022-2','2022-2'],
                        ['2022-1','2022-1'],
                        ['2021-2','2021-2'],
                        ['2021-1','2021-1'],
                        ['2020-2','2020-2'],
                        ['2020-1','2020-1'],
                        ['2019-2','2019-2'],
                        ]}/>
                    <Dropdown  label="Exportar" color="#FF785A" data={[
                        ['Excel','Excel'],
                        ['PDF','PDF'],
                    ]} />
                </Group>
                <Tabla />
            </Flex>
        </div>
    );
};

export default TablaPoblacion;