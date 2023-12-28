
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

// const heading = [
//     ['Carrera', 'Nuevo Ingreso', 'Año de titulación', '', '', '', '', 'Eficiencia de titulación', 'Año de titulacion', '', '', 'Eficiencia de titulación'],
//     ['', '','2019-1','2019-2','2020-1', '2020-2', 'Total', '', '2021-1', '2021-2', 'Total', ''],
//     ['', '', '9', '10', '11', '12', '', '', '13', '14', '', '']
// ];

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
        firstRow.push('Eficiencia de titulación');
        secondRow.push('');
        thirdRow.push('');
        thirdRow.push('');
    } else {
        firstRow.push('', '', '', '', 'Eficiencia de titulación');
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
        firstRow.push('Eficiencia de titulación');
        secondRow.push("Total");
        secondRow.push("");
        thirdRow.push('');
        thirdRow.push('');
    }
    tabla.push(firstRow);
    tabla.push(secondRow);
    tabla.push(thirdRow);
    return tabla;
    // First row
    /*
    Add "Carrera", "Nuevo ingreso", "Ano de titulacion or egreso"
    if numSemestres <= 12
        Add as many spaces as (numSemestres - 9)(inclusive)
        Add "Eficiencia de titulacion"
    if numSemestres > 12
        Add 4 spaces after "Año de titulacion or egreso"
        Add "Eficiencia de titulacion"
        Add as many spaces as (numSemestres - 12)
    */
   // Second row
   /*
   Add 2 blank spaces
   Call anioperiodo 8 times
   if numSemestres <= 12
        As many times as (numSemestres - 9) (inclusive)
            Add periodo
            Call anioperiodo
        Add "Total"
        Add blank space
    if numSemestres > 12
        Do 5 times
            Add periodo
            Call anioperiodo
        Add total
        Add "blank space"
        As many times as (numSemestres - 12)
            Add periodo
            Call anioperiodo
        Add "Total"
        Add blank space
   */
  // Third row
   /*
   Add 2 blank spaces
   Var num = 9
   if numSemestres <= 12
        As many times as (numSemestres - 9) (inclusive)
            Add num
            num++
        Add 2 blank spaces
    if numSemestres > 12
        Do 5 times
            Add num
            num++
        Add 2 blank spaces
        As many times as (numSemestres - 12)
            Add num
            num++
        Add 2 blank spaces
   */
}
