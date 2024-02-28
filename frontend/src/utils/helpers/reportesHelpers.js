
export const buildTablaReportesNuevoIngreso = (data) => {
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

export const buildTablaReportes = (tipo, data) => {
    const datos= Object.entries(data);
    // console.log(datos);
    const tabla = [];
    datos.forEach((registros) => {
        // Se agrega el nombre de la carrera
        const row = [registros[0], registros[1]['poblacion_nuevo_ingreso']];
        const regs = Object.entries(registros[1]['registros']);
        regs.forEach((reg) => {
            row.push(reg[1]['valor']);
        });
        tabla.push(row);
    });
    return tabla;
};
