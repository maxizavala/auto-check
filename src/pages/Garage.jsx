import { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Garage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [plate, setPlate] = useState("");

    // Cargar autos
    useEffect(() => {
        const db = JSON.parse(localStorage.getItem("cars")) || [];
        const userCars = db.filter((c) => c.owner === user);
        setCars(userCars);
    }, [user]);

    // Guardar auto
    const handleSaveCar = () => {
        const db = JSON.parse(localStorage.getItem("cars")) || [];

        const newCar = {
            id: Date.now(),
            owner: user,
            brand,
            model,
            year,
            plate
        };

        db.push(newCar);
        localStorage.setItem("cars", JSON.stringify(db));

        setCars(db.filter((c) => c.owner === user));

        setShowModal(false);
        setBrand("");
        setModel("");
        setYear("");
        setPlate("");
    };

    return (
        <>
            <h2 className="mt-4 mb-3">Mi Garage</h2>

            <Button variant="success" onClick={() => setShowModal(true)}>
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

                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/auto/${car.id}`)}
                                >
                                    Ver detalles
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSaveCar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Garage;

