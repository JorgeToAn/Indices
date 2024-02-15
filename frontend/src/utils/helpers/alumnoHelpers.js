import API from './../api';
import { anioPeriodo } from './headerHelpers';

export const getAlumnoInfo = async(numControl) => {
    const res = await API.get('/alumnos/historial/'+numControl);
    const alumnoData = res.data;
    return alumnoData;
};

export const updateAlumnoInfo = async(alumno, curp) => {
    let success = true;
    let res = await API.put(`/personal/${curp}/`,alumno)
    .catch((error) => {
        success = false;
    });
    if(success){
        // eslint-disable-next-line no-unused-vars
        res = await API.put(`/alumnos/${alumno.get('no_control')}/`, alumno)
        .catch((error) => {
            success = false;
        });
    }
    return success;
};

export const getAllAlumnosHistorial = async(pagina, link='/alumnos/historial') => {
    const res = await API.get(link);
    const data = res.data;
    return data;
};

export const getFullHistorial = async(cohorte, semestres) => {
    let res = await API.get('/alumnos/historial');
    let data = res.data;
    const historial = [buildListaAlumnos(data['results'], semestres, cohorte)];
    while(data['next'] !== null){
        res = await API.get(data['next']);
        data = res.data;
        const pagina = buildListaAlumnos(data['results'], semestres, cohorte);
        historial.push(pagina);
    }
    return historial;
};

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