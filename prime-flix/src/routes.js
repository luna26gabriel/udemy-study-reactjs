import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Header from './components/Header';
import Error from './pages/Error';
import Favoritos from './pages/Favoritos';

function RoutesApp() {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route
                    path='/'
                    element={ <Home /> } />
                <Route
                    path='favoritos'
                    element={ <Favoritos /> } />   
                <Route
                    path='filme/:id'
                    element={ <Movies /> } />   

                <Route
                    path='*'
                    element={ <Error /> } /> 
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;