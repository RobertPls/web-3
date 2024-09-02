import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, getIsStaff, validateLogin } from "../../utilities/TokenUtilities";
import { deleteGeneroJuego, deleteJuego, getDetalleJuego } from "../../services";
import { LOGIN_URL, JUEGO_LIST_URL, JUEGO_CREATE_URL, GENEROJUEGO_CREATE_URL } from "../../navigation/Constant";
import { BASE_URL } from "../../services/Constant";


const JuegoDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [juego, setJuego] = useState({});

    const [listaGenerosDelJuego, setListaGenerosDelJuego] = useState([]);

    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        setIsStaff(getIsStaff())
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerJuego(location.state.juegoId)
    }, [location.state.juegoId, navigate])

    const obtenerJuego = (id) => {
        getDetalleJuego(getAuthToken(), id)
            .then((response) => {
                setJuego(response.data.juego)
                setListaGenerosDelJuego(response.data.lista_generos)
            })
    }


    const eliminarJuego = (id) => {
        if (!window.confirm("¿Estas seguro que deseas eliminar este juego?")) {
            return;
        }
        deleteJuego(getAuthToken(), id)
            .then((response) => {
                navigate(JUEGO_LIST_URL)
            })
    }

    const eliminarGeneroJuego = (id) => {
        if (!window.confirm("¿Estas seguro que deseas quitarle este genero?")) {
            return;
        }
        deleteGeneroJuego(getAuthToken(), id)
            .then((response) => {
                obtenerJuego(juego.id)
            })
    }

    const formatImage = (src) => {
        return BASE_URL + src
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <Col className="align-items-center">
                        <Row className="mt-3">
                            <h3>{juego.nombre}</h3>
                        </Row>
                        <Row>
                            <Image src={formatImage(juego.imagen)} alt="logo del juego" />
                        </Row>
                        {isStaff === true && <>
                            <Row className="mt-3">
                                <Button className="col-6 offset-3" variant="primary" onClick={() => { navigate(JUEGO_CREATE_URL, { state: { juegoId: juego.id } }) }}>Editar</Button>
                            </Row>
                            <Row className="mt-3">
                                <Button className="col-6 offset-3" variant="danger" onClick={() => { eliminarJuego(juego.id) }}>Eliminar</Button>
                            </Row>
                        </>}
                    </Col>
                </div>
                <div className="mt-3 text-center col-10 offset-1">
                    <Card border="dark">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p>
                                        Precio: {juego.precio}$
                                    </p>
                                </Col>
                                <Col>
                                    <p>
                                        Generos:
                                    </p>
                                    {isStaff === true && <Row>
                                        <Button className="col-6 offset-3" variant="primary" onClick={() => { navigate(GENEROJUEGO_CREATE_URL, { state: { juegoId: juego.id } }) }}>Agregar Genero</Button>
                                    </Row>}
                                    <Row sm="2">
                                        {listaGenerosDelJuego.map(item => {
                                            return (
                                                <Card text="white" bg="dark" className="mt-3" key={item.id}>
                                                    <Card.Body>{item.genero.nombre}</Card.Body>
                                                    {isStaff === true && <>
                                                        <Card.Footer>
                                                            <Button variant="danger" onClick={() => { eliminarGeneroJuego(item.id) }}>Eliminar Genero</Button>
                                                        </Card.Footer></>}
                                                </Card>
                                            )
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Card>
                </div>

            </Container>
        </>
    );
}
export default JuegoDetailPage;