import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL, JUEGO_CREATE_URL, JUEGO_LIST_URL, GENERO_CREATE_URL, GENERO_LIST_URL, USUARIO_EDIT_URL } from "../navigation/Constant";
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
              <NavDropdown title="Generos" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(GENERO_LIST_URL) }} >Lista de generos</NavDropdown.Item>
                {isStaff===true&&<NavDropdown.Item onClick={() => { navigate(GENERO_CREATE_URL) }}>Crear Genero</NavDropdown.Item>}
              </NavDropdown>
              <NavDropdown title="Juegos" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(JUEGO_LIST_URL) }} >Lista de juegos</NavDropdown.Item>
                {isStaff===true&&<NavDropdown.Item onClick={() => { navigate(JUEGO_CREATE_URL) }}>Crear Juego</NavDropdown.Item>}
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