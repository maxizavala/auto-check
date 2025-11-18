import { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Garage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    // Modal de "Vender auto"
    const [showSellModal, setShowSellModal] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    // Modal de "Agregar auto"
    const [showAddModal, setShowAddModal] = useState(false);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");

    // Cargar autos del usuario
    useEffect(() => {
        const db = JSON.parse(localStorage.getItem("cars")) || [];
        const userCars = db.filter(car => car.owner === user?.username);
        setCars(userCars);
    }, [user]);

    // Guardar auto nuevo
    const handleSaveCar = () => {
        const db = JSON.parse(localStorage.getItem("cars")) || [];

        const newCar = {
            id: Date.now(),
            owner: user.username,
            brand,
            model,
            year,
            plate
        };

        db.push(newCar);
        localStorage.setItem("cars", JSON.stringify(db));

        setCars(db.filter(c => c.owner === user.username));

        setShowAddModal(false);
        setBrand("");
        setModel("");
        setYear("");
        setPlate("");
    };

    return (
        <Container>
            <h2 className="mt-4 mb-3">Mi Garage</h2>

            <Button variant="warning" onClick={() => setShowAddModal(true)}>
                + Agregar Auto
            </Button>

            <Row className="mt-4">
                {cars.length === 0 && <p>Cargá tu primer auto</p>}

                {cars.map((car) => (
                    <Col key={car.id} xs={12} md={6} lg={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{car.brand} {car.model}</Card.Title>
                                <Card.Text>
                                    Año: {car.year} <br />
                                    Patente: {car.plate}
                                </Card.Text>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="dark"
                                        onClick={() => navigate(`/auto/${car.id}`)}
                                    >
                                        Ver historial
                                    </Button>

                                    <Button
                                        variant="success"
                                        onClick={() => {
                                            setSelectedCar(car);
                                            setShowSellModal(true);
                                        }}
                                    >
                                        Vender tu auto
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Auto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Año</Form.Label>
                            <Form.Control
                                value={year}
                                type="number"
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Patente</Form.Label>
                            <Form.Control
                                value={plate}
                                onChange={(e) => setPlate(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSaveCar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSellModal} onHide={() => setShowSellModal(false)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Vende tu Auto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedCar && (
                        <Form>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Titulo del aviso</Form.Label>
                                    <Form.Control value={`${selectedCar.brand} ${selectedCar.model} ${selectedCar.year}`} readOnly />
                                </Col>
                                <Col>
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control value={selectedCar.brand} readOnly />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control value={selectedCar.model} readOnly />
                                </Col>
                                <Col>
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control type="number" value={selectedCar.year} readOnly />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Patente</Form.Label>
                                    <Form.Control value={selectedCar.plate} readOnly />
                                </Col>
                                <Col>
                                    <Form.Label>Kilómetros</Form.Label>
                                    <Form.Control placeholder="Ej: 82000" />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Precio USD</Form.Label>
                                    <Form.Control placeholder="Ej: 16500" />
                                </Col>
                                <Col>
                                    <Form.Label>WhatsApp</Form.Label>
                                    <Form.Control placeholder="Ej: 1122334455" />
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Imágenes</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSellModal(false)}>
                        Publicar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Garage;


