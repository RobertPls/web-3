import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, ENCUESTA_DETAIL_URL } from "../../navigation/Constant";
import { getDetalleOpcion, postOpcion, putOpcion } from "../../services";


const OpcionFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [preguntaId, setPreguntaId] = useState(0);
    const [encuestaId, setEncuestaId] = useState(0);

    const [texto, setTexto] = useState("");

    const [opcion, setOpcion] = useState({});


    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        setEncuestaId(location.state.encuestaId)
        setPreguntaId(location.state.preguntaId)
        if (undefined !== location.state.opcionId){
            obtenerOpcion(location.state.opcionId)
        }
    }, [location.state, navigate])

    const obtenerOpcion = (id) => {
        getDetalleOpcion(getAuthToken(), id)
            .then((response) => {
                setTexto(response.data.texto)
                setOpcion(response.data)
            })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;

        if (undefined === location.state.opcionId){
            createOpcion();
        } else {
            updateOpcion(opcion.id);
        }
    }

    const createOpcion = () => {
        setShowAlertError(false);
        postOpcion(getAuthToken(), { pregunta: preguntaId, texto: texto })
            .then((response) => {
                navigate(ENCUESTA_DETAIL_URL, { state: { encuestaId: encuestaId } })
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }

    const updateOpcion = (id) => {
        setShowAlertError(false);
        putOpcion(getAuthToken(), id, { texto: texto })
            .then((response) => {
                navigate(ENCUESTA_DETAIL_URL, { state: { encuestaId: encuestaId } })
            })
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
                            Formulario de Opciones de preguntas
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                <FormGroup className="mt-3">
                                    <Form.Label>Opcion</Form.Label>
                                    <FormControl value={texto} required
                                        onChange={(e) => {
                                            setTexto(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas escribir una opcion</Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    {undefined !== location.state.opcionId  &&
                                        <Button type="submit">Editar Opcion</Button>
                                    }

                                    {undefined === location.state.opcionId &&
                                        <Button type="submit">Agregar Opcion</Button>
                                    }
                                </div>
                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default OpcionFormPage;