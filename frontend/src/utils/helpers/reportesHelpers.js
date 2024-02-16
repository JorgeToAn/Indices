import API from "../api";

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
    return res;
};

const buildTablaReportesNuevoIngreso = (data) => {
    const datos= Object.entries(data);
    const tabla = [];
    datos.forEach((registros) => {
        const row = [registros[0]];
        const regs = Object.entries(registros[1]);
        regs.forEach((reg) => {
            row.push(reg[1]['poblacion']);
        });
        tabla.push(row);
    });
    console.log(tabla);
    return tabla;
};
