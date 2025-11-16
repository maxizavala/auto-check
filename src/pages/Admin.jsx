import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Table, Alert } from "react-bootstrap";

const estadisticas = {
    usuarios: 42,
    autos: 128,
    services: 342,
    autosEnVenta: 11,
    talleres: 5,
};

const Admin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [talleres, setTalleres] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
        nombreFantasia: "",
    });

    useEffect(() => {
        const guardados = localStorage.getItem("users");
        let lista = [];

        if (guardados) {
            try {
                lista = JSON.parse(guardados);
                if (!Array.isArray(lista)) lista = [];
            } catch {
                lista = [];
            }
        }

        setUsuarios(lista);
        setTalleres(lista.filter((u) => u.tipo === "taller"));
    }, []);

    const guardarUsuarios = (lista) => {
        setUsuarios(lista);
        setTalleres(lista.filter((u) => u.tipo === "taller"));
        localStorage.setItem("users", JSON.stringify(lista));
    };

    const agregarTaller = (e) => {
        e.preventDefault();

        if (!form.username || !form.password || !form.nombreFantasia) {
            setAlerta("Todos los campos son obligatorios");
            setTimeout(() => setAlerta(null), 3000);
            return;
        }

        const nuevo = {
            id: Date.now(),
            username: form.username,
            password: form.password,
            tipo: "taller",
            nombreFantasia: form.nombreFantasia,
        };

        const nuevosUsuarios = [...usuarios, nuevo];
        guardarUsuarios(nuevosUsuarios);

        setForm({ username: "", password: "", nombreFantasia: "" });
        setMostrarModal(false);

        setAlerta("Taller agregado correctamente");
        setTimeout(() => setAlerta(null), 3000);
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col><h2>Panel de Administrador</h2></Col>
                <Col className="text-end">
                    <Button onClick={() => setMostrarModal(true)}>Agregar Taller</Button>
                </Col>
            </Row>

            {alerta && <Alert className="mb-3">{alerta}</Alert>}

            <Row className="g-3 mb-4">
                <Col md={3}><Card><Card.Body><h5>Usuarios</h5><h2>{estadisticas.usuarios}</h2></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><h5>Autos</h5><h2>{estadisticas.autos}</h2></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><h5>Services</h5><h2>{estadisticas.services}</h2></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><h5>Autos en Venta</h5><h2>{estadisticas.autosEnVenta}</h2></Card.Body></Card></Col>
                <Col md={3}><Card><Card.Body><h5>Talleres</h5><h2>{talleres.length}</h2></Card.Body></Card></Col>
            </Row>

            <Table bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Fantasía</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {talleres.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.nombreFantasia}</td>
                            <td>{t.username}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
                <Form onSubmit={agregarTaller}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Taller</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Nombre Fantasía</Form.Label>
                            <Form.Control
                                value={form.nombreFantasia}
                                onChange={(e) =>
                                    setForm({ ...form, nombreFantasia: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Admin;

