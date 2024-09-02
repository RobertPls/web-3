import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken, getIsStaff, validateLogin } from "../../utilities/TokenUtilities";
import { deleteGenero, getDetalleGenero, } from "../../services";
import { GENERO_CREATE_URL, GENERO_LIST_URL, JUEGO_DETAIL_URL, LOGIN_URL, } from "../../navigation/Constant";
import { BASE_URL } from "../../services/Constant";


const GeneroDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [genero, setGenero] = useState({});

    const [listaJuegosDelGenero, setListaJuegosDelGenero] = useState([]);

    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        setIsStaff(getIsStaff())
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerGenero(location.state.generoId)
    }, [location.state.generoId, navigate])

    const obtenerGenero = (id) => {
        getDetalleGenero(getAuthToken(), id)
            .then((response) => {
                setListaJuegosDelGenero(response.data.lista_juegos)
                setGenero(response.data.genero)
            })
    }

    const eliminarGenero = (id) => {
        if (!window.confirm("¿Estas seguro que deseas eliminar este genero?")) {
            return;
        }
        deleteGenero(getAuthToken(), id)
            .then((response) => {
                navigate(GENERO_LIST_URL)
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
                            <h3>Genero: {genero.nombre}</h3>
                        </Row>
                        <Row>
                            <Image src={formatImage(genero.imagen)} alt="logo del genero" />
                        </Row>
                        {isStaff === true && <>
                            <Row className="mt-3">
                                <Button className="col-6 offset-3" variant="primary" onClick={() => { navigate(GENERO_CREATE_URL, { state: { generoId: genero.id } }) }}>Editar</Button>
                            </Row>
                            <Row className="mt-3">
                                <Button className="col-6 offset-3" variant="danger" onClick={() => { eliminarGenero(genero.id) }}>Eliminar</Button>
                            </Row>
                        </>}
                    </Col>
                </div>
                <div className="col-10 offset-1 mt-3">
                    {listaJuegosDelGenero.map(item => {
                        return (
                            <Card border="dark" className="mt-3 text-center d-flex" key={item.id} onClick={() => { navigate(JUEGO_DETAIL_URL, { state: { juegoId: item.juego.id } }) }}>
                                <Row>
                                    <Col className="my-auto col-3">
                                        <Card.Img src={formatImage(item.juego.imagen)} />
                                    </Col>
                                    <Col className="my-auto col-9">
                                        <Card.Title>{item.juego.nombre}</Card.Title>
                                        <Card.Text>{item.juego.precio}$</Card.Text>
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
export default GeneroDetailPage;