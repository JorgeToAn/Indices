import { Button, Center, Flex, Group, Text, TextInput, createStyles } from "@mantine/core";
import Header from "../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { sendNewPassword } from "../../routes/api/controllers/restablecerController";

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
const RestablecerContrasena = () => {
    const navigate = useNavigate();
    const { classes} = useStyles();
    const { t } = useParams();

    const sendPassword = async (values) => {
        if (form.validate()) {
            const res = await sendNewPassword(t, values.password);
            if (res.status === 200) {
                navigate('/iniciar-sesion');
            }
        }
    };

    const form = useForm({
        initialValues: {
            password: '',
            copyPassword: '',
            token: t
        },
        validate: {
            password: ((value) => value.length < 8 ? 'Contraseña inválida' : null),
        }
    });

    return(
        <div style={{
            align: "left",
            padding: "2vw"
        }}>
            <Header color="naranja" route="/" section="Usuario" title="Cambio de contraseña" />
            <Group  align="center" justify="center" mt={20} spacing="xl" >
                <Flex direction="column" align="center">
                <Text>En seguida podrás restablecer tu contraseña del sistema, recuerda que debe tener 8 caracteres como mínimo, 1 número, 1 caracter especial, 1 letra minúscula y 1 letra mayúscula.</Text>
                    <form onSubmit={form.onSubmit(sendPassword)}>
                        <Group w='25vw' align="center" justify="center">
                            <TextInput id="newPassword" {...form.getInputProps('password')} classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} w="100%" label="Contraseña nueva" withAsterisk />
                            <TextInput id="copyNewPassword" {...form.getInputProps('copyPassword')} classNames={{ input: classes.orangeInput, required: classes.orangeAsterisk}} w="100%" label="Repita la contraseña nueva" withAsterisk />
                        </Group>
                        <Center>
                            <Button mt={10} color="naranja" type="submit">Cambiar contraseña</Button>
                        </Center>
                    </form>
                </Flex>
            </Group>
        </div>
    );
};

export default RestablecerContrasena;