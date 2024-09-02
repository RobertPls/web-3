import axios from "axios"
import { BASE_URL } from "./Constant"

// servicio para usuario donde esta la creacion, lista, actualizar, eliminar y obtener detalle
// hay algunos servicios donde por defecto se coloca 0 pero es para que django 
// detecte en que endpoint esta entrando 


export const postUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/user/", usuario
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
        axios.get(BASE_URL + "/user/", {
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
        axios.get(BASE_URL + "/user/0/", {
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

export const putUsuario = (token,user) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/user/0/", user,{
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
        axios.delete(BASE_URL + "/user/0/", {
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