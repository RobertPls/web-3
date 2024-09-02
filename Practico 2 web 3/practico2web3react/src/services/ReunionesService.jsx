import axios from "axios"
import { BASE_URL } from "./Constant"

// servicio para reunion donde esta la creacion, lista, actualizar, eliminar y obtener detalle

export const postReunion = (token, reunion) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/reunion/", reunion, {
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

export const getListaReuniones = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/reunion/", {
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

export const getDetalleReunion = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/reunion/"+id+"/", {
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

export const putReunion = (token,id, reunion) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/reunion/"+id+"/", reunion,{
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

export const deleteReunion = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/reunion/"+id+"/", {
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
