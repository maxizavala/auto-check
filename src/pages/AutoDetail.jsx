import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Container, Accordion, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import usersData from "../data/users.json";

const AutoDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [car, setCar] = useState(null);
    const [services, setServices] = useState([]);
    const [talleres, setTalleres] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [km, setKm] = useState("");
    const [tallerId, setTallerId] = useState("");

    const CATEGORIES = [
        "Mecánica general",
        "Suspensión",
        "Eléctrico",
        "Service",
        "Neumáticos",
        "Frenos",
        "Alineación",
    ];

    // Cargar auto y servicios
    useEffect(() => {
        const cars = JSON.parse(localStorage.getItem("cars")) || [];
        const found = cars.find((c) => c.id === Number(id));
        setCar(found || null);

        if (!found) return;

        const dbServices = JSON.parse(localStorage.getItem("services")) || [];
        setServices(dbServices.filter((s) => s.carId === Number(id)));
    }, [id]);

    // Cargar talleres
    useEffect(() => {
        let users = JSON.parse(localStorage.getItem("users"));
        if (!users || users.length === 0) {
            users = usersData;
            localStorage.setItem("users", JSON.stringify(users));
        }
        const _talleres = users.filter((u) => u.tipo === "taller");
        setTalleres(_talleres);
    }, []);

    const handleSave = () => {
        const newService = {
            id: Date.now(),
            carId: Number(id),
            category,
            description,
            date,
            km: km === "" ? null : Number(km),
            tallerId: Number(tallerId),
            validado: false,
        };

        const db = JSON.parse(localStorage.getItem("services")) || [];
        db.push(newService);
        localStorage.setItem("services", JSON.stringify(db));

        setServices(db.filter((s) => s.carId === Number(id)));

        setCategory("");
        setDescription("");
        setDate("");
        setKm("");
        setTallerId("");
        setShowModal(false);
    };

    if (!car) return <h2>Auto no encontrado</h2>;

    const isOwner = user && car.owner === user.username;

    // Agrupación igual a la original
    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat] = services
            .filter((s) => s.category === cat)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        return acc;
    }, {});

    services.forEach((s) => {
        if (!grouped[s.category]) grouped[s.category] = [s];
    });

    const getTallerName = (id) => {
        const t = talleres.find((x) => x.id === id);
        return t ? t.nombreFantasia || t.username : "Desconocido";
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">
                {car.brand} {car.model} - {car.year} ({car.plate})
            </h2>

            {isOwner && (
                <Button
                    variant="warning"
                    className="mb-3 text-dark fw-bold"
                    onClick={() => setShowModal(true)}
                >
                    + Agregar servicio
                </Button>
            )}

            {services.length === 0 && <p className="mt-4">Sin historial.</p>}

            <Accordion alwaysOpen>
                {Object.entries(grouped).map(([cat, items], index) =>
                    items.length > 0 ? (
                        <Accordion.Item eventKey={index.toString()} key={cat}>
                            <Accordion.Header>{cat}</Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Descripción</th>
                                            <th>KMs</th>
                                            <th>Taller</th>
                                            <th>Validación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((srv) => (
                                            <tr key={srv.id}>
                                                <td>{srv.date}</td>
                                                <td>{srv.description}</td>
                                                <td>{srv.km || "-"}</td>
                                                <td>{getTallerName(srv.tallerId)}</td>
                                                <td>
                                                    {srv.validado && (
                                                        <span className="text-success fw-bold">
                                                            ✔ Validado
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ) : null
                )}
            </Accordion>

            {/* Modal */}
            <Modal
                show={showModal && isOwner}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Servicio</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Seleccionar...</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                value={description}
                                placeholder="Ej: Cambio de pastillas"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kilómetros</Form.Label>
                            <Form.Control
                                type="number"
                                value={km}
                                onChange={(e) => setKm(e.target.value)}
                                placeholder="Ej: 125000"
                                min="0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Taller</Form.Label>
                            <Form.Select
                                value={tallerId}
                                onChange={(e) => setTallerId(e.target.value)}
                            >
                                <option value="">Seleccionar...</option>
                                {talleres.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.nombreFantasia || t.username}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="warning"
                        className="text-dark fw-bold"
                        onClick={handleSave}
                        disabled={!category || !description || !date || !tallerId}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AutoDetail;







