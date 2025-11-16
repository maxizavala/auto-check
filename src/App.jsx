import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import Garage from './pages/Garage';
import Perfil from './pages/Perfil';
import Taller from './pages/Taller';
import Login from './pages/Login';
import Signin from './pages/Signin';
import AutoDetail from './pages/AutoDetail';
import Home from './pages/Home';
import Admin from './pages/Admin';
import usersData from "./data/users.json";



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
                <Routes>
                    <Route path="/" element={ <Home /> } />
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

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute onlyAdmin={true}>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={ <h1> Pagina Inexistente </h1> } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
