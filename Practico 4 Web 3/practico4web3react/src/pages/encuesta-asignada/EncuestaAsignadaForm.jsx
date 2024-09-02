import { Alert, Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, ENCUESTA_ASIGNADA_LIST_URL } from "../../navigation/Constant";
import { getListaEncuestas, getListaUsuarios, postEncuestaAsignada } from "../../services";


const EncuestaAsignadaFormPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [usuario, setUsuario] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [encuesta, setEncuesta] = useState(0);
    const [listaEncuesta, setListaEncuesta] = useState([]);


    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerUsuarios()
        obtenerEncuestas()

    }, [navigate])

    const obtenerUsuarios = () => {
        getListaUsuarios(getAuthToken())
            .then((response) => {
                setListaUsuarios(response.data)
            })
    }

    const obtenerEncuestas = () => {
        getListaEncuestas(getAuthToken())
            .then((response) => {
                setListaEncuesta(response.data)
            })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        crearEncuestaAsignada();

    }

    const crearEncuestaAsignada = () => {
        setShowAlertError(false);
        postEncuestaAsignada(getAuthToken(), { usuario: usuario, encuesta: encuesta })
            .then((response) => {
                console.log(response)
                navigate(ENCUESTA_ASIGNADA_LIST_URL);
            })
            .catch((error) => {
                console.log(error)
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
                                    <Form.Label>Selecciona un Usuario</Form.Label>
                                    <Form.Control
                                        as="select"
                                        defaultValue={''}
                                        required
                                        aria-label="Seleccion un usuario"
                                        onChange={e => {
                                            setUsuario(e.target.value);
                                        }}>
                                        <option disabled value={''}></option>
                                        {listaUsuarios.map((usuario) => {
                                            return (
                                                <option key={usuario.id} value={usuario.id}>{usuario.first_name} {usuario.last_name}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Necesitas seleccionar un usuario</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mt-3">
                                    <Form.Label>Selecciona una Encuesta</Form.Label>
                                    <Form.Control
                                        as="select"
                                        defaultValue={''}
                                        required
                                        aria-label="Seleccion un encuesta"
                                        onChange={e => {
                                            setEncuesta(e.target.value);
                                        }}>
                                        <option disabled value={''}></option>
                                        {listaEncuesta.map((encuesta) => {
                                            return (
                                                <option key={encuesta.id} value={encuesta.id}>{encuesta.nombre}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Necesitas seleccionar una encuesta</Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    <Button type="submit">Agregar Encuesta</Button>
                                </div>



                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default EncuestaAsignadaFormPage;