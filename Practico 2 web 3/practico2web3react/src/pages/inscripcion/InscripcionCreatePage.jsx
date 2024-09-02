import { Alert, Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { getListaUsuarios, postIscripcion } from "../../services";
import { LOGIN_URL, REUNION_DETAIL_URL } from "../../navigation/Constant";


// pagina de creacion de inscripcion con sus cambios igual tiene en el useEfect 
// una funcion que redirige a login si no hay usuario logueado
// igual con el sservicio obtiene la lista de usuario con sus nombres e id 
// para crear la inscripcion, igual esta el uselocation que es una manera
// de obtener los parametros que llegan a esta pagina en este caso el id de la reunion


const InscripcionCreatePage = () => { 
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [listaUsuarios, setListaUsuario] = useState([]);
    const [reunionId, setReunionId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        setReunionId(location.state.reunionId)
        obtenerUsuarios()
    }, [location.state.reunionId, navigate])

    const obtenerUsuarios = () => {
        getListaUsuarios(getAuthToken())
        .then((response) => {
            setListaUsuario(response)
        });
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        createInscripcion();
    }

    const createInscripcion = () => {
        setShowAlertError(false);
        postIscripcion(getAuthToken(), {reunion: reunionId, user: usuarioId})
        .then((response) => {
            navigate(REUNION_DETAIL_URL,{state:{reunionId:reunionId}})        })
        .catch((error) => {
            setShowAlertError(true);
    });
    }


return (
    <>
    <Menu />
    <Container>
        <Card className="mt-3">
            <Card.Body>
                <Card.Title>
                    Formulario de inscripciones
                </Card.Title>

                <div>
                    {showAlertError && <Alert variant="danger">
                        Error al enviar enviar datos, por favor intente nuevamente
                    </Alert>}
                    
                    <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                        <FormGroup className="mt-3">
                            <Form.Label>Selecciona un usuario</Form.Label>
                            <Form.Control
                            as="select"
                            defaultValue={''}
                            required 
                            aria-label="Default select example"
                            onChange={e => {
                                setUsuarioId(e.target.value);
                            }}>
                                <option disabled value={''}></option>
                                {listaUsuarios.map((usuario, index)=>{
                                    return(
                                        <option key={usuario.id} value={usuario.id}>{usuario.first_name} {usuario.last_name}</option>
                                    )
                                })}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Necesitas seleccionar un usario</Form.Control.Feedback>
                        </FormGroup>

                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit">Agregar Usuario</Button>
                        </div>

                    </Form>
                </div>

            </Card.Body>
        </Card>
    </Container>
</>
);
}
export default InscripcionCreatePage;