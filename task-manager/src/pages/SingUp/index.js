import './signup.css';

import logo from '../../assets/logo.png'
import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signUp, loadingAuth } = useContext(AuthContext)

    async function hadleSubmit (e) {
        e.preventDefault();
        if(name === '' || email === '') {
            alert('Email ou Senha ou Nome não digitado')
            return
        };
        await signUp(email, password, name)
    }
    return (
        <div className='container-center'>
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do Sistema" />
                </div>
                <form onSubmit={hadleSubmit}>
                    <h1>Criar Conta</h1>
                    <input type="text" placeholder='Digite seu Nome' value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="text" placeholder='Digite seu Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder='Digite sua Senha' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <input className='acess' type="submit" value={loadingAuth ? 'Carregando...' : 'Registrar' }/>
                </form>
                <Link to='/'>Já possui conta? Entre na conta</Link>
            </div>
        </div>
    )
}