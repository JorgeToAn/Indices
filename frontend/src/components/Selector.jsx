import { Select } from "@mantine/core";


function Selector ({label, data, color}) {
    return(
        <Select 
            label={label}
            data={
                [ data.map((val, index) => { value: val[index], label: val[index+1]})]
            }
        />
    );
};

export default Selector;