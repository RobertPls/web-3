import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REUNION_LIST_URL } from "../../navigation/Constant";
import { getAuthToken, logout, validateLogin } from "../../utilities/TokenUtilities";
import { deleteUsuario, getDetalleUsuario, putUsuario } from "../../services";


// vista de edicion del usuario donde puede editar username, email, nombre y apelido 
// parecida a la vista de creacion con la lista de errores para los campos
// y los muestra debajo de su input

const UsuarioEditPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errorsUsername, setErrorsUsername] = useState([]);
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsFirstName, setErrorsFirstName] = useState([]);
    const [errorsLastName, setErrorsLastName] = useState([]);

    const [showAlertError, setShowAlertError] = useState(false)

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerUsuario()
    }, [navigate])

    const obtenerUsuario=()=>{
        getDetalleUsuario(getAuthToken())
        .then((response)=>{
            setEmail(response.email)
            setUsername(response.username)
            setFirstName(response.first_name)
            setLastName(response.last_name)
        })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        edtiUsuario()
    }

    const edtiUsuario = () => {
        setShowAlertError(false);
        putUsuario(getAuthToken(),{username:username,email:email,first_name:firstName,last_name:lastName})
        .then((response)=>{
            navigate(REUNION_LIST_URL)
        }).catch((error) => {
            setEmptyErrors()
            let responseErrors = error.response.data.data
            if(responseErrors.email){
                setErrorsEmail(responseErrors.email)
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
        setErrorsFirstName([])
        setErrorsLastName([])
    }

    const eliminarUsuario =()=>{
        deleteUsuario(getAuthToken())
        .then((response)=>{
            logout()
            navigate(LOGIN_URL)
        })
    }

    return (
        <>
            <Menu/>
            <Container>
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>
                            Editar mi usuario
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
                                    <Button type="submit">Actualizar</Button>
                                </div>

                            </Form>
                        </div>
                        
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="danger" onClick={()=>{eliminarUsuario()}}>Eliminar usuario</Button>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default UsuarioEditPage;