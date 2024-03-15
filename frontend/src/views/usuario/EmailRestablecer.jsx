import { Button, Center, Flex, Group, Text, TextInput, createStyles } from "@mantine/core";
import Header from "../../components/header";
import { useInputState } from "@mantine/hooks";
import { sendPasswordResetEmail } from "../../routes/api/controllers/restablecerController";
import { useNavigate } from "react-router-dom";

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
const EmailRestablecer = () => {
    const navigate = useNavigate();
    const { classes} = useStyles();
    const [email, setEmail] = useInputState('');


    const handleChange = async () => {
        const res = await sendPasswordResetEmail(email);
        if (res.status === 200) {
            navigate('/iniciar-sesion');
        }
    };
    return(
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header color="naranja" route="/" section="Usuario" title="Cambio de contraseña" />
            <Group  align="center" justify="center" mt={20} spacing="xl" >
                <Flex direction="column" align="center">
                <Text>En seguida podrás restablecer tu contraseña del sistema, recuerda que debe tener 8 caracteres como mínimo, 1 número, 1 caracter especial, 1 letra minúscula y 1 letra mayúscula.</Text>
                    <form>
                        <Group w='25vw' align="center" justify="center">
                            <TextInput id="newPassword" classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} value={email} onChange={setEmail} w="100%" label="Correo electrónico" withAsterisk />
                        </Group>
                        <Center>
                            <Button mt={10} color="naranja" onClick={handleChange}>Cambiar contraseña</Button>
                        </Center>
                    </form>
                </Flex>
            </Group>
        </div>
    );
};

export default EmailRestablecer;