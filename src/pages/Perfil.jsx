import { useState, useEffect } from "react";
import { Card, Form, Button, Modal, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Perfil = () => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        provincia: "",
        ciudad: "",
        localidad: "",
        whatsapp: "",
    });

    const [showMessage, setShowMessage] = useState(false);

    // Cargar datos iniciales del usuario
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                provincia: user.provincia || "",
                ciudad: user.ciudad || "",
                localidad: user.localidad || "",
                whatsapp: user.whatsapp || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map((u) =>
            u.id === user.id ? { ...u, ...formData } : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Actualizar la sesión
        login({ ...user, ...formData });

        setShowMessage(true);
    };

    return (
        <>
            <Card style={{ maxWidth: "700px", margin: "4rem auto", padding: "1.5rem", backgroundColor: "#f7f3fd" }}>
                <Card.Body>
                    <h3 className="mb-4 text-center">Mis Datos</h3>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="provincia"
                                    value={formData.provincia}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Localidad</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="localidad"
                                    value={formData.localidad}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label>WhatsApp</Form.Label>
                        <Form.Control
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="warning" className="w-100" onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showMessage} onHide={() => setShowMessage(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Datos guardados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Los cambios se guardaron correctamente.
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="success" onClick={() => setShowMessage(false)}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Perfil;
