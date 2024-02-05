import API from "../api";

/*
* @param {Boolean} nuevoIngreso - "true" si se incluyen alumnos que entraron por examen o convalidacion.
* @param {Boolean} trasladoEquiv - "true" si se incluyen alumnos que de traslado y equivalncias.
* @param {String} cohorte - Indica el periodo en el que inicia la tabla, se denota por el año seguido de un '-' y despues un numero del 1 al 3 correspondiente al periodo (1 es enero-junio, 2 es verano y 3 es agosto-diciembre).
* @param {Number} numSemestres - Idica el numero de periodos que se incluyen en la tabla.
*/

export const getTablasPoblacion = async(nuevoIngreso, trasladoEquiv, cohorte, numSemestres) => {

    const response =  await API.get('tablas/poblacion', {
        params: {'nuevo-ingreso':nuevoIngreso, 'traslado-equivalencia':trasladoEquiv, 'cohorte': cohorte, 'semestres': numSemestres.toString()}
    });
    return response.data;
};

const baseTable = [
    ['Contador Público', 'CP', ],
    ['Ingeniería Electrica', 'ELE',],
    ['Ingeniería Electronica', 'ELN', ],
    ['Ingeniería Mecatronica', 'MKT',],
    ['Ingeniería Industrial', 'IND',],
    ['Ingeniería Mecanica', 'MEC',],
    ['Ingeniería en Energias Renovables','ENR', ],
    ['Ingeniería en Gestion Empresarial','GEM', ],
    ['Ingeniería en Sistemas Computacionales','SYC',],
    ['Ingeniería Quimica','QUI'],
    ['Ingeniería en Logistica','LOG',]
];

export const buildTable = (data) => {
    const datos = Object.values(data);
    const table = [...baseTable];
    table.forEach((row, index) => {
        datos.forEach((column) => {
            row.push(column[index]);
        });
    });
    return table;
};