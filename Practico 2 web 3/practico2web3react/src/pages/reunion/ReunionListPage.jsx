import { Card, Container, Table, Button, Row, Col, Alert } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { deleteReunion, getListaReuniones } from "../../services";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REUNION_DETAIL_URL } from "../../navigation/Constant";


// pagina donde muestra la reuniones de un usuario ya sea la lista de reuniones 
// donde esta inscrito o la lista donde es el dueño, esta separados en la vista 
// y para la reuniones donde es dueño tiene la opcion de ver su detalle o editar y la
// opcion de eliminar su reunion


const ReunionListPage = () => {
    const navigate = useNavigate();
    const [listaReunionesDueño, setListaReunionesDueño] = useState([]);
    const [listaInscripciones, setListaInscripciones] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerReuniones()
    }, [navigate])
    
    const obtenerReuniones = () => {
        getListaReuniones(getAuthToken())
        .then((response) => {
            setListaReunionesDueño(response.dueño)
            setListaInscripciones(response.inscrito)
        });
    }

    const eliminarReunion = (id) =>{
        deleteReunion(getAuthToken(),id)
        .then((response)=>{
            obtenerReuniones()
        })
    }

    return (
        <>
        <Menu />
        <Container>
            <Row>
                <Col>
                    
                    <Alert className="mt-3">
                        <Alert.Heading>Bienvenido</Alert.Heading>
                        <p>Aplicacion para administracion de Reuniones</p>
                    </Alert>
                    
                    <Card className="mt-3">
                        <Card.Header>
                            Lista de Reuniones de la que eres Dueño
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Nombre De Reunion</th>
                                    <th>Fecha y Hora</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {listaReunionesDueño.map(reunion=>{
                                    return (
                                        <tr key={reunion.id}>
                                            <td>{reunion.nombre_reunion}</td>
                                            <td>{reunion.fecha_hora}</td>
                                            <td>
                                                <Button onClick={()=>{navigate(REUNION_DETAIL_URL,{state:{reunionId:reunion.id}})}}>Ver Detalles</Button>
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={()=>{eliminarReunion(reunion.id)}}>Eliminar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>


                    <Card className="mt-3">
                        <Card.Header>
                            Lista de Reuniones en la que estas agregado
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Nombre De Reunion</th>
                                    <th>Fecha y Hora</th>
                                    <th>Creador</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listaInscripciones.map(inscripcion=>{
                                    return (
                                        <tr key={inscripcion.id}>
                                            <td>{inscripcion.reunion.nombre_reunion}</td>
                                            <td>{inscripcion.reunion.fecha_hora}</td>
                                            <td>{inscripcion.reunion.user.first_name} {inscripcion.reunion.user.last_name}</td>
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

export default ReunionListPage;