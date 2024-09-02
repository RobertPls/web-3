import { Card, Container } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getListaEncuestas } from "../../services";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, ENCUESTA_DETAIL_URL } from "../../navigation/Constant";


const EncuestaListPage = () => {
    const navigate = useNavigate();
    const [listaEncuestas, setListaEncuestas] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerEncuestas()
    }, [navigate])

    const obtenerEncuestas = () => {
        getListaEncuestas(getAuthToken())
            .then((response) => {
                setListaEncuestas(response.data);
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <div >
                        <h3>Pagina de Lista de Encuestas</h3>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    {listaEncuestas.map(encuesta => {
                        return (
                            <Card border="dark" className="mt-3 text-center" key={encuesta.id} onClick={() => { navigate(ENCUESTA_DETAIL_URL, { state: { encuestaId: encuesta.id } }) }}>
                                <Card.Body>
                                    <Card.Title>{encuesta.nombre}</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>

            </Container>
        </>
    );
}

export default EncuestaListPage;