import API from "../../../utils/api";

export const sendPasswordResetEmail = async (email) => {
    const res = await API.post('/password-reset/', {
        email: email
    });
    return res;
};


export const sendNewPassword = async (token, password) => {
    const res = await API.post(`/password-reset/confirm/`, {
        token: token,
        password: password
    });
    return res;
};
