import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function generatePDF(titulo, cohorte, carrera="") {
    const tabla = document.getElementById("tabla");
    console.log(tabla);
    html2canvas(tabla).then(function(canvas) {
            const doc = new jsPDF('p', 'pt', 'letter');
            doc.setFont('Helvetica', 'Bold');
            const eduLogo = new Image();
            const tecLogo = new Image();
            const itmLogo = new Image();
            tecLogo.src = "/img/logo/Logo-TecNM.png";
            eduLogo.src = "/img/logo/sep_logo.png";
            itmLogo.src = "/img/logo/itmlogo.png";
            doc.addImage(eduLogo, 'PNG', 130, 50, 150, 50);
            doc.addImage(tecLogo, 'PNG', 290, 50, 100, 50);
            doc.addImage(itmLogo, 'PNG', 400, 50, 30, 50);
            doc.text('Instituto Tecnológico de Mexicali', 297.5, 130, null, null, 'center');
            doc.line(60, 140, 550, 140);
            doc.text(`Reporte de ${titulo}`, 297.5, 165, null, null,  'center');
            doc.text(carrera, 200, 175, null, null,  'center');
            doc.text(`Cohorte generacional ${cohorte}`, 297.5, 185, null, null,  'center');
            const img = canvas.toDataURL("image/jpeg", 1);
            doc.addImage(img, 'JPEG', 50, 200, 500, 200);
            doc.save('reporte.pdf');
        });
    return "Good";
}