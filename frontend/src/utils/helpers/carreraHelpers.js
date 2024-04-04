import API from "../api";

export const getCarreras = async() =>{
    const carreras = await API.get('carreras/');
    const sortedCarreras = carreras.data['results'].sort((first, second) => (first['clave']  < second['clave']) ? -1 : (first['clave']  > second['clave']) ? 1 : 0);
    return sortedCarreras;
};
export const getNombreCarrera = async(clave) => {
    const carreras = await getCarreras();
    let nombreCarrera = "";
    carreras.forEach((fila) => {
        if(fila['clave'] === clave){
            nombreCarrera = fila['nombre'];
        }
    });
    return nombreCarrera;
};