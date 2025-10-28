import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Garage from './pages/Garage';


const App = () => {

	return (
        <BrowserRouter>
            <Menu />
            <Container>
                <Routes>
                    <Route path="/" element={ <h1> Pagina principal </h1> } />
                    <Route path="/garage" element={ <Garage /> } />
                    <Route path="*" element={ <h1> Pagina Inexistente </h1> } />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
