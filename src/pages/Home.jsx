import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
    const [plate, setPlate] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!plate.trim()) return;

        const db = JSON.parse(localStorage.getItem("cars")) || [];

        const car = db.find(
            (c) => c.plate.toLowerCase() === plate.toLowerCase()
        );

        if (car) {
            navigate(`/auto/${car.id}`);
        } else {
            alert("No se encontró ningún auto con esa patente.");
        }
    };

    return (
        <div className="home-wrapper">
            <section className="hero-section">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video"
                    src="/videos/hero.mp4"
                />
                <div className="hero-overlay" />

                <div className="hero-content text-center text-white">
                    <h1 className="fw-bold mb-4">
                        Conocé el historial real de cualquier auto
                    </h1>
                    <Form
                        onSubmit={handleSearch}
                        className="d-flex justify-content-center"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Buscar por patente (ej: ABC123)"
                            value={plate}
                            onChange={(e) => setPlate(e.target.value)}
                            className="w-50 me-2"
                        />
                        <Button variant="primary" type="submit">
                            Buscar
                        </Button>
                    </Form>
                </div>
            </section>

            <Container className="py-5">
                <Row className="g-4">
                    {cards.map((card, index) => (
                        <Col key={index} xs={12} md={4}>
                            <Card className="h-100 shadow-sm text-center border-0 home-card">
                                <Card.Body>
                                    <div className="fs-1 mb-3">{card.icon}</div>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        {card.text}
                                    </Card.Text>
                                    <Button
                                        variant="outline-primary"
                                        href={card.link}
                                    >
                                        {card.cta}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

const cards = [
    {
        icon: "🧰",
        title: "Registrá tus servicios",
        text: "Cargá y gestioná los arreglos, services y mantenimientos de tus vehículos.",
        cta: "Ir a mi garage",
        link: "/garage",
    },
    {
        icon: "🧑‍🔧",
        title: "Talleres validados",
        text: "Los talleres pueden validar los servicios cargados por los usuarios.",
        cta: "Ver talleres",
        link: "/taller",
    },
    {
        icon: "🚗",
        title: "Consultá antes de comprar",
        text: "Buscá por patente y conocé cómo fue tratado el auto que te interesa.",
        cta: "Buscar vehículo",
        link: "/",
    },
];

export default Home;
