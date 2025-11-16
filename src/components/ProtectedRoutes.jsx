import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, onlyAdmin = false, noTaller = false }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (onlyAdmin && user.tipo !== "admin") {
        return <Navigate to="/" replace />;
    }

    if (noTaller && user.tipo === "taller") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
