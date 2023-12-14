import { Button, Flex, Group, Text, TextInput } from "@mantine/core";
import Header from "../../components/header";

const CambioContrasena = () => {
    return(
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header color="naranja" route="/" section="Usuario" title="Cambio de contraseña" />
            <Group align="flex-start" mt={20} spacing="xl" >
                <Flex direction="column">
                    <form>
                        <Text>En seguida podrás cambiar tu contraseña actual del sistema, recuerda que debe tener 8 caracteres como mínimo, 1 número, 1 caracter especial, 1 letra minúscula y 1 letra mayúscula.</Text>
                        <Group w='25vw'>
                            <TextInput id="password" w="100%" color="naranja" label="Contraseña actual" withAsterisk/>
                            <TextInput id="newPassword" w="100%" label="Contraseña nueva" withAsterisk />
                            <TextInput id="copyNewPassword" w="100%" label="Repita la contraseña nueva" withAsterisk />
                        </Group>
                        <Button mt={10} color="naranja">Cambiar</Button>
                    </form>
                </Flex>
            </Group>
        </div>
    );
};

export default CambioContrasena;