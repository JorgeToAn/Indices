import API from "../../../utils/api";

export const getListaUsuarios = async() => {
    const listaUsuarios = await API.get('usuario/lista/');
    console.log(listaUsuarios.data['results']);
    return listaUsuarios.data['results'];
};