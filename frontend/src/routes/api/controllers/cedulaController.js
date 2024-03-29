import API from "../../../utils/api";

export const getCedulasTabla = async(tipo, nuevoIngreso, trasladoEquiv, cohorte, carrera, numSemestres) => {
    const res = await API.get(`cedulas/${tipo}`, {
        params: {
            'nuevo-ingreso':nuevoIngreso,
            'traslado-equivalencia':trasladoEquiv,
            'cohorte': cohorte.replace('-',''),
            'carrera': carrera,
        }
    });
    return res;
};