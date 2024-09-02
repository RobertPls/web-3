import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, ENCUESTA_DETAIL_URL } from "../../navigation/Constant";
import { getDetallePregunta, postPregunta, putPregunta } from "../../services";


const PreguntaFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [encuestaId, setEncuestaId] = useState(0);

    const [texto, setTexto] = useState("");
    const [tipo, setTipo] = useState("");
    const [listaTipos] = useState([{"id":0,"tipo":"TEXTUAL"},{"id":1,"tipo":"NUMERICA"},{"id":2,"tipo":"MULTIPLE"}]);

    const [pregunta, setPregunta] = useState({});


    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        setEncuestaId(location.state.encuestaId)
        if (undefined!==location.state.preguntaId){
            obtenerPregunta(location.state.preguntaId)
        }
    }, [location.state, navigate])

    const obtenerPregunta = (id) => {
        getDetallePregunta(getAuthToken(), id)
            .then((response) => {
                setTexto(response.data.texto)
                setTipo(response.data.tipo)
                setPregunta(response.data)
            })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;

        if (undefined === location.state.preguntaId){
            createPregunta();
        } else {
            updatePregunta(pregunta.id);
        }
    }

    const createPregunta = () => {
        setShowAlertError(false);
        postPregunta(getAuthToken(), { encuesta: encuestaId, texto: texto, tipo:tipo })
            .then((response) => {
                navigate(ENCUESTA_DETAIL_URL, { state: { encuestaId: encuestaId } })
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }

    const updatePregunta = (id) => {
        setShowAlertError(false);
        putPregunta(getAuthToken(), id, { texto: texto, tipo: tipo })
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
                            Formulario de Preguntas
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                <FormGroup className="mt-3">
                                    <Form.Label>Pregunta</Form.Label>
                                    <FormControl value={texto} required
                                        onChange={(e) => {
                                            setTexto(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas escribir una pregunta</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mt-3">
                                    <Form.Label>Selecciona un Tipo de pregunta</Form.Label>
                                    <Form.Control
                                        as="select"
                                        defaultValue={''}
                                        required
                                        aria-label="Seleccion un genero"
                                        onChange={e => {
                                            setTipo(e.target.value);
                                        }}>
                                        <option disabled value={''}></option>
                                        {listaTipos.map((encuesta) => {
                                            return (
                                                <option key={encuesta.id} value={encuesta.tipo}>{encuesta.tipo}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Necesitas seleccionar un tipo de pregunta</Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    {undefined !== location.state.preguntaId  &&
                                        <Button type="submit">Editar Pregunta</Button>
                                    }

                                    {undefined === location.state.preguntaId &&
                                        <Button type="submit">Agregar Pregunta</Button>
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
export default PreguntaFormPage;