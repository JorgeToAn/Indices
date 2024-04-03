import API from "src/utils/api";

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