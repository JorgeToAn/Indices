import API from "../../../utils/api";

/*
* @param {Boolean} nuevoIngreso - "true" si se incluyen alumnos que entraron por examen o convalidacion.
* @param {Boolean} trasladoEquiv - "true" si se incluyen alumnos que de traslado y equivalncias.
* @param {String} cohorte - Indica el periodo en el que inicia la tabla, se denota por el año seguido de un '-' y despues un numero del 1 al 3 correspondiente al periodo (1 es enero-junio, 2 es verano y 3 es agosto-diciembre).
* @param {Number} numSemestres - Idica el numero de periodos que se incluyen en la tabla.
*/
export const getTablasPoblacion = async(nuevoIngreso, trasladoEquiv, cohorte, numSemestres) => {

    const response =  await API.get('tablas/poblacion', {
        params: {'nuevo-ingreso':nuevoIngreso, 'traslado-equivalencia':trasladoEquiv, 'cohorte': cohorte.replace('-',''), 'semestres': numSemestres.toString()}
    });
    return response.data;
};