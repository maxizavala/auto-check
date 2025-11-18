import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Taller = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [cars, setCars] = useState([]);
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const dbServices = JSON.parse(localStorage.getItem("services")) || [];
        const dbCars = JSON.parse(localStorage.getItem("cars")) || [];
        const dbUsers = JSON.parse(localStorage.getItem("users")) || [];

        const myServices = dbServices.filter(s => s.tallerId === user.id);
        setServices(myServices);
        setCars(dbCars);
        setOwners(dbUsers);
    }, [user]);

    const handleValidate = (id) => {
        const db = JSON.parse(localStorage.getItem("services")) || [];
        const updated = db.map(s => s.id === id ? { ...s, validado: true } : s);
        localStorage.setItem("services", JSON.stringify(updated));
        setServices(updated.filter(s => s.tallerId === user.id));
    };

    const getCarInfo = (carId) => {
        const car = cars.find(c => c.id === carId);
        return car ? `${car.brand} ${car.model} (${car.plate})` : "Auto desconocido";
    };

    const getOwnerName = (carId) => {
        const car = cars.find(c => c.id === carId);
        if (!car) return "";
        const owner = owners.find(u => u.username === car.owner);
        return owner ? owner.username : car.owner;
    };

    const pendientes = services.filter(s => !s.validado);
    const validados = services.filter(s => s.validado);

    return (
        <Container className="mt-4" style={{ maxWidth: "900px" }}>
            <h4 className="mt-4 mb-3">
                Servicios pendientes ({pendientes.length})
            </h4>

            {pendientes.length === 0 && (
                <p>No hay servicios pendientes.</p>
            )}

            <Row xs={1} className="g-3">
                {pendientes.map(s => (
                    <Col key={s.id}>
                        <Card className="shadow-sm border-0 rounded-3">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">
                                        {s.category}{" "}
                                    </h5>
                                    <small className="text-muted">{s.date}</small>
                                </div>

                                <p className="mb-1">
                                    <strong>Descripción:</strong> {s.description}
                                </p>

                                <p className="mb-1">
                                    <strong>Auto:</strong> {getCarInfo(s.carId)}
                                </p>

                                <p className="mb-3">
                                    <strong>Dueño:</strong> {getOwnerName(s.carId)}
                                </p>

                                <Button
                                    variant="warning"
                                    onClick={() => handleValidate(s.id)}
                                >
                                    Validar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h4 className="mt-5 mb-3">
                Servicios validados ({validados.length})
            </h4>

            {validados.length === 0 && (
                <p>No hay servicios validados.</p>
            )}

            <Row xs={1} className="g-3 mb-5">
                {validados.map(s => (
                    <Col key={s.id}>
                        <Card className="shadow-sm border-0 rounded-3 bg-light">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">
                                        {s.category}{" "}
                                    </h5>
                                    <small className="text-muted">{s.date}</small>
                                </div>

                                <p className="mb-1">
                                    <strong>Descripción:</strong> {s.description}
                                </p>

                                <p className="mb-1">
                                    <strong>Auto:</strong> {getCarInfo(s.carId)}
                                </p>

                                <p className="mb-0">
                                    <strong>Dueño:</strong> {getOwnerName(s.carId)}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Taller;


