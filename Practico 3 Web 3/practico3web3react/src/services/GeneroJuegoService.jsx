import axios from "axios"
import { BASE_URL } from "./Constant"

export const postGeneroJuego = (token, genero_juego) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/genero-juego/", genero_juego, {
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

export const deleteGeneroJuego = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/genero-juego/"+id+"/", {
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