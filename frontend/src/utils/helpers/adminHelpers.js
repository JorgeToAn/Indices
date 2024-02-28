import API from "../api";

export const getListaUsuarios = async() => {
    const listaUsuarios = await API.get('usuario/lista/');
    return listaUsuarios.data;
};

export const cambiarContrasena = async() => {
    const res = await API.get('usuario/cambiar/
};