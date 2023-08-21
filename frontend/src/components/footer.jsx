import { Button, Group } from "@mantine/core";
import { CircleLetterC, QuestionMark } from "tabler-icons-react";


const Footer = () => {
    return (
        <Group>
            <Button color="negro" leftIcon={<QuestionMark />}>Ayuda</Button>
            <div>
                <CircleLetterC />
                Instituto Tecnológico de Mexicali, 2023
            </div>
        </Group>

    );
};

export default Footer;