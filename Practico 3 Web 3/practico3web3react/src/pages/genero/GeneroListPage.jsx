import { Card, Container } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getListaGeneros } from "../../services";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, GENERO_DETAIL_URL } from "../../navigation/Constant";
import { BASE_URL } from "../../services/Constant";


const GeneroListPage = () => {
    const navigate = useNavigate();
    const [listaGeneros, setListaGeneros] = useState([]);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerGeneros()
    }, [navigate])

    const obtenerGeneros = () => {
        getListaGeneros(getAuthToken())
            .then((response) => {
                setListaGeneros(response.lista_generos);
            });
    }

    const formatImage = (src) =>{
        return BASE_URL+src
    }

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <div >
                        <h3>Pagina de Lista de Generos</h3>
                    </div>
                </div>
                <div className="col-6 offset-3 mt-3">
                    {listaGeneros.map(genero => {
                        return (
                            <Card border="dark" className="mt-3 text-center" key={genero.id} onClick={() => { navigate(GENERO_DETAIL_URL, { state: { generoId: genero.id } }) }}>
                                <Card.Img variant="top" src={formatImage(genero.imagen)} />
                                <Card.Body>
                                    <Card.Title>{genero.nombre}</Card.Title>
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

export default GeneroListPage;