import { getCarreras } from "./carreraHelpers";
/*
* Regresa una lista de las carreras y sus claves
 */
export const getAllCarreras = async() => {
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