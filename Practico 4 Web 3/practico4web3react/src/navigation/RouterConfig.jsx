import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { LOGIN_URL, REGISTER_URL, USUARIO_EDIT_URL, ENCUESTA_LIST_URL, ENCUESTA_FORM_URL, ENCUESTA_DETAIL_URL, PREGUNTA_FORM_URL, OPCION_FORM_URL, ENCUESTA_ASIGNADA_LIST_URL, ENCUESTA_ASIGNADA_FORM_URL, RESPUESTA_ENCUESTA_FORM_URL, RESPUESTA_ENCUESTA_LIST_URL } from "./Constant";
import RegistrarUsuarioPage from "../pages/auth/RegistrarUsuarioPage";
import UsuarioEditPage from "../pages/usuario/UsuarioEditPage";
import EncuestaListPage from "../pages/encuesta/EncuestaListPage";
import EncuestaFormPage from "../pages/encuesta/EncuestaFormPage";
import EncuestaDetailPage from "../pages/encuesta/EncuestaDetailPage";
import PreguntaFormPage from "../pages/pregunta/PreguntaFormPage";
import OpcionFormPage from "../pages/opcion/OpcionFormPage";
import EncuestaAsignadaListPage from "../pages/encuesta-asignada/EncuestaAsignadaListPage";
import EncuestaAsignadaFormPage from "../pages/encuesta-asignada/EncuestaAsignadaForm";
import RespuestaEncuestaFormPage from "../pages/respuesta-encuesta/RespuestaEncuestaForm";
import RespuestaEncuestaListPage from "../pages/respuesta-encuesta/RespuestaEncuestaList";


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
        path: ENCUESTA_LIST_URL,
        element: <EncuestaListPage />
    },
    {
        path: ENCUESTA_FORM_URL,
        element: <EncuestaFormPage />
    },
    {
        path: ENCUESTA_DETAIL_URL,
        element: <EncuestaDetailPage />
    },

    {
        path: PREGUNTA_FORM_URL,
        element: <PreguntaFormPage />
    },

    {
        path: OPCION_FORM_URL,
        element: <OpcionFormPage />
    },

    {
        path: ENCUESTA_ASIGNADA_LIST_URL,
        element: <EncuestaAsignadaListPage />
    },
    {
        path: ENCUESTA_ASIGNADA_FORM_URL,
        element: <EncuestaAsignadaFormPage />
    },

    {
        path: RESPUESTA_ENCUESTA_FORM_URL,
        element: <RespuestaEncuestaFormPage />
    },
    {
        path: RESPUESTA_ENCUESTA_LIST_URL,
        element: <RespuestaEncuestaListPage />
    },

    {
        path: USUARIO_EDIT_URL,
        element: <UsuarioEditPage />
    }
]);