import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, ENCUESTA_LIST_URL } from "../../navigation/Constant";
import { getDetalleEncuesta, postEncuesta, putEncuesta } from "../../services";


const EncuestaFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombre, setNombre] = useState("");

    const [encuesta, setEncuesta] = useState({});

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
                setNombre(response.data.nombre)
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

        if (null === location.state) {
            createEncuesta();
        } else {
            updateEncuesta(encuesta.id);
        }

    }

    const createEncuesta = () => {
        setShowAlertError(false);
        postEncuesta(getAuthToken(), { nombre: nombre })
            .then((response) => {
                navigate(ENCUESTA_LIST_URL);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }

    const updateEncuesta = (id) => {
        setShowAlertError(false);
        putEncuesta(getAuthToken(), id, { nombre: nombre })
            .then((response) => {
                navigate(ENCUESTA_LIST_URL);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }


    return (
        <>
            <Menu />
            <Container>
                <Card border="dark" className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Encuestas
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>

                                <FormGroup className="mt-3">
                                    <Form.Label>Nombre Encuesta</Form.Label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    {null !== location.state &&
                                        <Button type="submit">Editar Encuesta</Button>
                                    }

                                    {null === location.state &&
                                        <Button type="submit">Agregar Encuesta</Button>
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
export default EncuestaFormPage;