// configuraciones para el token donde se guarda los datos se obtiene
// si hay alguien logueado y hace cerrar sesion

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
}
export const setAuthToken = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
}
export const validateLogin = (navigate) => {
    const token = getAuthToken();
    if (token==null) {
        return false;
    }
    return true;
}

export const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
}