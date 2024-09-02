import axios from "axios"
import { BASE_URL } from "./Constant"

export const postEncuesta = (token, encuesta) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/encuesta/", encuesta, {
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

export const getListaEncuestas = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/encuesta/", {
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

export const getDetalleEncuesta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/encuesta/"+id+"/", {
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

export const putEncuesta = (token,id, encuesta) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/encuesta/"+id+"/", encuesta,{
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

export const deleteEncuesta = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/encuesta/"+id+"/", {
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
