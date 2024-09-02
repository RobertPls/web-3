import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getAuthToken,
    getIsStaff,
    validateLogin,
} from "../../utilities/TokenUtilities";
import { deleteEncuesta, deleteOpcion, getDetalleEncuesta } from "../../services";
import {
    ENCUESTA_FORM_URL,
    ENCUESTA_LIST_URL,
    LOGIN_URL,
    OPCION_FORM_URL,
    PREGUNTA_FORM_URL,
} from "../../navigation/Constant";
import { deletePregunta } from "../../services";

const EncuestaDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [encuesta, setEncuesta] = useState({});

    const [listaPreguntasDeEncuesta, setListaPreguntasDeEncuesta] = useState([]);

    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        setIsStaff(getIsStaff());
        if (!loginValid) return navigate(LOGIN_URL);
        obtenerEncuesta(location.state.encuestaId);
    }, [location.state.encuestaId, navigate]);

    const obtenerEncuesta = (id) => {
        getDetalleEncuesta(getAuthToken(), id).then((response) => {
            setListaPreguntasDeEncuesta(response.data.preguntas);
            setEncuesta(response.data);
        });
    };

    const eliminarEncuesta = (id) => {
        if (!window.confirm("¿Estas seguro que deseas eliminar?")) {
            return;
        }
        deleteEncuesta(getAuthToken(), id).then((response) => {
            navigate(ENCUESTA_LIST_URL);
        });
    };

    const eliminarPregunta = (id) => {
        if (!window.confirm("¿Estas seguro que deseas eliminar?")) {
            return;
        }
        deletePregunta(getAuthToken(), id).then((response) => {
            obtenerEncuesta(encuesta.id);
        });
    };

    const eliminarOpcion = (id) => {
        if (!window.confirm("¿Estas seguro que deseas eliminar?")) {
            return;
        }
        deleteOpcion(getAuthToken(), id).then((response) => {
            obtenerEncuesta(encuesta.id);
        });
    };

    return (
        <>
            <Menu />
            <Container>
                <div className="mt-3 text-center col-6 offset-3">
                    <Col className="align-items-center">
                        <Row className="mt-3">
                            <h3>Encuesta: {encuesta.nombre}</h3>
                        </Row>
                        {isStaff === true && (
                            <>
                                <Row className="mt-3">
                                    <Button
                                        className="col-6 offset-3"
                                        variant="primary"
                                        onClick={() => {
                                            navigate(ENCUESTA_FORM_URL, {
                                                state: { encuestaId: encuesta.id },
                                            });
                                        }}
                                    >
                                        Editar
                                    </Button>
                                </Row>
                                <Row className="mt-3">
                                    <Button
                                        className="col-6 offset-3"
                                        variant="danger"
                                        onClick={() => {
                                            eliminarEncuesta(encuesta.id);
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Row>
                            </>
                        )}
                    </Col>
                </div>
                <Row>
                    <Col className="col-12">
                        <Card className="mt-3">
                            <Card.Header className="d-flex justify-content-between">
                                <span>Preguntas</span>
                                <Button
                                    onClick={() => {
                                        navigate(PREGUNTA_FORM_URL, {
                                            state: { encuestaId: encuesta.id },
                                        });
                                    }}
                                >
                                    Agregar Pregunta
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Pregunta</th>
                                            <th>tipo</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPreguntasDeEncuesta.map((pregunta) => {
                                            return (
                                                <tr key={pregunta.id}>
                                                    <td>
                                                        <div>{pregunta.texto}</div>
                                                        {pregunta.opciones.length > 0 && (
                                                            <>
                                                                <ul>
                                                                    {pregunta.opciones.map((opcion) => {
                                                                        return (
                                                                            <Row key={opcion.id}>
                                                                                <Col className="col-5">
                                                                                    <li>{opcion.texto}</li>
                                                                                </Col>
                                                                                <Col className="col-7">
                                                                                    <Row>
                                                                                        <Col>
                                                                                            <Button
                                                                                                variant="primary"
                                                                                                onClick={() =>
                                                                                                    navigate(OPCION_FORM_URL, {
                                                                                                        state: {
                                                                                                            opcionId: opcion.id,
                                                                                                            encuestaId: encuesta.id,
                                                                                                            preguntaId: pregunta.id,
                                                                                                        },
                                                                                                    })
                                                                                                }
                                                                                            >
                                                                                                Editar
                                                                                            </Button>
                                                                                        </Col>
                                                                                        <Col>
                                                                                            <Button
                                                                                                variant="danger"
                                                                                                onClick={() => {
                                                                                                    eliminarOpcion(opcion.id);
                                                                                                }}
                                                                                            >
                                                                                                Eliminar
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                            </Row>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>{pregunta.tipo}</td>

                                                    {pregunta.tipo === "MULTIPLE" && (
                                                        <>
                                                            <td>
                                                                <Button
                                                                    variant="success"
                                                                    onClick={() => {
                                                                        navigate(OPCION_FORM_URL, {
                                                                            state: {
                                                                                encuestaId: encuesta.id,
                                                                                preguntaId: pregunta.id,
                                                                            },
                                                                        });
                                                                    }}
                                                                >
                                                                    Opcion
                                                                </Button>
                                                            </td>
                                                        </>
                                                    )}

                                                    {pregunta.tipo !== "MULTIPLE" && (
                                                        <>
                                                            <td></td>
                                                        </>
                                                    )}

                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => {
                                                                navigate(PREGUNTA_FORM_URL, {
                                                                    state: {
                                                                        encuestaId: encuesta.id,
                                                                        preguntaId: pregunta.id,
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => {
                                                                eliminarPregunta(pregunta.id);
                                                            }}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
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
};
export default EncuestaDetailPage;
