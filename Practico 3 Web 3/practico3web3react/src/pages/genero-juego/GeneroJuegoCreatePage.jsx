import { Alert, Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { getDetalleJuego, getListaGeneros, postGeneroJuego } from "../../services";
import { LOGIN_URL, JUEGO_DETAIL_URL } from "../../navigation/Constant";


const GeneroJuegoCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [generoId, setGeneroId] = useState(0);

    const [juego, setJuego] = useState({});

    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerJuego(location.state.juegoId)
        obtenerGeneros();
    }, [location.state.juegoId, navigate])

    const obtenerJuego = (id) => {
        getDetalleJuego(getAuthToken(), id)
            .then((response) => {
                setJuego(response.data.juego)
            })
    }

    const obtenerGeneros = () => {
        getListaGeneros(getAuthToken())
            .then((response) => {
                setListaGeneros(response.lista_generos);
            });
    }


    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        createGeneroJuego();
    }

    const createGeneroJuego = () => {
        setShowAlertError(false);
        postGeneroJuego(getAuthToken(), { genero: generoId, juego: juego.id })
            .then((response) => {
                navigate(JUEGO_DETAIL_URL, { state: { juegoId: juego.id } })
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
                            Formulario de Generos de un Juego
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                <FormGroup className="mt-3">
                                    <Form.Label>Selecciona un Genero</Form.Label>
                                    <Form.Control
                                        as="select"
                                        defaultValue={''}
                                        required
                                        aria-label="Seleccion un generp"
                                        onChange={e => {
                                            setGeneroId(e.target.value);
                                        }}>
                                        <option disabled value={''}></option>
                                        {listaGeneros.map((genero) => {
                                            return (
                                                <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Necesitas seleccionar un genero</Form.Control.Feedback>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    <Button type="submit">Agregar Genero</Button>
                                </div>
                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default GeneroJuegoCreatePage;