import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { LOGIN_URL, REUNION_LIST_URL } from "../../navigation/Constant";
import { postReunion } from "../../services";

// pagina de creacion de reunion con los parametro necesarios igual
// el api se encarga de relacionar esta reunion creada y agruegarle el dueño
// ya que con el token enviado el backend sabe quien lo creo

const ReunionCreatePage = () => { 
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombreReunion, setNombreReunion] = useState("");
    const [fechaHora, setFechaHora] = useState("");

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
    }, [navigate])

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        createReunion();
    }

    const createReunion = () => {
        setShowAlertError(false);
        postReunion(getAuthToken(), {nombre_reunion: nombreReunion, fecha_hora: fechaHora})
        .then((response) => {
            navigate(REUNION_LIST_URL);
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
                    Formulario de Reuniones
                </Card.Title>

                <div>
                    {showAlertError && <Alert variant="danger">
                        Error al enviar enviar datos, por favor intente nuevamente
                    </Alert>}
                    
                    <Form noValidate onSubmit={onFormSubmit} validated={validated}>
                        
                        <FormGroup className="mt-3">
                            <Form.Label>Nombre Reunion</Form.Label>
                            <FormControl value={nombreReunion} required
                                onChange={(e) => {
                                    setNombreReunion(e.target.value);
                                }} />
                            <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                        </FormGroup>
                        
                        <FormGroup className="mt-3">
                            <Form.Label>Fecha y Hora</Form.Label>
                            <FormControl value={fechaHora} required
                                onChange={(e) => {
                                    setFechaHora(e.target.value);
                                }}type="datetime-local" />
                            <Form.Control.Feedback type="invalid">Necesitas una fecha y hora</Form.Control.Feedback>
                        </FormGroup>

                        <div className="d-flex justify-content-center mt-3">
                            <Button type="submit">Crear Reunion</Button>
                        </div>

                    </Form>
                </div>

            </Card.Body>
        </Card>
    </Container>
</>
);
}
export default ReunionCreatePage;