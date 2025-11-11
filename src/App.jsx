import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Garage from './pages/Garage';
import Perfil from './pages/Perfil';
import Taller from './pages/Taller';
import Login from './pages/Login';
import Signin from './pages/Signin';
import { useEffect } from 'react';
import usersData from "./data/users.json";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';
import AutoDetail from './pages/AutoDetail';


const App = () => {

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (!storedUsers) {
            localStorage.setItem("users", JSON.stringify(usersData));
        }
    }, []);


	return (
        <AuthProvider>
            <BrowserRouter>
                <Menu />
                <Container>
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/registrar" element={ <Signin /> } />
                        
                        <Route
                            path="/perfil"
                            element={
                            <ProtectedRoute>
                                <Perfil />
                            </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/garage"
                            element={
                                <ProtectedRoute>
                                    <Garage />
                                </ProtectedRoute>
                            }
                        />

                        <Route 
                            path="/auto/:id" 
                            element={<AutoDetail />} 
                        />

                        <Route
                            path="/taller"
                            element={
                            <ProtectedRoute>
                                <Taller />
                            </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={ <h1> Pagina Inexistente </h1> } />
                    </Routes>
                </Container>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
