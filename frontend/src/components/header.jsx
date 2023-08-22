import { 
    ActionIcon,
    Flex,
    Title
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "tabler-icons-react";

function Header ({props}) {
    const navigate = useNavigate();
    const handleRoute = () => {
        navigate(props.route);
    }
    return(
        <Flex direction="column">
            <ActionIcon onClick={handleRoute} color={props.color} radius="xl" variant="filled" mb={10} >
                <ArrowLeft />
            </ActionIcon>
            <Title order={3} className="titulo-t"><span>{props.section}</span> {props.title}</Title>
        </Flex>
    );
};

export default Header;