import API from './../api';

export const getAlumnoInfo = async(numControl) => {
    const res = await API.get('/alumnos/historial/'+numControl);
    const alumnoData = res.data;
    return alumnoData;
};