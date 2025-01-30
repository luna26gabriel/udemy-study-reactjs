import {Route, Routes, BrowserRouter} from 'react-router-dom'

import Main from './pages/Main';
import Repositorios from './pages/Repositorios';
import Error from './pages/Error';

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/repositorio/:repositorio" element={<Repositorios />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </BrowserRouter>
    )
}