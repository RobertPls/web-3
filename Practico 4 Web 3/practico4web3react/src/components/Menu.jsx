import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL, USUARIO_EDIT_URL, ENCUESTA_LIST_URL, ENCUESTA_FORM_URL, ENCUESTA_ASIGNADA_LIST_URL, ENCUESTA_ASIGNADA_FORM_URL, RESPUESTA_ENCUESTA_LIST_URL } from "../navigation/Constant";
import { useEffect, useState } from "react";
import { getIsStaff, validateLogin } from "../utilities/TokenUtilities";
import { logout } from "../utilities/TokenUtilities"


const Menu = () => {
  const navigate = useNavigate();
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isStaff, setIsStaff] = useState(false);


  useEffect(() => {
    setIsLoginValid(validateLogin(navigate));
    setIsStaff(getIsStaff())
  }, [navigate])

  const cerrarSesion = () => {
    logout()
    navigate(LOGIN_URL)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>

        <Navbar.Brand>Practico 3 Web 3</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {isLoginValid && <>
              <NavDropdown title="Perfil" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(USUARIO_EDIT_URL) }} >Editar mi perfil</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Encuestas" id="basic-nav-dropdown">
                {isStaff===true&&<NavDropdown.Item onClick={() => { navigate(ENCUESTA_LIST_URL) }} >Lista de encuestas</NavDropdown.Item>}
                {isStaff===true&&<NavDropdown.Item onClick={() => { navigate(ENCUESTA_FORM_URL) }}>Crear encuesta</NavDropdown.Item>}
              </NavDropdown>
              <NavDropdown title="Encuestas Asignadas" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(ENCUESTA_ASIGNADA_LIST_URL) }} >Lista de encuestas Asignadas</NavDropdown.Item>
                {isStaff===true&&<NavDropdown.Item onClick={() => { navigate(ENCUESTA_ASIGNADA_FORM_URL) }}>Asignar una encuesta</NavDropdown.Item>}
              </NavDropdown>
              <NavDropdown title="Respuesta a Encuestas" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(RESPUESTA_ENCUESTA_LIST_URL) }} >Lista de Respuestas a encuestas</NavDropdown.Item>
              </NavDropdown>
              <Link className="nav-link" onClick={() => { cerrarSesion() }}>Cerrar Sesion</Link>
            </>
            }

            {!isLoginValid &&
              <Link className="nav-link" to={LOGIN_URL}>Iniciar Sesion</Link>

            }

          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>

  );
}

export default Menu;