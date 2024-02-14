import API from './../api';

export const getAlumnoInfo = async(numControl) => {
    const res = await API.get('/alumnos/historial/'+numControl);
    const alumnoData = res.data;
    return alumnoData;
};

export const updateAlumnoInfo = async(alumno, curp) => {
    let success = true;
    let res = await API.put(`/personal/${curp}/`,alumno)
    .catch((error) => {
        success = false;
    });
    if(success){
        // eslint-disable-next-line no-unused-vars
        res = await API.put(`/alumnos/${alumno.get('no_control')}/`, alumno)
        .catch((error) => {
            success = false;
        });
    }
    return success;
};

export const getAllAlumnosHistorial = async() => {
    let res = await API.get('/alumnos/historial');
    let data = res.data;
    const historial = [data['results']];
    while(data['next'] !== null){
        res = await API.get(data['next']);
        data = res.data;
        historial.push(data['results']);
    }
    console.log(historial);
    return res.data;
};