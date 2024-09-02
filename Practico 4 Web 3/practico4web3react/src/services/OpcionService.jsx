import axios from "axios"
import { BASE_URL } from "./Constant"

export const postOpcion = (token, opcion) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/opcion-pregunta/", opcion, {
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

export const getListaOpciones = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/opcion-pregunta/", {
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

export const getDetalleOpcion = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/opcion-pregunta/"+id+"/", {
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

export const putOpcion = (token,id, opcion) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/opcion-pregunta/"+id+"/", opcion,{
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

export const deleteOpcion = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/opcion-pregunta/"+id+"/", {
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
