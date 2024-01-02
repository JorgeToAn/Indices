
import { Badge, Checkbox, ScrollArea, Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
import './Tabla.css';
import { useState } from 'react';

function Tabla ({headers, content, colors, doubleHeader, tripleHeader, select, row}) {
    const [selectedRow, setSelectedRow] = useState([]);
    const getBlankSpaces = (index) => {
        for (let i = index+1; i < headers[0].length; i++) {
            if(headers[0][i] !== '')
                return (i-index+1) > 5 ? 5 : (i-index+1);
        }
        return index > 0 ? headers[1].length-1 : headers[1].length;
    };
    return(

        <ScrollArea w={1200} h="50vh" mah={500} type='always' >
            <Table highlightOnHover withBorder withColumnBorders horizontalSpacing='xs' verticalSpacing='xs' className={colors+" tabla"}>
                {/* Si la propiedad "doubleHeader" es true, entonces la primer celda del primer renglon
                tendra una longitud de toda la tabla, si no, entonces solo habra un renglon en donde cada
                columna es un encabezado */}
                {tripleHeader ?
                    <thead>
                        <tr>
                            {/* { headers[0].filter((cell, index) => cell !== '').map((cell, index) => headers[2][headers[0].indexOf(cell)] === '' ? <th key={index} rowSpan="3">{ cell }</th> : headers[0][index+4] === '' ?  <th key={index} colSpan="5">{ cell }</th> : headers[0][index+2] === '' && headers[0][index+1] === '' ? <th key={index} colSpan="3">{ cell }</th> : <th key={index}>{ cell }</th>)} */}
                            { headers[0].filter((cell, i) => cell !== '').map((cell, index) => headers[2][headers[0].indexOf(cell)] === '' ? <th key={index} rowSpan="3">{ cell }</th> : <th key={index} colSpan={getBlankSpaces(headers[0].indexOf(cell))}>{ cell }</th>)}
                        </tr>
                        <tr>
                            { headers[1].filter((cell, index) => cell !== '').map((cell, index) => headers[2][headers[1].indexOf(cell)] === '' ? <th key={index} rowSpan="2">{ cell }</th> : <th key={index}>{ cell }</th>)}
                        </tr>
                        <tr>
                            { headers[2].filter((cell, index) => cell !== '').map((cell, index) => <th key={index}>{ cell }</th>)}
                        </tr>
                    </thead>
                :
                doubleHeader ?
                    <thead>
                        <tr>
                            { select ? <td></td> : null}
                            { headers[0].filter((cell, i) => cell !== '').map((cell, index) => headers[1][headers[0].indexOf(cell)] === '' ? <th key={index} rowSpan="2">{cell}</th> : <th key={index} colSpan={getBlankSpaces(headers[0].indexOf(cell))}>{ cell }</th>) }
                        </tr>
                        <tr>
                            { select ? <td></td> : null}
                            { headers[1].filter((cell, i) => cell !== '').map((cell, index) => cell === 'Nombre' ? <th key={index} className='celda-nombre'>{cell}</th> : <th key={index}>{cell}</th>) }
                        </tr>
                        {/* { headers.map( (fila, index) => index === 0 ? (fila[4] === "" || fila[0] !== "") ? <tr key={index}><th colSpan={headers[index+1].length}>{fila[0]}</th></tr> :
                        <tr key={index}>
                            { select ? <td></td> : null}
                            { fila.map( (celda, i) => <th key={i} className='doble-encabezado'>{celda}</th>)}
                        </tr> :
                        <tr key={index}>
                            { select ? <td></td> : null}
                            { fila.map( (celda, i) => celda === 'Nombre' ? <th key={i} className='celda-nombre'>{celda}</th> : <th key={i}>{celda}</th>)}
                        </tr> )} */}
                    </thead>
                :
                    <thead>
                        <tr>

                        { select ? <td></td> : null}
                            { headers.map( (head, index) => head === "Nombre" ? <th key={index} className='celda-nombre'>{head}</th> : <th key={index}>{head}</th>) }
                        </tr>
                    </thead>
                }
                {
                <tbody>
                    { content.map( (fila, index) => <tr key={index} style={{backgroundColor: selectedRow === fila ? '#F1F3F5' : '#FFFFFF'}}>
                        {
                            select ? <td><Checkbox checked={selectedRow === fila} radius='sm' onChange={(event) => {
                                if (event.target.checked) {
                                    row(fila);
                                    setSelectedRow(fila);
                                } else {
                                    row([]);
                                    setSelectedRow([]);
                                }
                            }}/></td> : null
                        }
                        {
                            fila.map( (celda, i) => celda === 'BAJA' ? <td key={i} className='especial' ><Badge variant='filled' color='rojo'>{celda}</Badge></td> : celda === 'EGR' ? <td key={i} className='especial'> <Badge variant='filled' color='verde'>{celda}</Badge></td>: <td key={i}>{celda}</td>)
                        }
                        </tr>
                    )}
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
    tripleHeader: PropTypes.bool,
    select: PropTypes.bool,
    row: PropTypes.func,
};
export default Tabla;
