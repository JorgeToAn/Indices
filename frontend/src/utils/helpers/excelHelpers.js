import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

export async function generateExcel(header, data) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Reporte");
    if (header.length <= 3){
        // for(const fila in header) {
        //     sheet.addRow(fila, 'color: #110000');
        // }
        const rows = sheet.addRows(header);
        rows.fill = {
            type: 'pattern',
            pattern: 'darkVertical',
            fgColor: {
                argb: 'FFFF0000'
            }
        };

    } else {
        const row = sheet.addRow(header);
        row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'FFFF0000'
            }
        };
    }
    sheet.addRows(data);
    const buffer = await workbook.xlsx.writeBuffer();
    FileSaver.saveAs(new Blob([buffer]), `Reporte.xlsx`);
}