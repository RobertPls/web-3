import axios from "axios"
import { BASE_URL } from "./Constant"

// servicios para la parte de inscripciones donde solo se puede crear y eliminar


export const postIscripcion = (token, inscripcion) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/inscripcion/", inscripcion, {
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

export const deleteInscripcion = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/inscripcion/"+id+"/", {
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