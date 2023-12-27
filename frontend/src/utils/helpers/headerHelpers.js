
export function getIndicesHeaders(tipo, cohorte, carrera) {
    const tabla = [];
    tabla.push(["Indices de rendimiento escolar cohorte generacional"+' '+cohorte+' '+carrera]);
    switch(tipo) {
        case 1:
            tabla.push(['Semestre', 'Periodo', 'Inscritos', 'Egresados','Desercion', 'Matricula final','Tasa de retencion']);
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
    for (let i = 0; i < numSemestres; i++) {
        periodo = anioPeriodo(periodo);
        tabla.push(periodo[0]+"-"+periodo[1]);
    }
    return tabla;
}

function anioPeriodo(periodoAnterior) {
    if (periodoAnterior[1] === '2') {
        periodoAnterior[0] = String(Number(periodoAnterior[0]) + 1);
        periodoAnterior[1] = '1';
    } else if (periodoAnterior[1] === '1') {
        periodoAnterior[1] = String(Number(periodoAnterior[1])+ 1);
    }
    return periodoAnterior;
}

export function getReportesHeaders(){}
