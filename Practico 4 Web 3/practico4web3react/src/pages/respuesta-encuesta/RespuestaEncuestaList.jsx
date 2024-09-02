import { Card, Col, Container, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../navigation/Constant";
import { getListaRespuestaEncuestas } from "../../services";


const RespuestaEncuestaListPage = () => {
    const navigate = useNavigate();
    const [listaRespuestasEncuestas, setListaRespuestasEncuestas] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerEncuestasAsignadas()
    }, [navigate])

    const obtenerEncuestasAsignadas = () => {
        getListaRespuestaEncuestas(getAuthToken())
        .then((response) => {
            console.log(response)
            setListaRespuestasEncuestas(response.data);
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <div>
                    <h3>Pagina de Respuestas a ecuesta</h3>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <Row>
                    {listaRespuestasEncuestas.map(respuestasEncuesta => (
                        <Col sm={12} key={respuestasEncuesta.id}>
                        <Card border="dark" className="mt-3 text-center">
                            <Card.Body>
                            <Card.Title>{respuestasEncuesta.encuesta.nombre}</Card.Title>
                            <Card.Text>Usuario: {respuestasEncuesta.usuario.first_name} {respuestasEncuesta.usuario.last_name}</Card.Text>
                            {respuestasEncuesta!==null && respuestasEncuesta.respuestas_preguntas.map(respuesta_pregunta => (<div  key={respuesta_pregunta.id}>
                                    <p className="text-danger">{respuesta_pregunta.pregunta.texto}</p>
                                    <p>{respuesta_pregunta.texto}</p>
                            </div>))}
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

export default RespuestaEncuestaListPage;