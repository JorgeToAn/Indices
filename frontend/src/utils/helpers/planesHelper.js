import API from "../api";

export const getPlanes = async() => {
    const planes = await API.get('planes/');
    return planes.data;
};