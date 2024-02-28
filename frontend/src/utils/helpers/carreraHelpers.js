import dropDownData from "../../mockup/dropDownData";
import API from "../api";


export const getCarreras = async() =>{
    const carreras = await API.get('carreras/');
    const sortedCarreras = carreras.data['results'].sort((first, second) => (first['clave']  < second['clave']) ? -1 : (first['clave']  > second['clave']) ? 1 : 0);
    return sortedCarreras;
};
export const getNombreCarrera = (clave) => {
    const carreras = dropDownData.carreras;
    let nombreCarrera = "";
    carreras.forEach((fila) => {
        if(fila[0] === clave){
            nombreCarrera = fila[1];
        }
    });
    return nombreCarrera;
};