
const tablaPermanencia = [
    ["Indices de rendimiento escolar cohorte generacional",],
    ['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion'],
    ['Semestre 1', '2015-1', 41,0,10,31,75.61],
    ['Semestre 2', '2015-2', 31,0,5,26,63.41],
    ['Semestre 3', '2016-1',  26 , 0 , 3 , 23 , 56.10 ],
    ['Semestre 4', '2016-2',  23 , 0 , 2 , 21 , 51.22],
    ['Semestre 5', '2017-1',  21 , 0 , 0 , 21 , 51.22 ],
    ['Semestre 6', '2017-2',  18 , 0 , 0 , 18 , 43.90 ],
    ['Semestre 7', '2018-1',  16 , 0 , 0 , 16 , 39.02 ],
    ['Semestre 8' , '2018-2',  16 , 0 , 0 , 16 , 39.5 ],
    ['Semestre 9', '2019-1',  16 , 1 , 2 , 16 , 39.02 ],
    ['Semestre 10', '2019-2',  13 , 5 , 0 , 8 , 19.51 ],
    ['Semestre 11', '2020-1',  8 , 2 , 0 , 6 , 14.63 ],
    ['Semestre 12', '2020-1',  8 , 2 , 0 , 6 , 14.63 ],
    ['Semestre 13', '2021-1',  2 , 2 , 0 , 0 , 4.88 ],
    ['Semestre 14', '2021-2',  2 , 2 , 0 , 0 , 4.88 ],
    ['Semestre 15', '2021-2',  2 , 2 , 0 , 0 , 4.88 ],
];

const tablaDesercion = [
    ["Indices de rendimiento escolar cohorte generacional",],
    ['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Abandono','Tasa de desercion escolar', 'Tasa de abandono escolar'],
    ['Semestre 1', '2015-1', 41,0,10,6,75.61],
    ['Semestre 2', '2015-2', 31,0,5,5,23.2],
    ['Semestre 3', '2016-1',  26 , 0 , 3 , 23 , 25, 25.2 ],
    ['Semestre 4', '2016-2',  23 , 0 , 2 , 21 , 25, 25.2],
    ['Semestre 5', '2017-1',  21 , 0 , 0 , 21 , 25, 25.2 ],
    ['Semestre 6', '2017-2',  18 , 0 , 0 , 18 , 25, 25.2 ],
    ['Semestre 7', '2018-1',  16 , 0 , 0 , 16 , 25, 25.2],
    ['Semestre 8' , '2018-2',  16 , 0 , 0 , 5 , 25, 25.2 ],
    ['Semestre 9', '2019-1',  16 , 1 , 2 , 6 , 25, 25.2 ],
    ['Semestre 10', '2019-2',  13 , 5 , 0 , 8 , 25, 25.2 ],
    ['Semestre 11', '2020-1',  8 , 2 , 0 , 7 , 25, 25.2 ],
    ['Semestre 12', '2020-1',  8 , 2 , 0 ,  5, 25, 25.2 ],
    ['Semestre 13', '2021-1',  2 , 2 , 0 , 0 , 25, 25.2 ],
    ['Semestre 14', '2021-2',  2 , 2 , 0 , 0 , 25, 25.2 ],
    ['Semestre 15', '2021-2',  2 , 2 , 0 , 0 , 25, 25.2 ],
];

