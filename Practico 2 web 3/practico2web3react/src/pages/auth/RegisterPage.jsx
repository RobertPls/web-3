import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postUsuario } from "../../services";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../navigation/Constant";


// pagina de registro con todos los campos requeridos y tambien los arrays
// con los posibles errores para cada campo, esos errores vienen del backend
// y luego se mostraran los arrays de errores debaje de su input 
// igual llama al servicio de crear usuario

const RegisterPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errorsUsername, setErrorsUsername] = useState([]);
    const [errorsPassword, setErrorsPassword] = useState([]);
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsFirstName, setErrorsFirstName] = useState([]);
    const [errorsLastName, setErrorsLastName] = useState([]);

    const [showAlertError, setShowAlertError] = useState(false)
    
    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        register();
    }

    const register = () => {
        setShowAlertError(false);
        postUsuario({username:username, password:password, password2:password2, email:email, first_name:firstName, last_name:lastName})
        .then((response)=>{
            navigate(LOGIN_URL)
        }).catch((error) => {
            setEmptyErrors()
            let responseErrors = error.response.data.data
            if(responseErrors.email){
                setErrorsEmail(responseErrors.email)
            }
            if(responseErrors.password){
                setErrorsPassword(responseErrors.password)
            }
            if(responseErrors.username){
                setErrorsUsername(responseErrors.username)
            }
            if(responseErrors.first_name){
                setErrorsFirstName(responseErrors.first_name)
            }
            if(responseErrors.last_name){
                setErrorsLastName(responseErrors.last_name)
            }
            setShowAlertError(true);
        });
    }

    const setEmptyErrors = () =>{
        setErrorsEmail([])
        setErrorsUsername([])
        setErrorsPassword([])
        setErrorsFirstName([])
        setErrorsLastName([])
    }
    return (
        <>
            <Menu/>
            <Container>
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>
                            Crear una cuenta
                        </Card.Title>
                        <div>

                            <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                                
                                <FormGroup className="mt-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un usuario</Form.Control.Feedback>
                                </FormGroup>

                                {showAlertError && errorsUsername.length>0 && <Alert variant="danger">
                                    {errorsUsername.map(error=>{
                                        return error
                                    })}
                                </Alert>}

                                <FormGroup className="mt-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type="password" />
                                    <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mt-3">
                                    <Form.Label>Repita la contraseña</Form.Label>
                                    <FormControl value={password2} required
                                        onChange={(e) => {
                                            setPassword2(e.target.value);
                                        }}
                                        type="password" />
                                    <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                                </FormGroup>

                                {showAlertError && errorsPassword.length>0 && <Alert variant="danger">
                                    {errorsPassword.map(error=>{
                                        return error
                                    })}
                                </Alert>}

                                <FormGroup className="mt-3">
                                    <Form.Label>Email</Form.Label>
                                    <FormControl value={email} required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} 
                                        type="email"/>
                                    <Form.Control.Feedback type="invalid">Necesitas un correo electronico con el formato correcto test@test.com</Form.Control.Feedback>
                                </FormGroup>

                                {showAlertError && errorsEmail.length>0 && <Alert variant="danger">
                                    {errorsEmail.map(error=>{
                                        return error
                                    })}
                                </Alert>}

                                <FormGroup className="mt-3">
                                    <Form.Label>Nombres</Form.Label>
                                    <FormControl value={firstName} required
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}/>
                                    <Form.Control.Feedback type="invalid">Necesitas colocar su nombre</Form.Control.Feedback>
                                </FormGroup>

                                {showAlertError && errorsFirstName.length>0 && <Alert variant="danger">
                                    {errorsFirstName.map(error=>{
                                        return error
                                    })}
                                </Alert>}

                                <FormGroup className="mt-3">
                                    <Form.Label>Apellidos</Form.Label>
                                    <FormControl value={lastName} required
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}/>
                                    <Form.Control.Feedback type="invalid">Necesitas colocar sus apellidos</Form.Control.Feedback>
                                </FormGroup>

                                {showAlertError && errorsLastName.length>0 && <Alert variant="danger">
                                    {errorsLastName.map(error=>{
                                        return error
                                    })}
                                </Alert>}

                                <div className="d-flex justify-content-center mt-3">
                                    <Button type="submit">Registrarse</Button>
                                </div>

                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default RegisterPage;