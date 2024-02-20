import dropDownData from "../../mockup/dropDownData";
import API from "../api";


export const getCarreras = async() =>{
    const carreras = await API.get('carreras/');
    console.log(carreras);
    return carreras.data['results'];
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