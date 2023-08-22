import "./footer.css"
import { Button, Group, Text } from "@mantine/core";
import { CircleLetterC, QuestionMark } from "tabler-icons-react";


const Footer = () => {
    return (
        <div className="footer">
            <Button color="negro"  >
                <img src="/img/icons/question-circle.svg" id="ayuda" />
                Ayuda
            </Button>
            <div>
                <CircleLetterC  color="#FFFFFF"/>
                <Text c="#FFFFFF" fw="bold" >Instituto Tecnológico de Mexicali, 2023</Text>
            </div>
        </div>

    );
};

export default Footer;