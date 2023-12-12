import { Flex, Group } from "@mantine/core";
import Header from "../../components/header";
import Dropdown from "../../components/Dropdown";
import Tabla from "../../components/Tabla";

const TablaPoblacion = () => {
    const tabla = [
        ['Contador Público', 'CP', '14','16','25','30','27'],
        ['Ingeniería Electrica', 'ELE', '14','16','25','30','27'],
        ['Ingeniería Electronica', 'ELN', '14','16','25','30','27'],
        ['Ingeniería Mecatronica', 'MKT', '14','16','25','30','27'],
        ['Ingeniería Industrial', 'IND', '14','16','25','30','27'],
        ['Ingeniería Mecanica', 'MEC', '14','16','25','30','27'],
        ['Ingeniería en Energias Renovables','ENR', '14','16','25','30','27'],
        ['Ingeniería en Gestion Empresarial','GEM', '14','16','25','30','27'],
        ['Ingeniería en Sistemas Computacionales','SYC', '14','16','25','30','27'],
        ['Ingeniería Quimica','QUI','14','16','25','30','27'],
        ['Ingeniería en Logistica','LOG', '14','16','25','30','27']
    ];

    const headers = [
        "Carrera", "", "2015-1","2015-2", "2016-1", "2016-2", "2017-1"
     ];
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Tablas" title="Población" route="/" />
            <Flex direction="column">
                <Group mt={0} mb={16}>
                    <Dropdown label="Población" color="#FF785A" data={[
                        ['Nuevo ingreso','Nuevo ingreso'],
                        ['Por carrera','Por carrera'],
                        ['Egresados','Egresados'],
                        ['Titulados','Titulados']
                        ]}/>
                    <Dropdown label="Semestres" color="#FF785A" data={[
                        ['Todos los semestres','Todos los semestres'],
                        ['Semestres impares','Semestres impares'],
                        ['Semestres pares','Semestres pares']
                        ]}/>
                    <Dropdown  label="Programa educativo" color="#FF785A" data={[
                        ['ISIC','Sistemas computacionales'],
                        ['QUI','Quimica'],
                        ['IND','Industrial'],
                    ]} />
                    <Dropdown label="Cohorte generacional" color="#FF785A" data={[
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
                    <Dropdown label="Ultimo semestre" color="#FF785A" data={[
                        ['9','9 semestres'],
                        ['10','10 semestres'],
                        ['11','11 semestres'],
                        ['12','12 semestres'],
                        ['13','13 semestres'],
                        ['14','14 semestres'],
                        ['15','15 semestres'],
                        ]}/>
                    <Dropdown  label="Exportar" color="#FF785A" data={[
                        ['Excel','Excel'],
                        ['PDF','PDF'],
                    ]} />
                </Group>
                <Tabla headers={headers} content={tabla} colors="tabla-toronja" />
            </Flex>
        </div>
    );
};

export default TablaPoblacion;