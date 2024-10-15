import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Menu from './Menu';

import Home from './pages/HOME'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato';
import Notfound from './pages/NotFound';
import Produto from './pages/Produtos';

function RoutesApp() {
    return (
        <BrowserRouter>        
            <Menu />
            <div className="corpo">
                <Routes>
                    <Route 
                        path = "/"
                        element={ <Home />}/>
                    <Route  
                        path='/sobre'
                        element={ <Sobre />}/>
                    <Route  
                        path='/contato'
                        element={ <Contato />}/>
                    <Route  
                        path='/produto/:id'
                        element={ <Produto />}/>

                    <Route  
                        path='*'
                        element={ <Notfound />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default RoutesApp;