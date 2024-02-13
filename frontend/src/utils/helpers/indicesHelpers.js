import API from "../api";

export const getIndicesData = async(tipo, nuevoIngreso, trasladoEquiv, cohorte, carrera, numSemestres) => {
    const response =  await API.get(`indices/${tipo}`, {
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

export const buildTablaIndices = (tipo, data, numSemestres) => {
    const tabla = [];
    const tablaIndices =Object.entries(data);
    for(let i = 0; i < numSemestres; i++) {
        switch(tipo){
            case 'permanencia':
                tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], tablaIndices[i][1]['desercion'], `${tablaIndices[i][1]['tasa_permanencia']}%`]);
                break;
            case 'desercion':
                tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], tablaIndices[i][1]['desercion'], `${tablaIndices[i][1]['tasa_desercion']}%`]);
                break;
            case 'egreso':
                tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], `${tablaIndices[i][1]['tasa_egreso']}%`]);
                break;
            case 'titulacion':
                tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], tablaIndices[i][1]['titulados'], `${tablaIndices[i][1]['tasa_titulacion']}%`]);
                break;
            default:
                tabla.push([`Semestre ${i+1}`, `${tablaIndices[i][0].slice(0,4)}-${tablaIndices[i][0].slice(4,5)}`, tablaIndices[i][1]['poblacion'], tablaIndices[i][1]['egresados'], tablaIndices[i][1]['desercion'], `${tablaIndices[i][1]['tasa_permanencia']}%`]);
                break;
        }
    }
    return tabla;
};