import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { INSCRIPCION_CREATE_URL, LOGIN_URL, REGISTER_URL, REUNION_CREATE_URL, REUNION_DETAIL_URL, REUNION_LIST_URL, USUARIO_EDIT_URL } from "./Constant";
import RegisterPage from "../pages/auth/RegisterPage";
import ReunionListPage from "../pages/reunion/ReunionListPage";
import ReunionCreatePage from "../pages/reunion/ReunionCreatePage";
import UsuarioEditPage from "../pages/usuario/UsuarioEditPage";
import ReunionDetailPage from "../pages/reunion/ReunionDetailPage";
import InscripcionCreatePage from "../pages/inscripcion/InscripcionCreatePage";


// redireccionamiento para la app la ruta devuelve el componente

export const router = createBrowserRouter([
    {
        path: "",
        element: <LoginPage />
    },
    {
        path: LOGIN_URL,
        element: <LoginPage />
    },
    {
        path: REGISTER_URL,
        element: <RegisterPage />
    },
    {
        path: REUNION_LIST_URL,
        element: <ReunionListPage />
    },
    {
        path: REUNION_CREATE_URL,
        element: <ReunionCreatePage />
    },
    {
        path: REUNION_DETAIL_URL,
        element: <ReunionDetailPage />
    },
    {
        path: USUARIO_EDIT_URL,
        element: <UsuarioEditPage />
    },
    {
        path: INSCRIPCION_CREATE_URL,
        element: <InscripcionCreatePage />
    }  

]);