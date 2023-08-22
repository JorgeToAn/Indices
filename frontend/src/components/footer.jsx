import { Button, Group } from "@mantine/core";
import { CircleLetterC, QuestionMark } from "tabler-icons-react";


const Footer = () => {
    return (
        <div className="footer">
            <Button color="negro" leftIcon={<QuestionMark />}>Ayuda</Button>
            <div>
                <CircleLetterC />
                Instituto Tecnológico de Mexicali, 2023
            </div>
        </div>

    );
};

export default Footer;