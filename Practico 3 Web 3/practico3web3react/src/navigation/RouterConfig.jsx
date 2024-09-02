import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { LOGIN_URL, REGISTER_URL, GENERO_CREATE_URL, GENERO_DETAIL_URL, GENERO_LIST_URL, JUEGO_CREATE_URL, JUEGO_DETAIL_URL, JUEGO_LIST_URL, USUARIO_EDIT_URL, GENEROJUEGO_CREATE_URL } from "./Constant";
import RegistrarUsuarioPage from "../pages/auth/RegistrarUsuarioPage";
import GeneroListPage from "../pages/genero/GeneroListPage";
import GeneroDetailPage from "../pages/genero/GeneroDetailPage";
import JuegoListPage from "../pages/juego/JuegoListPage";
import JuegoDetailPage from "../pages/juego/JuegoDetailPage";
import UsuarioEditPage from "../pages/usuario/UsuarioEditPage";
import GeneroJuegoCreatePage from "../pages/genero-juego/GeneroJuegoCreatePage";
import GeneroFormPage from "../pages/genero/GeneroFormPage";
import JuegoFormPage from "../pages/juego/JuegoFormPage";


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
        element: <RegistrarUsuarioPage />
    },
    {
        path: GENERO_LIST_URL,
        element: <GeneroListPage />
    },
    {
        path: GENERO_CREATE_URL,
        element: <GeneroFormPage />
    },
    {
        path: GENERO_DETAIL_URL,
        element: <GeneroDetailPage />
    },
    {
        path: JUEGO_LIST_URL,
        element: <JuegoListPage />
    },
    {
        path: JUEGO_CREATE_URL,
        element: <JuegoFormPage />
    },
    {
        path: JUEGO_DETAIL_URL,
        element: <JuegoDetailPage />
    },
    {
        path: USUARIO_EDIT_URL,
        element: <UsuarioEditPage />
    },
    {
        path: GENEROJUEGO_CREATE_URL,
        element: <GeneroJuegoCreatePage />
    },

]);