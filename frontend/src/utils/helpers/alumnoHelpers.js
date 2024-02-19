import { anioPeriodo } from './headerHelpers';

export const buildListaAlumnos = (lista, semestres, cohorte) => {
    const tabla = [];

    lista.forEach((fila) => {
        const row = [];
        const nombre = `${fila['curp']['nombre']} ${fila['curp']['paterno']} ${fila['curp']['materno']}`;
        row.push(nombre, fila['no_control'], fila['plan']['carrera'], fila['curp']['genero']);
        let num = 0;
        let periodo = cohorte.split("-");
        while(num < semestres) {
            fila['registros']['ingresos'].forEach((ingreso) => {
                if (ingreso['periodo'] === `${periodo[0]}${periodo[1]}`) {
                    row.push(fila['plan']['carrera']);
                } else {
                    row.push('BAJA');
                    // if (fila['registros']['engresos']['periodo'] !== `${periodo[0]}${periodo[1]}`) {
                    // } else {
                    //     row.push('EGR');
                    // }
                }
                num++;
                periodo = anioPeriodo(periodo);
            });
        }
        tabla.push(row);
        num = 0;
        periodo = cohorte.split("-");
    });
    return tabla;
};