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
        params: {'nuevo-ingreso':nuevoIngreso, 'traslado-equivalencia':trasladoEquiv, 'cohorte': cohorte, 'semestres': numSemestres.toString()}
    });
    return response.data;
};

const getAllCarreras = async() => {
    const listaCarreras = await getCarreras();
    let listaC = Object.entries(listaCarreras);
    listaC = listaC.map((carrera) => Object.entries(carrera[1]));
    // listaC = listaC.map((carrera) => carrera.filter((dato, index)=> index > 0));
    listaC = listaC.map((carrera) => carrera.map((c) => c.filter((dato, index) => index > 0)));
    listaC.sort();
    return listaC;
};

export const buildTable = async(data) => {
    const datos = Object.values(data);
    let datosIncompletos = datos.map((cohorte) => Object.entries(cohorte));
    datosIncompletos = datosIncompletos.map((periodo)=> periodo.map((carrera) => carrera.filter((dato, index)=> index > 0)));
    datosIncompletos = datosIncompletos.map((periodo)=> periodo.map((carrera) => carrera.filter((dato, index)=> dato['poblacion'])));
    // datosIncompletos = datosIncompletos.map(((cohorte)=> (carrera) => Object.entries(carrera[1])));
    console.log(datosIncompletos);
    // listaC = listaC.map((carrera) => carrera.filter((dato, index)=> index > 0));
    // const datos = Object.values(data);
    // const table = await JSON.parse(JSON.stringify(getAllCarreras()));
    const table = await getAllCarreras();
    // console.log(table);

    // table.forEach((row, index) => {
    //     datos.forEach((column) => {
    //         row.push(column[index]);
    //     });
    // });
    return table;
};