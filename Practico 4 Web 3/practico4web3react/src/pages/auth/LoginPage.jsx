import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postLogin } from "../../services";
import { Link, useNavigate } from "react-router-dom";

import { REGISTER_URL, ENCUESTA_ASIGNADA_LIST_URL } from "../../navigation/Constant";
import { setAuthToken, setIsStaff } from "../../utilities/TokenUtilities";


const LoginPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertError, setShowAlertError] = useState(false)

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        login();
    }

    const login = () => {
        setShowAlertError(false);
        postLogin(username, password)
        .then((response) => {
            setAuthToken(response.access, response.refresh)
            setIsStaff(response.is_staff)
            navigate(ENCUESTA_ASIGNADA_LIST_URL);
        })
        .catch((error) => {
            if (error.response.status === 401) {
                setShowAlertError(true);
            } 
        });
    }
    return (
        <>
            <Menu/>
            <Container>
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>
                            Inicio de Sesion
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Usuario o contraseña incorrectas
                            </Alert>}
                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                <FormGroup className="mt-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un usuario</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup className="mt-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type="password" />
                                    <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                                </FormGroup>
                                <div className="d-flex justify-content-center mt-3">
                                    <Button type="submit">Iniciar Sesión</Button>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <Link to={ REGISTER_URL}>Registrarse</Link>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;