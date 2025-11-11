import { Container, Nav, Navbar, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import "./Menu.css";


const Menu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
        
    return (
        <Navbar expand="lg" className="my-navbar">
            <Container>
                <Navbar.Brand href="/">
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

                {user && (
                    <Button variant="danger" size="sm" onClick={handleLogout}>
                    Salir
                    </Button>
                )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu
