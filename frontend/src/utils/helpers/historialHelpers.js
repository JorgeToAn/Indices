export const ordenarRegistros = (registros, carrera) => {
    const registrosOrdenados = [];
    registros.forEach((reg, index) => {
        registrosOrdenados.push([`Semestre ${index+1}`, `${reg['periodo'].slice(0,4)}-${reg['periodo'].slice(4,5)}`, carrera]);
    });
    return registrosOrdenados;
};