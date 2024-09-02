import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, RESPUESTA_ENCUESTA_LIST_URL } from "../../navigation/Constant";
import { getDetalleEncuesta, postRespuestaEncuesta } from "../../services";


const RespuestaEncuestaFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [encuesta, setEncuesta] = useState(null);

    const [respuestas, setRespuestas] = useState([]);


    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        if (null !== location.state) {
            obtenerEncuesta(location.state.encuestaId)
        }

    }, [location.state, navigate])

    const obtenerEncuesta = (id) => {
        getDetalleEncuesta(getAuthToken(), id)
            .then((response) => {
                setEncuesta(response.data)
            })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        createRespuesta();

    }

    const createRespuesta = () => {
        setShowAlertError(false);
        postRespuestaEncuesta(getAuthToken(), { encuesta: encuesta.id, respuestas_preguntas: respuestas })
            .then((response) => {
                navigate(RESPUESTA_ENCUESTA_LIST_URL)
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
                            Respuesta a encuesta
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                {encuesta!==null && encuesta.preguntas.map(pregunta => (
                                    <div key={pregunta.id}>
                                        <FormGroup className="mt-3" key={pregunta.id}>
                                        <Form.Label>{pregunta.texto}</Form.Label>
                                        <FormControl
                                            value={respuestas.find((item) => item.pregunta === pregunta.id)?.texto || ''}
                                            required
                                            onChange={(e) => {
                                                const respuestaIndex = respuestas.findIndex((item) => item.pregunta === pregunta.id);
                                                if (respuestaIndex !== -1) {
                                                const updatedRespuestas = [...respuestas];
                                                updatedRespuestas[respuestaIndex] = {
                                                    pregunta: pregunta.id,
                                                    texto: e.target.value,
                                                };
                                                setRespuestas(updatedRespuestas);
                                                } else {
                                                setRespuestas([
                                                    ...respuestas,
                                                    {
                                                    pregunta: pregunta.id,
                                                    texto: e.target.value,
                                                    },
                                                ]);
                                                }
                                            }}
                                            />
                                        <Form.Control.Feedback type="invalid">Necesitas escribir una pregunta</Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                ))}
                                {/* 
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
                                </FormGroup> */}

                                <div className="d-flex justify-content-center mt-3">
                                    <Button type="submit">Responder Encuesta</Button>
                                </div>
                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default RespuestaEncuestaFormPage;