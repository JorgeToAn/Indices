
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
