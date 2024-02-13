
export function getIndicesHeaders(tipo, cohorte, carrera) {
    const tabla = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional"+' '+cohorte+' '+carrera]);
    switch(tipo) {
        case 1:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion','Tasa de retencion']);
            break;
        case 2:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion','Tasa de desercion escolar']);
            break;
        case 3:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados', 'Titulados','Eficiencia de titulacion']);
            break;
        case 4:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados','Eficiencia terminal']);
            break;
        default:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion']);
    }
    return tabla;
}

export function getTablasHeaders(cohorte, numSemestres) {
    const tabla = [];
    tabla.push('Carrera', '', cohorte);
    let periodo = cohorte.split("-");
    for (let i = 1; i < numSemestres; i++) {
        periodo = anioPeriodo(periodo);
        tabla.push(periodo[0]+"-"+periodo[1]);
    }
    return tabla;
}

function anioPeriodo(periodoAnterior) {
    if (periodoAnterior[1] === '3') {
        periodoAnterior[0] = String(Number(periodoAnterior[0]) + 1);
        periodoAnterior[1] = '1';
    } else if (periodoAnterior[1] === '1') {
        periodoAnterior[1] = String(Number(periodoAnterior[1])+ 2);
    }
    return periodoAnterior;
}

export function getReportesHeaders(tipo, cohorte, numSemestres){
    const tabla = [];
    const firstRow = ['Carrera', 'Nuevo Ingreso', `Año de ${tipo === 1 ? 'titulación' : 'egreso'}`];
    const secondRow = ['', ''];
    const thirdRow = ['', ''];
    let periodo = cohorte.split("-");
    for (let i = 0; i < 8; i++){
        periodo = anioPeriodo(periodo);
    }
    if (numSemestres <= 12) {
        for (let i = 9; i <= numSemestres; i++) {
            if (i > 9) {
                firstRow.push('');
            }
            secondRow.push(periodo[0]+"-"+periodo[1]);
            periodo = anioPeriodo(periodo);
            thirdRow.push(i);
        }
        firstRow.push('');
        secondRow.push("Total");
        firstRow.push(`Eficiencia de ${tipo === 1 ? 'titulación' : 'egreso'}`);
        secondRow.push('');
        thirdRow.push('');
        thirdRow.push('');
    } else {
        firstRow.push('', '', '', '', `Eficiencia de ${tipo === 1 ? 'titulación' : 'egreso'}`);
        for(let n = 9; n < 13; n++){
            secondRow.push(periodo[0]+"-"+periodo[1]);
            periodo = anioPeriodo(periodo);
            thirdRow.push(n);
        }
        secondRow.push("Total");
        secondRow.push("");
        thirdRow.push('');
        thirdRow.push('');
        for (let i = 13; i <= numSemestres; i++) {
            if (i === 13){
                firstRow.push(`Año de ${tipo === 1 ? 'titulación' : 'egreso'}`);
            } else {
                firstRow.push('');
            }
            secondRow.push(periodo[0]+"-"+periodo[1]);
            periodo = anioPeriodo(periodo);
            thirdRow.push(i);
        }
        firstRow.push(`Eficiencia de ${tipo === 1 ? 'titulación' : 'egreso'}`);
        secondRow.push("Total");
        secondRow.push("");
        thirdRow.push('');
        thirdRow.push('');
    }
    tabla.push(firstRow);
    tabla.push(secondRow);
    tabla.push(thirdRow);
    return tabla;
}

export function getNuevoIngresoHeaders(cohorte, numSemestres) {
    const tabla = [];
    tabla.push(['Carrera', 'Nuevo Ingreso']);
    tabla.push(['']);
    let periodo = cohorte.split("-");
    for (let i = 0; i < numSemestres; i++) {
        tabla[1].push(periodo[0]+"-"+periodo[1]);
        periodo = anioPeriodo(periodo);
    }
    return tabla;
}

export function getListaAlumnosHeaders(cohorte, numSemestres) {
    const tabla = [];
    tabla.push([' ', '', '']);
    tabla.push(['Nombre', 'No. control', 'Carrera', 'Sexo']);
    let periodo = cohorte.split("-");
    for (let i = 1; i <= numSemestres; i++) {
        tabla[0].push(`SEM ${i}`);
        tabla[1].push(periodo[0]+"-"+periodo[1]);
        periodo = anioPeriodo(periodo);
    }
    return tabla;
}
