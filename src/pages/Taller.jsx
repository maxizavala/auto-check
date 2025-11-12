import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
        <>
            <h2 className="mt-4 mb-4">Panel del Taller</h2>

            <h4 className="mt-4">🟡 Servicios pendientes de validación</h4>
            {pendientes.length === 0 && <p>No hay servicios pendientes.</p>}
            <ul>
                {pendientes.map(s => (
                    <li key={s.id} className="mb-2">
                        <strong>{s.date}</strong> — {s.category}: {s.description} <br />
                        Auto: {getCarInfo(s.carId)} — Dueño: {getOwnerName(s.carId)} <br />
                        <Button
                            variant="success"
                            size="sm"
                            className="mt-1"
                            onClick={() => handleValidate(s.id)}
                        >
                            Validar
                        </Button>
                    </li>
                ))}
            </ul>

            <h4 className="mt-5">🟢 Servicios validados</h4>
            {validados.length === 0 && <p>No hay servicios validados.</p>}
            <ul>
                {validados.map(s => (
                    <li key={s.id} className="mb-2">
                        <strong>{s.date}</strong> — {s.category}: {s.description} <br />
                        Auto: {getCarInfo(s.carId)} — Dueño: {getOwnerName(s.carId)} <br />
                        ✅ Validado
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Taller;

