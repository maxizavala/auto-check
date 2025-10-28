import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Garage from './pages/Garage';
import Perfil from './pages/Perfil';
import Taller from './pages/Taller';


const App = () => {

	return (
        <BrowserRouter>
            <Menu />
            <Container>
                <Routes>
                    <Route path="/" element={ <h1> Pagina principal </h1> } />
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
