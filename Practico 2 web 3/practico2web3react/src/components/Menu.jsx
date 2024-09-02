import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL, REUNION_CREATE_URL, REUNION_LIST_URL, USUARIO_EDIT_URL } from "../navigation/Constant";
import { useEffect, useState } from "react";
import { validateLogin } from "../utilities/TokenUtilities";
import { logout } from "../utilities/TokenUtilities"


// componente de menu header, tiene el navigate para moverse en rutas
// y una booleana que dice si esta logeado o no para cambiar lo que se muestra
// cerrar sesion que tiene la funcion logout que solo borra el token en localStorage


const Menu = () => {
  const navigate = useNavigate();
  const [isLoginValid, setIsLoginValid] = useState(false);


  useEffect(() => {
    setIsLoginValid(validateLogin(navigate));
  }, [navigate])

  const cerrarSesion = () =>{
    logout()
    navigate(LOGIN_URL)
  }

    return (
      <Navbar bg="dark" variant="dark" expand="lg" >
      <Container fluid>

        <Navbar.Brand onClick={()=>{navigate(REUNION_LIST_URL)}}>Practico 2 Web 3</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            {isLoginValid && <div>
              <NavDropdown title="Perfil" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{navigate(USUARIO_EDIT_URL)}} >Editar mi perfil</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Reuniones" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={()=>{navigate(REUNION_LIST_URL)}} >Lista de reuniones</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{navigate(REUNION_CREATE_URL)}}>Crear Reunion</NavDropdown.Item>
              </NavDropdown>
              <Link className="nav-link" onClick={()=>{cerrarSesion()}}>Cerrar Sesion</Link>
            </div>}

            {!isLoginValid && <div>
              <Link className="nav-link" to={LOGIN_URL}>Iniciar Sesion</Link>
            </div>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default Menu;