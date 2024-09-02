import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, JUEGO_LIST_URL } from "../../navigation/Constant";
import { getDetalleJuego, postJuego, putJuego, saveImageJuego } from "../../services";


const JuegoFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("empty");

    const [juego, setJuego] = useState({});


    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        if (location.state !== null) {
            obtenerJuego(location.state.juegoId)
        }
    }, [location.state, navigate])

    const obtenerJuego = (id) => {
        getDetalleJuego(getAuthToken(), id)
            .then((response) => {
                setNombre(response.data.juego.nombre)
                setPrecio(response.data.juego.precio)
                setJuego(response.data.juego)
            })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        if (location.state === null) {
            createJuego();
        } else {
            updateJuego(juego.id);
        }
    }

    const createJuego = () => {
        setShowAlertError(false);
        postJuego(getAuthToken(), { nombre: nombre, precio: precio })
            .then((response) => {
                saveImage(response.data.id)
                navigate(JUEGO_LIST_URL);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }

    const updateJuego = (id) => {
        setShowAlertError(false);
        putJuego(getAuthToken(), id, { nombre: nombre, precio: precio })
            .then((response) => {
                saveImage(response.data.id)
                navigate(JUEGO_LIST_URL);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }


    const saveImage = (id) => {
        if (imagen === 'empty') {
            return;
        }
        const data = new FormData();
        data.append("imagen", imagen);


        saveImageJuego(getAuthToken(), id, data)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error)
                setShowAlertError(true);
            });
    };


    return (
        <>
            <Menu />
            <Container>
                <Card border="dark" className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Juegos
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>

                                <FormGroup className="mt-3">
                                    <Form.Label>Nombre Juego</Form.Label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mt-3">
                                    <Form.Label>Precio</Form.Label>
                                    <FormControl value={precio} required
                                        onChange={(e) => {
                                            setPrecio(e.target.value);
                                        }} type='number'
                                        step="0.1" />
                                    <Form.Control.Feedback type="invalid">Necesitas un precio</Form.Control.Feedback>
                                </FormGroup>


                                <FormGroup className="mt-3">
                                    <Form.Label>Imagen</Form.Label>
                                    <FormControl
                                        onChange={(e) => {
                                            setImagen(e.target.files[0]);
                                        }} type="file"/>
                                </FormGroup>

                                <div className="d-flex justify-content-center mt-3">
                                    {location.state !== null &&
                                        <Button type="submit">Editar Juego</Button>
                                    }

                                    {location.state === null &&
                                        <Button type="submit">Crear Juego</Button>
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
export default JuegoFormPage;