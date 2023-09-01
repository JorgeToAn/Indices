
import { Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
import './Tabla.css';

function Tabla ({headers, content, colors, doubleHeader}) {

    return(
        <Table highlightOnHover withBorder withColumnBorders horizontalSpacing='xs' verticalSpacing='xs' className={colors}>
            {doubleHeader ?
                <thead>
                    { headers.map( (fila, index) => index === 0 ? <tr key={index}><th colSpan={headers[index+1].length}>{fila[0]}</th></tr> : <tr key={index}>
                    { fila.map( (celda, i) => <th key={i}>{celda}</th>)}
                    </tr>) }
                </thead>
            :
                <thead>
                    <tr>
                        { headers.map( (head, index) =><th key={index}>{head}</th>) }
                    </tr>
                </thead>

            }
            <tbody>
                { content.map( (fila, index) => <tr key={index}>
                    { fila.map( (celda, i) => <td key={i}>{celda}</td>)}
                </tr>) }
            </tbody>
        </Table>
    );
};

Tabla.propTypes = {
    headers : PropTypes.array,
    content : PropTypes.array,
    colors: PropTypes.string,
    doubleHeader: PropTypes.bool,
};
export default Tabla;