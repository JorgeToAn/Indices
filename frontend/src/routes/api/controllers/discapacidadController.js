import API from "../../../utils/api";

export const getDiscapacidades = async() => {
    const discapacidades = await API.get('discapacidades/');
    return discapacidades.data;
};