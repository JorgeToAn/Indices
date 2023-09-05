import { Select } from "@mantine/core";
import { PropTypes } from 'prop-types';
import { Selector } from "tabler-icons-react";

function Dropdown ({label, color, data}) {
    return(
        <Select
        searchable
        label={label}
            placeholder={label}
            data={ data.map((fila) => ({"value":fila[0], "label":fila[1]})) }
            rightSection={
                <Selector color={'#FFF'}/>
            }
            styles={(theme) => ({
                input: {
                    '&:focus-within': {
                        backgroundColor: theme.white,
                        borderColor: color,
                        color: theme.black,
                        fontWeight: "400",
                    },
                    '&::placeholder': {
                        color: theme.white,
                    },
                    backgroundColor: color,
                    color: theme.white,
                    borderRadius: "md",
                    fontWeight: "bold",
                },
                label: {
                    visibility: "hidden",
                    fontWeight: "bold",
                },
                root: {
                    color: theme.white,
                    '&:focus-within': {
                        label: {
                            visibility: "visible",
                        }
                    }
                }

            })}
            />
    );
};
Dropdown.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.array
};
export default Dropdown;