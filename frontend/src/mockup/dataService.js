
const tablaPermanencia = [
    ['Indices de rendimiento escolar cohorte generacional'],
    ['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion'],
    ['Semestre 1', '2015-1', '41','0','10','31','75.61'],
    ['Semestre 2', '2015-2', '31','0','5','26','63.41'],
    ['Semestre 4', '2016-1', '26','0','3','23','56.10'],
    ['Semestre 5', '2016-2', '23','0','2','21','51.22'],
    ['Semestre 6', '2017-1', '21','0','0','21','51.22'],
    ['Semestre 7', '2017-2', '18','0','0','18','43.90'],
    ['Semestre 8', '2018-1', '16','0','0','16','39.02'],
    ['Semestre 9', '2018-2', '16','0','0','16','39.02'],
    ['Semestre 10', '2019-1', '16','1','2','16','39.02'],
    ['Semestre 11', '2019-2', '13','5','0','8','19.51'],
    ['Semestre 12', '2020-1', '8','2','0','6','14.63'],
    ['Semestre 13', '2020-2', '6','2','2','2','4.88'],
    ['Semestre 14', '2021-1', '2','2','0','0','4.88'],
    ['Semestre 15', '2021-2', '2','2','0','0','4.88'],
];

function datosIndicesPermanencia(cohorte, numSemestres, carrera) {
    const tabla = [];
    let activoInd = 0;
    let desercionInd = 0;
    let matriculaInd = 0;
    let tasaInd = 0;
    let periodo = [];

    tabla.push(tablaPermanencia[0]);
    tabla[0][0] += cohorte + " " + carrera;
    tabla.push(tablaPermanencia[1]);
    for (const c in tabla[1]) {
        switch(tabla[1][c]) {
            case 'inscritos':
                activoInd = c;
                break;
            case 'desercion':
                desercionInd = c;
                break;
            case 'matricula final':
                matriculaInd = c;
                break;
            case 'tasa de retencion':
                tasaInd = c;
                break;
            default: continue;
        }
    }
    for (let sem = 0; sem < numSemestres; sem++) {
        if (sem === 0){
            periodo = cohorte.split("-");
        } else {
            periodo = anioPeriodo(periodo);
        }
        tabla[sem][1] = periodo[0]+"-"+periodo[1];
        tabla[sem][matriculaInd] = tabla[sem][activoInd]-tabla[sem][desercionInd];
        tabla[sem][tasaInd] = (tabla[sem][matriculaInd]/tabla[sem][activoInd])*100;
    }
    return tabla;
};

function anioPeriodo(periodoAnterior) {
    if (periodoAnterior[0] === '2') {
        periodoAnterior[0] = Number(periodoAnterior[0]) + 1;
    } else if (periodoAnterior.periodo === '1') {
        periodoAnterior[1] = Number(periodoAnterior[1])+ 1;
    }
    return periodoAnterior;
}
export default  datosIndicesPermanencia;
