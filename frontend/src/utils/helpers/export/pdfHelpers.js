// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getNombreCarrera } from "../carreraHelpers";

export async function generatePDF(titulo, cohorte, numSemestres, heading, content, multiPagina, examenYConv, tasladoYEquiv, carrera="") {
    const tipoAlumnos = (examenYConv && tasladoYEquiv) ? 1 : (examenYConv) ? 2 : 3;
    let filtroAlumnos = "Examen, convalidación, traslado y equivalencia";
    switch (tipoAlumnos){
        case 1:
            filtroAlumnos = "examen, convalidación, traslado y equivalencia";
            break;
        case 2:
            filtroAlumnos = "examen y convalidación";
            break;
        case 3:
            filtroAlumnos = "traslado y equivalencia";
            break;
        default:
            filtroAlumnos = "sin filtro";
    }
    const doc = new jsPDF('p', 'pt', 'letter');
    doc.setFont('Helvetica', 'Bold');
    const eduLogo = new Image();
    const tecLogo = new Image();
    const itmLogo = new Image();
    doc.setFontSize(12);
    tecLogo.src = "/img/logo/Logo-TecNM.png";
    eduLogo.src = "/img/logo/sep_logo.png";
    itmLogo.src = "/img/logo/itmlogo.png";
    doc.addImage(eduLogo, 'PNG', 50, 50, 160, 45);
    doc.setDrawColor(179, 142,93);
    doc.line(220, 60, 220, 90, 'S');
    doc.addImage(tecLogo, 'PNG', 230, 50, 100, 45);
    doc.line(340, 60, 340, 90, 'S');
    doc.addImage(itmLogo, 'PNG', 350, 57, 21.6, 36);
    doc.setDrawColor(0, 0,0);
    doc.text('Instituto Tecnológico de Mexicali', 297.5, 130, null, null, 'center');
    doc.line(60, 140, 550, 140);
    doc.text(`Reporte de ${titulo} a ${numSemestres} semestres`, 297.5, 165, null, null,  'center');
    doc.text(`Alumnos de ingreso por ${filtroAlumnos}`, 297.5, 185, null, null,  'center');
    if(carrera !== ""){
        const nombreC = await getNombreCarrera(carrera);
        doc.text(nombreC, 297.5, 205, null, null,  'center');
        doc.text(`Cohorte generacional ${cohorte}`, 297.5, 225, null, null,  'center');
    } else {
        doc.text(`Cohorte generacional ${cohorte}`, 297.5, 205, null, null,  'center');
    }
    let  header = heading;
    if (!Array.isArray(heading[1])){
        header = [];
        header.push(heading);
    }
    if(multiPagina){
        autoTable(doc, {
            headStyles: {
                fillColor: '#1B396A',
                fontSize: 9,
            },
            bodyStyles: {
                fontSize: 8,
            },
            margin: { top: 215 },
            head:  header,
            body: content,
        });
    } else {
        autoTable(doc, {
            headStyles: {
                fillColor: '#1B396A',
                fontSize: 9,
            },
            bodyStyles: {
                fontSize: 8,
            },
            margin: { top: 215 },
            html: '#tabla ',
        });
    }
    doc.save('reporte.pdf');
    return "Good";
}