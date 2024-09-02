import axios from "axios"
import { BASE_URL } from "./Constant"

export const postRespuestaEncuesta = (token, respuesta) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/respuesta-encuesta/", respuesta, {
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

export const getListaRespuestaEncuestas = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/respuesta-encuesta/", {
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

export const getDetalleRespuestaEncuesta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/respuesta-encuesta/"+id+"/", {
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

export const putRespuestaEncuesta = (token,id, respuesta) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/respuesta-encuesta/"+id+"/", respuesta,{
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

export const deleteRespuestaEncuesta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/respuesta-encuesta/"+id+"/", {
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
