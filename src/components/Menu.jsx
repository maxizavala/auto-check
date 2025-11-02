import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import "./Menu.css";


const Menu = () => {
    return (
        <Navbar expand="lg" className="my-navbar">
            <Container>
                <Navbar.Brand>
                    <img
                        src={logo}
                        alt="Logo"
                        height="40"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="perfil">Perfil</Nav.Link>
                    <Nav.Link as={Link} to="garage">Garage</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
