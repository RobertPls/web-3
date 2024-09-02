import axios from "axios"
import { BASE_URL } from "./Constant"

export const postEncuestaAsignada = (token, asignacion) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/encuesta-asignada/", asignacion, {
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

export const getListaEncuestaAsignadas = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/encuesta-asignada/", {
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

export const getDetalleEncuestaAsignada = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/encuesta-asignada/"+id+"/", {
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

export const putEncuestaAsignada = (token,id, asignacion) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/encuesta-asignada/"+id+"/", asignacion,{
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

export const deleteEncuestaAsignada = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/encuesta-asignada/"+id+"/", {
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