const tablaEgreso = [
    ["Indices de rendimiento escolar cohorte generacional",],
    ['Semestre', 'Periodo', 'Inscritos', 'Egresados','Eficiencia terminal'],
    ['Semestre 1', '2015-1', 45,0,0],
    ['Semestre 2', '2015-1', 45,0,0],
    ['Semestre 3', '2016-1',  26 , 0 , 3 ],
    ['Semestre 4', '2016-2',  23 , 0 , 2],
    ['Semestre 5', '2017-1',  21 , 0 , 0],
    ['Semestre 6', '2017-2',  18 , 0 , 0 ],
    ['Semestre 7', '2018-1',  16 , 0 , 0],
    ['Semestre 8' , '2018-2',  16 , 0 , 0  ],
    ['Semestre 9', '2019-1',  16 , 1 , 2 ],
    ['Semestre 10', '2019-2',  13 , 5 , 0 ],
    ['Semestre 11', '2020-1',  8 , 7 , 0 ],
    ['Semestre 12', '2020-1',  8 , 7 , 0],
    ['Semestre 13', '2021-1',  2 , 2 , 0 ],
    ['Semestre 14', '2021-2',  2 , 2 , 0 ],
    ['Semestre 15', '2021-2',  2 , 2 , 0 ],
];
const tablaTitulacion = [
    ["Indices de rendimiento escolar cohorte generacional",],
    ['Semestre', 'Periodo', 'Inscritos', 'Egresados', 'Titulados','Eficiencia de titulacion'],
    ['Semestre 1', '2015-1', 45,0, 0,0],
    ['Semestre 2', '2015-1', 45,0, 0,0],
    ['Semestre 3', '2016-1',  26, 0 , 0 , 3 ],
    ['Semestre 4', '2016-2',  23,0 , 0 , 2],
    ['Semestre 5', '2017-1',  21 ,0, 0 , 0],
    ['Semestre 6', '2017-2',  18 ,0, 0 , 0 ],
    ['Semestre 7', '2018-1',  16 ,0, 0 , 0],
    ['Semestre 8' , '2018-2',  16 ,0, 0 , 0  ],
    ['Semestre 9', '2019-1',  16 ,5, 1 , 2 ],
    ['Semestre 10', '2019-2',  13 ,6, 5 , 0 ],
    ['Semestre 11', '2020-1',  8 ,6, 5 , 0 ],
    ['Semestre 12', '2020-1',  8 , 6 ,6, 0],
    ['Semestre 13', '2021-1',  2 , 6,6 , 0 ],
    ['Semestre 14', '2021-2',  2 , 6,6 , 0 ],
    ['Semestre 15', '2021-2',  2 , 6,6 , 0 ],
];

function anioPeriodo(periodoAnterior) {
    if (periodoAnterior[1] === '2') {
        periodoAnterior[0] = String(Number(periodoAnterior[0]) + 1);
        periodoAnterior[1] = '1';
    } else if (periodoAnterior[1] === '1') {
        periodoAnterior[1] = String(Number(periodoAnterior[1])+ 1);
    }
    return periodoAnterior;
}

function datosIndicesPermanencia(cohorte, numSemestres, carrera) {
    const tablaCopy = [...tablaPermanencia];
    const tabla = [];
    let activoInd = 0;
    let desercionInd = 0;
    let egresoInd = 0;
    let matriculaInd = 0;
    let tasaInd = 0;
    let periodo = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional "+cohorte+" "+carrera]);
    tabla.push(tablaCopy[1]);
    for (const c in tabla[1]) {
        switch(tabla[1][c]) {
            case 'Inscritos':
                activoInd = c;
                break;
            case 'Desercion':
                desercionInd = c;
                break;
            case 'Matricula final':
                matriculaInd = c;
                break;
            case 'Tasa de retencion':
                tasaInd = c;
                break;
            case 'Egresados':
                egresoInd = c;
                break;
            default: continue;
        }
    }
    numSemestres = Number(numSemestres)+2;
    for (let sem = 2; sem < numSemestres; sem++) {
        if (sem === 2){
            periodo = cohorte.split("-");
        } else {
            periodo = anioPeriodo(periodo);
        }
        tabla.push(tablaCopy[sem]);
        tabla[sem][1] = String(periodo[0])+"-"+String(periodo[1]);
        tabla[sem][matriculaInd] = tabla[sem][activoInd]-tabla[sem][desercionInd]-tabla[sem][egresoInd];
        tabla[sem][tasaInd] = String(((tabla[sem][matriculaInd]/tabla[sem][activoInd])*100).toFixed(2))+" %";
    }
    return tabla;
};

