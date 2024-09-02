import { Card, Container, Row, Col } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getListaJuegos } from "../../services";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { JUEGO_DETAIL_URL, LOGIN_URL, } from "../../navigation/Constant";
import { BASE_URL } from "../../services/Constant";


const JuegoListPage = () => {
    const navigate = useNavigate();
    const [listaJuegos, setListaJuegos] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerJuegos()
    }, [navigate])

    const obtenerJuegos = () => {
        getListaJuegos(getAuthToken())
            .then((response) => {
                setListaJuegos(response.lista_juegos);
            });
    }

    const formatImage = (src) => {
        return BASE_URL + src
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <div >
                        <h3>Pagina de Lista de Juegos</h3>
                    </div>
                </div>
                <div className="col-10 offset-1 mt-3">
                    {listaJuegos.map(juego => {
                        return (
                            <Card border="dark" className="mt-3 text-center d-flex" key={juego.id} onClick={() => { navigate(JUEGO_DETAIL_URL, { state: { juegoId: juego.id } }) }}>
                                <Row>
                                    <Col className="my-auto col-3">
                                        <Card.Img src={formatImage(juego.imagen)} />
                                    </Col>
                                    <Col className="my-auto col-9">
                                        <Card.Title>{juego.nombre}</Card.Title>
                                        <Card.Text>{juego.precio}$</Card.Text>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })}
                </div>

            </Container>
        </>
    );
}

export default JuegoListPage;