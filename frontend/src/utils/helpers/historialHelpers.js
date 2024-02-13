export const ordenarRegistros = (registros, carrera) => {
    const registrosOrdenados = [];
    registros.forEach((reg) => {
        registrosOrdenados.push([`Semestre ${reg['id']}`, `${reg['periodo'].slice(0,4)}-${reg['periodo'].slice(4,5)}`, carrera]);
    });
    return registrosOrdenados;
};