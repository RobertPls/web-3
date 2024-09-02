import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, GENERO_LIST_URL } from "../../navigation/Constant";
import { getDetalleGenero, postGenero, putGenero, saveImageGenero } from "../../services";


const GeneroFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombre, setNombre] = useState("");

    const [genero, setGenero] = useState({});

    const [imagen, setImagen] = useState('empty');

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        if (location.state !== null) {
            obtenerGenero(location.state.generoId)
        }

    }, [location.state, navigate])

    const obtenerGenero = (id) => {
        getDetalleGenero(getAuthToken(), id)
            .then((response) => {
                setNombre(response.data.genero.nombre)
                setGenero(response.data.genero)
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
            createGenero();
        } else {
            updateGenero(genero.id);
        }

    }

    const createGenero = () => {
        setShowAlertError(false);
        postGenero(getAuthToken(), { nombre: nombre })
            .then((response) => {
                saveImage(response.data.id)
                navigate(GENERO_LIST_URL);
            })
            .catch((error) => {
                setShowAlertError(true);
            });
    }

    const updateGenero = (id) => {
        setShowAlertError(false);
        putGenero(getAuthToken(), id, { nombre: nombre })
            .then((response) => {
                saveImage(response.data.id)
                navigate(GENERO_LIST_URL);
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


        saveImageGenero(getAuthToken(), id, data)
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
                            Formulario de Generos
                        </Card.Title>

                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>

                                <FormGroup className="mt-3">
                                    <Form.Label>Nombre Genero</Form.Label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
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
                                        <Button type="submit">Editar Genero</Button>
                                    }

                                    {location.state === null &&
                                        <Button type="submit">Crear Genero</Button>
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
export default GeneroFormPage;