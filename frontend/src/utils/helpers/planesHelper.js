import API from "../api";

export const getPlanes = async() => {
    const planes = await API.get('planes/');
    console.log(planes.data['results']);
    return planes.data['results'];
};