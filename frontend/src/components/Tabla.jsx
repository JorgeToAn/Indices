
import { Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
import './Tabla.css';

function Tabla ({headers, content, colors}) {
    
    return(
        <Table highlightOnHover withBorder withColumnBorders horizontalSpacing='md' verticalSpacing='sm' className={colors}>
            <thead>
                <tr>
                    { headers.map( (head, index) =><th key={index}>{head}</th>) }
                </tr>
            </thead>
            <tbody>
                { content.map( (fila, index) => <tr key={index}>
                    <td>{fila[0]}</td>
                    <td style={{width:'300px'}}>{fila[1]}</td>
                    <td>{fila[2]}</td>
                </tr>)}
            </tbody>
        </Table>
    );
};

Tabla.propTypes = {
    headers : PropTypes.array,
    content : PropTypes.array,
    colors: PropTypes.string,
};
export default Tabla;