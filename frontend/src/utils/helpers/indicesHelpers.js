import API from "../api";

export const getIndicesPermanencia = async(nuevoIngreso, trasladoEquiv, cohorte, carrera, numSemestres) => {
    const response =  await API.get('indices/permanencia', {
        params: {
            'nuevo-ingreso':nuevoIngreso,
            'traslado-equivalencia':trasladoEquiv,
            'cohorte': cohorte.replace('-',''),
            'carrera': carrera,
            'semestres': numSemestres.toString()
        }
    });
    return response.data;
};

export const buildTablaIndices = (data, numSemestres) => {
    const tabla = [];
    const tablaIndices =Object.entries(data);
    for(let i = 0; i < numSemestres; i++) {
        tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], tablaIndices[i][1]['desercion'], `${tablaIndices[i][1]['tasa_permanencia']}%`]);
    }
    return tabla;
};