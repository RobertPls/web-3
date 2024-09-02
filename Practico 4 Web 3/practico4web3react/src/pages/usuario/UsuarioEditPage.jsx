import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, ENCUESTA_LIST_URL } from "../../navigation/Constant";
import { getAuthToken, logout, validateLogin } from "../../utilities/TokenUtilities";
import { deleteUsuario, getDetalleUsuario, putUsuario } from "../../services";


const UsuarioEditPage = () => {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
        editUsuario()
    }

    const editUsuario = () => {
        setShowAlertError(false);
        putUsuario(getAuthToken(),{username:username,email:email,first_name:firstName,last_name:lastName})
        .then((response)=>{
            navigate(ENCUESTA_LIST_URL)
        }).catch((error) => {
            setShowAlertError(true);
        });
    }

    const eliminarUsuario =()=>{
        if(!window.confirm("¿Estas seguro que deseas eliminar tu usuario?")){
            return;
        }
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
                        {showAlertError && <Alert variant="danger">
                                Error al enviar datos, por favor intente nuevamente
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
                                    <Form.Label>Email</Form.Label>
                                    <FormControl value={email} required
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} 
                                        type="email"/>
                                    <Form.Control.Feedback type="invalid">Necesitas un correo electronico con el formato correcto test@test.com</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mt-3">
                                    <Form.Label>Nombres</Form.Label>
                                    <FormControl value={firstName} required
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}/>
                                    <Form.Control.Feedback type="invalid">Necesitas colocar su nombre</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className="mt-3">
                                    <Form.Label>Apellidos</Form.Label>
                                    <FormControl value={lastName} required
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}/>
                                    <Form.Control.Feedback type="invalid">Necesitas colocar sus apellidos</Form.Control.Feedback>
                                </FormGroup>

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