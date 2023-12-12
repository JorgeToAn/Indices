import API from "../api";

export const getDiscapacidades = async() => {
    const discapacidades = await API.get('discapacidades/');
    return discapacidades.data;
};