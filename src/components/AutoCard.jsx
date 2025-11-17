import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const AutoCard = ({ auto }) => {
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const next = () => setIndex((prev) => (prev + 1) % auto.imgs.length);
    const prev = () => setIndex((prev) => (prev - 1 + auto.imgs.length) % auto.imgs.length);

    return (
        <>
            <div className="card h-100 d-flex flex-column">

                <div className="position-relative">
                    <img
                        src={`/imagenes/${auto.imgs[index]}`}
                        className="card-img-top"
                        alt={auto.nombre}
                        onClick={() => setShowModal(true)}
                        style={{
                            height: "250px",
                            width: "100%",
                            objectFit: "cover",
                            aspectRatio: "1 / 1",
                            cursor: "pointer",
                            borderBottom: "1px solid #ddd"
                        }}
                    />

                    <button
                        className="btn btn-dark btn-sm position-absolute top-50 start-0 translate-middle-y"
                        onClick={prev}
                    >
                        ‹
                    </button>

                    <button
                        className="btn btn-dark btn-sm position-absolute top-50 end-0 translate-middle-y"
                        onClick={next}
                    >
                        ›
                    </button>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{auto.nombre}</h5>

                    <p className="card-text mb-1">
                        {auto.anio} | {auto.km.toLocaleString()} km
                    </p>
                    <p className="card-text mb-2">
                        Capital Federal
                    </p>

                    <p className="card-text fw-bold fs-5">${auto.precio}</p>
                </div>

                <div className="card-footer d-flex justify-content-between">
                    <a
                        href={`https://wa.me/${auto.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm"
                    >
                        WhatsApp
                    </a>

                    <Link className="btn btn-warning btn-sm" to={`/historial/${auto.id}`}>
                        Ver Historial
                    </Link>
                </div>
            </div>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                className="text-center"
            >
                <Modal.Body className="p-0 position-relative">
                    <img
                        src={`/imagenes/${auto.imgs[index]}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "90vh",
                            objectFit: "contain",
                            backgroundColor: "#000"
                        }}
                    />

                    <button
                        className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                        style={{ opacity: 0.7 }}
                        onClick={prev}
                    >
                        ‹
                    </button>

                    <button
                        className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                        style={{ opacity: 0.7 }}
                        onClick={next}
                    >
                        ›
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AutoCard;

