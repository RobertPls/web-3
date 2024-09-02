import axios from "axios"
import { BASE_URL } from "./Constant";

// servicio para hacer login en el api

export const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/login/", {
            username,
            password,
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}