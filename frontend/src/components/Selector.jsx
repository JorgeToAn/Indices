import { Select } from "@mantine/core";
import "./Selector.css";
import { PropTypes } from 'prop-types';

function Selector ({label, data, color}) {
    const handleClick = (element) => {
        // const select = document.getElementById(element+"-label");
        console.log(element);
        // select.style.display="block";
    };
    return(
        <Select
            onClick={handleClick(this)}
            className={"selector "+color}
            label={label}
            placeholder={label}
            data={[
                {value: 'Sistemas computacionales', label:"Sistemas computacionales"},
                {value: 'Quimica', label:"Quimica"},
                {value: 'Industrial', label:"Industrial"},
            ]}
            styles={(theme) => ({
                input: {
                    backgroundColor: "#FF785A",
                    color: theme.white,
                    borderRadius: "md",
                },
                dropdown: {
                    color: '#FFFFFF',
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