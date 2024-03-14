import API from "../../../utils/api";

export const subirArchivosExcel = async (archivo, tipo) => {
    const f = archivo.get('file');
    console.log(f);
    const res = await API.post(`registros/${tipo}/subir/${f.name}`, archivo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
    console.log(res);
    return res;
};