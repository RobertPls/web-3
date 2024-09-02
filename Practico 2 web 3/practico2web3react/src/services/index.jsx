// pagina index similar a las de python donde se exportan las funciones principales

export {postLogin } from './AuthService';
export {deleteInscripcion, postIscripcion} from './InscripcionesService'
export {postUsuario, getDetalleUsuario, putUsuario, deleteUsuario, getListaUsuarios} from './UsuariosService';
export {getListaReuniones, postReunion, deleteReunion, getDetalleReunion, putReunion} from './ReunionesService';