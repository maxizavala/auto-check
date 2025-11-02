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


const App = () => {

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (!storedUsers) {
            localStorage.setItem("users", JSON.stringify(usersData));
        }
    }, []);


	return (
        <BrowserRouter>
            <Menu />
            <Container>
                <Routes>
                    <Route path="/" element={ <Login /> } />
                    <Route path="/registrar" element={ <Signin /> } />
                    <Route path="/perfil" element={ <Perfil /> } />
                    <Route path="/garage" element={ <Garage /> } />
                    <Route path="/taller" element={ <Taller /> } />
                    <Route path="*" element={ <h1> Pagina Inexistente </h1> } />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
