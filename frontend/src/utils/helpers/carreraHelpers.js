// import { useAuthStore } from "../store/auth";
import API from "../api";


export const getCarreras = async() =>{
    const carreras = await API.get('carreras/');
    return carreras.data;
};