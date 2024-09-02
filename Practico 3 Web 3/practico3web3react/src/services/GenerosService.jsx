import axios from "axios"
import { BASE_URL } from "./Constant"


export const postGenero = (token, genero) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/genero/", genero, {
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

export const getListaGeneros = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/genero/", {
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

export const getDetalleGenero = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/genero/"+id+"/", {
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

export const putGenero = (token,id, genero) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/genero/"+id+"/", genero,{
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

export const deleteGenero = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/genero/"+id+"/", {
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

export const saveImageGenero = (token,id, formData) => {
    return new Promise((resolve, reject) => {
        axios.patch(BASE_URL + "/genero/"+id+"/", formData,{
            headers: {
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