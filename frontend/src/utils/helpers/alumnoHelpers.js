import { anioPeriodo } from './headerHelpers';

export const buildListaAlumnos = (lista, semestres, cohorte) => {
    const tabla = [];

    lista.forEach((fila) => {
        const row = [];
        const nombre = `${fila['curp']['nombre']} ${fila['curp']['paterno']} ${fila['curp']['materno']}`;
        row.push(nombre, fila['no_control'], fila['plan']['carrera'], fila['curp']['genero']);
        let periodo = cohorte.split("-");
        for(let num = 0; num < semestres; num++) {
            const dato = fila['registros']['ingresos'][num];
            if(dato !== undefined){
                if (dato['periodo'] === `${periodo[0]}${periodo[1]}`) {
                    row.push(fila['plan']['carrera']);
                } else {
                    if (fila['registros']['egresos'] !== undefined) {
                        if (fila['registros']['engresos']['periodo'] !== `${periodo[0]}${periodo[1]}`) {
                        } else {
                            row.push('EGR');
                        }
                    } else {
                        row.push('BAJA');
                    }
                }
                periodo = anioPeriodo(periodo);
            } else {
                row.push('BAJA');
            }
        }
        tabla.push(row);
        periodo = cohorte.split("-");
    });
    return tabla;
};