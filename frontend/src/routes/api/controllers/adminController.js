import API from "../../../utils/api";

export const getListaUsuarios = async() => {
    const listaUsuarios = await API.get('usuario/lista/');
    console.log(listaUsuarios.data['results']);
    return listaUsuarios.data['results'];
};

export const cambiarContrasena = async(password1, password2) => {
    const res = await API.post('usuario/contrasena/cambiar/', {
            'new_password1': password1,
            'new_password2': password2,
        },);
    return res;
};