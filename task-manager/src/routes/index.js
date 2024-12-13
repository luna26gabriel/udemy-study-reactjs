import { Route, Routes } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SingUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'
import Private from './Private'
import Profile from '../pages/Profile'
import Customers from '../pages/Costumers'
import New from '../pages/New'

export default function RoutesApp() {
    return (
        <Routes>
            <Route path='/'             element={<SignIn />}></Route>
            <Route path='/register'     element={<SingUp />}></Route>

            <Route path='/dashboard'    element={ <Private><Dashboard /></Private >}></Route>
            <Route path='/profile'      element={ <Private><Profile /></Private >}></Route>
            <Route path='/customers'    element={ <Private><Customers /></Private >}></Route>
            <Route path='/new'          element={ <Private><New /></Private >}></Route>
            <Route path='/new/:id'      element={ <Private><New /></Private >}></Route>
        </Routes>
    )
}