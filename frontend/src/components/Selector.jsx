import { Select } from "@mantine/core";
import "./Selector.css";
import { PropTypes } from 'prop-types';

function Selector ({label, data, color}) {
    // const handleClick = (element) => {
    //     // const select = document.getElementById(element+"-label");
    //     console.log(element);
    //     // select.style.display="block";
    // };
    return(
        <Select
        className={"selector "+color}
        label={label}
            placeholder={label}
            data={data.map((fila) => ({"value":fila[0], "label":fila[1]}) )}
            styles={(theme) => ({
                input: {
                    backgroundColor: "#FF785A",
                    color: theme.white,
                    borderRadius: "md",
                },
                label: {
                    visibility: "hidden"
                }
            })}
            variant="filled"
            />
    );
};

Selector.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.array
};
export default Selector;