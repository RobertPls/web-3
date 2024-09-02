import axios from "axios"
import { BASE_URL } from "./Constant"


export const postUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/usuario/", usuario
        ).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const getListaUsuarios = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/usuario/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const getDetalleUsuario = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/usuario/0/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const putUsuario = (token,usuario) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/usuario/0/", usuario,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const deleteUsuario = (token) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/usuario/0/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}