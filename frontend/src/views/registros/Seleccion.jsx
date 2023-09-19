import {
    Group,
 } from "@mantine/core";
import BoxOption from "../../components/BoxOption";
import Header from './../../components/header';


const SeleccionRegistros = () => {
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Registros" title="" route="/" />
            <Group mt={15}>
                <BoxOption color="toronja" route="/registro/carreras" label="Registros de Carrera" />
                <BoxOption color="naranja" route="/registro/planes" label="Registro de Planes de estudio" />
                <BoxOption color="toronja" route="/registro/discapacidades" label="Registro de Discapacidades" />
            </Group>
        </div>
    );
};

export default SeleccionRegistros;