import { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import { auth } from '../../firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

export default function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (email === '' || password === '') {
            alert('preencha todos os campos' );
            return;
        }
        await signInWithEmailAndPassword(auth, email, password)
        .then((response)=> {
            navigate('/admin', {replace: true})
        })
        .catch((er)=>{
            if(er.code === 'auth/invalid-credential') { 
                alert('Senha ou Email errado')
            }
            console.log(er);
        })
        // alert('Oi');
    }

    return (
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencia suas tarefas de forma Fácil</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    placeholder='Digite sua Senha...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Acessar</button>
            </form>

            <Link to="/register" className='register'>
                Não possuí conta? Cadastre-se
            </Link>
        </div>
    )
}