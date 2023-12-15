
import { Badge, ScrollArea, Table } from '@mantine/core';

import { PropTypes } from 'prop-types';
import './Tabla.css';

function Tabla ({headers, content, colors, doubleHeader}) {

    return(

        <ScrollArea w={1200} h="50vh" mah={500} type='always' >
            <Table highlightOnHover withBorder withColumnBorders horizontalSpacing='xs' verticalSpacing='xs' className={colors+" tabla"}>
                {/* Si la propiedad "doubleHeader" es true, entonces la primer celda del primer renglon
                tendra una longitud de toda la tabla, si no, entonces solo habra un renglon en donde cada
                columna es un encabezado */}
                {doubleHeader ?
                    <thead>
                        { headers.map( (fila, index) => index === 0 ? (fila[4] === "" || fila[0] !== "") ? <tr key={index}><th colSpan={headers[index+1].length}>{fila[0]}</th></tr> :
                        <tr key={index}>
                            { fila.map( (celda, i) => <th key={i} className='doble-encabezado'>{celda}</th>)}
                        </tr> :
                        <tr key={index}>
                            { fila.map( (celda, i) => celda === 'Nombre' ? <th key={i} className='celda-nombre'>{celda}</th> : <th key={i}>{celda}</th>)}
                        </tr> )}
                    </thead>
                :
                    <thead>
                        <tr>
                            { headers.map( (head, index) => head === "Nombre" ? <th key={index}  className='celda-nombre'>{head}</th> : <th key={index}>{head}</th>) }
                        </tr>
                    </thead>
            }
             {
                <tbody>
                    { content.map( (fila, index) => <tr key={index}>
                        { fila.map( (celda, i) => celda === 'BAJA' ? <td key={i} className='especial' ><Badge variant='filled' color='rojo'>{celda}</Badge></td> : celda === 'EGR' ? <td key={i} className='especial'> <Badge variant='filled' color='verde'>{celda}</Badge></td>: <td key={i}>{celda}</td>)}
                    </tr>) }
                </tbody>
            }
            </Table>
        </ScrollArea>
    );
};

Tabla.propTypes = {
    headers : PropTypes.array,
    content : PropTypes.array,
    colors: PropTypes.string,
    doubleHeader: PropTypes.bool,
};
export default Tabla;
