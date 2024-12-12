import './signin.css';

import logo from '../../assets/logo.png'

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signIn, loadingAuth} = useContext(AuthContext)

    async function handleAcess(e) {
        e.preventDefault();        
        if(email === '' || password === '') {
            alert('Email ou Senha Imcompleto')
            return
        }
        // alert('teste')
        await signIn(email, password);
    }

    return (
        <div className='container-center'>
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do Sistema" />
                </div>
                <form onSubmit={handleAcess}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder='Digite seu Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder='Digite sua Senha' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <input className='acess' type="submit" value={loadingAuth ? 'Carregando...' : 'Acessar' } />
                </form>
                <Link to='/register'>Não possui conta ainda? Crie uma conta</Link>
            </div>
        </div>
    )
}