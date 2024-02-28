import API from "../../../utils/api";
import { buildTablaReportes, buildTablaReportesNuevoIngreso } from "../../../utils/helpers/reportesHelpers";

export const getReportesNuevoIngreso = async(nuevoIngreso, trasladoEquiv, cohorte, numSemestres) => {
    const res =  await API.get('/reportes/nuevo-ingreso',  {
        params: {'nuevo-ingreso':nuevoIngreso, 'traslado-equivalencia':trasladoEquiv, 'cohorte': cohorte.replace('-',''), 'semestres': numSemestres.toString()}
    });
    const reporte = buildTablaReportesNuevoIngreso(res.data);
    return reporte;
};

export const getReportesEgresoTitulacion = async(tipo, nuevoIngreso, trasladoEquiv,cohorte,numSemestres) => {
    const res =  await API.get(`/reportes/${tipo}`,  {
        params: {'nuevo-ingreso':nuevoIngreso, 'traslado-equivalencia':trasladoEquiv, 'cohorte': cohorte.replace('-',''), 'semestres': numSemestres.toString()}
    });
    const tabla = buildTablaReportes(tipo, res.data);
    return tabla;
};