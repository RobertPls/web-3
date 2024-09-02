export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
}

export const getIsStaff = () => {
    const isStaff = localStorage.getItem("isStaff");
    if (isStaff==="false") {
        
        return false;
    }
    return true;
}

export const setAuthToken = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
}

export const setIsStaff = (isStaff) => {
    localStorage.setItem("isStaff", isStaff);
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
    localStorage.removeItem("isStaff")
}