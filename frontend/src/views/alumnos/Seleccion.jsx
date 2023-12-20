import {
    Group,
 } from "@mantine/core";
import BoxOption from "../../components/BoxOption";
import Header from './../../components/header';


const SeleccionAlumnos = () => {
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Alumnos" title="" route="/" />
            <Group mt={15}>
                <BoxOption color="toronja" route="/alumnos/lista" label="Lista de Alumnoso" />
                <BoxOption color="naranja" route="/alumnos/historial" label="Historial de Alumnos" />

            </Group>
        </div>
    );
};

export default SeleccionAlumnos;