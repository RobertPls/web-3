import axios from "axios"
import { BASE_URL } from "./Constant"

export const postPregunta = (token, pregunta) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/pregunta/", pregunta, {
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

export const getListaPreguntas = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/pregunta/", {
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

export const getDetallePregunta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/pregunta/"+id+"/", {
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

export const putPregunta = (token,id, pregunta) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/pregunta/"+id+"/", pregunta,{
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

export const deletePregunta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/pregunta/"+id+"/", {
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
