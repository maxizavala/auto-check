import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(
            (user) => user.username === username && user.password === password
        );

        if (validUser) {
            login(validUser.username);
            navigate("/perfil");
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            <Card style={{ maxWidth: "400px", margin: "5rem auto", padding: "1rem", backgroundColor: "#f7f3fd" }}>
                <Card.Body>
                <h3 className="text-center mb-4">Inicio de sesión</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Ingresar
                    </Button>

                    <Button
                        variant="warning"
                        type="button"
                        className="w-100 mt-3"
                        onClick={() => navigate("/registrar")}
                    >
                        Registrarse
                    </Button>
                </Form>
                </Card.Body>
            </Card>

            <Modal size="sm" show={showError} onHide={() => setShowError(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Usuario o contraseña incorrectos.</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="danger" onClick={() => setShowError(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;