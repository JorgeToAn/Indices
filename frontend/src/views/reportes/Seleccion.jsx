import {
    Group,
 } from "@mantine/core";
import BoxOption from "../../components/BoxOption";
import Header from './../../components/header';


const SeleccionReportes = () => {
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="naranja" section="Reportes" title="" route="/" />
            <Group mt={15}>
                <BoxOption color="toronja" route="/reportes/nuevo-ingreso" label="Nuevo Ingreso" />
                <BoxOption color="naranja" route="/reportes/egreso" label="Egresados" />
                <BoxOption color="toronja" route="/reportes/titulacion" label="Titulados" />

            </Group>
        </div>
    );
};

export default SeleccionReportes;