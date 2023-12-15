import API from "../api";

export const getListaUsuarios = async() => {
    const listaUsuarios = await API.get('usuario/lista/');
    return listaUsuarios.data;
};