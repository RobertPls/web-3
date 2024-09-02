import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, Row, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { deleteInscripcion, getDetalleReunion, putReunion } from "../../services";
import { INSCRIPCION_CREATE_URL, LOGIN_URL } from "../../navigation/Constant";


// pagina de detalle igual tiene use location para obtener el parametro de id para cargar su detalle
// obtiene la reunion al mismo tiempo tiene la opcion de editar la reunion ya que tenemos su id
// y eliminar la reunion solo enviando el id
// primero esta el formulario de edicion/vista para la reunion
// debajo esta la lista de sus participantes


const ReunionDetailPage = () => { 
    const navigate = useNavigate();
    const location = useLocation();


    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombreReunion, setNombreReunion] = useState("");
    const [fechaHora, setFechaHora] = useState("");
    const [reunionId, setReunionId] = useState("");

    const [listaInscripciones, setListaInscipciones] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        setReunionId(location.state.reunionId)
        obtenerReunion(location.state.reunionId)
    }, [location.state.reunionId, navigate])

    const obtenerReunion = (id) =>{
        getDetalleReunion(getAuthToken(),id)
        .then((response)=>{
            setListaInscipciones(response.data.lista_inscripciones)
            let formatedDate = response.data.reunion.fecha_hora.replace("Z","")
            setNombreReunion(response.data.reunion.nombre_reunion)
            setFechaHora(formatedDate)
        })
    }

    const onFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        editReunion();
    }

    const editReunion = () => {
        setShowAlertError(false);
        putReunion(getAuthToken(),reunionId, {nombre_reunion: nombreReunion, fecha_hora: fechaHora})
        .then((response) => {
        })
        .catch((error) => {
            setShowAlertError(true);
        });
    }

    const eliminarInscripcion =(id)=>{
        deleteInscripcion(getAuthToken(),id)
        .then((response)=>{
            obtenerReunion(reunionId)
        })
    }


return (
    <>
    <Menu />
    <Container>
        <Row>
            <Col className="col-6 offset-3">
                <Card className="mt-3">
                    <Card.Header>
                        Edicion de reuniones
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Actualiza los datos de tu reunion
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
                                    <Button type="submit">Actualizar los datos</Button>
                                </div>

                            </Form>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col className="col-10 offset-1">
                <Card className="mt-3">
                    <Card.Header className="d-flex justify-content-between">
                        <span>Participantes</span>
                        <Button onClick={()=>{navigate(INSCRIPCION_CREATE_URL,{state:{reunionId:reunionId}})}}>Agregar Participante</Button>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead>
                            <tr>
                                <th>Usuario</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {listaInscripciones.map(inscripcion=>{
                                return(
                                    <tr key={inscripcion.id}>
                                        <td>{inscripcion.user.first_name} {inscripcion.user.last_name}</td>
                                        <td>
                                            <Button variant="danger" onClick={()=>{eliminarInscripcion(inscripcion.id)}}>Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        
    </Container>
</>
);
}
export default ReunionDetailPage;