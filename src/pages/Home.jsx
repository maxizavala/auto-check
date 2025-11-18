import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Accordion,
} from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [plate, setPlate] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!plate.trim()) return;

    const db = JSON.parse(localStorage.getItem("cars")) || [];

    const car = db.find((c) => c.plate.toLowerCase() === plate.toLowerCase());

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
          <h1 className="fw-bold mb-3 hero-title">
            Conocé el historial real de cualquier auto
          </h1>
          <p className="lead mb-4 hero-sub">
            Investigá antes de comprar o mantené tu vehículo siempre documentado.
          </p>

          <Form
            onSubmit={handleSearch}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Control
              type="text"
              placeholder="Buscar por patente (ej: ABC123)"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="hero-input me-2"
            />
            <Button variant="warning" className="text-dark fw-bold hero-btn" type="submit">
              Buscar
            </Button>
          </Form>
        </div>
      </section>

      <Container className="py-5">

        <div className="section-header text-center mb-5">
          <h2 className="fw-bold">¿Cómo funciona?</h2>
          <p className="text-muted">
            Un proceso simple para acceder al historial real de cualquier vehículo.
          </p>
        </div>

        <Row className="g-4 align-items-stretch mb-5">
          <Col md={4}>
            <Card className="feature-card h-100">
              <Card.Body>
                <div className="feature-number">1</div>
                <Card.Title className="mt-3">Buscá por patente</Card.Title>
                <Card.Text className="text-muted small">
                  Ingresá la patente y accedé al historial del vehículo en segundos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="feature-card h-100">
              <Card.Body>
                <div className="feature-number">2</div>
                <Card.Title className="mt-3">Revisá los servicios</Card.Title>
                <Card.Text className="text-muted small">
                  Services categorizados, fechas y talleres que validaron.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="feature-card h-100">
              <Card.Body>
                <div className="feature-number">3</div>
                <Card.Title className="mt-3">Tomá mejores decisiones</Card.Title>
                <Card.Text className="text-muted small">
                  Comprá con confianza o registrá el historial de tus autos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="section-divider" />

        <div className="section-header text-center mb-5">
          <h2 className="fw-bold">¿Para quién es?</h2>
          <p className="text-muted">
            Pensado para cada punto de la industria automotriz.
          </p>
        </div>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="audience-card h-100">
              <Card.Body>
                <Card.Title>Dueños</Card.Title>
                <Card.Text className="text-muted small">
                  Registrá y ordená todos los servicios de tus vehículos.
                </Card.Text>
                <Button variant="warning" className="text-dark fw-bold">Ir a mi garage</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="audience-card h-100">
              <Card.Body>
                <Card.Title>Compradores</Card.Title>
                <Card.Text className="text-muted small">
                  Revisá el historial antes de comprar.
                </Card.Text>
                <Button variant="warning" className="text-dark fw-bold">Buscar vehículo</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="audience-card h-100">
              <Card.Body>
                <Card.Title>Talleres</Card.Title>
                <Card.Text className="text-muted small">
                  Validá servicios y sumá reputación.
                </Card.Text>
                <Button variant="dark">Ir a talleres</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="section-divider" />

        <div className="section-header text-center mb-5">
          <h2 className="fw-bold">Transparencia real</h2>
          <p className="text-muted">Datos confiables que ayudan a tomar mejores decisiones.</p>
        </div>

        <Row className="g-4 mb-5">
          <Col md={6}>
            <Card className="border-0 shadow-sm p-3 h-100">
              <Card.Body>
                <Card.Title>Beneficios clave</Card.Title>
                <ul className="list-unstyled text-muted mb-0">
                  <li>• Historial organizado por categorías</li>
                  <li>• Servicios validados por talleres</li>
                  <li>• Kilometraje documentado</li>
                  <li>• Compartir fácilmente al vender</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 shadow-sm p-3 h-100 text-center">
              <Card.Body>
                <Card.Title>En crecimiento</Card.Title>
                <div className="stats-row mt-3">
                  <div>
                    <div className="stats-number">1.2k+</div>
                    <div className="text-muted small">Servicios</div>
                  </div>
                  <div>
                    <div className="stats-number">850+</div>
                    <div className="text-muted small">Talleres</div>
                  </div>
                  <div>
                    <div className="stats-number">3k+</div>
                    <div className="text-muted small">Autos</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="section-divider" />

        <div className="section-header text-center mb-4">
          <h2 className="fw-bold">Preguntas frecuentes</h2>
        </div>

        <Row className="mb-5">
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>¿Quién puede agregar servicios?</Accordion.Header>
                <Accordion.Body>
                  Los dueños agregan servicios; los talleres los validan.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>¿La información es pública?</Accordion.Header>
                <Accordion.Body>
                  Sí, cualquier usuario puede buscar por patente.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>¿Las validaciones son confiables?</Accordion.Header>
                <Accordion.Body>
                  Son realizadas por talleres registrados.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <Row>
          <Col className="text-center text-muted small py-4">
            © {new Date().getFullYear()} AutoCheck — Copyright © 2025
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;


