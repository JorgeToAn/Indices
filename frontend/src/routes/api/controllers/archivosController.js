import API from "../../../utils/api";

export const subirIngresosExcel = async (archivo) => {
    const f = archivo.get('file');
    console.log(f);
    const res = await API.post('registros/ingresos/subir/', archivo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': `attachment; filename=${f.name}`,
        }});
    console.log(res);
    return res;
};