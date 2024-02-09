import API from './../api';

export const getAlumnoInfo = async(numControl) => {
    let res = await API.get('/alumnos/'+numControl);
    const alumnoData = res.data;
    res = await API.get('/personal/'+alumnoData.curp);
    const personalData = res.data;
    const alumno = personalData;
    alumno['control'] = alumnoData['no_control'];
    alumno['plan'] = alumnoData['plan'];
    console.log(personalData);
    return alumno;
};