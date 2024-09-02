import axios from "axios"
import { BASE_URL } from "./Constant"


export const postJuego = (token, juego) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/juego/", juego, {
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

export const getListaJuegos = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/juego/", {
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

export const getDetalleJuego = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/juego/"+id+"/", {
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

export const putJuego = (token,id, juego) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/juego/"+id+"/", juego,{
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

export const deleteJuego = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/juego/"+id+"/", {
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

export const saveImageJuego = (token,id, formData) => {
    return new Promise((resolve, reject) => {
        axios.patch(BASE_URL + "/juego/"+id+"/", formData,{
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