function datosIndicesEgreso(cohorte, numSemestres, carrera) {
    const tablaCopyE = [...tablaEgreso];
    const tabla = [];
    let activoInd = 0;
    let egresoInd = 0;
    let tasaInd = 0;
    let periodo = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional "+cohorte+" "+carrera]);
    tabla.push(tablaCopyE[1]);
    for (const c in tabla[1]) {
        switch(tabla[1][c]) {
            case 'Inscritos':
                activoInd = c;
                break;
            case 'Eficiencia terminal':
                tasaInd = c;
                break;
            case 'Egresados':
                egresoInd = c;
                break;
            default: continue;
        }
    }
    numSemestres = Number(numSemestres)+2;
    for (let sem = 2; sem < numSemestres; sem++) {
        if (sem === 2){
            periodo = cohorte.split("-");
        } else {
            periodo = anioPeriodo(periodo);
        }
        tabla.push(tablaCopyE[sem]);
        tabla[sem][1] = String(periodo[0])+"-"+String(periodo[1]);
        tabla[sem][tasaInd] = String(((tabla[sem][egresoInd]/tabla[sem][activoInd])*100).toFixed(2))+" %";
    }
    return tabla;
};

function datosIndicesTitulacion(cohorte, numSemestres, carrera) {
    const tablaCopyE = [...tablaTitulacion];
    const tabla = [];
    let activoInd = 0;
    let tituloInd = 0;
    let tasaInd = 0;
    let periodo = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional "+cohorte+" "+carrera]);
    tabla.push(tablaCopyE[1]);
    for (const c in tabla[1]) {
        switch(tabla[1][c]) {
            case 'Inscritos':
                activoInd = c;
                break;
            case 'Eficiencia de titulacion':
                tasaInd = c;
                break;
            case 'Titulados':
                tituloInd = c;
                break;
            default: continue;
        }
    }
    numSemestres = Number(numSemestres)+2;
    for (let sem = 2; sem < numSemestres; sem++) {
        if (sem === 2){
            periodo = cohorte.split("-");
        } else {
            periodo = anioPeriodo(periodo);
        }
        tabla.push(tablaCopyE[sem]);
        tabla[sem][1] = String(periodo[0])+"-"+String(periodo[1]);
        tabla[sem][tasaInd] = String(((tabla[sem][tituloInd]/tabla[sem][activoInd])*100).toFixed(2))+" %";
    }
    return tabla;
};
function datosIndicesDesercion(cohorte, numSemestres, carrera) {
    const tablaCopy = [...tablaDesercion];
    const tabla = [];
    let activoInd = 0;
    let desercionInd = 0;
    let abandonoInd = 0;
    let tasaInd = 0;
    let tasaAbInd = 0;
    let periodo = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional "+cohorte+" "+carrera]);
    tabla.push(tablaCopy[1]);
    for (const c in tabla[1]) {
        switch(tabla[1][c]) {
            case 'Inscritos':
                activoInd = c;
                break;
            case 'Desercion':
                desercionInd = c;
                break;
            case 'Abandono':
                abandonoInd = c;
                break;
            case 'Tasa de desercion escolar':
                tasaInd = c;
                break;
            case 'Tasa de abandono escolar':
                tasaAbInd = c;
                break;
            default: continue;
        }
    }
    numSemestres = Number(numSemestres)+2;
    for (let sem = 2; sem < numSemestres; sem++) {
        if (sem === 2){
            periodo = cohorte.split("-");
        } else {
            periodo = anioPeriodo(periodo);
        }

        tabla.push(tablaCopy[sem]);
        tabla[sem][1] = String(periodo[0])+"-"+String(periodo[1]);
        // Tasa de desercion
        tabla[sem][tasaInd] = String(((tabla[sem][desercionInd]/tabla[sem][activoInd])*100).toFixed(2))+" %";
        // Tasa de abandono
        tabla[sem][tasaAbInd] = String(((tabla[sem][abandonoInd]/tabla[sem][activoInd])*100).toFixed(2))+" %";
    }
    return tabla;
};


const dataService = {
    datosIndicesDesercion,
    datosIndicesPermanencia,
    datosIndicesEgreso,
    datosIndicesTitulacion,
};

export default  dataService;


