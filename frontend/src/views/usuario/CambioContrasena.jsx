import { Button, Center, Flex, Group, Text, TextInput, createStyles } from "@mantine/core";
import Header from "../../components/header";
import { useInputState } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    orangeInput: {
        '&:focus-within':{
            borderColor: '#FFAA5A',
        }
    },
    orangeAsterisk: {
        color: '#FFAA5A',
    }
}));
const CambioContrasena = () => {
    const { classes} = useStyles();
    // Bloquear boton hasta que los 4 campos sean correctos
    const [password, setPassword] = useInputState('');
    const [newPassword, setNewPassword] = useInputState('');
    const [copyNewPassword, setCopyNewPassword] = useInputState('');


    const handleChange = () => {
        return password && (newPassword === copyNewPassword) && newPassword && copyNewPassword ? true :  false;
    };
    return(
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header color="naranja" route="/" section="Usuario" title="Cambio de contraseña" />
            <Group  align="center" justify="center" mt={20} spacing="xl" >
                <Flex direction="column" align="center">
                <Text>En seguida podrás cambiar tu contraseña actual del sistema, recuerda que debe tener 8 caracteres como mínimo, 1 número, 1 caracter especial, 1 letra minúscula y 1 letra mayúscula.</Text>
                    <form>
                        <Group w='25vw' align="center" justify="center">
                            <TextInput id="password" classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} value={password} onChange={setPassword} w="100%" color="naranja" label="Contraseña actual" withAsterisk/>
                            <TextInput id="newPassword" classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} value={newPassword} onChange={setNewPassword} w="100%" label="Contraseña nueva" withAsterisk />
                            <TextInput id="copyNewPassword" classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} value={copyNewPassword} onChange={setCopyNewPassword} w="100%" label="Repita la contraseña nueva" withAsterisk />
                        </Group>
                        <Center>
                            <Button mt={10} color="naranja" disabled={!handleChange()}>Cambiar contraseña</Button>
                        </Center>
                    </form>
                </Flex>
            </Group>
        </div>
    );
};

export default CambioContrasena;