import API from "src/utils/api";

export const asignarPermiso = async(clave) => {
    try {
        const res = await API.get(`carreras/permisos/${clave}`);
        return res;
    } catch (err) {
        return {
            data: null,
            status: 400,
        };
    }
};