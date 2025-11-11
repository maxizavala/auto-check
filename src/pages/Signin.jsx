import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Modal } from "react-bootstrap";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Validaciones
        if (!username || !password || !confirmPassword) {
            setErrorMsg("Todos los campos son obligatorios");
            setShowError(true);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden");
            setShowError(true);
            return;
        }

        if (users.some((user) => user.username === username)) {
            setErrorMsg("El usuario ya existe");
            setShowError(true);
            return;
        }

        // Guardar nuevo usuario
        const newUser = { id: Date.now(), username, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        navigate("/perfil");
    };

    return (
        <>
        <Card style={{ maxWidth: "400px", margin: "5rem auto", padding: "1rem", backgroundColor: "#f7f3fd" }}>
            <Card.Body>
            <h3 className="text-center mb-4">Ingresa tus datos</h3>

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

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repita su contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100">
                    Registrate
                </Button>

                <Button
                    variant="dark"
                    type="button"
                    className="w-100 mt-3"
                    onClick={() => navigate("/login")}
                    >
                    Ingresar
                </Button>
            </Form>
            </Card.Body>
        </Card>

        <Modal size="sm" show={showError} onHide={() => setShowError(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMsg}</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => setShowError(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default Signin;

