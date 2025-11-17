import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import autosData from "../data/autosventa.json";

const Item = (props) => {
    return (
        <div className="card h-100 d-flex flex-column">
            <img src={props.img} className="card-img-top" alt={props.titulo} />

            <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                <p className="card-text">${props.precio}</p>
            </div>

            <div className="card-footer d-flex justify-content-between">
                <a
                    href={`https://wa.me/${props.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark btn-sm"
                >
                    WhatsApp
                </a>


                <Link className="btn btn-warning btn-sm" to={"/historial/" + props.id}>
                    Ver Historial
                </Link>
            </div>
        </div>
    );
};

const Autos = () => {
    const [autos, setAutos] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [anioDesde, setAnioDesde] = useState("");
    const [anioHasta, setAnioHasta] = useState("");
    const [kmDesde, setKmDesde] = useState("");
    const [kmHasta, setKmHasta] = useState("");

    useEffect(() => {
        setAutos(autosData);
        setFiltered(autosData);
    }, []);

    const filtrar = () => {
        let temp = autos;

        if (marca) temp = temp.filter(a => a.marca.toLowerCase().includes(marca.toLowerCase()));
        if (modelo) temp = temp.filter(a => a.modelo.toLowerCase().includes(modelo.toLowerCase()));
        if (anioDesde) temp = temp.filter(a => a.anio >= parseInt(anioDesde));
        if (anioHasta) temp = temp.filter(a => a.anio <= parseInt(anioHasta));
        if (kmDesde) temp = temp.filter(a => a.km >= parseInt(kmDesde));
        if (kmHasta) temp = temp.filter(a => a.km <= parseInt(kmHasta));

        setFiltered(temp);
    };

    return (
        <Container className="pt-3">
            <Form className="mb-3">
                <Row>
                    <Col md={3} className="mb-2">
                        <Form.Control placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
                    </Col>
                    <Col md={3} className="mb-2">
                        <Form.Control placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control placeholder="Año desde" value={anioDesde} onChange={(e) => setAnioDesde(e.target.value)} />
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Control placeholder="Año hasta" value={anioHasta} onChange={(e) => setAnioHasta(e.target.value)} />
                    </Col>
                    <Col md={1} className="d-grid mb-2">
                        <Button variant="dark" onClick={filtrar}>Filtrar</Button>
                    </Col>
                </Row>

                <Row>
                    <Col md={3} className="mb-2">
                        <Form.Control placeholder="KM desde" value={kmDesde} onChange={(e) => setKmDesde(e.target.value)} />
                    </Col>
                    <Col md={3} className="mb-2">
                        <Form.Control placeholder="KM hasta" value={kmHasta} onChange={(e) => setKmHasta(e.target.value)} />
                    </Col>
                </Row>
            </Form>

            <Row>
                {filtered.length > 0 ? (
                    filtered.map(auto => (
                        <Col sm={6} md={4} className="pt-3" key={auto.id}>
                            <Item
                                titulo={auto.nombre}
                                img={"/imagenes/" + auto.img}
                                precio={auto.precio}
                                id={auto.id}
                                whatsapp={auto.whatsapp}
                            />
                        </Col>
                    ))
                ) : (
                    <Spinner className="mt-3" animation="border" />
                )}
            </Row>
        </Container>
    );
};

export default Autos;
