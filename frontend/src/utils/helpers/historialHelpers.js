export const ordenarRegistros = (registros, carrera) => {
    const registrosOrdenados = [];
    registros.forEach((reg) => {
        registrosOrdenados.push([`Semestre ${reg['id']}`, reg['periodo'], carrera]);
    });
    return registrosOrdenados;
};