import API from "../api";
import { getCarreras } from "./carreraHelpers";

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

/*
* Regresa una lista de las carreras y sus claves
 */
const getAllCarreras = async() => {
    const listaCarreras = await getCarreras();
    let listaC = Object.entries(listaCarreras);
    listaC = listaC.map((carrera) => Object.entries(carrera[1]));
    listaC = listaC.map((carrera) => carrera.map((c) => c.filter((dato, index) => index > 0)));
    listaC.sort();
    return listaC;
};

/*
* Regresa un arreglo de datos con el campo solicitado a partir de un arreglo de objets.
 */
const getDatoFromObjectArray = (array, dato) => {
    let datosPoblacionInc = array.map((cohorte) => Object.entries(cohorte));
    datosPoblacionInc = datosPoblacionInc.map((periodo)=> periodo.map((carrera) => carrera.filter((dato, index)=> index > 0)));
    datosPoblacionInc = datosPoblacionInc.map((periodo)=> periodo.map((carrera) => carrera.map((campo, index)=> campo[dato])));
    return datosPoblacionInc;
};

/*
* Regresa la tabla de poblacion juntando los datos de las carreras y los datos poblacionales.
*/
export const buildTable = async(data) => {
    const datos = Object.values(data);
    const datosPoblacion = getDatoFromObjectArray(datos,'poblacion');
    const table = await getAllCarreras();
    table.forEach((row, index) => {
        datosPoblacion.forEach((column) => {
            row.push(column[index]);
        });
    });
    return table;
};