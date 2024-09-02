import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, RESPUESTA_ENCUESTA_FORM_URL } from "../../navigation/Constant";
import { getListaEncuestaAsignadas } from "../../services";


const EncuestaAsignadaListPage = () => {
    const navigate = useNavigate();
    const [listasEncuestasAsignadas, setListaEncuestasAsignadas] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerEncuestasAsignadas()
    }, [navigate])

    const obtenerEncuestasAsignadas = () => {
        getListaEncuestaAsignadas(getAuthToken())
            .then((response) => {
                setListaEncuestasAsignadas(response.data);
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <div>
                    <h3>Pagina de Encuestas Asignadas</h3>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Row>
                    {listasEncuestasAsignadas.map(encuestaAsignada => (
                        <Col sm={4} key={encuestaAsignada.id}>
                        <Card border="dark" className="mt-3 text-center">
                            <Card.Body>
                            <Card.Title>{encuestaAsignada.encuesta.nombre}</Card.Title>
                            <Card.Text>
                                Usuario: {encuestaAsignada.usuario.first_name} {encuestaAsignada.usuario.last_name}
                            </Card.Text>
                            <Button className="btn btn-primary" onClick={()=>navigate(RESPUESTA_ENCUESTA_FORM_URL, {state: {encuestaId: encuestaAsignada.encuesta.id}})}>Responder</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
                </div>
            </Container>

        </>
    );
}

export default EncuestaAsignadaListPage;